import { FaSave } from "react-icons/fa";
import React from "react";
const ActionButtons = () => (
  <div className="flex items-center justify-end gap-4 pt-4">
    <button
      type="button"
      className="bg-gray-900 text-gray-200 font-semibold py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors"
    >
      Save as Draft
    </button>
    <button
      type="submit"
      className="flex items-center gap-2 bg-white text-black font-semibold py-3 px-12 rounded-lg hover:bg-gray-200 transition-colors"
    >
      <FaSave /> Save Trade
    </button>
  </div>
);
export default ActionButtons;
