import React, { useState } from "react";
import Header from "../../components/admin/logManagement/Header";
import LogTradeForm from "../../components/admin/LogTradeForm";
import TradeHistory from "../../components/admin/TradeHistory";

const TABS = ["New Trade", "Trade History"];

const LogTrade = () => {
  const [activeTab, setActiveTab] = useState("New Trade");

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Header />

        <div className="mt-6 border-b border-gray-700 flex">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 px-6 text-sm font-medium transition-colors duration-200 ${
                activeTab === tab
                  ? "bg-gray-700 text-white"
                  : "text-gray-400 hover:bg-gray-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {activeTab === "New Trade" && <LogTradeForm />}
          {activeTab === "Trade History" && <TradeHistory />}
        </div>
      </div>
    </div>
  );
};

export default LogTrade;
