import React, { useState } from "react";
import { BsApple } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";
import { useLoading } from "../context/LoadingContext";
import EyeIcon from "../components/EyeIcon";
import ButtonSpinner from "../components/spinner/ButtonSpinner";

const Registration = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { isLoading, setIsLoading } = useLoading();
  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone_number: "",
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
    if (!formData.first_name.trim())
      newErrors.first_name = "First name is required";
    if (!formData.last_name.trim())
      newErrors.last_name = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    //setIsLoading(true);

    try {
      const response = await register(
        formData.first_name,
        formData.last_name,
        formData.email,
        formData.password,
        formData.phone_number
      );

      if (response && response.status) {
        if (response.status === "success") {
          toast.success("Registration successful! Please verify your email.");
          navigate("/account/email-verification", {
            state: { email: formData.email },
          });
        } else if (response.status === "error") {
          const errorMessage =
            response.message || "Registration failed due to an unknown issue.";
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
      let displayErrorMessage = "Registration failed. Please try again.";

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
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 w-full max-w-md mx-auto my-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Create An Account
          </h2>
          <p className="text-gray-600">
            Already have an account?
            <Link
              to={"/account/login"}
              className="font-medium underline text-blue-600 hover:text-blue-700 transition-colors"
            >
              {" "}
              Sign In
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="first_name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                placeholder="First Name"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                value={formData.first_name}
                onChange={(e) =>
                  handleChange(e, formData, setFormData, errors, setErrors)
                }
              />
              {errors.first_name && (
                <p className="mt-1 text-sm text-red-600">{errors.first_name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="last_name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                placeholder="Last Name"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                value={formData.last_name}
                onChange={(e) =>
                  handleChange(e, formData, setFormData, errors, setErrors)
                }
              />
              {errors.last_name && (
                <p className="mt-1 text-sm text-red-600">{errors.last_name}</p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) =>
                handleChange(e, formData, setFormData, errors, setErrors)
              }
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone_number"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phone_number"
              placeholder="Phone Number"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              value={formData.phone_number}
              onChange={(e) =>
                handleChange(e, formData, setFormData, errors, setErrors)
              }
            />
            {errors.phoneNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                placeholder="Password"
                className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                value={formData.password}
                onChange={(e) =>
                  handleChange(e, formData, setFormData, errors, setErrors)
                }
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none cursor-pointer"
              >
                <EyeIcon visible={passwordVisible} />
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                id="confirmPassword"
                placeholder="Confirm Password"
                className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleChange(e, formData, setFormData, errors, setErrors)
                }
              />
              <button
                type="button"
                onClick={() =>
                  setConfirmPasswordVisible(!confirmPasswordVisible)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none cursor-pointer"
              >
                <EyeIcon visible={confirmPasswordVisible} />
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">
                {errors.confirmPassword}
              </p>
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
              Create an Account
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

          <div className="mt-6 grid grid-cols-3 gap-3">
            <button
              type="button"
              className="flex items-center justify-center py-2.5 px-3 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              <FcGoogle className="size-4 mr-1" />
              <span className="text-sm">Google</span>
            </button>

            <button
              type="button"
              className="flex items-center justify-center py-2.5 px-3 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              <BsApple className="size-4 mr-1" />
              <span className="text-sm">Apple</span>
            </button>

            <button
              type="button"
              className="flex items-center justify-center py-2.5 px-3 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              <FaFacebook className="size-4 mr-1" />
              <span className="text-sm">Facebook</span>
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-gray-600">
            <span>By continuing, you agree to our </span>
            <a
              href="#"
              className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
            >
              Terms of Use
            </a>
            <span> and </span>
            <a
              href="#"
              className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
            >
              Privacy Policy
            </a>
          </div>
        </form>
      </div>
    </>
  );
};

export default Registration;
