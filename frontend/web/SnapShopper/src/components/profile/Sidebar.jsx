import { useContext } from 'react'
import { LuLogOut, LuShoppingBag, LuUser, LuShoppingCart, LuHeart, LuCreditCard, LuMapPin, LuShield, LuHistory } from 'react-icons/lu';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const SideBar = () => {
  const { logout } = useContext(AuthContext);
  const location = useLocation();

  const menuItems = [
    { id: 'personal', label: 'Personal Information', icon: LuUser, route: '/account/profile/personal-info' },
    { id: 'addresses', label: 'Addresses', icon: LuMapPin, route: '/account/profile/addresses' },
    { id: 'security', label: 'Account Security', icon: LuShield, route: '/account/profile/security' },
    { id: 'orders', label: 'My Orders', icon: LuShoppingBag, route: '/account/profile/orders' },
    { id: 'cart', label: 'Shopping Cart', icon: LuShoppingCart, route: '/account/profile/shopping-cart' },
    { id: 'favorites', label: 'Favorites', icon: LuHeart, route: '/account/profile/favorites' },
    { id: 'payment', label: 'Payment Methods', icon: LuCreditCard, route: '/account/profile/payment-methods' },
    { id: 'history', label: 'Browsing History', icon: LuHistory, route: '/account/profile/browsing-history' },
    { id: 'logout', label: 'Sign Out', icon: LuLogOut },
  ];

  const handleLogout = async () => {
    await logout();
  };



  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <LuUser className="w-5 h-5 text-blue-600" />
          </div>
          <span className="font-semibold text-blue-900">My Account</span>
        </div>
      </div>

      {/* Menu Items */}
      <div className="py-2">
        {menuItems.map((item) => {
          const isActive = item.route && (
            location.pathname === item.route ||
            (item.id === 'personal' && location.pathname === '/account/profile') // Handles base /account/profile for PersonalInfo
          );

          // Logout is handled separately
          if (item.id === 'logout') {
            return (
              <div
                key={item.id}
                className="px-4 py-3 flex items-center space-x-3 cursor-pointer border-l-4 transition-all duration-200 border-transparent text-red-600 hover:bg-red-50 hover:border-red-200"
                onClick={handleLogout} // Call handleLogout for the logout item
              >
                <item.icon className="w-5 h-5 text-red-500" />
                <span className="text-sm font-medium text-red-600">
                  {item.label}
                </span>
              </div>
            );
          }

          return (
            <Link // Use Link component for navigation
              key={item.id}
              to={item.route}
              className={`px-4 py-3 flex items-center space-x-3 cursor-pointer border-l-4 transition-all duration-200 ${isActive
                ? 'bg-blue-50 border-blue-500 text-blue-700'
                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-200'
                }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-500'
                }`} />
              <span className={`text-sm font-medium ${isActive ? 'text-blue-700' : ''
                }`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SideBar;