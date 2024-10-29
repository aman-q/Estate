import React from 'react';
import { X, Mail, Phone, User, Calendar, Clock, MessageSquare, ExternalLink, CheckCircle } from 'lucide-react';
import Image from 'next/image';

type OwnerData = {
  profilePhoto?: string;
  firstName: string;
  lastName: string;
  userEmail: string;
};

type BookingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  ownerData: OwnerData;
};

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, ownerData }) => {
  if (!isOpen) return null;

  const dummyPhone = "+91 98765 43210";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-gray-900/50 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
        {/* Header Section */}
        <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 py-8 px-12">
          <button
            onClick={onClose}
            className="absolute right-6 top-6 text-white/70 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>

          <div className="flex flex-col items-center space-y-4">
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden ring-4 ring-white/20 shadow-lg">
              {ownerData.profilePhoto ? (
                <Image
                  src={ownerData.profilePhoto}
                  alt={`${ownerData.firstName} ${ownerData.lastName}`}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-indigo-700">
                  <User size={32} className="text-white/90" />
                </div>
              )}
            </div>
            <div className="text-white text-center">
              <h3 className="text-2xl font-semibold tracking-tight">
                {ownerData.firstName} {ownerData.lastName}
              </h3>
              <div className="flex items-center justify-center mt-1 space-x-2">
                <p className="text-sm font-medium text-indigo-100">Verified Property Owner</p>
                <CheckCircle size={20} className="text-indigo-300" />
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center justify-center px-4 py-3 bg-indigo-50 rounded-2xl">
              <p className="text-sm font-medium text-indigo-600">Response Rate</p>
              <p className="mt-1 text-lg font-semibold text-indigo-900">98%</p>
            </div>
            <div className="flex flex-col items-center justify-center px-4 py-3 bg-indigo-50 rounded-2xl">
              <p className="text-sm font-medium text-indigo-600">Avg. Response</p>
              <p className="mt-1 text-lg font-semibold text-indigo-900">30 min</p>
            </div>
            <div className="flex flex-col items-center justify-center px-4 py-3 bg-indigo-50 rounded-2xl">
              <p className="text-sm font-medium text-indigo-600">Properties</p>
              <p className="mt-1 text-lg font-semibold text-indigo-900">12</p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-3">
            <div className="flex items-center p-4 bg-white border border-gray-200 rounded-2xl hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200 group cursor-pointer shadow-sm">
              <Mail className="text-indigo-500 group-hover:text-indigo-600" size={20} />
              <span className="ml-3 font-medium text-gray-700 group-hover:text-gray-900">
                {ownerData.userEmail}
              </span>
              <ExternalLink size={16} className="ml-auto text-indigo-500 group-hover:text-indigo-600" />
            </div>
            <div className="flex items-center p-4 bg-white border border-gray-200 rounded-2xl hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200 group cursor-pointer shadow-sm">
              <Phone className="text-indigo-500 group-hover:text-indigo-600" size={20} />
              <span className="ml-3 font-medium text-gray-700 group-hover:text-gray-900">
                {dummyPhone}
              </span>
              <ExternalLink size={16} className="ml-auto text-indigo-500 group-hover:text-indigo-600" />
            </div>
          </div>

          {/* Availability Card */}
          <div className="p-4 bg-teal-50 rounded-2xl">
            <div className="flex items-center">
              <Clock size={20} className="text-teal-500" />
              <span className="ml-2 font-medium text-teal-900">Available Today</span>
              <span className="ml-auto text-sm font-medium text-teal-700">
                9:00 AM - 9:00 PM
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          {/* Uncomment if needed */}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
