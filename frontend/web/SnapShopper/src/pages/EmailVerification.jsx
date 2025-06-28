import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useLoading } from "../context/LoadingContext";
import ButtonSpinner from "../components/spinner/ButtonSpinner";
import toast from "react-hot-toast";
import ResendEmailButton from "../components/account/ResendEmailButton";

const EmailVerification = () => {
  const [timer, setTimer] = useState(15); // 15 seconds
  const [code, setCode] = useState(["", "", "", ""]);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const { OTPVerification, ResendOtpCode } = useAuth();
  const [errors, setErrors] = useState({});
  const { isLoading, setIsLoading } = useLoading();
  const navigate = useNavigate();
  const location = useLocation();
  const userEmail = location.state?.email;

  useEffect(() => {
    let interval;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
      }, 1000);
    } else if (timer === 0) {
      setIsTimerActive(false);
    }

    return () => clearInterval(interval);
  }, [timer, isTimerActive]);

  const handleInputChange = (index, value) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Auto-focus next input if value is entered
      if (value && index < 3) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    // Focus previous input on backspace if current input is empty
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleResendEmail = async (e) => {
    e.preventDefault();

    try {
      const response = await ResendOtpCode(userEmail);

      if (response && response.status) {
        if (response.status === "success") {
          toast.success(response.message || "Email verified successfully!");
        } else if (response.status === "error") {
          const errorMessage =
            response.message ||
            "Email verification failed due to an unknown issue.";
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
      // Reset timer and activate it
      setTimer(15);
      setIsTimerActive(true);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to resend email. Try again later."
      );
      console.error("Resend email error:", error);
    }
  };

  const isCodeComplete = code.every((digit) => digit !== "");

  async function handleSubmit(e) {
    e.preventDefault();

    const fullCode = code.join("");

    if (fullCode.length !== 4 || !userEmail) {
      toast.error("Please enter the complete verification code.");
      return;
    }

    //setIsLoading(true);
    try {
      const response = await OTPVerification(userEmail, fullCode);
      if (response && response.status) {
        if (response.status === "success") {
          toast.success("Email verified successfully!");
          navigate("/account/login");
        } else if (response.status === "error") {
          const errorMessage =
            response.message ||
            "Email verification failed due to an unknown issue.";
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
      let displayErrorMessage = "Verification failed. Please try again.";

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
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Email Verification
            </h2>
            <p className="text-gray-600">
              A code has been sent to your email address
            </p>
          </div>

          <div className="flex justify-center gap-3 mb-8">
            {inputRefs.map((ref, index) => (
              <input
                key={index}
                ref={ref}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={code[index]}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="size-12 text-center text-xl font-semibold bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-colors"
                autoComplete="off"
              />
            ))}
          </div>

          <div className="text-center mb-8">
            <ResendEmailButton
              timer={timer}
              handleResendEmail={handleResendEmail}
            />
          </div>

          {isLoading ? (
            <ButtonSpinner />
          ) : (
            <button
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white py-3 px-4 rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
              disabled={!isCodeComplete || isLoading}
              onClick={handleSubmit}
            >
              <span>Verify your Email Address</span>
              <svg
                className="size-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </main>
    </>
  );
};

export default EmailVerification;
