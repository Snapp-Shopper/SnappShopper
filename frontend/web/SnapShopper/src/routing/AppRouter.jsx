import React from "react";
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

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="account/login" element={<LoginPage />} />
        <Route path="account/registration" element={<Registration />} />
        <Route path="account/forgot-password" element={<ForgotPassword />} />
        <Route path="account/reset-password" element={<ResetPassword />} />
        <Route
          path="account/email-verification"
          element={<EmailVerification />}
        />
        
        {/* <Route path="account/verification-success" element={<VerificationSuccess />} /> */}
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="user/cart" element={<Cart />} />

        {/* Protected Routes */}
        <Route
          path="account/profile"
          element={
            <ProtectedRoute>
              <AccountPage />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
};
