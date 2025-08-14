import React from "react";
import { FiCheck, FiEdit3, FiMail, FiMapPin, FiPhone, FiTrash2 } from "react-icons/fi";
import { LuMail, LuMapPin, LuPhone } from "react-icons/lu";

const AddressCard = ({
  address,
  isDefault,
  onSetDefault,
  onEdit,
  onDelete,
}) => {

  return (
    <div className={`relative bg-white rounded-xl shadow-sm border-2 transition-all duration-300 hover:shadow-md group ${isDefault
      ? 'border-green-200 bg-gradient-to-br from-green-50 to-emerald-50'
      : 'border-gray-200 hover:border-blue-200'
      }`}>
      {/* Default Badge */}
      {isDefault && (
        <div className="absolute -top-2 -right-2 z-10">
          <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 shadow-lg">
            <FiCheck className="w-3 h-3" />
            <span>Default</span>
          </div>
        </div>
      )}

      <div className="p-6">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${isDefault ? 'bg-green-100' : 'bg-blue-100'
              }`}>
              <LuMapPin className={`w-5 h-5 ${isDefault ? 'text-green-600' : 'text-blue-600'
                }`} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">{address.name}</h3>
              <p className="text-sm text-gray-500">Delivery Address</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={onEdit}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 tooltip"
              title="Edit Address"
            >
              <FiEdit3 className="w-4 h-4" />
            </button>
            <button
              onClick={onDelete}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200 tooltip"
              title="Delete Address"
            >
              <FiTrash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Address Details */}
        <div className="space-y-3 mb-4">
          {/* Full Address */}
          <div className="flex items-start space-x-3">
            <FiMapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-gray-700 leading-relaxed">
              <p className="font-medium">{address.address_line1}</p>
              {address.address_line2 && (
                <p className="text-gray-600">{address.address_line2}</p>
              )}
              <p className="text-gray-600">
                {address.city}, {address.state} {address.zip_code}
              </p>
              <p className="text-gray-600">{address.country}</p>
            </div>
          </div>

          {/* Phone */}
          {address.phone && (
            <div className="flex items-center space-x-3">
              <FiPhone className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span className="text-sm text-gray-700">{address.phone}</span>
            </div>
          )}

          {/* Email if available */}
          {address.email && (
            <div className="flex items-center space-x-3">
              <FiMail className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span className="text-sm text-gray-700">{address.email}</span>
            </div>
          )}
        </div>

        {/* Action Section */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          {!isDefault ? (
            <button
              onClick={onSetDefault}
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 cursor-pointer"
            >
              <FiCheck className="w-4 h-4" />
              <span>Set as Default</span>
            </button>
          ) : (
            <div className="flex items-center space-x-2 text-green-600 text-sm font-medium">
              <FiCheck className="w-4 h-4" />
              <span>Primary Address</span>
            </div>
          )}

          {/* Address Type Badge */}
          {/* <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${isDefault
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-100 text-gray-600'
              }`}>
              {address.type || 'Home'}
            </span>
          </div> */}
        </div>
      </div>

      {/* Subtle gradient overlay for default cards */}
      {isDefault && (
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-xl pointer-events-none" />
      )}
    </div>
  );
};

export default AddressCard;
