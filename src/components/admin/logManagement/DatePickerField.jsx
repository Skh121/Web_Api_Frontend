import { FaCalendarAlt } from "react-icons/fa";
import React from "react";
const DatePickerField = ({ label, name, ...props }) => (
  <div className="relative">
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-400 mb-2"
    >
      {label}
    </label>
    <div className="relative">
      <input
        id={name}
        name={name}
        type="date"
        {...props}
        className="appearance-none w-full  border border-gray-600 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent p-2.5 pr-10"
      />
      <FaCalendarAlt className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
  </div>
);
export default DatePickerField;