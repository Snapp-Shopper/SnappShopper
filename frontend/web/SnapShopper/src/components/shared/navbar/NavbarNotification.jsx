import React from 'react';

const NavbarNotification = ({ notificationDropdownRef }) => {
  return (
    <div
      ref={notificationDropdownRef}
      className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50 border border-gray-200"
    >
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-lg">Notification</h3>
          <button className="text-sm text-blue-600 hover:text-blue-800 py-2">Mark all as read</button>
        </div>

        {/* Empty notification state */}
        <div className="flex flex-col items-center py-4">
          <div className="w-15 h-15 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-12 h-12 text-blue-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13.73 21C13.5542 21.3031 13.3018 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 8C16 8 15 5 12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19 4L5 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <p className="text-gray-600 font-medium mb-2">No new notification</p>
          <p className="text-gray-500 text-sm text-center mb-2">We'll notify you when something arrives</p>
        </div>

        {/* Notification Footer */}
        <div className="mt-1 pt-1 border-t border-gray-200">
          <button className="w-full py-2 text-blue-600 rounded-full font-medium hover:bg-blue-50 transition duration-200">
            View all notifications
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavbarNotification;