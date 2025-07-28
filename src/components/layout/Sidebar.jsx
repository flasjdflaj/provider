// import React from "react";
// import { NavLink } from "react-router-dom";
// import {
//   Home,
//   Calendar,
//   Book,
//   Settings,
//   LogOut,
//   DollarSign,
//   Building,
//   Users,
//   Store,
// } from "lucide-react";
// import { useAuth } from "../../context/AuthContext";

// export default function Sidebar({ onClose }) {
//   const { user, logout } = useAuth();

//   const navigation = [
//     { name: "Dashboard", href: "/dashboard", icon: Home },
//     { name: "Calendar", href: "/calendar", icon: Calendar },
//     { name: "Bookings", href: "/bookings", icon: Book },
//     { name: "Payments", href: "/payments", icon: DollarSign },
//     { name: "Add New Mandaps", href: "/mandaps/new", icon: Building },
//     { name: "All Mandaps", href: "/mandaps", icon: Building },
//     { name: "Reviews", href: "/reviews", icon: Users },
//     { name: "Vendors", href: "/vendors", icon: Store },
//   ];

//   const handleNavClick = () => {
//     if (onClose) {
//       onClose();
//     }
//   };

//   const handleLogout = () => {
//     logout();
//     if (onClose) {
//       onClose();
//     }
//   };

//   return (
//     <div className="flex flex-col h-full bg-white border-r border-gray-200">
//       {/* Logo */}
//       <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
//         <h1 className="text-xl font-bold text-primary-600">Mandap Pro</h1>
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 px-4 py-6 space-y-2">
//         {navigation.map((item) => (
//           <NavLink
//             key={item.name}
//             to={item.href}
//             className={({ isActive }) =>
//               `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
//                 isActive
//                   ? "bg-primary-100 text-primary-700"
//                   : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
//               }`
//             }
//             onClick={handleNavClick}
//           >
//             <item.icon className="mr-3 h-5 w-5" />
//             {item.name}
//           </NavLink>
//         ))}
//       </nav>

//       {/* User section */}
//       <div className="p-4 border-t border-gray-200">
//         <div className="flex items-center mb-4">
//           <div className="flex-shrink-0">
//             <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
//               <span className="text-sm font-medium text-primary-600">
//                 {user?.name?.charAt(0) || "U"}
//               </span>
//             </div>
//           </div>
//           <div className="ml-3">
//             <p className="text-sm font-medium text-gray-900">{user?.name}</p>
//             <p className="text-xs text-gray-500">{user?.email}</p>
//           </div>
//         </div>

//         <div className="space-y-1">
//           <NavLink
//             to="/settings"
//             className={({ isActive }) =>
//               `flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
//                 isActive
//                   ? "bg-primary-100 text-primary-700"
//                   : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
//               }`
//             }
//             onClick={handleNavClick}
//           >
//             <Settings className="mr-3 h-4 w-4" />
//             Settings
//           </NavLink>

//           <button
//             onClick={handleLogout}
//             className="w-full flex items-center px-4 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors"
//           >
//             <LogOut className="mr-3 h-4 w-4" />
//             Sign out
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Calendar,
  Book,
  Settings,
  LogOut,
  DollarSign,
  Building,
  Users,
  Store,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function Sidebar({ onClose }) {
  const { user, logout } = useAuth();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Calendar", href: "/calendar", icon: Calendar },
    { name: "Bookings", href: "/bookings", icon: Book },
    { name: "Payments", href: "/payments", icon: DollarSign },
    { name: "Add New Mandaps", href: "/mandaps/new", icon: Building },
    { name: "All Mandaps", href: "/mandaps", icon: Building },
    { name: "Reviews", href: "/reviews", icon: Users },
    { name: "Vendors", href: "/vendors", icon: Store },
  ];

  const handleNavClick = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleLogout = () => {
    logout();
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-primary-600">Mandap Pro</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? "bg-primary-100 text-primary-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`
            }
            onClick={handleNavClick}
            // Add 'end' prop to "All Mandaps" to match exact path only
            end={item.name === "All Mandaps"}
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* User section */}
      <div className="p-4 border-t border-gray-200">
        <Link
          to="/profile"
          className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100"
        >
          <div className="flex items-center mb-4">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-primary-600">
                  {user?.name?.charAt(0) || "U"}
                </span>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </div>
        </Link>

        <div className="space-y-1">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors"
          >
            <LogOut className="mr-3 h-4 w-4" />
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
