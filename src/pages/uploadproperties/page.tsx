import "../../styles/globals.css";
import React, { useEffect, useState } from 'react';
import StepIndicator from './StepIndicator';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Header from '@/components/Header';
import { useRouter } from 'next/router';
import { NextPage } from "next";
import Swal from 'sweetalert2';

const UploadProperty: NextPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();
  const [formData, setFormData] = useState({
    propertyType: '',
    BHK: 0, 
    furnishing: '',
    address: '',
    nearbyPlaces: [] as string[],
    amenities: [] as string[],
    images: [] as File[],
    squareFeet: 0,
    price: 0,
    rent: 0,
    deposit: 0,
    type: '',
    description: '',
    title: '',
    location: {
      type: 'Point',
      coordinates: [0, 0],
    },
  });

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleNext = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({
      ...prev,
      ...data,
    }));
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('User not authenticated');
      return;
    }
    const propertyData = new FormData();

    // Append all formData fields except images and location
    Object.keys(formData).forEach((key) => {
      if (key !== 'images' && key !== 'location') {
        propertyData.append(key, (formData as any)[key]);
      }
    });

    // Append location as a JSON string (to handle nested object)
    propertyData.append('location', JSON.stringify(formData.location));

    // Append images
    formData.images.forEach((image) => {
      propertyData.append('propertyImages', image);
    });

    // Display the loading SweetAlert without a timer
    Swal.fire({
      title: "Hold Tight!!",
      html: "Submitting your data to our servers...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading(); // Show the loading indicator
      }
    });

    try {
      const response = await fetch(`${API_URL}/properties`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: propertyData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload property');
      }

      const result = await response.json();
      console.log('Property uploaded successfully', result);

      // Show success message after the response is received
      Swal.fire({
        title: "Congratulations!",
        text: "Your Property has been send for Verification !",
        icon: "success",
      }).then(() => {
        // Redirect after successful alert
        router.push('/property-result');
      });

    } catch (error) {
      console.error('Error uploading property:', error);

      // Show error message if the submission fails
      Swal.fire({
        title: "Error",
        text: "There was an error uploading your property.",
        icon: "error",
      });
    }
  };

  return (
    <>
      <Header />
      <div className="flex">
        <StepIndicator currentStep={currentStep} />
        {currentStep === 1 && (
          <Step1 onNext={(data) => handleNext(data)} initialData={formData} />
        )}
        {currentStep === 2 && (
          <Step2
            onNext={(data) => handleNext(data)}
            initialData={formData}
            onPrevious={handlePrevious}
          />
        )}
        {currentStep === 3 && (
          <Step3
            onPrevious={handlePrevious}
            onNext={(data) => handleNext(data)}
            initialData={formData}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </>
  );
};

export default UploadProperty;
