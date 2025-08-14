import React from 'react'
import { LuStore } from 'react-icons/lu';
import { Outlet, useLocation } from 'react-router-dom';

const VendorLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Header Section for Vendor Dashboard */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex items-center space-x-3 text-gray-700 text-sm mb-4">
            <span className="hover:text-blue-600 cursor-pointer transition-colors">Home</span>
            <span className="text-gray-400">/</span>
            <span className="font-medium text-blue-600">Vendor Dashboard</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-4 mb-2 flex items-center">
            <LuStore className="w-9 h-9 mr-3 text-blue-600" /> {/* Larger icon for main title */}
            Vendor Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Manage your products, orders, and store settings.
          </p>
        </div>

        {/* Content Area: Sidebar and Outlet */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <VendorSidebar currentPathname={location.pathname} />
          </div>

          {/* Main Content (Outlet) */}
          <div className="flex-1">
            {/* Outlet content will automatically have a consistent card-like background */}
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
  // Note: This layout assumes that the content rendered by <Outlet />
  // (like MyProducts.jsx) will apply its own 'bg-white rounded-xl shadow-sm border' classes
  // to maintain the card-like appearance within the main content area.
};

export default VendorLayout