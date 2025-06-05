import React from "react";
import { FiEdit3 } from "react-icons/fi";
import { LuMail, LuMapPin, LuPhone } from "react-icons/lu";

const AddressCard = ({
  address,
  isDefault,
  onSetDefault,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-4 hover:border-gray-300 transition-colors duration-200">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center space-x-2">
          <h3 className="font-medium text-gray-900">{address.name}</h3>
          {isDefault && (
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
              Default
            </span>
          )}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={onEdit}
            className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            <FiEdit3 className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="text-red-500 hover:text-red-700 transition-colors duration-200"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="text-sm text-gray-600 space-y-1">
        <p className="flex items-center">
          <LuMapPin className="w-4 h-4 mr-2" />
          {address.street}
        </p>
        <p className="flex items-center">
          <LuMail className="w-4 h-4 mr-2" />
          Zipcode: {address.zipcode}
        </p>
        <p className="flex items-center">
          <LuPhone className="w-4 h-4 mr-2" />
          {address.phone}
        </p>
      </div>

      {!isDefault && (
        <button
          onClick={onSetDefault}
          className="mt-3 text-blue-600 text-sm hover:text-blue-800 transition-colors duration-200"
        >
          Set as Default
        </button>
      )}
    </div>
  );
};

export default AddressCard;
