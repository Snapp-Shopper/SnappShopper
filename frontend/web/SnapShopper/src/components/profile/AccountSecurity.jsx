import React, { useState } from 'react'
import { LuSettings } from 'react-icons/lu';
import PasswordField from './PasswordField';

const AccountSecurity = () => {
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handlePasswordChange = (field, value) => {
    setPasswords(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <LuSettings className="w-5 h-5 mr-2 text-blue-600" />
        Account Security
      </h2>
      
      {showSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
          <Check className="w-5 h-5 text-green-600 mr-3" />
          <span className="text-green-800">Password updated successfully!</span>
        </div>
      )}
      
      <div className="space-y-6">
        <PasswordField 
          label="Current Password" 
          placeholder="Enter current password" 
          id="current-password"
          value={passwords.current}
          onChange={(e) => handlePasswordChange('current', e.target.value)}
        />
        
        <div className="text-right">
          <button className="text-red-500 text-sm hover:text-red-700 transition-colors duration-200">
            Forgot Password?
          </button>
        </div>
        
        <PasswordField 
          label="New Password" 
          placeholder="Enter new password" 
          id="new-password"
          value={passwords.new}
          onChange={(e) => handlePasswordChange('new', e.target.value)}
        />
        
        <PasswordField 
          label="Confirm New Password" 
          placeholder="Confirm new password" 
          id="confirm-password"
          value={passwords.confirm}
          onChange={(e) => handlePasswordChange('confirm', e.target.value)}
        />
        
        <button 
          onClick={handleSubmit}
          className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg px-8 py-3 font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          Update Password
        </button>
      </div>
    </div>
  );
};

export default AccountSecurity