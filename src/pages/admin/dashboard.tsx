import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@/components/Table";
import Card from "@/components/Card";
import { API_URL } from "@/constants/env";
import { Property } from "@/store/types";

interface DashboardData {
  pendingCount: number;
  approvedCount: number;
}

const AdminPanel: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const limit = 10;

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (!token) return; 

    const fetchProperties = async () => {
      try {
        const response = await axios.get(`${API_URL}/admin`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, 
          },
          params: {
            page: currentPage,
            limit: limit,
          },
        });

        if (response.data && Array.isArray(response.data.properties)) {
          setProperties(response.data.properties);
          setTotalPages(response.data.totalPages); // Set total pages from the response
        } else {
          console.error("Expected an array of properties.");
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [token, currentPage]);

  const approveProperty = async (id: string) => {
    try {
      const response = await axios.put(
        `${API_URL}/admin/${id}`,
        { isAdminApproved: true, isActive: true },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setProperties((prevProperties) =>
          prevProperties.map((property) =>
            property._id === id
              ? { ...property, isAdminApproved: true, isActive: true }
              : property
          )
        );
        fetchDashboardData(); // Fetch dashboard data after a successful approval
      } else {
        console.error("Failed to approve property");
      }
    } catch (error) {
      console.error("Error approving property:", error);
    }
  };

  const fetchDashboardData = async () => {
    if (!token) return; // Only fetch dashboard data if the token is available
    try {
      const response = await axios.get(`${API_URL}/admin/dashboard`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setDashboardData(response.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  useEffect(() => {
    fetchDashboardData(); 
  }, [token]);

  const columns = [
    "Title",
    "Property Type",
    "Owner",
    "Admin Approved",
    "Actions",
  ];

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6 bg-gray-100 select-none">
      <h1 className="text-3xl font-bold mb-6 text-black">Admin Panel</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {dashboardData && (
          <>
            <Card
              title="Pending Properties"
              content={String(dashboardData.pendingCount)}
            />
            <Card
              title="Approved Properties"
              content={String(dashboardData.approvedCount)}
            />
          </>
        )}
      </div>

      {properties.length > 0 ? (
        <>
          <Table
            columns={columns}
            data={properties}
            onApprove={approveProperty}
          />
          {/* Pagination Buttons */}
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={`mx-1 px-3 py-1 rounded ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-black"
                }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      ) : (
        <p>No properties found.</p>
      )}
    </div>
  );
};

export default AdminPanel;
