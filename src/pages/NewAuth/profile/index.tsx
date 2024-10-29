import React, { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import { FaEdit, FaHeart } from 'react-icons/fa';
import Profile from './Profile';
import ChangePassword from './ChangePassword';
import PropertyCardH from '@/components/propertyResult/PropertyCard';
import Header from '@/components/Header';
import axios from 'axios';
import { API_URL } from '@/constants/env';

const ProfileTabs: React.FC = () => {
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState<any>(null);
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [upcomingBookings, setUpcomingBookings] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    // Fetch user details
    axios.get(`${API_URL}/auth/detail`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => setUserDetails(response.data))
      .catch(error => console.error(error));

    // Fetch wishlist
    axios.get(`${API_URL}/auth/getwishlist`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => setWishlist(response.data.wishlist))
      .catch(error => console.error(error));

    // Fetch User Property 
    axios.get(`${API_URL}/properties/user/allproperty`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => setUpcomingBookings(response.data.properties))
      .catch(error => console.error(error));
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePhoto(file);
      setPreview(URL.createObjectURL(file)); // Preview the selected image
    }
  };

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className="flex flex-col items-center min-h-screen bg-gray-100">
        <div className="w-full bg-gradient-to-r from-blue-400 to-purple-500 h-2/5 flex justify-center items-center relative">
          <div className="relative">
            {preview ? (
              <img src={preview} alt="Profile Preview" className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg" />
            ) : (
              <img src={userDetails.profilePhoto} alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg" />
            )}
            <label
              htmlFor="profilePhotoUpload"
              className="absolute bottom-0 right-0 bg-white p-2 rounded-full cursor-pointer border border-gray-300 shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 4a4 4 0 00-4 4v4a4 4 0 004 4h4a4 4 0 004-4V8a4 4 0 00-4-4H8zm5.707 1.293A1 1 0 0114 6h2a1 1 0 110 2h-2a1 1 0 010-2zM8 10a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
            </label>
            <input
              type="file"
              id="profilePhotoUpload"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>
        </div>
        <div className="text-center mt-4">
          <p className="text-lg font-semibold text-gray-700">{userDetails.email}</p>
          <p className="text-2xl font-bold text-gray-900">{`${userDetails.firstName} ${userDetails.lastName}`}</p>
        </div>

        <Tab.Group className="flex flex-col w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mt-8">
          <Tab.List className="flex w-full items-center justify-center m-auto space-x-1 rounded-xl bg-white p-1 shadow-md">
            <Tab
              className={({ selected }) =>
                `w-full py-2.5 text-sm font-medium leading-5 text-gray-700 rounded-lg ${selected ? 'bg-blue-500 text-white shadow' : 'hover:bg-gray-200'}`
              }
            >
              Wishlist
            </Tab>
            {/* Conditionally render My Property tab only if there are upcoming bookings */}
            {upcomingBookings.length > 0 && (
              <Tab
                className={({ selected }) =>
                  `w-full py-2.5 text-sm font-medium leading-5 text-gray-700 rounded-lg ${selected ? 'bg-blue-500 text-white shadow' : 'hover:bg-gray-200'}`
                }
              >
                My Property
              </Tab>
            )}
            <Tab
              className={({ selected }) =>
                `w-full py-2.5 text-sm font-medium leading-5 text-gray-700 rounded-lg ${selected ? 'bg-blue-500 text-white shadow' : 'hover:bg-gray-200'}`
              }
            >
              Edit Profile
            </Tab>
            <Tab
              className={({ selected }) =>
                `w-full py-2.5 text-sm font-medium leading-5 text-gray-700 rounded-lg ${selected ? 'bg-blue-500 text-white shadow' : 'hover:bg-gray-200'}`
              }
            >
              Change Password
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <div className="p-4">
                {wishlist.length > 0 ? (
                  wishlist.map((property) => (
                    <div key={property._id} className="mb-4">
                      <PropertyCardH property={property} />
                    </div>
                  ))
                ) : (
                  <div className="text-center">
                    <FaHeart className="text-5xl text-gray-400 mb-4" />
                    <p className="text-lg text-gray-500">No properties in your wishlist. Start adding your favorite properties!</p>
                  </div>
                )}
              </div>
            </Tab.Panel>
            {/* Render My Property panel only if there are upcoming bookings */}
            {upcomingBookings.length > 0 && (
              <Tab.Panel>
                <div className="p-4">
                  {upcomingBookings.length > 0 ? (
                    upcomingBookings.map((booking) => (
                      <div key={booking._id} className="mb-4">
                        {/* Customize the booking card as needed */}
                        <div key={booking._id} className="mb-4">
                      <PropertyCardH property={booking} />
                    </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center">
                      <FaHeart className="text-5xl text-gray-400 mb-4" />
                      <p className="text-lg text-gray-500">No upcoming bookings. Start booking your favorite properties!</p>
                    </div>
                  )}
                </div>
              </Tab.Panel>
            )}
            <Tab.Panel>
              <Profile profilePhoto={profilePhoto} />
            </Tab.Panel>
            <Tab.Panel>
              <ChangePassword />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  );
};

export default ProfileTabs;
