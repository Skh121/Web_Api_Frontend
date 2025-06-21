import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Check the current path to determine which button is active
  const isActive = (path) => location.pathname === path;

  // It's good practice to have handlers for both buttons
  const handleNewTrade = () => navigate("/log-trade");
  const handleTradeHistory = () => navigate("/trades");

  return (
    <div>
      <h1 className="text-3xl font-bold text-white">Trade Logging</h1>
      <p className="text-gray-400 mt-1">
        Record your trades with detailed information for better analysis.
      </p>
      <div className="mt-6 border-b border-gray-700">
        <button
          onClick={handleNewTrade}
          className={`py-2 px-4 text-sm font-semibold mr-2 rounded-t-md transition-colors ${
            isActive("/admin/log-trade")
              ? "bg-gray-800 border-b-2 border-blue-500 text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          New Trade
        </button>
        <button
          onClick={handleTradeHistory}
          className={`py-2 px-4 text-sm font-semibold transition-colors rounded-t-md ${
            isActive("/admin/trade-history")
              ? "bg-gray-800 border-b-2 border-blue-500 text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Trade History
        </button>
      </div>
    </div>
  );
};

export default Header;
