import React from "react";

const TextAreaField = ({ label, name, ...props }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-400 mb-2">{label}</label>
    <textarea id={name} name={name} rows="5" {...props} className="appearance-none w-full  border border-gray-600 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent p-2.5" />
  </div>
);
export default TextAreaField;