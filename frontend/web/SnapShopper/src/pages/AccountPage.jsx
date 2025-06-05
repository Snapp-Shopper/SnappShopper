import React, { useState } from 'react'
import Breadcrumb from '../components/Breadcrumb';
import SideBar from '../components/profile/Sidebar';
import PersonalInfo from '../components/profile/PersonalInfo';
import Addressbook from '../components/profile/Addressbook';
import AccountSecurity from '../components/profile/AccountSecurity';

const AccountPage = () => {
  const [activeSection, setActiveSection] = useState('personal');

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'personal':
        return <PersonalInfo />;
      case 'addresses':
        return <Addressbook />;
      case 'security':
        return <AccountSecurity />;
      default:
        return <PersonalInfo />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <Breadcrumb />
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Account</h1>
          <p className="text-gray-600">Manage your personal information and account settings</p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-80 flex-shrink-0">
            <SideBar activeSection={activeSection} setActiveSection={setActiveSection} />
          </div>
          
          <div className="flex-1">
            {renderActiveSection()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AccountPage