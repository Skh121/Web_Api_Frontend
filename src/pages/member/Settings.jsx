import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

// Define tabs and their routes
const TABS = [
  { name: "Profile", path: "profile" },
  { name: "Billing", path: "billing" },
  { name: "Security", path: "security" },
];

const Settings = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Derive active tab from URL
  const currentTab = TABS.find(tab => location.pathname.includes(tab.path))?.name || "Profile";

  useEffect(() => {
    if (location.pathname === "/settings") {
      navigate("profile"); // default tab
    }
  }, [location.pathname, navigate]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <p className="text-gray-400">Manage your account settings and preferences.</p>
        </header>

        {/* Tab Navigation */}
        <div className="border-b border-gray-700 flex">
          {TABS.map((tab) => (
            <button
              key={tab.name}
              onClick={() => navigate(tab.path)}
              className={`py-3 px-5 text-sm font-medium transition-colors duration-200 border-b-2
                ${
                  currentTab === tab.name
                    ? "border-blue-500 text-white"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Render Active Component */}
        <div className="content mt-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Settings;
