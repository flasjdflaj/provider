import React from "react";
import { Menu, Bell, Search } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNotificationStore } from "../../store/notificationStore";
import { Link } from "react-router-dom";

export default function Header({ onMenuClick, title }) {
  const { user } = useAuth();
  const { unreadCount } = useNotificationStore();

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 lg:px-6 relative z-10">
      <div className="flex items-center">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 lg:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-semibold text-gray-900 ml-4">{title}</h1>
      </div>

      <div className="flex items-center space-x-4">
        <Link
          to="/notifications"
          className="relative p-2 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 h-5 w-5 text-xs flex items-center justify-center rounded-full bg-primary-500 text-white">
              {unreadCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
