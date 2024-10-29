import React from 'react';
import { useRouter } from 'next/router';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface FormValues {
    email: string;
}

const forgotPassword: React.FC = () => {
    const router = useRouter();

    const initialValues: FormValues = {
        email: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
    });

    const handleSubmit = async (values: FormValues, { setSubmitting, setErrors }: any) => {
        try {
            // TODO: Implement API call to send reset password email
            console.log('Sending reset password email to:', values.email);

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Redirect to AccountVerification page
            router.push(`/AccountVerification?email=${encodeURIComponent(values.email)}&type=forgot-password`);
        } catch (error) {
            console.error('Error sending reset password email:', error);
            setErrors({ submit: 'Failed to send reset password email. Please try again.' });
        }
        setSubmitting(false);
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <Field
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        <ErrorMessage name="submit" component="div" className="text-red-500 text-sm mb-4" />
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            {isSubmitting ? 'Sending...' : 'Reset Password'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default forgotPassword;