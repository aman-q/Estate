import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { API_URL } from '@/constants/env';

interface AccountVerificationProps {
    email: string;
    type: 'verify-email' | 'forgot-password';
}

const AccountVerification: React.FC<AccountVerificationProps> = ({ email, type }) => {
    const router = useRouter();
    const [otp, setOtp] = useState<string[]>(['', '', '', '']);
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!email || !type) {
            setError('Invalid verification type or email is missing.');
        }
    }, [email, type]);

    const handleChange = (index: number, value: string) => {
        if (value.match(/^[0-9]*$/) && value.length <= 1) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (value && index < otp.length - 1) {
                const nextInput = document.getElementById(`otp-${index + 1}`);
                if (nextInput) nextInput.focus();
            }
        }
    };

    const validateOtp = (): boolean => {
        const otpValue = otp.join('');
        if (otpValue.length < 4 || !otpValue.match(/^[0-9]{4}$/)) {
            setError('Please enter a valid 4-digit code.');
            return false;
        }
        setError('');
        return true;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateOtp()) return;

        setIsLoading(true);
        setError('');
        try {
            const otpCode = otp.join('');
            const endpoint = type === 'verify-email'
                ? `${API_URL}/auth/verify-email`
                : `${API_URL}/auth/forgot-password/verify-otp`;

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userEmail: email, otpCode }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('OTP verified successfully!');
                if (type === 'verify-email') {
                    router.push('/');
                } else {
                    router.push({ pathname: '/Auth/CreateNewPassword', query: { email } });
                }
            } else {
                throw new Error(data.message || 'Verification failed');
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            if (error instanceof Error) {
                if (error.message.toLowerCase().includes('expired')) {
                    setError('Your verification code has expired. Please request a new one.');
                } else {
                    setError(error.message || 'Verification failed. Please try again.');
                }
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const resendCode = async () => {
        setIsLoading(true);
        setError('');
        try {
            const endpoint = type === 'verify-email'
                ? `${API_URL}/auth/resend-verification-email`
                : `${API_URL}/auth/forgot-password/resend-otp`;

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userEmail: email }),
            });

            const data = await response.json();

            if (response.ok) {
                setOtp(['', '', '', '']);
                alert('A new verification code has been sent to your email.');
            } else {
                throw new Error(data.message || 'Failed to resend code');
            }
        } catch (error) {
            console.error('Error resending code:', error);
            if (error instanceof Error) {
                setError(error.message || 'Failed to resend code. Please try again.');
            } else {
                setError('An unexpected error occurred while resending the code. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col md:flex-row h-screen">
            {/* Left side */}
            <div className="w-full md:w-1/2 bg-gradient-to-r from-gray-500 to-gray-100 flex flex-col justify-center p-6 md:p-12">
                <div className="flex-grow"></div>
                <div className="bg-white bg-opacity-80 px-6 py-4 md:px-10 md:py-5 rounded-lg shadow-md text-center mb-4">
                    <h2 className="text-3xl md:text-5xl font-normal leading-tight">
                        RELAX AND TRUST <br /> US FOR <span className="font-bold">PROPERTY</span>
                    </h2>
                </div>
            </div>

            {/* Right side */}
            <div className="w-full md:w-1/2 bg-white p-4 md:p-8 flex flex-col">
                <div className="mb-8">
                    <div className="flex items-center gap-4 justify-center md:justify-start">
                        <div className="w-10 h-10 bg-blue-500 rounded-full mr-2"></div>
                        <span className="text-xl md:text-2xl font-semibold">App Name</span>
                    </div>
                </div>
                <div className="flex-grow flex items-center justify-center">
                    <div className="w-full max-w-md">
                        <div className="bg-gray-100 p-4 md:p-6 lg:p-8 rounded-2xl">
                            <div className="px-2 md:px-6">
                                <h2 className="text-3xl md:text-4xl font-medium mb-2">Verify Account</h2>
                                <p className="text-sm mb-2">Code has been sent to <span className="text-black font-semibold">{email}</span></p>
                                <p className="text-sm mb-6">Enter the code to {type === 'verify-email' ? 'verify your account' : 'reset your password'}:</p>
                            </div>
                            <form className="px-2 md:px-6" onSubmit={handleSubmit}>
                                <div className="flex gap-2 mb-4">
                                    {otp.map((value, index) => (
                                        <input
                                            key={index}
                                            id={`otp-${index}`}
                                            type="text"
                                            className="w-10 h-10 focus:outline-none md:w-12 md:h-12 bg-inputColor rounded-xl text-center text-xl"
                                            maxLength={1}
                                            value={value}
                                            onChange={(e) => handleChange(index, e.target.value)}
                                        />
                                    ))}
                                </div>

                                {error && (
                                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                                        <span className="block sm:inline">{error}</span>
                                    </div>
                                )}

                                <p className="text-xs md:text-sm text-gray-600 mb-2">
                                    Didn't receive code? <span className="text-blue-600 hover:underline cursor-pointer" onClick={resendCode}>Resend Code</span>
                                </p>

                                <button
                                    type="submit"
                                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Verifying...' : 'Verify Account'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountVerification;