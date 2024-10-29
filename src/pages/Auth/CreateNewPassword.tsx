import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { API_URL } from "@/constants/env";
import { useRouter } from 'next/router';


interface FormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const StyledInput: React.FC<{
  label: string;
  name: string;
  type: string;
  placeholder: string;
}> = ({ label, name, type, placeholder }) => (
  <div className="mb-4">
    <label
      htmlFor={name}
      className="block text-xs font-medium text-gray-400 uppercase"
    >
      {label}
    </label>
    <Field
      id={name}
      name={name}
      type={type}
      placeholder={placeholder}
      className="w-full px-1 py-2 border-b-2 bg-gray-100 placeholder-black text-black text-sm rounded-md focus:outline-none"
    />
    <ErrorMessage
      name={name}
      component="p"
      className="text-red-500 text-xs mt-1"
    />
  </div>
);

const ChangePassword: React.FC = () => {
  const router = useRouter();

  const initialValues: FormValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    currentPassword: Yup.string().required("Current password is required"),
    newPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleSubmit = async (values: FormValues, { setSubmitting, setStatus }: any) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setStatus("No token found, authorization denied");
      setSubmitting(false);
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/auth/change-password`,
        {
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
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
    } catch (error:any) {
      setStatus(error.response?.data?.message || "Error changing password");
    } finally {
      setSubmitting(false);
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
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, status }) => (
                  <Form className="px-6">
                    <StyledInput
                      label="CURRENT PASSWORD"
                      name="currentPassword"
                      type="password"
                      placeholder="Enter Your Current Password"
                    />
                    <StyledInput
                      label="NEW PASSWORD"
                      name="newPassword"
                      type="password"
                      placeholder="Enter Your New Password"
                    />
                    <StyledInput
                      label="CONFIRM NEW PASSWORD"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm Your New Password"
                    />
                    {status && <p className="text-center text-sm mb-4">{status}</p>}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-buttonColor hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      {isSubmitting ? "Changing..." : "Change Password"}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;