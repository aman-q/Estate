"use client";
import React, { FC, useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "@/constants/env";

export interface BtnLikeIconProps {
  className?: string;
  colorClass?: string;
  isLiked?: boolean;
  propertyId: string; 
}
const BtnLikeIcon: FC<BtnLikeIconProps> = ({
  className = "",
  colorClass = "text-white bg-black bg-opacity-30 hover:bg-opacity-50",
  isLiked = false,
  propertyId,
}) => {
  const [likedState, setLikedState] = useState(isLiked);

  useEffect(() => {
  }, [propertyId]);

  const handleLikeToggle = async () => {
    const token = localStorage.getItem("token");

    if (!token || !propertyId) {
      console.error("No token or property ID found");
      return;
    }

    try {
      if (likedState) {
        await axios.post(
          `${API_URL}/auth/removefromwishlist?propertyId=${propertyId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        await axios.post(
          `${API_URL}/auth/addtowishlist?propertyId=${propertyId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      setLikedState(!likedState);
    } catch (error) {
      console.error("Error handling wishlist action", error);
    }
  };

  return (
    <div
      className={`nc-BtnLikeIcon w-8 h-8 flex items-center justify-center rounded-full cursor-pointer ${
        likedState ? "nc-BtnLikeIcon--liked" : ""
      }  ${colorClass} ${className}`}
      data-nc-id="BtnLikeIcon"
      title="Save"
      onClick={handleLikeToggle}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill={likedState ? "red" : "none"}
        viewBox="0 0 24 24"
        stroke="red"
      > 
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </div>
  );
};

export default BtnLikeIcon;
