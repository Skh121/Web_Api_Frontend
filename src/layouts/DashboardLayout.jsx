import React from "react";
import Sidebar from "../components/commons/Sidebar";
import DashHeader from "../components/commons/DashHeader"
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
   <div className="flex bg-gray-900">
      <Sidebar />
      <div className="flex-1 ml-64">
        <DashHeader />
        <main className="px-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
