import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { API_URL } from '@/constants/env';
import { jwtDecode } from 'jwt-decode'

const SignInPage = () => {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess('');

        if (isForgotPassword) {
            try {
                const response = await axios.post(`${API_URL}/auth/forgot-password/send-otp`, {
                    userEmail: email,
                });

                if (response.status >= 200 && response.status < 300) {
                    setSuccess('Reset code sent successfully. Redirecting...');
                    setTimeout(() => {
                        router.push({
                            pathname: '/NewAuth/AccountVerification',
                            query: { email, type: 'forgot-password' },
                        });
                    }, 2000);
                }
            } catch (err: any) {
                // Properly typing the error object
                if (err.response && err.response.data) {
                    setError(err.response.data.message || 'Error sending reset code. Please try again.');
                } else {
                    setError('Error sending reset code. Please try again.');
                }
            }
        } else {
            try {
                const response = await axios.post(`${API_URL}/auth/login`, {
                    userEmail: email,
                    password: password,
                });

                if (response.status === 200) {
                    const token = response.data.token;
                    localStorage.setItem('token', token);
                    const decodedToken = jwtDecode<{ isAdmin: boolean }>(token);
                    if (decodedToken.isAdmin) {
                        router.push('/admin/dashboard'); 
                    } else {
                        router.push('/property-result');
                    }
                }
            } catch (err: any) {
                if (err.response && err.response.data) {
                    setError(err.response.data.message || 'Error during login. Please try again.');
                } else {
                    setError('Error during login. Please try again.');
                }
            }
        }

        setIsLoading(false);
    };


    return (
        <div className=" flex flex-col md:flex-row h-screen font-sans">
            {/* Left side */}
            <div className="w-full md:w-1/2 bg-gradient-to-r from-gray-500 to-gray-100 flex flex-col justify-center p-6 md:p-12 relative"
                style={{
                    backgroundImage: 'url(https://justhomnextjs.vercel.app/images/section/luxury-home-1.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    // height: '100vh' // Adjust height as needed
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-500 to-gray-100 opacity-50"></div> {/* Optional overlay */}

                {/* <div className="mb-8"> */}
                <div className="flex items-center gap-4 justify-center md:justify-start z-10 ">
                    <div className="w-10 h-10 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-2xl text-gray-50  font-semibold">Za Foundation</span>
                </div>
                {/* </div> */}
                <div className="flex-grow"></div>


                <div className="bg-white bg-opacity-80 px-10 py-5 md:p-6 rounded-lg shadow-md text-center mb-4 z-10">
                    <h2 className="text-5xl md:text-5xl text-gray-600 font-normal leading-10">
                        RELAX AND TRUST <br /> US FOR <span className='font-bold'>PROPERTY</span>
                    </h2>
                </div>
            </div>


            {/* Right side */}
            <div className="w-full md:w-1/2 bg-white p-6 md:p-12 flex flex-col">


                <div className="flex-grow flex items-center justify-center">
                    <div className="w-full max-w-md">
                        <div className="bg-gray-100 p-6 md:p-8 rounded-2xl">
                            <div className="px-6">
                                <h2 className="text-gray-600  text-4xl font-medium mb-2">{isForgotPassword ? "Forgot Password" : "Sign In"}</h2>
                                <p className="text-gray-400 text-xs mb-6">
                                    {isForgotPassword ? "No worries! Enter your email to receive a reset code." : "Hey! Happy to see you again..."}
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className='px-6'>
                                {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
                                {success && <div className="mb-4 text-green-500 text-sm">{success}</div>}

                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-xs font-medium text-gray-400 uppercase">
                                        EMAIL
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="Enter Your Email"
                                        // className="w-full px-3 py-2 border-b-2 bg-gray-100 placeholder-black text-black text-sm rounded-md focus:outline-none"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                {!isForgotPassword && (
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
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                )}

                                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-2 sm:space-y-0">
                                    {!isForgotPassword && (
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="rememberMe"
                                                name="rememberMe"
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                checked={rememberMe}
                                                onChange={() => setRememberMe(!rememberMe)}
                                            />
                                            <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
                                                Remember me
                                            </label>
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
                                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-2 focus focus" disabled={isLoading} >
                                    {isLoading ? 'Processing...' : (isForgotPassword ? "Send Reset Code" : "Sign In")}
                                </button>
                            </form>
                            {!isForgotPassword && (
                                <p className="mt-4 text-center text-sm text-gray-600">
                                    Don't Have an Account? <Link href="/NewAuth/SignUp" className="font-medium text-blue-600 hover:underline">Sign Up</Link>
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignInPage;