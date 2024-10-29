import React, { useState } from 'react';
import { Trash } from 'lucide-react';

type Step2Props = {
  onNext: (data: { images: File[] }) => void; // Move to the next step
  onPrevious: () => void; // Move to the previous step
  initialData: { images: File[] }; // Initial data from parent component
};

const Step2: React.FC<Step2Props> = ({ onNext, onPrevious, initialData }) => {
  const [images, setImages] = useState<File[]>(initialData?.images || []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files); // Get selected files
      setImages((prevImages) => [...prevImages, ...newImages]); // Add them to the current state
    }
  };

  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleViewImage = (image: File) => {
    const imageUrl = URL.createObjectURL(image);
    window.open(imageUrl, '_blank'); // Open image in a new tab
  };

  const handleNext = () => {
    onNext({ images });
  };

  return (
    <div className="w-[70%] p-4">
      <h2>Upload Image</h2>
      <div className="sm:col-span-2">
        <label htmlFor="image-upload" className="block mb-2 text-sm font-medium text-gray-900 ">
          Upload Images
        </label>
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100 "
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-600 dark:text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
              aria-hidden="true"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            multiple
            onChange={handleImageUpload} // Handle file upload
          />
        </label>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={URL.createObjectURL(image)}
              alt={`preview-${index}`}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-0 right-0 text-white bg-red-600 rounded-full w-6 h-6 flex items-center justify-center"
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      {images.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-600 ">Uploaded Files</h3>
          <ul className="mt-2">
            {images.map((image, index) => (
              <li
                key={index}
                className="flex items-center justify-between mb-2 rounded-lg p-2 "
              >
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600">{image.name}</span>
                  <button
                    onClick={() => handleViewImage(image)}
                    className="p-1 text-blue-500 hover:underline"
                  >
                    View
                  </button>
                </div>

                {/* Centered Image Size */}
                <span className="text-gray-500 text-sm">
                  {(image.size / 1024).toFixed(2)} KB
                </span>

                {/* Delete Button */}
                <Trash
                  className="text-red-500 cursor-pointer"
                  onClick={() => removeImage(index)}
                />
              </li>
            ))}
          </ul>
        </div>
      )}


      {/* <div className="flex justify-between mt-4">
        <button className="p-2 bg-gray-500 text-white" onClick={onPrevious}>
          Back
        </button>
        <button className="p-2 bg-blue-500 text-white" onClick={onNext} disabled={images.length === 0}>
          Next
        </button>
      </div> */}

      <div className='flex items-center gap-2 justify-center'>
        <button
          className="mt-4 p-2 px-8 bg-gray-600 hover:bg-gray-700 text-white rounded-3xl"
          onClick={onPrevious}
        >
          Previous
        </button>
        <button
          className="mt-4 p-2 px-8 bg-blue-500 hover:bg-blue-600 text-white rounded-3xl"
          onClick={handleNext}
        // disabled={images.length === 0}
        >
          Next Step
        </button>
      </div>
    </div>
  );
};

export default Step2;
