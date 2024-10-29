import React from "react";
import { Property } from "@/store/types";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  details: Property;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, details }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-black">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div>
          <div className="flex items-center gap-4 mb-2 content-between bg-gray-200 rounded-lg p-2">
            <div>
              {details.owner?.profilePhoto && (
                <img
                  src={details.owner?.profilePhoto}
                  alt="Owner"
                  className="w-16 h-16 rounded-full m-2 border-2 border-gray-500"
                />
              )}
            </div>
            <div>
              <div className="flex border-b-4 border-gray-300 rounded-lg p-2">
                <div className="w-1/3">
                  <strong>Owner </strong>
                </div>
                <div className="">
                  {details.owner?.firstName} {details.owner?.lastName}
                </div>
              </div>
              <div className="flex border-b-4 border-gray-300 rounded-lg pr-8 py-2 pl-2">
                <div className="w-1/3">
                  <strong>Email </strong>
                </div>
                <div className="w-1/2">{details.owner?.userEmail}</div>
              </div>
            </div>
          </div>
          <table className="w-full text-left border-collapse table-auto rounded-lg">
            <tbody>
              <tr>
                <td className="border px-4 py-2 font-bold">Property Title </td>
                <td className="border px-4 py-2">{title}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-bold">Property Type </td>
                <td className="border px-4 py-2">{details.propertyType}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-bold">BHK </td>
                <td className="border px-4 py-2">{details.BHK}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-bold">Furnishing </td>
                <td className="border px-4 py-2">{details.furnishing}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-bold">Address </td>
                <td className="border px-4 py-2">{details.address}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-bold">Nearby Places </td>
                <td className="border px-4 py-2">
                  {details.nearbyPlaces?.join(", ")}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-bold">Amenities </td>
                <td className="border px-4 py-2">
                  {details.amenities?.join(", ")}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-bold">Type </td>
                <td className="border px-4 py-2">{details.type}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-bold">Square Feet </td>
                <td className="border px-4 py-2">{details.squareFeet}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-bold">Rent </td>
                <td className="border px-4 py-2">{details.rent}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-bold">Deposit </td>
                <td className="border px-4 py-2">{details.deposit}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-bold">Price </td>
                <td className="border px-4 py-2">{details.price}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-bold">Description </td>
                <td className="border px-4 py-2">{details.description}</td>
              </tr>
            </tbody>
          </table> 
        </div>
        <button
          onClick={onClose}
          className="mt-4 py-2 px-4 bg-blue-500 text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
