import React, { useEffect, useState } from 'react';
import { Pencil } from 'lucide-react'; // For the pencil icon
import "../../styles/globals.css";


// type Step1Props = {
//     onNext: () => void; // Trigger next step
// };

type Step1Props = {
    onNext: (data: { propertyType: string; BHK: number; furnishing: string, address: string; nearbyPlaces: string[]; amenities: string[]; }) => void;
    initialData: { propertyType: string; BHK: number; furnishing: string, address: string; nearbyPlaces: string[]; amenities: string[]; };
};

const Step1: React.FC<Step1Props> = ({ onNext, initialData }) => {

    const [BHK, setBhk] = useState(initialData?.BHK || 1);
    const [furnishing, setFurnishing] = useState(initialData?.furnishing || '');
    const [propertyType, setPropertyType] = useState(initialData?.propertyType || '');
    const [bhkInputVisible, setBhkInputVisible] = useState(false);
    const [address, setAddress] = useState(initialData?.address);
    const [nearbyPlaces, setNearbyPlaces] = useState<string[]>([]);
    const [addAmenities, setAddAmenities] = useState<string[]>([]);

    useEffect(() => {
        setBhk(initialData.BHK);
        setFurnishing(initialData.furnishing);
        setPropertyType(initialData.propertyType)
        setAddress(initialData.address)
    }, [initialData]);

    const propertyTypes = ['Apartment', 'Independent House', 'PentHouse'];
    // const bhkOptions = ['Studio', 1, 2, 3];
    const bhkOptions = [
        { label: 'Studio', value: 0 }, // Represent Studio as 0
        { label: 1, value: 1 },
        { label: 2, value: 2 },
        { label: 3, value: 3 }
    ];
    const furnishingOptions = ['Furnished', 'Semi-Surnished', 'Un-Furnished'];
    const placesOptions = ['School', 'Hospital', 'Park', 'Garden'];
    const amenitiesOptions = ['Bed', 'Parking', 'Wi-Fi', 'Swimming Pool'];

    // Function to add nearby places
    const addNearbyPlace = (place: string) => {
        if (!nearbyPlaces.includes(place)) {
            setNearbyPlaces([...nearbyPlaces, place]);
        }
    };

    // Function to remove nearby place
    const removeNearbyPlace = (place: string) => {
        setNearbyPlaces(nearbyPlaces.filter((item) => item !== place));
    };


    // Function to add nearby places
    const addAmenitiesFunc = (amenities: string) => {
        if (!addAmenities.includes(amenities)) {
            setAddAmenities([...addAmenities, amenities]);
        }
    };

    // Function to remove nearby place
    const removeAmenitiesFunc = (amenities: string) => {
        setAddAmenities(addAmenities.filter((item) => item !== amenities));
    };


    const handleNext = () => {
        onNext({ propertyType, BHK, furnishing, address, nearbyPlaces, amenities: addAmenities }); // Pass all relevant values to the parent component
    };

    return (
        <div className="w-[75%] p-8 bg-white rounded-lg shadow-md">
        {/* Property Type */}
        <div className="mb-8">
            <h2 className="text-sm font-semibold text-gray-800 mb-2">Select Property Type :</h2>
            <div className="grid grid-cols-4 gap-3">
                {propertyTypes.map((type) => (
                    <div
                        key={type}
                        className={`p-3 border-2 rounded-lg cursor-pointer text-center ${propertyType === type ? 'border-blue-600 text-blue-600' : 'border-gray-300 text-gray-600'
                            }`}
                        onClick={() => setPropertyType(type)}
                    >
                        {type}
                    </div>
                ))}
            </div>
        </div>
    
        {/* BHK Selection */}
        <div className="mb-8">
            <h2 className="text-sm font-semibold text-gray-800 mb-2">Select BHK :</h2>
            <div className="grid grid-cols-5 gap-3">
                {bhkInputVisible ? (
                    <input
                        type="number"
                        className="p-3 border-2 rounded-lg w-full border-gray-300 text-gray-700"
                        placeholder="Enter custom BHK"
                        value={BHK || ''}
                        onChange={(e) => setBhk(Number(e.target.value))}
                    />
                ) : (
                    <>
                        {bhkOptions.map((option) => (
                            <div
                                key={option.value}
                                className={`p-3 border-2 rounded-lg cursor-pointer text-center ${BHK === option.value ? 'border-blue-600 text-blue-600' : 'border-gray-300 text-gray-600'
                                    }`}
                                onClick={() => setBhk(option.value)}
                            >
                                {option.label} BHK
                            </div>
                        ))}
                    </>
                )}
    
                <div
                    className="p-3 border-2 rounded-lg cursor-pointer flex items-center justify-center text-gray-600 border-gray-300"
                    onClick={() => setBhkInputVisible(!bhkInputVisible)}
                >
                    <Pencil size={15} />
                </div>
            </div>
        </div>
    
        {/* Furnishing */}
        <div className="mb-8">
            <h2 className="text-sm font-semibold text-gray-800 mb-2">Select Furnishing :</h2>
            <div className="grid grid-cols-4 gap-3">
                {furnishingOptions.map((option) => (
                    <div
                        key={option}
                        className={`p-3 border-2 rounded-lg cursor-pointer text-center ${furnishing === option ? 'border-blue-600 text-blue-600' : 'border-gray-300 text-gray-600'
                            }`}
                        onClick={() => setFurnishing(option)}
                    >
                        {option}
                    </div>
                ))}
            </div>
        </div>
    
        {/* Address */}
        <div className="mb-8">
            <h2 className="text-sm font-semibold text-gray-800 mb-2">Address</h2>
            <textarea
                className="w-full p-3 text-gray-800 border-2 border-gray-300 rounded-lg"
                rows={3}
                placeholder="Enter address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={{ color: address ? 'black' : 'gray' }}
            />
        </div>
    
        {/* Nearby Places */}
        <div className="mb-8">
            <h2 className="text-sm font-semibold text-gray-800 mb-2">Nearby Places</h2>
            <div className="border-2 border-gray-300 rounded-lg p-4 min-h-[50px] flex flex-wrap gap-2">
                {nearbyPlaces.map((place) => (
                    <span
                        key={place}
                        className="border-2 border-blue-600 text-blue-600 px-2 py-1 rounded-lg cursor-pointer flex items-center"
                        onClick={() => removeNearbyPlace(place)}
                    >
                        {place} <span className="ml-2 text-red-600">✕</span>
                    </span>
                ))}
            </div>
            <div className="flex gap-3 mt-4">
                {placesOptions.map((place) => (
                    <div
                        key={place}
                        className={`p-3 border-2 rounded-lg cursor-pointer ${nearbyPlaces.includes(place) ? 'border-blue-600 text-blue-600' : 'border-gray-300 text-gray-600'
                            }`}
                        onClick={() => addNearbyPlace(place)}
                    >
                        {place}
                    </div>
                ))}
            </div>
        </div>
    
        {/* Add Amenities */}
        <div className="mb-8">
            <h2 className="text-sm font-semibold text-gray-800 mb-2">Add Amenities</h2>
            <div className="border-2 border-gray-300 rounded-lg p-4 min-h-[50px] flex flex-wrap gap-2">
                {addAmenities.map((amenity) => (
                    <span
                        key={amenity}
                        className="border-2 border-blue-600 text-blue-600 px-2 py-1 rounded-lg cursor-pointer flex items-center"
                        onClick={() => removeAmenitiesFunc(amenity)}
                    >
                        {amenity} <span className="ml-2 text-red-600">✕</span>
                    </span>
                ))}
            </div>
            <div className="flex gap-3 mt-4">
                {amenitiesOptions.map((amenity) => (
                    <div
                        key={amenity}
                        className={`p-3 border-2 rounded-lg cursor-pointer ${addAmenities.includes(amenity) ? 'border-blue-600 text-blue-600' : 'border-gray-300 text-gray-600'
                            }`}
                        onClick={() => addAmenitiesFunc(amenity)}
                    >
                        {amenity}
                    </div>
                ))}
            </div>
        </div>
    
        {/* Next Button */}
        <div className="flex justify-center">
            <button
                className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300"
                onClick={handleNext}
            >
                Next Step
            </button>
        </div>
    </div>
    

    );
       
};

export default Step1;
