import { FaChevronDown } from "react-icons/fa";
import React from "react";
const SelectField = ({ label, name, children, ...props }) => (
  <div className="relative">
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-400 mb-2"
    >
      {label}
    </label>
    <select
      id={name}
      name={name}
      {...props}
      className="appearance-none w-full bg-gray-900  border border-gray-600 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent p-2.5 pr-10"
    >
      {children}
    </select>
    <FaChevronDown className="absolute right-3 top-1/2 mt-2.5 text-gray-400 pointer-events-none" />
  </div>
);
export default SelectField;
