// components/admin/Log Management/InputField.jsx

import React from "react";

// This is now a "dumb" component that just receives props. No Formik hooks here.
const InputField = ({ label, name, type, value, onChange, onBlur, error, placeholder }) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-400 mb-2">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="appearance-none w-full bg-gray-800 border border-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent p-2.5"
      />
      {/* Display the error if it's passed as a prop */}
      {error ? (
        <div className="text-red-500 text-sm mt-1">{error}</div>
      ) : null}
    </div>
  );
};

export default InputField;