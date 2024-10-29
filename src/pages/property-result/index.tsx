import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import PropertyCardH from '@/components/propertyResult/PropertyCard';
import Header from '@/components/Header';
import { API_URL } from '@/constants/env';
import { FaMapMarkerAlt, FaDollarSign, FaMoneyBillWave, FaHome, FaRegSadCry } from 'react-icons/fa';
import { MdClear } from "react-icons/md";

const mapContainerStyle = {
  width: '100%',
  height: '100vh',
};

const PropertyListWithMap: React.FC = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredProperty, setHoveredProperty] = useState<any | null>(null);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number } | null>(null);
  const [filterByLocation, setFilterByLocation] = useState<boolean>(false);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);


  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);

  const togglePriceDropdown = () => {
    setIsPriceDropdownOpen(!isPriceDropdownOpen);
  };

  // Fetch all properties on mount
  useEffect(() => {
    const fetchAllProperties = async () => {
      try {
        const response = await fetch(`${API_URL}/properties`);
        const data = await response.json();
        if (response.ok) {
          setProperties(data.properties);
          console.log(data.properties)
          // Set map center to the first property if available
          if (data.properties.length > 0) {
            const firstProperty = data.properties[0];
            setMapCenter({
              lat: firstProperty.location.coordinates[1],
              lng: firstProperty.location.coordinates[0],
            });
          }
        } else {
          throw new Error(data.message || 'Failed to fetch properties');
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    // console.log(process.env.NEXT_PUBLIC_API_KEY_GMAPS);
    fetchAllProperties();
  }, []);

  // Fetch nearby properties based on user location
  const fetchNearbyProperties = async (latitude: number, longitude: number) => {
    try {
      const radius = 5; // Example: 5km radius
      const response = await fetch(`${API_URL}/properties/user/nearby?latitude=${latitude}&longitude=${longitude}&radius=${radius}`);
      const data = await response.json();
      // console.log(data.properties)
      if (response.ok) {
        setProperties(data.properties);
        setMapCenter({ lat: latitude, lng: longitude });
      } else {
        throw new Error(data.message || 'Failed to fetch nearby properties');
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  // Get the user's current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchNearbyProperties(latitude, longitude);
        },
        (error) => {
          setError('Unable to fetch location. Please allow location access.');
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  };

  useEffect(() => {
    if (filterByLocation) {
      getCurrentLocation();
    }
  }, [filterByLocation]);

  const handleHover = (property: any) => {
    setHoveredProperty(property);
  };

  const handleHoverLeave = () => {
    setHoveredProperty(null);
  };
  const createMarkerIcon = (color: string) =>
    mapInstance
      ? {
        url: `data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 10.5c-1.93 0-3.5-1.57-3.5-3.5S10.07 5.5 12 5.5s3.5 1.57 3.5 3.5S13.93 12.5 12 12.5z"/></svg>`,
        scaledSize: new google.maps.Size(40, 40),
      }
      : null;

  const handleMapLoad = (map: google.maps.Map) => {
    setMapInstance(map); // Save the map instance once it's loaded
  };
  const toggleFilterByLocation = () => {
    setFilterByLocation((prev) => {
      if (!prev) {
        getCurrentLocation();
      }
      return !prev;
    });
  };

  const handleRentalClick = async () => {
    try {
      const response = await fetch(`${API_URL}/properties/user/rental`);
      const data = await response.json();
      if (response.ok) {
        setProperties(data.property);
        if (data.property.length > 0) {
          const firstProperty = data.property[0];
          setMapCenter({
            lat: firstProperty.location.coordinates[1],
            lng: firstProperty.location.coordinates[0],
          });
        }
      } else {
        throw new Error(data.message || 'Failed to fetch rental properties');
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleSalesClick = async () => {
    try {
      const response = await fetch(`${API_URL}/properties/user/sales`);
      const data = await response.json();
      if (response.ok) {
        setProperties(data.property);
        if (data.property.length > 0) {
          const firstProperty = data.property[0];
          setMapCenter({
            lat: firstProperty.location.coordinates[1],
            lng: firstProperty.location.coordinates[0],
          });
        }
      } else {
        throw new Error(data.message || 'Failed to fetch sales properties');
      }
    } catch (error: any) {
      setError(error.message);
    }
  };
  const handleRemoveFilters = () => {
    window.location.reload();
  };

  const handlePriceFilter = async (minPrice: number, maxPrice: number) => {
    try {
      const response = await fetch(`${API_URL}/properties/user/price-filter?minPrice=${minPrice}&maxPrice=${maxPrice}`);
      const data = await response.json();
      if (response.ok) {
        setProperties(data.data);
        // Set map center to the first property if available
        if (data.data.length > 0) {
          const firstProperty = data.data[0];
          setMapCenter({
            lat: firstProperty.location.coordinates[1],
            lng: firstProperty.location.coordinates[0],
          });
        }
      } else {
        throw new Error(data.message || 'Failed to fetch properties by price filter');
      }
    } catch (error: any) {
      setError(error.message);
    }
  };
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)]">
          {/* Left Panel - Property Listings */}
          <div className="w-full lg:w-1/2 overflow-y-auto bg-white shadow-lg">
            {/* Filters Section */}
            <div className="sticky top-0 bg-white z-10 px-4 py-3 border-b border-gray-100 shadow-sm">
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-2">
                {/* Location Filter */}
                <button
                  onClick={toggleFilterByLocation}
                  className="flex items-center justify-center px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-blue-50 hover:border-blue-200 transition-all duration-200"
                >
                  <FaMapMarkerAlt className="mr-2 text-blue-500" />
                  <span className="text-sm font-medium">Nearby</span>
                </button>

                {/* Price Filter */}
                <div className="relative">
                  <button
                    onClick={togglePriceDropdown}
                    className={`w-full flex items-center justify-center px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-blue-50 hover:border-blue-200 transition-all duration-200 ${isPriceDropdownOpen ? 'bg-blue-50 border-blue-300' : ''
                      }`}
                  >
                    <FaDollarSign className="mr-2 text-green-500" />
                    <span className="text-sm font-medium">Price</span>
                  </button>

                  {isPriceDropdownOpen && (
                    <div className="absolute left-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-20">
                      <div className="space-y-3">
                        <p className="text-sm font-semibold text-gray-700 mb-2">Price Range</p>
                        {[
                          { id: 'price1', range: '0 - 5,000', values: [0, 5000] },
                          { id: 'price2', range: '5,001 - 10,000', values: [5001, 10000] },
                          { id: 'price3', range: '10,001 - 20,000', values: [10001, 20000] },
                          { id: 'price4', range: '20,001+', values: [20001, 5000000] }
                        ].map((option) => (
                          <label key={option.id} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-md">
                            <input
                              type="radio"
                              name="price"
                              id={option.id}
                              className="w-4 h-4 text-blue-500 focus:ring-blue-400"
                              onChange={() => handlePriceFilter(option.values[0], option.values[1])}
                            />
                            <span className="text-sm text-gray-600">₹{option.range}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Sales Filter */}
                <button
                  onClick={handleSalesClick}
                  className="flex items-center justify-center px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-blue-50 hover:border-blue-200 transition-all duration-200"
                >
                  <FaMoneyBillWave className="mr-2 text-yellow-500" />
                  <span className="text-sm font-medium">Sales</span>
                </button>

                {/* Rental Filter */}
                <button
                  onClick={handleRentalClick}
                  className="flex items-center justify-center px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-blue-50 hover:border-blue-200 transition-all duration-200"
                >
                  <FaHome className="mr-2 text-purple-500" />
                  <span className="text-sm font-medium">Rental</span>
                </button>

                {/* Clear Filters */}
                <button
                  onClick={handleRemoveFilters}
                  className="flex items-center justify-center px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-red-50 hover:border-red-200 transition-all duration-200"
                >
                  <MdClear className="mr-2 text-red-500" />
                  <span className="text-sm font-medium">Clear</span>
                </button>
              </div>
            </div>

            {/* Property Listings */}
            <div className="p-4">
              {properties.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-96 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 p-8">
                  <FaRegSadCry className="text-5xl text-gray-400 mb-4" />
                  <h2 className="text-2xl font-bold text-gray-700 mb-2">No Properties Found</h2>
                  <p className="text-gray-500 text-center max-w-md">
                    We couldn't find any properties matching your criteria. Please adjust your filters or try again later.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {properties.map((property) => (
                    <div
                      key={property._id}
                      onMouseEnter={() => handleHover(property)}
                      onMouseLeave={handleHoverLeave}
                      className="transform transition-transform duration-200 hover:scale-[1.02]"
                    >
                      <PropertyCardH property={property} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Map */}
          <div className="w-full lg:w-1/2 h-full">
            {mapCenter && (
              <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_API_KEY_GMAPS!}>
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={mapCenter}
                  zoom={12}
                  options={{
                    styles: [
                      {
                        featureType: "all",
                        elementType: "labels.text.fill",
                        stylers: [{ color: "#4a5568" }]
                      }
                    ],
                    disableDefaultUI: true,
                    zoomControl: true,
                    mapTypeControl: true,
                    scaleControl: true,
                  }}
                >
                  {properties.map((property: any) => (
                    <Marker
                      key={property._id}
                      position={{
                        lat: property.location.coordinates[1],
                        lng: property.location.coordinates[0],
                      }}
                      onMouseOver={() => setHoveredProperty(property)}
                      onMouseOut={() => setHoveredProperty(null)}
                    >
                      {hoveredProperty === property && (
                        <InfoWindow
                          position={{
                            lat: property.location.coordinates[1],
                            lng: property.location.coordinates[0],
                          }}
                        >
                          <div className="w-80 bg-white rounded-lg shadow-lg overflow-hidden">
                            {property.propertyImages.length > 0 && (
                              <div className="relative h-40">
                                <img
                                  src={property.propertyImages[0]}
                                  alt={property.title}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute top-2 right-2">
                                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${property.type === 'Sales' ? 'bg-red-500' : 'bg-yellow-500'
                                    } text-white shadow-md`}>
                                    {property.type}
                                  </span>
                                </div>
                              </div>
                            )}
                            <div className="p-4">
                              <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">
                                {property.title}
                              </h3>
                              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                {property.description}
                              </p>

                              {/* Price and Deposit Section */}
                              <div className="bg-gray-50 -mx-4 px-4 py-3 border-t border-b border-gray-100">
                                <div className="flex justify-between items-center mb-2">
                                  <div className="flex flex-col">
                                    <span className="text-sm text-gray-500">Monthly Rent</span>
                                    <span className="text-lg font-bold text-blue-600">
                                      ₹{property.price.toLocaleString()}
                                    </span>
                                  </div>
                                  <div className="flex flex-col text-right">
                                    <span className="text-sm text-gray-500">Security Deposit</span>
                                    <span className="text-lg font-bold text-purple-600">
                                      ₹{(property.price * 2).toLocaleString()}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Additional Info */}
                              <div className="flex items-center justify-between mt-3">
                                <div className="flex items-center">
                                  <span className="px-2 py-1 bg-gray-100 rounded text-sm text-gray-600">
                                    {property.furnishing}
                                  </span>
                                </div>
                                <div className="flex items-center">
                                  <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-sm font-medium">
                                    Available Now
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </InfoWindow>
                      )}
                    </Marker>
                  ))}
                </GoogleMap>
              </LoadScript>
            )}
          </div>
        </div>
      </div>

    </>
  );
};

export default PropertyListWithMap;
