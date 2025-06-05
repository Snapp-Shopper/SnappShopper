import React, { useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { LuChevronDown, LuEye, LuEyeOff, LuUser } from "react-icons/lu";
import EyeIcon from "../EyeIcon";

const PasswordField = ({ label, placeholder, id, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg pr-12 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 pr-4 flex items-center hover:text-blue-600 transition-colors duration-200"
        >
          {/* {showPassword ? <LuEyeOff className="w-5 h-5" /> : <LuEye className="w-5 h-5" />} */}
          <EyeIcon visible={showPassword} />
        </button>
      </div>
    </div>
  );
};

export default PasswordField;
