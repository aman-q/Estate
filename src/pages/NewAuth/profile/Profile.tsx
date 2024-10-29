// Profile.tsx
import React, { useState } from 'react';
import { API_URL } from '@/constants/env';

type ProfileProps = {
  profilePhoto: File | null; // Define the type for profilePhoto
};

const Profile: React.FC<ProfileProps> = ({ profilePhoto }) => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>(''); // Add lastName field

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('User not authenticated');
      return;
    }

    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName); // Include the last name
    if (profilePhoto) {
      formData.append('profilePhoto', profilePhoto);
    }

    try {
      const response = await fetch(`${API_URL}/auth/edit-profile`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const result = await response.json();
      console.log('Profile updated successfully', result);
      // Optionally, handle the result, like showing a success message
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="flex flex-col items-center w-full mt-6 px-6">
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className="w-full md:w-1/2 p-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block mb-4"
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName} // Input field for last name
        onChange={(e) => setLastName(e.target.value)}
        className="w-full md:w-1/2 p-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block mb-4"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition-colors"
      >
        Save
      </button>
    </div>
  );
};

export default Profile;
