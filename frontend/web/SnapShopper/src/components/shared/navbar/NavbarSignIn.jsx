import React, { useRef } from "react";
import { BsApple, BsFacebook } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const NavbarSignIn = ({ signInDropdownRef }) => {
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

        {/* <div className="mt-4 pt-3 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-2">New to SNAPPSHOPPER?</p>
                    <button className="w-full py-2 bg-gray-100 text-gray-800 rounded-md font-medium hover:bg-gray-200 transition duration-200">
                        Create an account
                    </button>
                </div> */}
      </div>
    </div>
  );
};

export default NavbarSignIn;
