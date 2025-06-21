import React, { useState, useEffect } from "react";
import { useAdminUser } from "../../hooks/useAdminUser";
import {
  FaUsers,
  FaChartLine,
  FaDollarSign,
  FaSearch,
  FaEllipsisH,
  FaUserShield,
  FaTrashAlt,
} from "react-icons/fa";
import useDeleteUser from "../../hooks/useDeleteUser";
import { toast } from "react-toastify"; // Added import

// Helper function to format dates nicely (e.g., 2025-06-18)
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-CA");
};

// Helper to format numbers as currency
const formatCurrency = (number) => {
  if (typeof number !== "number") return "$...";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);
};

// Reusable Stat Card Component
const StatCard = ({ icon, title, value, change }) => (
  <div className="bg-gray-900 p-6 rounded-lg shadow-md">
    <div className="flex items-center text-gray-400">
      {icon}
      <h3 className="text-sm font-medium ml-2">{title}</h3>
    </div>
    <div className="mt-4">
      <p className="text-3xl font-bold text-white">{value}</p>
      <p className="text-sm text-green-500 mt-1">{change}</p>
    </div>
  </div>
);

const AdminPanel = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); // For the input value
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [openMenu, setOpenMenu] = useState(null);
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setPage(1); // Reset to page 1 when a new search is made
    }, 500); // 500ms delay

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  const [activeTab, setActiveTab] = useState("User Management");
  const tabs = [
    "User Management",
    "System Analytics",
    "Feature Flags",
    "System Settings",
  ];

  const { data, isLoading, isError, error, isFetching } = useAdminUser(
    page,
    5,
    debouncedSearchTerm
  );
  const users = data?.users || [];
  const totalPages = data?.totalPages || 0;

  const handleDelete = (user) => {
    if (
      window.confirm(
        `Are you sure you want to delete ${user.fullName}? This action cannot be undone.`
      )
    ) {
      try {
        deleteUser(user._id);
        toast.success(`${user.fullName} has been deleted successfully.`);
      } catch (error) {
        toast.error("Failed to delete the user. Please try again.");
      }
    }
    setOpenMenu(null);
  };

  return (
    <div className="bg-black min-h-screen text-white p-8 font-sans">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <p className="text-gray-400 mt-1">
            Manage users, monitor system health, and configure platform
            settings.
          </p>
        </div>
        <button className="flex items-center bg-gray-800 hover:bg-gray-700 text-sm font-medium py-2 px-4 rounded-lg">
          <FaUserShield className="text-red-500 mr-2" />
          Admin Access
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<FaUsers />}
          title="Total Users"
          value={data?.totalUsers ?? "..."}
          change=""
        />
        <StatCard
          icon={<FaChartLine />}
          title="Active Users"
          value={data?.activeUserCount ?? "..."}
          change=""
        />
        <StatCard
          icon={<FaDollarSign />}
          title="Total Revenue"
          value={formatCurrency(data?.totalRevenue)}
          change=""
        />
        <StatCard
          icon={<FaUsers />}
          title="Inactive Users"
          value={data?.inactiveUsersCount ?? "..."}
          change=""
        />
      </div>

      <nav className="border-b border-gray-700 mb-8">
        <ul className="flex space-x-6">
          {tabs.map((tab) => (
            <li key={tab}>
              <button
                onClick={() => setActiveTab(tab)}
                className={`py-3 px-1 text-sm font-medium border-b-2 transition-colors duration-200 ${
                  activeTab === tab
                    ? "border-blue-500 text-white"
                    : "border-transparent text-gray-400 hover:text-white hover:border-gray-500"
                }`}
              >
                {tab}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <main>
        {activeTab === "User Management" && (
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <div className="relative">
                <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                  placeholder="Search users..."
                  className="bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div
              className={`transition-opacity duration-300 ${
                isFetching ? "opacity-50" : "opacity-100"
              }`}
            >
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-400 uppercase bg-gray-800">
                    <tr>
                      <th className="px-6 py-3">User</th>
                      <th className="px-6 py-3">Plan</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">Start Date</th>
                      <th className="px-6 py-3">Expiry Date</th>
                      <th className="px-6 py-3">Join Date</th>
                      <th className="px-6 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <tr>
                        <td colSpan="7" className="text-center py-10">
                          Loading data...
                        </td>
                      </tr>
                    ) : isError ? (
                      <tr>
                        <td
                          colSpan="7"
                          className="text-center py-10 text-red-500"
                        >
                          Error: {error.message}
                        </td>
                      </tr>
                    ) : (
                      users.map((user) => (
                        <tr
                          key={user.email}
                          className="border-b border-gray-800 hover:bg-gray-800/50"
                        >
                          <td className="px-6 py-4">
                            <div className="font-medium text-white">
                              {user.fullName}
                            </div>
                            <div className="text-gray-400">{user.email}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                user.plan === "Pro"
                                  ? "bg-purple-600/30 text-purple-300"
                                  : "bg-gray-600/30 text-gray-300"
                              }`}
                            >
                              {user.plan || "Not Subscribed"}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                user.status === "active"
                                  ? "bg-green-600/30 text-green-300"
                                  : "bg-red-600/30 text-red-300"
                              }`}
                            >
                              {user.status || "Inactive"}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            {formatDate(user.startDate)}
                          </td>
                          <td className="px-6 py-4">
                            {formatDate(user.endDate)}
                          </td>
                          <td className="px-6 py-4">
                            {formatDate(user.joinDate)}
                          </td>
                          <td className="px-6 py-4 text-right relative">
                            <button
                              onClick={() =>
                                setOpenMenu(
                                  openMenu === user._id ? null : user._id
                                )
                              }
                              className={`p-2 rounded-full transition-colors ${
                                openMenu === user._id
                                  ? "bg-blue-500/20"
                                  : "hover:bg-gray-700"
                              }`}
                            >
                              <FaEllipsisH
                                className={`${
                                  openMenu === user._id
                                    ? "text-blue-400"
                                    : "text-gray-400"
                                }`}
                              />
                            </button>
                            {openMenu === user._id && (
                              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-10 text-left">
                                <ul className="py-2">
                                  <li>
                                    <button
                                      onClick={() => handleDelete(user)}
                                      className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                    >
                                      <FaTrashAlt className="mr-3" />
                                      Delete User
                                    </button>
                                  </li>
                                </ul>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between items-center mt-6 text-sm">
                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className="bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium py-2 px-4 rounded-lg"
                >
                  Previous
                </button>
                <span>
                  Page {data?.currentPage || page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage((prev) => prev + 1)}
                  disabled={page === totalPages || users.length === 0}
                  className="bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium py-2 px-4 rounded-lg"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPanel;
