import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { LuStore } from 'react-icons/lu';

const VendorSidebar = () => {
  const { logout } = useContext(AuthContext);
  const location = useLocation();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LuLayoutDashboard, route: '/vendor/dashboard' },
    { id: 'products', label: 'My Products', icon: LuPackage, route: '/vendor/products' },
    { id: 'orders', label: 'Orders', icon: LuClipboardList, route: '/vendor/orders' },
    { id: 'analytics', label: 'Analytics', icon: LuBarChart2, route: '/vendor/analytics' },
    { id: 'settings', label: 'Store Settings', icon: LuSettings, route: '/vendor/settings' },
    { id: 'logout', label: 'Sign Out', icon: LuLogOut },
  ];

  const handleLogout = async () => {
    await logout();
    // Redirect to login page or home after logout
    // navigate('/'); // If you have navigate available here
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="p-5 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <LuStore className="w-6 h-6 text-purple-600" />
          </div>
          <span className="font-semibold text-xl text-purple-900">Vendor Panel</span>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="py-2">
        {menuItems.map((item) => {
          const isActive = item.route && location.pathname.startsWith(item.route);

          if (item.id === 'logout') {
            return (
              <button
                key={item.id}
                className="w-full text-left px-5 py-3 flex items-center space-x-3 cursor-pointer border-l-4 transition-all duration-200 border-transparent text-red-600 hover:bg-red-50 hover:border-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                onClick={handleLogout}
              >
                <item.icon className="w-5 h-5 text-red-500" />
                <span className="text-base font-medium text-red-600">
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <Link
              key={item.id}
              to={item.route}
              className={`block px-5 py-3 flex items-center space-x-3 cursor-pointer border-l-4 transition-all duration-200
                ${isActive
                  ? 'bg-purple-50 border-purple-500 text-purple-700 font-semibold'
                  : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-200'
                } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-purple-600' : 'text-gray-500'}`} />
              <span className={`text-base font-medium ${isActive ? 'text-purple-700' : ''}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default VendorSidebar