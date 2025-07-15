import React, { useState } from "react";
import { useTradeStats } from "../../hooks/useTradeStats";
import Overview from "../../components/admin/Overview";
import Performance from "../../components/admin/Performance";
import Strategies from "../../components/admin/Strategies";
import RiskAnalysis from "../../components/admin/RiskAnalysis";
import { FiFilter, FiDownload } from "react-icons/fi";
import Calendar from "../../components/admin/Calendar";
import Goal from "../../components/admin/Goal";

const TABS = [
  "Overview",
  "Performance",
  "Strategies",
  "Risk Analysis",
  "Calendar",
  "Goal",
];

const Analytics = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const { data, isLoading } = useTradeStats(); // Fetch data here in the parent

  if (isLoading || !data) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
        Loading Analytics...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Analytics</h1>
            <p className="text-gray-400">
              Deep insights into your trading performance and patterns.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-lg border border-gray-600">
              <FiFilter />
              <span>Filters</span>
            </button>
            <button className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-lg border border-gray-600">
              <FiDownload />
              <span>Export</span>
            </button>
          </div>
        </header>

        {/* Tab Navigation */}
        <div className="border-b border-gray-700 flex">
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

        {/* Render active component and pass data down */}
        <div className="content">
          {activeTab === "Overview" && <Overview data={data} />}
          {activeTab === "Performance" && <Performance data={data} />}
          {activeTab === "Strategies" && <Strategies data={data} />}
          {activeTab === "Risk Analysis" && <RiskAnalysis data={data} />}
          {activeTab === "Calendar" && <Calendar />}
          {activeTab === "Goal" && <Goal/>}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
