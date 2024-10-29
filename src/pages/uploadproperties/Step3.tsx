import React, { useState, useEffect } from 'react';
import { FiMapPin } from "react-icons/fi";

type Step3Props = {
  onPrevious: () => void;
  onSubmit: any; 
  onNext: (data: {
    title: string; 
    squareFeet: number;
    type: string;
    rent: number;
    deposit: number;
    price: number;
    description: string;
    location: any;
  }) => void;
  initialData: {
    title: string; 
    squareFeet: number;
    type: string;
    rent: number;
    deposit: number;
    price: number;
    description: string;
    location: any;
  };
};

const Step3: React.FC<Step3Props> = ({ onNext, onPrevious, initialData, onSubmit }) => {
  const [squareFeet, setSquareFeet] = useState(initialData?.squareFeet || 0);
  const [price, setPrice] = useState(initialData?.price || 0);
  const [rent, setRent] = useState(initialData?.rent || 0);
  const [deposit, setDeposit] = useState(initialData?.deposit || 0);
  const [type, setType] = useState(initialData?.type || ''); 
  const [description, setDescription] = useState(initialData?.description || '');
  const [longitude, setLongitude] = useState<number | ''>(initialData?.location?.coordinates[0] || '');
  const [latitude, setLatitude] = useState<number | ''>(initialData?.location?.coordinates[1] || '');
  const [title, setTitle] = useState(initialData?.title || '');

  const [showSubmit, setShowSubmit] = useState(false); // New state for showing the Submit button

  const location = {
    type: 'Point',
    coordinates: [longitude as number, latitude as number],
  };

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLongitude(position.coords.longitude);
          setLatitude(position.coords.latitude);
        },
        (error) => {
          console.error('Error fetching location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const handleNext = () => {
    const data = { title, squareFeet, type, rent, deposit, price, description, location };
    console.log('Submitting Step3 data:', data);
    onNext(data);
    setShowSubmit(true); // Show the Submit button after clicking Next
  };

  const handleSubmit = () => {
    handleNext();
    onSubmit();
  };

  return (
    <div className="w-[75%] p-8 bg-white rounded-lg shadow-lg">
      {/* Property Type */}
      <div className="mb-8 flex items-center gap-4 w-full">
        <h2 className="text-base font-semibold text-gray-700">Property Type:</h2>
        <div className="flex gap-3 w-full">
          {['Sales', 'Rental'].map((typeOption) => (
            <div
              key={typeOption}
              className={`p-2 px-8 border-2 text-base rounded-md cursor-pointer transition duration-300 ${
                type === typeOption
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
                  : 'border-gray-300 text-gray-500 hover:border-gray-400'
              }`}
              onClick={() => setType(typeOption)} 
            >
              {typeOption}
            </div>
          ))}
        </div>
      </div>

      {/* Deposit & Rent */}
      <div className="mb-8 flex gap-6 w-full">
        <div className="w-full">
          <h2 className="text-base font-semibold text-gray-700">Deposit:</h2>
          <input
            type="number"
            placeholder="Enter Deposit"
            value={deposit || ''}
            onChange={(e) => setDeposit(Number(e.target.value))}
            className="w-full p-3 mt-2 text-gray-600 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="w-full">
          <h2 className="text-base font-semibold text-gray-700">Rent:</h2>
          <input
            type="number"
            placeholder="Enter Rent"
            value={rent || ''}
            onChange={(e) => setRent(Number(e.target.value))}
            className="w-full p-3 mt-2 text-gray-600 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Square Feet & Price */}
      <div className="mb-8 flex gap-6 w-full">
        <div className="w-full">
          <h2 className="text-base font-semibold text-gray-700">Square Feet:</h2>
          <input
            type="number"
            placeholder="Enter Square Feet"
            value={squareFeet || ''}
            onChange={(e) => setSquareFeet(Number(e.target.value))}
            className="w-full p-3 mt-2 text-gray-600 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="w-full">
          <h2 className="text-base font-semibold text-gray-700">Price:</h2>
          <input
            type="number"
            placeholder="Enter Price"
            value={price || ''}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full p-3 mt-2 text-gray-600 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Location: Longitude & Latitude */}
      <div className="mb-8 w-full flex gap-4 items-end">
  <div className="w-full">
    <h2 className="text-sm font-medium text-gray-600">Longitude</h2>
    <input
      type="number"
      placeholder="Enter Longitude"
      value={longitude || ''}
      onChange={(e) => setLongitude(Number(e.target.value))}
      className="w-full mt-2 p-3 text-gray-700 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
    />
  </div>
  
  <div className="w-full">
    <h2 className="text-sm font-medium text-gray-600">Latitude</h2>
    <input
      type="number"
      placeholder="Enter Latitude"
      value={latitude || ''}
      onChange={(e) => setLatitude(Number(e.target.value))}
      className="w-full mt-2 p-3 text-gray-700 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
    />
  </div>

  <button
    className="p-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center justify-center"
    onClick={fetchLocation}
  >
    <FiMapPin />
  </button>
</div>


      {/* Description */}
      <div className="mb-8">
        <h2 className="text-base font-semibold text-gray-700">Description:</h2>
        <textarea
          className="w-full p-4 mt-2 text-gray-600 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)} 
        />
      </div>

      {/* Title */}
      <div className="mb-8">
        <h2 className="text-base font-semibold text-gray-700">Property Title:</h2>
        <input
          type="text"
          placeholder="Enter Property Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 mt-2 text-gray-600 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-center gap-6">
  <button
    className="mt-4 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-full transition duration-300"
    onClick={onPrevious}
  >
    Previous
  </button>

  {!showSubmit && ( // Hide Next button when showSubmit is true
    <button
      className={`mt-4 px-6 py-3 text-white rounded-full transition duration-300 ${
        squareFeet && price && description && type
          ? 'bg-blue-500 hover:bg-blue-600'
          : 'bg-gray-300 cursor-not-allowed'
      }`}
      onClick={handleNext}
      disabled={!squareFeet || !price || !description || !type}
    >
      Next
    </button>
  )}

  {showSubmit && ( // Show Submit button only when Next is clicked
    <button
      className="mt-4 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full transition duration-300"
      onClick={handleSubmit}
    >
      Submit
    </button>
  )}
</div>
    
    </div>
  );
};
export default Step3;
