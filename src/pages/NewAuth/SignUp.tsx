import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import { API_URL } from '@/constants/env';

interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

interface Errors {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    submit?: string;
}

const SignUp: React.FC = () => {
    const router = useRouter();

    const [formValues, setFormValues] = useState<FormValues>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState<Errors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Validation function
    const validate = (): Errors => {
        const errors: Errors = {};

        if (!formValues.firstName) errors.firstName = 'First name is required';
        if (!formValues.lastName) errors.lastName = 'Last name is required';
        if (!formValues.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
            errors.email = 'Invalid email address';
        }
        if (!formValues.password) {
            errors.password = 'Password is required';
        } else if (formValues.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }

        return errors;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            setIsSubmitting(true);
            try {
                const response = await axios.post(`${API_URL}/auth/register`, {
                    firstName: formValues.firstName,
                    lastName: formValues.lastName,
                    userEmail: formValues.email,
                    password: formValues.password,
                });

                if (response.status >= 200 && response.status < 300) {
                    router.push({
                        pathname: '/NewAuth/AccountVerification',
                        query: { email: formValues.email, type: 'verify-email' },
                    });
                }
            } catch (error: any) {
                console.error('Error during registration:', error.response?.data?.message || error.message);
                setErrors({ submit: error.response?.data?.message || 'An error occurred during registration. Please try again.' });
            }
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    return (
        <div className=" flex flex-col md:flex-row h-full font-sans">
            {/* Left side with background image */}
            <div
                className="w-full md:w-1/2 bg-gradient-to-r from-gray-500 to-gray-100 flex flex-col justify-center p-6 md:p-12 relative"
                style={{
                    backgroundImage: 'url(https://justhomnextjs.vercel.app/images/section/luxury-home-1.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',

                }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-500 to-gray-100 opacity-50"></div>
                <div className="flex items-center gap-4 justify-center md:justify-start z-10 ">
                    <div className="w-10 h-10 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-2xl text-gray-50  font-semibold">Za Foundation</span>
                </div>
                <div className="flex-grow"></div>
                <div className="bg-white bg-opacity-80 px-10 py-5 md:p-6 rounded-lg shadow-md text-center mb-4 z-10">
                    <h2 className="text-5xl md:text-5xl text-gray-600 font-normal leading-10">
                        RELAX AND TRUST <br /> US FOR <span className="font-bold">PROPERTY</span>
                    </h2>
                </div>
            </div>

            {/* Right side form */}
            <div className="w-full md:w-1/2 bg-white p-6 md:p-12 flex flex-col">


                <div className="flex-grow flex items-center justify-center">
                    <div className="w-full max-w-md">
                        <div className="bg-gray-100 p-6 md:p-8 rounded-2xl">
                            <div className="px-6">
                                <h2 className="text-4xl text-gray-600 font-medium mb-2">Sign Up</h2>
                                <p className="text-gray-400 text-xs mb-6">
                                    Start your journey with affordable price
                                </p>
                            </div>
                            <form onSubmit={handleSubmit} className="px-6">
                                <div className="mb-4">
                                    <label htmlFor="firstName" className="block text-xs font-medium text-gray-400 uppercase">
                                        FIRST NAME
                                    </label>
                                    <input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        placeholder="Enter here..."
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                                        value={formValues.firstName}
                                        onChange={handleChange}
                                    />
                                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="lastName" className="block text-xs font-medium text-gray-400 uppercase">
                                        LAST NAME
                                    </label>
                                    <input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        placeholder="Enter here..."
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                                        value={formValues.lastName}
                                        onChange={handleChange}
                                    />
                                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-xs font-medium text-gray-400 uppercase">
                                        EMAIL
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="Enter Your Email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                                        value={formValues.email}
                                        onChange={handleChange}
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="password" className="block text-xs font-medium text-gray-400 uppercase">
                                        PASSWORD
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="Enter Your Password"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                                        value={formValues.password}
                                        onChange={handleChange}
                                    />
                                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                                </div>

                                {errors.submit && <p className="text-red-500 text-xs mt-1">{errors.submit}</p>}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-buttonColor hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                                </button>
                            </form>

                            <p className="mt-4 text-center text-sm text-gray-600">
                                Already Have an Account?{' '}
                                <Link href="/NewAuth/SignIn" className="font-medium text-blue-600 hover:underline">
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

export default SignUp;
