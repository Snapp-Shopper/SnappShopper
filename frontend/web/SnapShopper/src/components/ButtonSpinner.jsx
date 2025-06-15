import React from "react";

const ButtonSpinner = () => {
  return (
    <div className="w-full bg-blue-400 text-white font-medium py-2.5 px-4 rounded-full flex items-center justify-center gap-3 transition-colors cursor-not-allowed">
      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
      <span className="animate-pulse">Processing... please wait</span>
    </div>
  );
};

export default ButtonSpinner;
