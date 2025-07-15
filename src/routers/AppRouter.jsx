import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import MainLayout from "../layouts/MainLayout";
import HeroSection from "../layouts/HeroSection";
import Payment from "../pages/Payment";
import Checkout from "../pages/Checkout";
import PlanProviderContext from "../auth/PlanContext";
import Dashboard from "../pages/member/Dashboard";
import DashboardLayout from "../layouts/DashboardLayout";
import LogTrade from "../pages/member/LogTrade";
import Analytics from "../pages/member/Analytics";
import Reports from "../pages/member/Reports";
import Settings from "../pages/member/Settings";
import AdminPanel from "../pages/admin/AdminPanel";
import TradeHistory from "../components/admin/TradeHistory";
import EditTrade from "../pages/member/EditTrade";
import ProfileSettings from "../components/admin/ProfileSettings";
import BillingSettings from "../components/admin/BillingSettings";
import SecuritySettings from "../components/admin/SecuritySetting";
import ChatPage from "../pages/member/ChatPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import RequestResetPasswordPage from "../pages/RequestResetPasswordPage";

const AppRouter = () => {
  return (
      <PlanProviderContext>
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<HeroSection />}></Route>
              <Route path="/login" element={<LoginPage />}></Route>
              <Route path="/signup" element={<SignupPage />}></Route>
            </Route>
            <Route path="/payment" element={<Payment />}></Route>
            <Route
              path="/reset-password/:token"
              element={<ResetPasswordPage />}
            ></Route>
            <Route
              path="/request-reset-password"
              element={<RequestResetPasswordPage />}
            ></Route>
            <Route path="/payment/checkout" element={<Checkout />}></Route>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />}></Route>
              <Route path="/log/edit/:id" element={<EditTrade />} />
              <Route path="/analytics" element={<Analytics />}></Route>
              <Route path="/reports" element={<Reports />}></Route>
              <Route path="/chat" element={<ChatPage />}></Route>
              <Route path="/settings" element={<Settings />}>
                <Route path="profile" element={<ProfileSettings />} />
                <Route path="billing" element={<BillingSettings />} />
                <Route path="security" element={<SecuritySettings />} />
              </Route>
              <Route path="/logs" element={<LogTrade />}>
                <Route path="log-trade" element={<LogTrade />}></Route>
                <Route path="trades" element={<TradeHistory />}></Route>
              </Route>
              <Route path="/admin-panel" element={<AdminPanel />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </PlanProviderContext>
  );
};

export default AppRouter;
