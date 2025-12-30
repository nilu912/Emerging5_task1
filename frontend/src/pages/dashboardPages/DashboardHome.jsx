import React from "react";
import SidebarDrower from "../../components/SidebarDrawer.jsx";
const DashboardHome = () => {
  return (
    <div className="w-full h-[70vh] bg-white p-4 shadow-lg border border-gray-300 rounded-lg min-w-[20rem] overflow-x-auto">
      <p className="text-blue-800flex gap-1">DashboardHome</p>
      <SidebarDrower />
    </div>
  );
};

export default DashboardHome;
