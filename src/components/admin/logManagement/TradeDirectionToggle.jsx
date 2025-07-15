import { FaChartLine } from "react-icons/fa";
import React from "react";
const TradeDirectionToggle = ({ direction, setDirection }) => (
  <div className="flex items-center  border border-gray-600 rounded-lg p-1 w-min">
    <button
      type="button"
      onClick={() => setDirection("long")}
      className={`flex items-center gap-2 px-6 py-1.5 rounded-md text-sm font-semibold transition-colors ${
        direction === "long"
          ? "bg-green-600/30 text-green-400"
          : "text-gray-400 hover:bg-gray-700"
      }`}
    >
      <FaChartLine /> Long
    </button>
    <button
      type="button"
      onClick={() => setDirection("short")}
      className={`flex items-center gap-2 px-6 py-1.5 rounded-md text-sm font-semibold transition-colors ${
        direction === "short"
          ? "bg-red-600/30 text-red-400"
          : "text-gray-400 hover:bg-gray-700"
      }`}
    >
      Short
    </button>
  </div>
);
export default TradeDirectionToggle;