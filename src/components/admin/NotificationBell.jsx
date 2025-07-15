import React, { useState, useEffect, useContext, useRef } from "react";
import { FiBell } from "react-icons/fi";
import {
  useGetNotifications,
  useMarkAsRead,
} from "../../hooks/useNotification";
import { AuthContext } from "../../auth/AuthProvider";
import { formatDistanceToNow } from "date-fns";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

const socket = io.connect("http://localhost:5050");

const NotificationBell = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { data: notifications, refetch } = useGetNotifications();
  const { mutate: markAsRead } = useMarkAsRead();

  const unreadCount = notifications?.filter((n) => !n.isRead).length || 0;

  useEffect(() => {
    if (user?._id) {
      socket.emit("join_user_room", user._id);
      const handleNewNotification = () => refetch();
      socket.on("new_notification", handleNewNotification);
      return () => socket.off("new_notification", handleNewNotification);
    }
  }, [user, refetch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen && unreadCount > 0) {
      markAsRead();
    }
  };

  const handleNotificationClick = (notification) => {
    setIsOpen(false);
    if (notification.link) {
      navigate(notification.link);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={handleToggleDropdown}
        className="relative text-gray-400 hover:text-white"
      >
        <FiBell size={22} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 text-white text-xs items-center justify-center">
              {unreadCount}
            </span>
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
          <div className="p-3 font-bold text-white border-b border-gray-700">
            Notifications
          </div>
          <ul className="max-h-96 overflow-y-auto">
            {notifications && notifications.length > 0 ? (
              notifications.map((n) => (
                <li
                  key={n._id}
                  onClick={() => handleNotificationClick(n)}
                  className={`p-3 border-b border-gray-700 last:border-b-0 hover:bg-gray-700 cursor-pointer ${
                    !n.isRead ? "bg-blue-500/10" : ""
                  }`}
                >
                  <p className="text-sm text-white">{n.text}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDistanceToNow(new Date(n.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </li>
              ))
            ) : (
              <li className="p-4 text-center text-sm text-gray-500">
                You have no new notifications.
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
