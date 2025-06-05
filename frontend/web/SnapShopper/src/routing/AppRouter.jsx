import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../components/Layout/MainLayout";
import EmailVerification from "../pages/account/EmailVerification";
import LoginPage from "../pages/account/LoginPage";
import ForgotPassword from "../pages/account/ForgotPassword";
import ResetPassword from "../pages/account/ResetPassword";
import Registration from "../pages/account/Registration";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="account/login" element={<LoginPage />} />
        <Route path="account/forgot-password" element={<ForgotPassword />} />
        <Route path="account/reset-password" element={<ResetPassword />} />
        <Route path="account/email-verification" element={<EmailVerification />} />
        <Route path="account/registration" element={<Registration />} />
      </Route>
    </Routes>
  );
};
