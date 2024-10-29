import React, { useState } from "react";
import Modal from "@/components/Modal";
import { Property } from "@/store/types";

interface TableProps {
  columns: string[];
  data: Property[];
  onApprove: (id: string) => void;
}

const Table: React.FC<TableProps> = ({ columns, data, onApprove }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<any>(null);

  const handleInfoClick = (row: Property) => {
    setModalContent(row);
    setModalOpen(true);
  };
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full overflow-x-auto text-sm text-left text-gray-900 bg-white border border-gray-200">
        <thead className="text-md text-white uppercase bg-gray-900">
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="px-6 py-3">
                {column}
              </th>
            ))}
            <th>Info</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row: any, index) => (
            <tr key={index} className="bg-white border-b hover:bg-gray-100">
              <td className="px-6 py-4">{row.title}</td>
              <td className="px-6 py-4">{row.propertyType}</td>
              <td className="px-6 py-4">
                {row.owner.firstName + " " + row.owner.lastName}
              </td>
              <td className="px-6 py-4">
                {row.isAdminApproved ? "Yes" : "No"}
              </td>
              <td className="flex items-center px-6 py-4">
                <button
                  onClick={() => onApprove(row._id)}
                  disabled={row.isAdminApproved}
                  className={`py-1 px-4 rounded ${
                    row.isAdminApproved
                      ? "bg-green-500 text-white cursor-not-allowed"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {row.isAdminApproved ? "Approved" : "Approve"}
                </button>
              </td>
              <td>
                <button
                  onClick={() => handleInfoClick(row)}
                  className="ml-2 text-blue-500 hover:underline p-4"
                >
                  <img src="/info.png" alt="info" className="w-8" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title={modalContent?.title || ""}
        details={modalContent}
      />
    </div>
  );
};

export default Table;
