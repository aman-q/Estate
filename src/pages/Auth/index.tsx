import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { API_URL } from '@/constants/env';
import axios from 'axios';


interface FormValues {
    email: string;
    password: string;
    rememberMe: boolean;
}
interface StyledInputProps {
    label: string;
    name: string;
    placeholder: string;
    type: string;
}

const StyledInput: React.FC<StyledInputProps> = ({ label, name, placeholder, type }) => (
    <div className="mb-4">
        <label htmlFor={name} className="block text-xs font-medium text-gray-400 uppercase">{label}</label>
        <Field
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            className="w-full px-3 py-2 border-b-2 bg-gray-100 placeholder-black text-black text-sm rounded-md focus:outline-none"
        />
        <ErrorMessage name={name} component="p" className="text-red-500 text-xs mt-1" />
    </div>
);

const signInPage: React.FC = () => {
    const [isForgotPassword, setIsForgotPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    const initialValues: FormValues = {
        email: '',
        password: '',
        rememberMe: false
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string()
          .email('Invalid email address')
          .required('Email is required'),
      
        password: Yup.string(),
      });
      
      


    const handleSubmit = async (values: FormValues, { setSubmitting, setErrors, setStatus }: any) => {
        setIsLoading(true);
        setStatus(null);
        if (isForgotPassword) {
            try {
                console.log('Sending reset code to:', values.email);
                console.log('API URL:', `${API_URL}/auth/forgot-password/send-otp`);

                const response = await axios.post(`${API_URL}/auth/forgot-password/send-otp`, {
                    userEmail: values.email,
                });

                console.log('Response:', response);

                if (response.status >= 200 && response.status < 300) {
                    console.log('Reset code sent successfully:', response.data);
                    setStatus({ success: 'Reset code sent successfully. Redirecting...' });
                    setTimeout(() => {
                        router.push({
                            pathname: '/Auth/AccountVerification',
                            query: { email: values.email, type: 'forgot-password' },
                        });
                    }, 2000);
                }
            } catch (error: any) {
                console.error('Error sending reset code:', error);
                setStatus({ error: error.response?.data?.message || 'Error sending reset code. Please try again.' });
            }
        } else {
            try {
                const response = await axios.post(`${API_URL}/auth/login`, {
                    userEmail: values.email,
                    password: values.password,
                });

                if (response.status === 200) {
                    console.log('Login successful:', response.data);
                    localStorage.setItem('token', response.data.token);
                    router.push('/property-result/index');
                }
            } catch (error: any) {
                console.error('Error during login:', error);
                setStatus({ error: error.response?.data?.message || 'Error during login. Please try again.' });
            }
        }
        setIsLoading(false);
        setSubmitting(false);
    };

    return (
        <div className="flex flex-col md:flex-row h-screen font-sans">
            {/* Left side */}
            <div className="w-full md:w-1/2 bg-gradient-to-r from-gray-500 to-gray-100 flex flex-col justify-center p-6 md:p-12">
                <div className="flex-grow"></div>
                <div className="bg-white bg-opacity-80 px-10 py-5 md:p-6 rounded-lg shadow-md text-center mb-4">
                    <h2 className="text-5xl md:text-5xl font-normal leading-10">RELAX AND TRUST <br /> US FOR <span className='font-bold'>PROPERTY</span></h2>
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
                                <h2 className="text-4xl font-medium mb-2">{isForgotPassword ? "Forgot Password" : "Sign In"}</h2>
                                <p className="text-gray-400 text-xs mb-6">
                                    {isForgotPassword ? "No worries! Enter your email to receive a reset code." : "Hey! Happy to see you again..."}
                                </p>
                            </div>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ isSubmitting, status }) => (
                                    <Form className='px-6'>
                                        {status && status.error && (
                                            <div className="mb-4 text-red-500 text-sm">{status.error}</div>
                                        )}
                                        {status && status.success && (
                                            <div className="mb-4 text-green-500 text-sm">{status.success}</div>
                                        )}

                                        <StyledInput
                                            label="EMAIL"
                                            name="email"
                                            placeholder="Enter Your Email"
                                            type="email"
                                        />

                                        {!isForgotPassword && (
                                            <StyledInput
                                                label="PASSWORD"
                                                name="password"
                                                placeholder="Enter Your Password"
                                                type="password"
                                            />
                                        )}

                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-2 sm:space-y-0">
                                            {!isForgotPassword && (
                                                <div className="flex items-center">
                                                    <Field
                                                        type="checkbox"
                                                        id="rememberMe"
                                                        name="rememberMe"
                                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                    />
                                                    <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">Remember me</label>
                                                </div>
                                            )}
                                            <button
                                                type="button"
                                                className="text-sm text-blue-600 hover:underline"
                                                onClick={() => setIsForgotPassword(!isForgotPassword)}
                                            >
                                                {isForgotPassword ? "Back to Sign In" : "Forgot Password?"}
                                            </button>
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                            disabled={isSubmitting || isLoading}
                                        >
                                            {isLoading ? 'Processing...' : (isForgotPassword ? "Send Reset Code" : "Sign In")}
                                        </button>
                                    </Form>
                                )}
                            </Formik>

                            {!isForgotPassword && (
                                <p className="mt-4 text-center text-sm text-gray-600">
                                    Don't Have an Account? <Link href="/Auth/SignUp" className="font-medium text-blue-600 hover:underline">Sign Up</Link>
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default signInPage;