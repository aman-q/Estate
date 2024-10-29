import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "@/constants/env";
import { useRouter } from 'next/router';

const ChangePassword: React.FC = () => {
    const router = useRouter();

    const [formValues, setFormValues] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [status, setStatus] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    const validateForm = () => {
        const { currentPassword, newPassword, confirmPassword } = formValues;
        let formIsValid = true;
        let newErrors = { currentPassword: "", newPassword: "", confirmPassword: "" };

        if (!currentPassword) {
            newErrors.currentPassword = "Current password is required";
            formIsValid = false;
        }

        if (!newPassword) {
            newErrors.newPassword = "New password is required";
            formIsValid = false;
        } else if (newPassword.length < 6) {
            newErrors.newPassword = "Password must be at least 6 characters";
            formIsValid = false;
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = "Confirm password is required";
            formIsValid = false;
        } else if (confirmPassword !== newPassword) {
            newErrors.confirmPassword = "Passwords must match";
            formIsValid = false;
        }

        setErrors(newErrors);
        return formIsValid;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return;

        const token = localStorage.getItem("token");
        if (!token) {
            setStatus("No token found, authorization denied");
            return;
        }

        setIsSubmitting(true);
        setStatus(null);

        try {
            const response = await axios.post(
                `${API_URL}/auth/change-password`,
                {
                    currentPassword: formValues.currentPassword,
                    newPassword: formValues.newPassword,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setStatus("Password changed successfully");
            router.push({
                pathname: '/'
            });
        } catch (error: any) {
            setStatus(error.response?.data?.message || "Error changing password");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col md:flex-row h-screen font-sans">
            {/* Left side */}
            <div className="w-full md:w-1/2 bg-gradient-to-r from-gray-500 to-gray-100 flex flex-col justify-center p-6 md:p-12">
                <div className="flex-grow"></div>
                <div className="bg-white bg-opacity-80 px-10 py-5 md:p-6 rounded-lg shadow-md text-center mb-4">
                    <h2 className="text-5xl md:text-5xl font-normal leading-10">
                        RELAX AND TRUST <br /> US FOR{" "}
                        <span className="font-bold">PROPERTY</span>
                    </h2>
                </div>
            </div>

            {/* Right side */}
            <div className="w-full md:w-1/2 bg-white p-6 md:p-12 flex flex-col">
                <div className="mb-8">
                    <div className="flex items-center gap-4 justify-center md:justify-start">
                        <div className="w-10 h-10 bg-blue-500 rounded-full mr-2"></div>
                        <span className="text-2xl font-semibold">App Name</span>
                    </div>
                </div>

                <div className="flex-grow flex items-center justify-center">
                    <div className="w-full max-w-md">
                        <div className="bg-gray-100 p-6 md:p-8 rounded-2xl">
                            <div className="px-6">
                                <h2 className="text-4xl font-medium mb-2">
                                    Change Password
                                </h2>
                                <p className="text-gray-400 text-sm mb-6">
                                    Please enter your current password and new password.
                                </p>
                            </div>
                            <form className="px-6" onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-xs font-medium text-gray-400 uppercase">
                                        CURRENT PASSWORD
                                    </label>
                                    <input
                                        name="currentPassword"
                                        type="password"
                                        placeholder="Enter Your Current Password"
                                        className="w-full px-1 py-2 border-b-2 bg-gray-100 placeholder-black text-black text-sm rounded-md focus:outline-none"
                                        value={formValues.currentPassword}
                                        onChange={handleInputChange}
                                    />
                                    {errors.currentPassword && <p className="text-red-500 text-xs mt-1">{errors.currentPassword}</p>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-xs font-medium text-gray-400 uppercase">
                                        NEW PASSWORD
                                    </label>
                                    <input
                                        name="newPassword"
                                        type="password"
                                        placeholder="Enter Your New Password"
                                        className="w-full px-1 py-2 border-b-2 bg-gray-100 placeholder-black text-black text-sm rounded-md focus:outline-none"
                                        value={formValues.newPassword}
                                        onChange={handleInputChange}
                                    />
                                    {errors.newPassword && <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-xs font-medium text-gray-400 uppercase">
                                        CONFIRM NEW PASSWORD
                                    </label>
                                    <input
                                        name="confirmPassword"
                                        type="password"
                                        placeholder="Confirm Your New Password"
                                        className="w-full px-1 py-2 border-b-2 bg-gray-100 placeholder-black text-black text-sm rounded-md focus:outline-none"
                                        value={formValues.confirmPassword}
                                        onChange={handleInputChange}
                                    />
                                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                                </div>
                                {status && <p className="text-center text-sm mb-4">{status}</p>}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-buttonColor hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    {isSubmitting ? "Changing..." : "Change Password"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
