import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const getTitleFromPath = (path) => {
    const pathMap = {
      "/dashboard": "Dashboard",
      "/calendar": "Booking Calendar",
      "/bookings": "Bookings",
      "/payments": "Payments",
      "/mandaps": "Mandaps",
      "/mandaps/new": "Add New Mandap",
      "/mandaps/edit": "Edit Mandap",
      "/reviews": "Reviews",
      "/profile": "Profile",
      "/vendors": "Vendors",
      "/notifications": "Notifications",
    };

    // Extract base path for dynamic routes
    if (path.startsWith("/mandaps/edit/")) {
      return "Edit Mandap";
    }
    if (path.includes("/reviews")) {
      return "Reviews";
    }

    return pathMap[path] || "Dashboard";
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0 lg:z-auto
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <Sidebar onClose={closeSidebar} />
      </div>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden lg:w-full">
        <Header
          onMenuClick={toggleSidebar}
          title={getTitleFromPath(location.pathname)}
        />

        <main className="flex-1 relative overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
