import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import {AuthContext} from "../../auth/AuthProvider"; // Assuming this path is correct
import {
  FaTachometerAlt,
  FaRegSun,
  FaStickyNote,
  FaRegChartBar,
  FaRegCalendarAlt,
  FaBolt,
  FaUserCircle,
  FaPenSquare,
  FaShieldAlt,
} from "react-icons/fa";
import SidebarLink from "../commons/SidebarLink";

const Sidebar = () => {
  // You are correctly getting the role from the context
  const { role } = useContext(AuthContext);
  const location = useLocation();

  const navigationLinks = [
    { icon: <FaTachometerAlt size={20} />, text: "Dashboard", path: "/dashboard" },
    { icon: <FaPenSquare size={20} />, text: "Log Trade", path: "/log-trade" },
    { icon: <FaRegChartBar size={20} />, text: "Analytics", path: "/analytics" },
    { icon: <FaStickyNote size={20} />, text: "Reports", path: "/reports" },
    { icon: <FaRegCalendarAlt size={20} />, text: "Calendar", path: "/calendar" },
  ];

  const managementLinks = [
    { icon: <FaRegSun size={20} />, text: "Settings", path: "/settings" },
    // 1. Corrected syntax: 'requiredRole' is a key, and 'admin' is its value.
    {
      icon: <FaShieldAlt size={20} />,
      text: "Admin Panel",
      path: "/admin-panel",
      requiredRole: "admin",
    },
  ];

  // 2. Filter the links based on the role from context BEFORE rendering
  const visibleManagementLinks = managementLinks.filter(link => {
    // If the link doesn't require a role, always show it.
    if (!link.requiredRole) {
      return true;
    }
    // Otherwise, show it only if the user's role matches the required role.
    return role === link.requiredRole;
  });

  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white p-4 z-4">
      <div className="flex flex-col h-screen p-4 bg-gray-900 text-white w-64">
        {/* Logo (unchanged) */}
        <div className="text-3xl font-bold flex justify-start items-center mb-4">
          <FaBolt className="text-blue-500" size={28} />
          <div>
            <span className="text-blue-700">Trade</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
              Verse
            </span>
          </div>
        </div>

        <div className="flex-grow">
          {/* Navigation Section (unchanged) */}
          <div>
            <div className="text-xs uppercase text-gray-500 font-semibold px-3 mt-4 mb-2">
              Navigation
            </div>
            {navigationLinks.map((link) => (
              <SidebarLink
                key={link.text}
                icon={link.icon}
                text={link.text}
                to={link.path}
                active={location.pathname === link.path}
              />
            ))}
          </div>

          {/* Management Section */}
          <div>
            <div className="text-xs uppercase text-gray-500 font-semibold px-3 mt-6 mb-2">
              Management
            </div>
            {/* 3. Map over the NEW filtered list */}
            {visibleManagementLinks.map((link) => (
              <SidebarLink
                key={link.text}
                icon={link.icon}
                text={link.text}
                to={link.path}
                active={location.pathname === link.path}
              />
            ))}
          </div>
        </div>
        
        {/* Profile Section (unchanged) */}
        <div>
          <SidebarLink
            icon={<FaUserCircle size={20} />}
            text="Profile"
            to="/profile"
            active={location.pathname === "/profile"}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;