import React, { useState, useRef, useEffect, useContext } from "react";
import { FiSearch, FiMoon, FiBell } from "react-icons/fi";
import { FaRegWindowMaximize } from "react-icons/fa";
import { AuthContext } from "../../auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useGetMyProfile } from "../../hooks/useProfileSettings";
import NotificationBell from "../admin/NotificationBell";

const DashHeader = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logout } = useContext(AuthContext);
  const { data } = useGetMyProfile();
  const initial = user?.fullName.charAt(0).toUpperCase();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <header className="bg-gray-900 p-4 border-b border-gray-700">
      <div className="flex items-center justify-between">
        {/* Left Side: Icon and Search Bar */}
        <div className="flex items-center flex-1">
          <button className="text-gray-400 hover:text-white mr-4">
            <FaRegWindowMaximize size={20} />
          </button>
          <div className="relative w-full max-w-md">
            <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search trades, symbols..."
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Right Side: Icons and Profile Dropdown */}
        <div className="flex items-center space-x-5">
          <button className="text-gray-400 hover:text-white">
            <FiMoon size={22} />
          </button>
          <NotificationBell/>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-9 h-9 bg-gray-700 rounded-full flex items-center justify-center text-white font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white"
            >
              {data?.avatar ? (
                <img
                  src={data.avatar}
                  alt="User Avatar"
                  className="w-9 h-9 rounded-full object-cover"
                />
              ) : (
                initial
              )}
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-60 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10">
                <div className="p-4 border-b border-gray-700">
                  <p className="font-bold text-white">{data?.user?.fullName}</p>
                  <p className="text-sm text-gray-400">{data?.user?.email}</p>
                </div>
                <nav className="py-2">
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate("/settings/profile");
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate("/settings");
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700"
                  >
                    Settings
                  </button>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate("/settings/billing");
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700"
                  >
                    Billing
                  </button>
                  <div className="border-t border-gray-700 my-2"></div>
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-gray-300 hover:bg-gray-700 w-full text-start"
                  >
                    Log out
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashHeader;
