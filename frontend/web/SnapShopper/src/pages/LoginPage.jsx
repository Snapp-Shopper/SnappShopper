import React, { useState } from "react";
import { BsApple } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useLoading } from "../context/LoadingContext";
import EyeIcon from "../components/EyeIcon";
import ButtonSpinner from "../components/ButtonSpinner";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const [errors, setErrors] = useState({});
  const { isLoading, setIsLoading } = useLoading();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.id]: "",
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

    try {
      const response = await login(formData.email, formData.password);
      if (response && response.status) {
        if (response.status === "success") {
          toast.success("Authentication Successful!");
          navigate("/home");
        } else if (response.status === "error") {
          const errorMessage =
            response.message ||
            "Authentication failed due to an unknown issue.";
          toast.error(errorMessage);
          setErrors((prev) => ({ ...prev, general: errorMessage }));
        } else {
          toast.error("An unexpected response was received from the server.");
          setErrors((prev) => ({
            ...prev,
            general: "An unexpected response was received from the server.",
          }));
        }
      } else {
        toast.error("Check network connection or server status...");
        setErrors((prev) => ({
          ...prev,
          general: "Check network connection or server status...",
        }));
      }
    } catch (error) {
      let displayErrorMessage = "Authentication failed. Please try again.";

      if (error.response) {
        if (error.response.data && error.response.data.message) {
          displayErrorMessage = error.response.data.message;
        } else if (
          error.response.data &&
          typeof error.response.data === "string"
        ) {
          displayErrorMessage = error.response.data;
        } else {
          displayErrorMessage = `Server Error: ${error.response.status}`;
        }
      } else if (error.request) {
        displayErrorMessage =
          "No response from server. Check network connection.";
      } else {
        displayErrorMessage = error.message;
      }

      toast.error(displayErrorMessage);
      setErrors((prev) => ({
        ...prev,
        general: displayErrorMessage,
      }));
    }
  }

  return (
    <>
      <div className="w-full max-w-md mx-auto bg-white rounded-lg border border-gray-200 p-8 my-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-center mb-2 text-gray-900">
          Sign In To Your Account
        </h2>
        <div className="text-center mb-6">
          <span className="text-gray-600">New to Snappshopper? </span>
          <Link
            to="/account/registration"
            className="font-medium underline text-blue-600 hover:text-blue-700 transition-colors"
          >
            Create Account
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="size-5 text-blue-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
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
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="password"
              >
                Password
              </label>
              <Link
                to={"/account/forgot-password"}
                className="text-blue-500 text-sm hover:text-blue-600 transition-colors"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <input
                id="password"
                type={passwordVisible ? "text" : "password"}
                className="w-full py-2.5 px-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600 transition-colors cursor-pointer"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                <EyeIcon visible={passwordVisible} />
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          {isLoading ? (
            <ButtonSpinner />
          ) : (
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-medium py-2.5 px-4 rounded-full flex items-center justify-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
              disabled={isLoading}
            >
              Sign In
              <svg
                className="size-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </button>
          )}
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

export default LoginPage;
