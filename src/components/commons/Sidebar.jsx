import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/AuthProvider";
import {
  FaTachometerAlt,
  FaRegSun,
  FaStickyNote,
  FaRegChartBar,
  FaBolt,
  FaPenSquare,
  FaShieldAlt,
  FaSignOutAlt,
  FaRegCommentDots 
} from "react-icons/fa";
import SidebarLink from "../commons/SidebarLink";

const Sidebar = () => {
  const { role, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navigationLinks = [
    {
      icon: <FaTachometerAlt size={20} />,
      text: "Dashboard",
      path: "/dashboard",
    },
    { icon: <FaPenSquare size={20} />, text: "Log Trade", path: "/logs" },
    {
      icon: <FaRegChartBar size={20} />,
      text: "Analytics",
      path: "/analytics",
    },
    { icon: <FaStickyNote size={20} />, text: "Reports", path: "/reports" },
    { icon: <FaRegCommentDots  size={20} />, text: "Chat", path: "/chat" },
  ];

  const managementLinks = [
    { icon: <FaRegSun size={20} />, text: "Settings", path: "/settings" },
    {
      icon: <FaShieldAlt size={20} />,
      text: "Admin Panel",
      path: "/admin-panel",
      requiredRole: "admin",
    },
  ];

  const visibleManagementLinks = managementLinks.filter((link) => {
    if (!link.requiredRole) return true;
    return role === link.requiredRole;
  });

  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white p-4 z-4">
      <div className="flex flex-col h-screen p-4 bg-gray-900 text-white w-64">
        {/* Logo */}
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
          {/* Navigation */}
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

          {/* Management */}
          <div>
            <div className="text-xs uppercase text-gray-500 font-semibold px-3 mt-6 mb-2">
              Management
            </div>
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

        {/* Logout Button */}
        <div>
          <button
            onClick={handleLogout}
            className={`flex items-center w-full text-left px-4 py-2 rounded-md hover:bg-gray-700 ${
              location.pathname === "/logout" ? "bg-gray-800" : ""
            }`}
          >
            <FaSignOutAlt size={20} className="mr-3" />
            <span>Log out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
