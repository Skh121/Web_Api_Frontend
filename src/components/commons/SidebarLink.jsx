import React from "react";
import { Link } from "react-router-dom";

const SidebarLink = ({ icon, text, active, to }) => (
  <Link
    to={to}
    className={`
      flex items-center p-3 my-1 text-base font-normal rounded-lg transition-colors
      ${
        active
          ? 'bg-gray-700 text-white font-semibold shadow-lg'
          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
      }
    `}
  >
    {icon}
    <span className="ml-4">{text}</span>
  </Link>
);

export default SidebarLink;