import React from "react";
import { formatTime } from "../../utils/DateTimeFormatter";

const ResendEmailButton = ({timer, handleResendEmail}) => {
  return (
    <>
      {timer > 0 ? (
        <p className="text-sm text-gray-700">
          Didn't receive a code?
          <span className="text-blue-600 font-medium">
            {" "}
            Resend in {formatTime(timer)}
          </span>
        </p>
      ) : (
        <p className="text-sm text-gray-700">
          Didn't receive a code?
          <button
            onClick={handleResendEmail}
            className="text-blue-600 hover:text-blue-700 font-medium ml-1 transition-colors focus:outline-none focus:underline cursor-pointer"
          >
            Resend email
          </button>
        </p>
      )}
    </>
  );
};

export default ResendEmailButton;
