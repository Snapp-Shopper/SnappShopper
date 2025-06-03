import React, { useState } from "react";
import { BsApple } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import toast from "react-hot-toast";
import Spinner from "../../components/shared/Spinner";
import { useLoading } from "../../context/LoadingContext";

const Registration = () => {
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();
  const { setIsLoading } = useLoading();
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

  // async function handleSubmit(e) {
  //   e.preventDefault();

  //   // Basic validation
  //   const newErrors = {};
  //   if (!formData.first_name.trim()) newErrors.first_name = "First name is required";
  //   if (!formData.last_name.trim()) newErrors.last_name = "Last name is required";
  //   if (!formData.email.trim()) newErrors.email = "Email is required";
  //   if (!formData.password) newErrors.password = "Password is required";
  //   if (formData.password !== formData.confirmPassword) {
  //     newErrors.confirmPassword = "Passwords do not match";
  //   }

  //   if (Object.keys(newErrors).length > 0) {
  //     setErrors(newErrors);
  //     return;
  //   }

  //   setIsLoading(true);

  //   try {
  //     const response = await register(
  //       formData.first_name,
  //       formData.last_name,
  //       formData.email,
  //       formData.password,
  //       formData.phone_number
  //     );

  //     // Simulate a delay for loading (optional)
  //     setTimeout(() => {
  //       setIsLoading(false);
  //       if (response.status === 'success') {
  //         console.log(response)
  //         toast.success("Registration successful! Verify your email.");
  //         // navigate("account/email-verification"); // Redirect to verification page
  //       }
  //       else if (response.message === 'Email already exists') toast.error('Email already exists')
  //     }, 3000); // Default loading time of 3 seconds
  //   } catch (error) {
  //     setIsLoading(false); // Stop loading
  //     // toast.error(error.response?.data?.Message || "Registration failed.");
  //     console.log(error)
  //   }
  // }

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

    setIsLoading(true);

    try {
      const response = await callApi(
        register,
        formData.first_name,
        formData.last_name,
        formData.email,
        formData.password,
        formData.phone_number
      );
      if (response.status === "success") {
        toast.success("Registration successful! Verify your email.");
        navigate("/account/email-verification");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error(error); // Handle error appropriately
    }
  }

  const EyeIcon = ({ visible }) => (
    <svg
      className="size-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      {visible ? (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
        ></path>
      ) : (
        <>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          ></path>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          ></path>
        </>
      )}
    </svg>
  );

  return (
    <>
      {isLoading && <Spinner />}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 w-full max-w-md mx-auto my-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Create An Account
          </h2>
          <p className="text-gray-600">
            Already have an account?
            <Link
              to={"/account/login"}
              className="text-blue-600 font-medium hover:text-blue-700 transition-colors ml-1"
            >
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
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
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
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
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

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-medium py-2.5 px-4 rounded-full flex items-center justify-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Create an Account"}
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
