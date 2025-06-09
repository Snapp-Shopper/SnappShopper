import React, { useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { LuChevronDown, LuUser } from "react-icons/lu";

const PersonalInfo = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "Chisom",
    lastName: "Nwoke",
    gender: "Male",
    email: "chisom.nwoke@email.com",
    phone: "+234 708 934 3298",
    address: "20, Felicia Kaleosho street, Iganmu, Lagos",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <LuUser className="w-5 h-5 mr-2 text-blue-600" />
          Personal Information
        </h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
        >
          <FiEdit3 className="w-4 h-4" />
          <span>{isEditing ? "Cancel" : "Edit"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(formData).map(([key, value]) => (
          <div key={key} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 capitalize">
              {key.replace(/([A-Z])/g, " $1").trim()}
            </label>
            {key === "gender" ? (
              <div className="relative">
                <select
                  value={value}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-200"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
                {/* <LuChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" /> */}
              </div>
            ) : (
              <input
                type={
                  key === "email" ? "email" : key === "phone" ? "tel" : "text"
                }
                value={value}
                onChange={(e) => handleInputChange(key, e.target.value)}
                disabled={!isEditing}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-200"
              />
            )}
          </div>
        ))}
      </div>

      {isEditing && (
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={() => setIsEditing(false)}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          >
            Cancel
          </button>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default PersonalInfo;
