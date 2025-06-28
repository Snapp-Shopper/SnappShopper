import Breadcrumb from "../components/Breadcrumb";
import SideBar from "../components/profile/Sidebar";
import { Outlet, useLocation } from "react-router-dom";

const AccountPage = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <Breadcrumb />

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Account</h1>
          <p className="text-gray-600">
            Manage your personal information and account settings
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-80 flex-shrink-0">
            <SideBar currentPathname={location.pathname} />
          </div>

          <div className="flex-1"><Outlet /></div>
        </div>
      </main>
    </div>
  );
};

export default AccountPage;
