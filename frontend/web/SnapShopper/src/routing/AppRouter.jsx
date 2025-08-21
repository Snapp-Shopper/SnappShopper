import { Route, Routes } from "react-router-dom";
import MainLayout from "../components/Layout/MainLayout";
import EmailVerification from "../pages/EmailVerification";
import LoginPage from "../pages/LoginPage";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import Registration from "../pages/Registration";
import Home from "../pages/Home";
import AccountPage from "../pages/AccountPage";
import Cart from "../pages/Cart";
import ProtectedRoute from "./ProtectedRoute";
import Addressbook from "../components/profile/Addressbook";
import AccountSecurity from "../components/profile/AccountSecurity";
import PersonalInfo from "../components/profile/PersonalInfo";
import UserOrders from "../components/profile/UserOrders";
import UserCart from "../components/profile/UserCart";
import UserFavorites from "../components/profile/UserFavorites";
import UserPaymentMethods from "../components/profile/UserPaymentMethods";
import UserBrowsingHistory from "../components/profile/UserBrowsingHistory";
import ProductDetails from "../pages/ProductDetails";
import VendorAuthPage from "../pages/Vendor/VendorAuthPage";
import VendorDashBoard from "../pages/Vendor/VendorDashBoard";
import VendorLayout from "../components/Layout/VendorLayout";
import VendorProducts from "../pages/Vendor/VendorProducts";
import VendorProductForm from "../pages/Vendor/VendorProductForm";
import VendorOrders from "../pages/Vendor/VendorOrders";
import VendorAnalytics from "../pages/Vendor/VendorAnalytics";
import VendorSettings from "../pages/Vendor/VendorSettings";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="account/login" element={<LoginPage />} />
        <Route path="account/registration" element={<Registration />} />
        <Route path="account/forgot-password" element={<ForgotPassword />} />
        <Route path="account/reset-password" element={<ResetPassword />} />
        <Route path="account/email-verification" element={<EmailVerification />} />
        <Route path="product/view" element={<ProductDetails />} />

        {/* <Route path="account/verification-success" element={<VerificationSuccess />} /> */}
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="user/cart" element={<Cart />} />

        {/* Protected Routes */}
        <Route path="account/profile" element={<ProtectedRoute><AccountPage /></ProtectedRoute>}>
          {/* Index route: Renders PersonalInfo when on /account/profile */}
          <Route index element={<PersonalInfo />} />
          {/* Specific nested routes for each section */}
          <Route path="personal-info" element={<PersonalInfo />} />
          <Route path="addresses" element={<Addressbook />} />
          <Route path="security" element={<AccountSecurity />} />
          <Route path="orders" element={<UserOrders />} />
          <Route path="shopping-cart" element={<UserCart />} />
          <Route path="favorites" element={<UserFavorites />} />
          <Route path="payment-methods" element={<UserPaymentMethods />} />
          <Route path="browsing-history" element={<UserBrowsingHistory />} />

          {/* Fallback for unknown sub-paths under /account/profile */}
          <Route path="*" element={<PersonalInfo />} />
        </Route>
      </Route>

      {/* Vendor Routes */}
      <Route path="vendor/auth" element={<VendorAuthPage />} />
      <Route path="vendor" element={<VendorLayout />}>
        <Route index element={<VendorDashBoard />} />
        <Route path="dashboard" element={<VendorDashBoard />} />
        <Route path="products" element={<VendorProducts />} />
        <Route path="products/add" element={<VendorProductForm mode="add" />} />
        <Route path="products/edit/:id" element={<VendorProductForm mode="edit" />} />
        <Route path="products/view/:id" element={<VendorProductForm mode="view" />} />
        <Route path="orders" element={<VendorOrders />} />
        <Route path="analytics" element={<VendorAnalytics />} />
        <Route path="settings" element={<VendorSettings />} />
      </Route>
    </Routes>
  );
};
