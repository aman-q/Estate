import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { API_URL } from '@/constants/env';
import axios from 'axios';

interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const StyledInput: React.FC<{ label: string; name: string; type: string; placeholder: string }> = ({ label, name, type, placeholder }) => (
    <div className="mb-4">
        <label htmlFor={name} className="block text-xs font-medium text-gray-400 uppercase">{label}</label>
        <Field
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            className="w-full px-1 py-2 border-b-2 bg-gray-100 placeholder-black text-black text-sm rounded-md focus:outline-none"
        />
        <ErrorMessage name={name} component="p" className="text-red-500 text-xs mt-1" />
    </div>
);

const signUpPage: React.FC = () => {
    const router = useRouter();

    const initialValues: FormValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    };

    const validationSchema = Yup.object({
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    });

    const handleSubmit = async (values: FormValues, { setSubmitting, setErrors }: any) => {
        try {
            const response = await axios.post(`${API_URL}/auth/register`, {
                firstName: values.firstName,
                lastName: values.lastName,
                userEmail: values.email,
                password: values.password,
            });
            console.log(response.status)
            if (response.status >= 200 && response.status < 300) {
                console.log('Registration successful:', response.data);
                router.push({
                    pathname: '/Auth/AccountVerification',
                    query: { email: values.email, type: 'verify-email' },
                });
            }
        } catch (error: any) {
            console.error('Error during registration:', error.response?.data?.message || error.message);
            setErrors({ submit: error.response?.data?.message || 'An error occurred during registration. Please try again.' });
        }
        setSubmitting(false);
    };

    return (
        <div className="flex flex-col md:flex-row h-screen font-sans">
            {/* Left side */}
            <div className="w-full md:w-1/2 bg-gradient-to-r from-gray-500 to-gray-100 flex flex-col justify-center p-6 md:p-12">
                <div className="flex-grow"></div>
                <div className="bg-white bg-opacity-80 px-10 py-5 md:p-6 rounded-lg shadow-md text-center mb-4">
                    <h2 className="text-5xl md:text-5xl font-normal leading-10">
                        RELAX AND TRUST <br /> US FOR <span className="font-bold">PROPERTY</span>
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
                                <h2 className="text-4xl font-medium mb-2">Sign Up</h2>
                                <p className="text-gray-400 text-xs mb-6">
                                    Start your journey with affordable price
                                </p>
                            </div>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ isSubmitting }) => (
                                    <Form className="px-6">
                                        <StyledInput label="FIRST NAME" name="firstName" type="text" placeholder="Enter here..." />
                                        <StyledInput label="LAST NAME" name="lastName" type="text" placeholder="Enter here..." />
                                        <StyledInput label="EMAIL" name="email" type="email" placeholder="Enter Your Email" />
                                        <StyledInput label="PASSWORD" name="password" type="password" placeholder="Enter Your Password" />
                                        <ErrorMessage name="submit" component="p" className="text-red-500 text-xs mt-1" />
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-buttonColor hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        >
                                            {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                                        </button>
                                    </Form>
                                )}
                            </Formik>

                            <p className="mt-4 text-center text-sm text-gray-600">
                                Already Have an Account?{' '}
                                <Link href="/Auth/SignIn" className="font-medium text-blue-600 hover:underline">
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default signUpPage;