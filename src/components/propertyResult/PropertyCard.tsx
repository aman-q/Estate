import React from "react";
import GallerySlider from "@/components/GallerySlider";
import BtnLikeIcon from "./BtnLikeIcon";

// Define the Property type
interface Property {
  propertyImages: string[];
  _id: string;
  price: number;
  rent: number;
  furnishing: string;
  BHK: string;
  type: string;
  address: string;
  squareFeet: number;
  title: string;
  inWishlist: boolean;
  deposit: number;
}

interface PropertyCardHProps {
  className?: string;
  property: Property;
}

const PropertyCardH: React.FC<PropertyCardHProps> = ({ className = "", property }) => {
  const {
    propertyImages,
    _id,
    price,
    rent,
    furnishing,
    BHK,
    type,
    address,
    squareFeet,
    title,
    inWishlist,
    deposit,
  } = property;
  
  const isLoggedIn = typeof window !== "undefined" && localStorage.getItem("token");

  const renderSliderGallery = () => (
    <GallerySlider
      ratioClass="aspect-w-1 aspect-h-1"
      galleryImgs={propertyImages}
      className="w-full h-full rounded-xl overflow-hidden"
      uniqueID={`PropertyCardH_${_id}`}
    />
  );

  return (
    <div className={`group relative w-full bg-white hover:bg-gray-50 transition-all duration-300 rounded-xl border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-md ${className}`}>
      {/* Like Button - Positioned at top right */}
      {isLoggedIn && (
        <BtnLikeIcon
          propertyId={_id}
          isLiked={inWishlist}
          colorClass="bg-gray-50 hover:bg-gray-100 text-gray-600"
          className="absolute right-4 top-4 z-10"
        />
      )}  
      <div className="flex flex-col sm:flex-row p-6 gap-6">
        {/* Image Section */}
        <div className="flex-shrink-0 w-full sm:w-80 h-52 sm:h-full relative">
          {renderSliderGallery()}
        </div>

        {/* Content Section */}
        <a href={`/property-result/${_id}`} className="flex-1">
          <div className="flex flex-col h-full justify-between">
            {/* Header Section */}
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                  {title || "Fully Furnished Smart Studio Apartment"}
                </h2>
                <div className="flex items-center mt-2 text-gray-500">
                  <svg
                    className="w-4 h-4 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="ml-2 text-sm font-medium">{address}</span>
                </div>
              </div>
              {/* Tags Section */}
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 text-xs font-medium bg-indigo-50 text-indigo-600 rounded-full">
                  {BHK} BHK
                </span>
                <span className="px-3 py-1 text-xs font-medium bg-emerald-50 text-emerald-600 rounded-full">
                  {furnishing}
                </span>
                <span className="px-3 py-1 text-xs font-medium bg-amber-50 text-amber-600 rounded-full">
                  {type}
                </span>
              </div>

              {/* Details Section with Prominent Deposit */}
              <div className="flex flex-col gap-4">
                {/* Deposit Section */}
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-blue-600">Security Deposit</span>
                    <div className="flex items-baseline">
                      <span className="text-2xl font-bold text-blue-700">₹{deposit}</span>
                      <span className="ml-1 text-sm text-blue-500">(Refundable)</span>
                    </div>
                  </div>
                </div>

                {/* Price and Area Info */}
                <div className="flex items-center justify-between">
                  {/* Area Information */}
                  <div className="flex items-center text-gray-500">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                      />
                    </svg>
                    <span className="ml-2 text-sm font-medium">{squareFeet} sq.ft</span>
                  </div>
                  
                  {/* Monthly Rent */}
                  <div className="text-right">
                    <div className="text-sm text-gray-500 mb-1">Monthly Rent</div>
                    <div className="flex items-baseline">
                      <span className="text-lg font-semibold text-gray-700">₹{price || rent}</span>
                      <span className="ml-1 text-sm text-gray-500">/month</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default PropertyCardH;
