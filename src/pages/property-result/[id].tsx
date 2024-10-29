import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { API_URL } from '@/constants/env';
import Image from 'next/image';
import BookingModal from './bookingModal';
import Header from '@/components/Header';
import { Bath, BedDouble, CheckCheck, Ban, Grid2X2, HospitalIcon, MapPin, SchoolIcon, Shrub, Trees, Wifi, Shield } from 'lucide-react';
import Slider from './slider';

const PropertyDetails: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const [showAllImages, setShowAllImages] = useState(false);
    const [sliderActive, setSliderActive] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
    const [propertyImages, setPropertyImages] = useState<string[]>([]);
    const [property, setProperty] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fallbackImage = '/images/property1.jpeg';

    const getValidImageUrl = (url: string | undefined) =>
        url && url.startsWith('https') ? url : fallbackImage;

    useEffect(() => {
        if (id) {
            const fetchPropertyDetails = async () => {
                try {
                    const response = await fetch(`${API_URL}/properties/${id}`);
                    const data = await response.json();

                    if (response.ok) {
                        setProperty(data.property);
                        setPropertyImages(data.property.propertyImages || []);
                    } else {
                        throw new Error(data.message || 'Failed to fetch property details');
                    }
                } catch (error: any) {
                    setError(error.message);
                } finally {
                    setLoading(false);
                }
            };
            fetchPropertyDetails();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleImageClick = (index: number) => {
        setSelectedImageIndex(index);
        setSliderActive(true);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <header className="container mt-4 rounded-md sm:rounded-xl">
                <div className="relative grid grid-cols-3 gap-2 h-[60vh]">
                    <div className="col-span-2 relative rounded-md sm:rounded-xl overflow-hidden shadow-lg">
                        <Image
                            fill
                            className="object-cover rounded-md sm:rounded-xl hover:opacity-95 transition-opacity"
                            src={getValidImageUrl(propertyImages[0])}
                            alt="Main Property Image"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                            onClick={() => handleImageClick(0)}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        {propertyImages.slice(1, 3).map((image, index) => (
                            <div
                                key={index}
                                className="relative rounded-md sm:rounded-xl overflow-hidden h-1/2 shadow-lg"
                                onClick={() => handleImageClick(index + 1)}
                            >
                                <Image
                                    fill
                                    className="object-cover rounded-md sm:rounded-xl hover:opacity-95 transition-opacity"
                                    src={getValidImageUrl(image)}
                                    alt={`Property Image ${index + 2}`}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </header>

            {sliderActive && selectedImageIndex !== null && (
                <Slider images={propertyImages} initialIndex={selectedImageIndex} />
            )}

            <main className="container relative z-10 mt-11 flex flex-col gap-4 md:flex-col lg:flex-row">
                <div className="w-full bg-white border border-gray-100 p-8 rounded-xl lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pr-10 shadow-sm">
                    <h2 className="text-xl text-gray-800 sm:text-3xl lg:text-4xl font-bold">
                        {property?.title}
                    </h2>
                    <div className="flex items-center text-gray-600 space-x-4">
                        <span><MapPin className="text-blue-500" width={22} height={24} /></span>
                        <span className="ml-1">{property?.address}</span>
                    </div>
                    <div className="flex items-center">
                        <span className="text-gray-500">
                            Posted by{" "}
                            <span className="text-gray-900 font-medium">{property?.owner?.firstName} {property?.owner?.lastName}</span>
                        </span>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Property Features</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="flex items-center space-x-3">
                                <BedDouble className="text-blue-600" width={24} height={24} />
                                <span className="font-medium text-gray-700">
                                    {property?.BHK === "Studio" ? "1 bed" : `${property?.BHK || 0} ${property?.BHK === 1 ? "bed" : "beds"}`}
                                </span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Bath className="text-blue-600" width={24} height={24} />
                                <span className="font-medium text-gray-700">
                                    {property?.BHK === "Studio" ? "1 bath" : `${property?.BHK || 0} ${property?.BHK === 1 ? "bath" : "baths"}`}
                                </span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Grid2X2 className="text-blue-600" width={24} height={24} />
                                <span className="font-medium text-gray-700">{property?.squareFeet} Sq. Feet</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Shield className="text-blue-600" width={24} height={24} />
                                <span className="font-medium text-gray-700">Gated Security</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800">Nearby Places</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {property?.nearbyPlaces?.map((places: string, index: number) =>
                                places.split(',').map((place: string, subIndex: number) => {
                                    let Icon;
                                    switch (place.trim()) {
                                        case 'School':
                                            Icon = <SchoolIcon className="text-blue-600" width={20} height={20} />;
                                            break;
                                        case 'Garden':
                                            Icon = <Trees className="text-blue-600" width={20} height={20} />;
                                            break;
                                        case 'Hospital':
                                            Icon = <HospitalIcon className="text-blue-600" width={20} height={20} />;
                                            break;
                                        case 'Park':
                                            Icon = <Shrub className="text-blue-600" width={20} height={20} />;
                                            break;
                                        default:
                                            Icon = <Shrub className="text-blue-600" width={20} height={20} />;
                                            break;
                                    }

                                    return (
                                        <div key={`${index}-${subIndex}`} className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
                                            {Icon}
                                            <span className="text-gray-700">{place}</span>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800">Description</h3>
                        <p className="text-gray-600 leading-relaxed">{property?.description}</p>
                    </div>
                </div>

                <div className="lg:w-2/5 xl:w-1/3">
                    <div className="sticky top-4 bg-white border border-gray-100 p-8 rounded-xl shadow-sm space-y-6">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Monthly Rent</span>
                            <span className="text-2xl font-bold text-gray-900">₹{property?.price}</span>
                        </div>

                        <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-blue-800 font-semibold">Security Deposit</span>
                                <span className="text-xl font-bold text-blue-800">₹{property?.price * 2}</span>
                            </div>
                            <p className="text-sm text-blue-600">Fully refundable upon vacating the property</p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between text-gray-600">
                                <span>Maintenance</span>
                                <span>₹887/month</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Agreement Charges</span>
                                <span>₹999</span>
                            </div>
                            <hr className="border-gray-200" />
                            <div className="flex justify-between font-semibold text-gray-800">
                                <span>Total Due Now</span>
                                <span>₹{(property?.price * 2) + 887 + 999}</span>
                            </div>
                        </div>

                        <button
                            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Book Now
                        </button>

                        <p className="text-center text-sm text-gray-500">
                            No hidden charges • Transparent pricing
                        </p>

                    </div>
                    <BookingModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        ownerData={property?.owner}
                    />
                </div>
            </main>
        </div>

    );
};

export default PropertyDetails;