import React from 'react';
import { FaCcVisa, FaFacebook, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-6 md:mb-0">
          <div className="flex items-center mb-6">
            <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 5l-3-3H6L3 5v14l3 3h12l3-3V5zm-2 11h-4v4H9v-4H5V8h4V4h6v4h4v8z" />
            </svg>
            <span className="ml-2 font-bold">SNAPPSHOPPER</span>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between">
          {/* <div className="mb-6 md:mb-0">
            <div className="flex items-center mb-6">
              <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 5l-3-3H6L3 5v14l3 3h12l3-3V5zm-2 11h-4v4H9v-4H5V8h4V4h6v4h4v8z" />
              </svg>
              <span className="ml-2 font-bold">SNAPPSHOPPER</span>
            </div>
          </div> */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Company info</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">About Snapppshopper</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Contact Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Press</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Careers</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Get Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Help Center</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Live Chat</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Check order status</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Refunds</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Report abuse</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Payment and Protections</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Safe and easy payments</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Money-back policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">On-time shipping</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">After-sales protections</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Product monitoring service</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 md:mt-0">
            <h3 className="text-lg font-semibold mb-4">Connect with Snappshopper</h3>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="text-white hover:text-gray-300">
                <FaFacebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-white hover:text-gray-300">
                <FaXTwitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-white hover:text-gray-300">
                <FaYoutube className="h-6 w-6" />
              </a>
            </div>

            <div className="flex flex-wrap gap-2">
              <img src="https://i.pinimg.com/736x/7f/02/59/7f02592cba32ee8e148af831c35c2ea0.jpg" alt="Visa" className="h-6 w-10 object-contain bg-white rounded p-1" />
              <img src="https://i.pinimg.com/736x/bf/39/99/bf39995ab40ed320a8264514248d54a8.jpg" alt="MasterCard" className="h-6 w-10 object-contain bg-white rounded p-1" />
              <img src="https://i.pinimg.com/736x/01/ba/05/01ba05e86a80e5ae357ead428ac61a92.jpg" alt="ApplePay" className="h-6 w-10 object-contain bg-white rounded p-1" />
              <img src="https://i.pinimg.com/474x/e1/05/4d/e1054d8ef7f6daa445f2f2987ee3eff7.jpg" alt="AmericanExpress" className="h-6 w-10 object-contain bg-white rounded p-1" />
              {/* <img src="/api/placeholder/40/25" alt="OtherPayment" className="h-6 w-10 object-contain bg-white rounded p-1" /> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;