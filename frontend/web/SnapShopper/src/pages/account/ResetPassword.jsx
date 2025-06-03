import React, { useState } from 'react'
import { FiEye } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const ResetPassword = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();
    const { resetPassword, isLoading } = useAuth();

    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setErrors({
            ...errors,
            [e.target.name]: ''
        })
    }

    async function handleSubmit() {
        e.preventDefault();
    }

    return (
        <div className="w-full max-w-md mx-auto bg-white rounded-lg border p-8 my-6">
            <h2 className="text-2xl font-semibold text-center mb-2">Reset Password</h2>
            <div className="text-center mb-6">
                <span className="text-gray-600">Kindly set a new password, your new password must be different from your previously used password</span>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <div className="flex justify-between mb-2">
                        <label className="block text-gray-700" htmlFor="password">
                            Enter New Password
                        </label>
                    </div>
                    <div className="relative">
                        <input
                            id="password"
                            type={passwordVisible ? "text" : "password"}
                            className="w-full py-2 px-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter New Password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setPasswordVisible(!passwordVisible)}>
                            <FiEye className="h-5 w-5 text-gray-400" />
                        </button>
                    </div>
                </div>

                <div className="mb-6">
                    <div className="flex justify-between mb-2">
                        <label className="block text-gray-700" htmlFor="confirmPassword">
                            Confirm New Password
                        </label>
                    </div>
                    <div className="relative">
                        <input
                            id="confirmPassword"
                            type={confirmPasswordVisible ? "text" : "password"}
                            className="w-full py-2 px-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Confirm New Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                        <button
                            type="button"
                            onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            <FiEye className="h-5 w-5 text-gray-400" />
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full flex items-center justify-center"
                    disabled={isLoading}>
                    {isLoading ? 'Processing...' : 'Continue'}
                    <svg className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </form>
        </div>
    );
};

export default ResetPassword