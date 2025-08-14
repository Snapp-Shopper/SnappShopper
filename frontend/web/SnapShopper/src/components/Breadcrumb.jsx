import React from "react";
import { Link } from "react-router-dom"; // Use Link for navigation

const Breadcrumb = () => {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-500">
      <Link to="/" className="hover:text-blue-600 transition-colors">
        Home
      </Link>
      <span className="text-gray-400">/</span>
      <span className="font-medium text-blue-600">My Account</span>
    </nav>
  );
};

export default Breadcrumb;
