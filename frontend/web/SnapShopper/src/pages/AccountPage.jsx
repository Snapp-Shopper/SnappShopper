import Breadcrumb from "../components/Breadcrumb";
import SideBar from "../components/profile/Sidebar"; // Corrected path
import { Outlet, useLocation } from "react-router-dom";

const AccountPage = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50 font-inter"> {/* Changed background to a soft gray */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Header Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <Breadcrumb />
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-4 mb-2">My Account</h1>
          <p className="text-lg text-gray-600">
            Manage your personal information, addresses, orders, and account settings.
          </p>
        </div>

        {/* Content Area: Sidebar and Outlet */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <SideBar currentPathname={location.pathname} />
          </div>

          {/* Main Content (Outlet) */}
          <div className="flex-1">
            {/* Outlet content will now automatically have a consistent card-like background */}
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AccountPage;
