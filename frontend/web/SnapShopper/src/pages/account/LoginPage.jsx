import React, { useState } from 'react'
import { BsApple } from 'react-icons/bs';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { FiEye } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useLoading } from '../../context/LoadingContext';
import Spinner from '../../components/shared/Spinner';

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { login, isLoading } = useAuth();
    const [errors, setErrors] = useState({});
    const { setIsLoading } = useLoading();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
        setErrors({
            ...errors,
            [e.target.id]: ''
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        // Basic validation
        const newErrors = {};
        if (!formData.email.trim()) newErrors.email = "Email is required";
        if (!formData.password) newErrors.password = "Password is required";
    

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);
        try {

            const isSuccess = await login(formData.email, formData.password);
            setTimeout(() => {
                setIsLoading(false);
                if (isSuccess) {
                    // toast.success("Authentication successful!");
                    //navigate("/home"); // Navigate to Home after successful login
                    console.log("successful");
                } else {
                    //toast.error("Invalid credentials. Please try again.");
                }
            }, 3000);

        } catch (err) {
            setIsLoading(false);
            const errorMessage =
                err.response?.data?.message || "Login failed. Please try again.";
            setErrors(errorMessage);
            //toast.error(errorMessage);
        }
    }

    return (
        <>
            {isLoading && (
                <Spinner />
            )}

            <div className="w-full max-w-md mx-auto bg-white rounded-lg border border-gray-200 p-8 my-6 shadow-sm">
                <h2 className="text-2xl font-semibold text-center mb-2 text-gray-900">Sign In To Your Account</h2>
                <div className="text-center mb-6">
                    <span className="text-gray-600">New to Snappshopper? </span>
                    <Link to="/account/registration"
                        className="font-medium underline text-blue-600 hover:text-blue-700 transition-colors">Create Account</Link>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
                            Email Address
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="size-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                            </div>
                            <input
                                id="email"
                                type="email"
                                className="w-full py-2.5 pl-10 pr-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="Enter your email address"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                                Password
                            </label>
                            <Link to={"/account/forgot-password"}
                                className="text-blue-500 text-sm hover:text-blue-600 transition-colors">Forgot Password?</Link>
                        </div>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                className="w-full py-2.5 px-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="Enter Password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600 transition-colors"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <FiEye className="size-5 text-gray-400" />
                            </button>
                        </div>
                        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2.5 px-4 rounded-full flex items-center justify-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        disabled={isLoading}>
                        {isLoading ? 'Processing...' : 'Sign In'}
                        <svg className="size-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="px-4 bg-white text-sm text-gray-500">or</span>
                        </div>
                    </div>
                </div>

                <div className="mt-6 space-y-3">
                    <button className="w-full border border-gray-300 rounded-full py-2.5 px-4 flex items-center justify-center gap-2 bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                        <FcGoogle className="size-5" />
                        Continue with Google
                    </button>

                    <button className="w-full border border-gray-300 rounded-full py-2.5 px-4 flex items-center justify-center gap-2 bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                        <BsApple className="size-5" />
                        Continue with Apple
                    </button>

                    <button className="w-full border border-gray-300 rounded-full py-2.5 px-4 flex items-center justify-center gap-2 bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                        <FaFacebook className="size-5" />
                        Continue with Facebook
                    </button>
                </div>
            </div>
        </>
    );
};

export default LoginPage