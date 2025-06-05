import { useState } from 'react'
import { LuChevronsDown, LuChevronsUp, LuLogOut, LuSettings, LuShoppingBag, LuUser, LuShoppingCart, LuHeart, LuCreditCard, LuMapPin} from 'react-icons/lu';

const SideBar = ({ activeSection, setActiveSection }) => {
  const [isAccountExpanded, setIsAccountExpanded] = useState(true);
  
  const accountSections = [
    { id: 'personal', label: 'Personal Information', icon: LuUser },
    { id: 'addresses', label: 'Addresses', icon: LuMapPin },
    { id: 'security', label: 'Account Security', icon: LuSettings },
  ];
  
  const menuItems = [
    { id: 'orders', label: 'My Orders', icon: LuShoppingBag },
    { id: 'cart', label: 'Shopping Cart', icon: LuShoppingCart },
    { id: 'favorites', label: 'Favorites', icon: LuHeart },
    { id: 'payment', label: 'Payment Methods', icon: LuCreditCard },
    { id: 'history', label: 'Browsing History', icon: LuSettings },
    { id: 'logout', label: 'Sign Out', icon: LuLogOut },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Account Section Header */}
      <div 
        className="p-4 flex items-center justify-between cursor-pointer bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100 hover:from-blue-100 hover:to-indigo-100 transition-all duration-200"
        onClick={() => setIsAccountExpanded(!isAccountExpanded)}
      >
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <LuUser className="w-5 h-5 text-blue-600" />
          </div>
          <span className="font-semibold text-blue-900">My Account</span>
        </div>
        {isAccountExpanded ? 
          <LuChevronsUp className="w-5 h-5 text-blue-600" /> : 
          <LuChevronsDown className="w-5 h-5 text-blue-600" />
        }
      </div>

      {/* Account Subsections */}
      <div className={`transition-all duration-300 overflow-hidden ${isAccountExpanded ? 'max-h-48' : 'max-h-0'}`}>
        {accountSections.map((section) => (
          <div
            key={section.id}
            className={`px-6 py-3 cursor-pointer border-l-4 transition-all duration-200 ${
              activeSection === section.id
                ? 'bg-blue-50 border-blue-500 text-blue-700'
                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-200'
            }`}
            onClick={() => setActiveSection(section.id)}
          >
            <div className="flex items-center space-x-3">
              <section.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{section.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Menu Items */}
      <div className="border-t border-gray-100">
        {menuItems.map((item, index) => (
          <div
            key={item.id}
            className={`px-4 py-3 flex items-center space-x-3 cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
              index === menuItems.length - 1 ? 'border-t border-gray-100' : ''
            }`}
          >
            <item.icon className="w-5 h-5 text-gray-500" />
            <span className="text-sm text-gray-700">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar