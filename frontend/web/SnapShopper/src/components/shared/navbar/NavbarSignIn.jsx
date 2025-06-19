import React, { useRef } from "react";
import { BsApple, BsFacebook } from "react-icons/bs";
import { FaCreditCard, FaFacebook, FaHeart, FaHistory, FaShoppingBag, FaShoppingCart, FaSignOutAlt, FaUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const NavbarSignIn = ({ signInDropdownRef, authUser, handleLogout, loggingOut}) => {

    if (!authUser) {
    return (
      <div
        ref={signInDropdownRef}
        className="absolute right-0 mt-2 w-80 sm:w-80 w-[calc(100vw-2rem)] max-w-sm bg-white rounded-lg shadow-lg z-50 border border-gray-200"
      >
        <div className="p-4">
          <div className="flex flex-col items-center py-2 mb-4">
            <h3 className="font-bold text-lg mb-2">Sign in to start shopping</h3>
            <Link
              className="text-center w-full py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition duration-200 btn"
              to="/account/login"
            >
              Sign In
            </Link>
          </div>

          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-3 text-gray-500 text-sm">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button className="text-sm flex items-center justify-center py-2 px-2 border border-gray-300 rounded hover:bg-gray-50 rounded-full gap-2">
              <FcGoogle className="h-5 w-5" />
              <span>Google</span>
            </button>

            <button className="text-sm flex items-center justify-center py-2 px-2 border border-gray-300 rounded hover:bg-gray-50 rounded-full gap-2">
              <FaFacebook className="h-5 w-5 text-blue-600" />
              <span>Facebook</span>
            </button>

            <button className="text-sm flex items-center justify-center py-2 px-2 border border-gray-300 rounded hover:bg-gray-50 rounded-full gap-2">
              <BsApple className="h-5 w-5" />
              <span>Apple</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

   return (
    <div
      ref={signInDropdownRef}
      className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-50 border border-gray-200"
    >
      {/* User Info Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <FaUser className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="font-medium text-gray-900">
              Hi, {authUser.first_name || authUser.name || 'User'}
            </p>
            <p className="text-sm text-gray-500">{authUser.email}</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="py-2">
        <Link
          to="/account/profile"
          className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <FaUser className="h-4 w-4 mr-3 text-gray-500" />
          <span>My Account</span>
        </Link>

        <Link
          to="/account/orders"
          className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <FaShoppingBag className="h-4 w-4 mr-3 text-gray-500" />
          <span>My Orders</span>
        </Link>

        <Link
          to="/cart"
          className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <FaShoppingCart className="h-4 w-4 mr-3 text-gray-500" />
          <span>Shopping Cart</span>
        </Link>

        <Link
          to="/account/favorites"
          className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <FaHeart className="h-4 w-4 mr-3 text-gray-500" />
          <span>Favorites</span>
        </Link>

        <Link
          to="/account/payment-methods"
          className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <FaCreditCard className="h-4 w-4 mr-3 text-gray-500" />
          <span>My Payment Method</span>
        </Link>

        <Link
          to="/account/browsing-history"
          className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <FaHistory className="h-4 w-4 mr-3 text-gray-500" />
          <span>Browsing History</span>
        </Link>

        {/* Divider */}
        <div className="border-t border-gray-100 my-2"></div>

        {/* Sign Out */}
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
        >
          <FaSignOutAlt className="h-4 w-4 mr-3" />
          <span>{loggingOut ? 'Signing Out...' : 'Sign Out'}</span>
        </button>
      </div>
    </div>
  );
};


export default NavbarSignIn;
