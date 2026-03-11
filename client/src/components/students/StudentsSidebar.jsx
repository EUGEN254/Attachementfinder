// components/students/StudentsSidebar.jsx
import React from "react";
import {
  MdDashboard,
  MdWork,
  MdAssignment,
  MdBookmark,
  MdMessage,
  MdPerson,
  MdSettings,
  MdLogout,
  MdSchool,
  MdNotifications,
  MdHistory,
  MdHome,
  MdHelp,
  MdClose,
} from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const StudentsSidebar = ({ collapsed = false, onLinkClick }) => {
  const { user, logout } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  // Navigation links
  const navLinks = {
    menu: [
      {
        name: "Dashboard",
        icon: <MdDashboard className="w-5 h-5" />,
        path: "/student/dashboard",
        end: true,
      },
      {
        name: "Find Internships",
        icon: <MdWork className="w-5 h-5" />,
        path: "/student/dashboard/internships",
      },
      {
        name: "My Applications",
        icon: <MdAssignment className="w-5 h-5" />,
        path: "/student/dashboard/applications",
      },
      {
        name: "Saved Internships",
        icon: <MdBookmark className="w-5 h-5" />,
        path: "/student/dashboard/saved",
      },
      {
        name: "Messages",
        icon: <MdMessage className="w-5 h-5" />,
        path: "/student/dashboard/messages",
      },
      {
        name: "Interview History",
        icon: <MdHistory className="w-5 h-5" />,
        path: "/student/dashboard/interviews",
      },
    ],
    other: [
      {
        name: "Home",
        icon: <MdHome className="w-5 h-5" />,
        path: "/",
        onClick: () => navigate("/"),
      },
      {
        name: "Notifications",
        icon: <MdNotifications className="w-5 h-5" />,
        path: "/student/dashboard/notifications",
      },
      {
        name: "Profile",
        icon: <MdPerson className="w-5 h-5" />,
        path: "/student/dashboard/profile",
      },
      {
        name: "Settings",
        icon: <MdSettings className="w-5 h-5" />,
        path: "/student/dashboard/settings",
      },
      {
        name: "Help & Support",
        icon: <MdHelp className="w-5 h-5" />,
        path: "/student/dashboard/help",
      },
      {
        name: "Logout",
        icon: <MdLogout className="w-5 h-5" />,
        danger: true,
        onClick: handleLogout,
      },
    ],
  };

  return (
    <div
      className={`h-full bg-gray-900 text-white shadow-lg flex flex-col overflow-hidden transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Header - Logo and Brand with mobile close button */}
      <div
        className={`p-4 border-b border-gray-700 flex items-center justify-between ${collapsed ? "px-2" : ""}`}
      >
        {collapsed ? (
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mx-auto">
            <span className="text-gray-900 font-bold text-lg">IH</span>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-gray-900 font-bold text-lg">IH</span>
              </div>
              <div>
                <div className="text-xl font-bold text-white">
                  InternshipHub
                </div>
                <div className="text-xs text-gray-400">Student Dashboard</div>
              </div>
            </div>
            {/* Mobile close button */}
            <button
              onClick={onLinkClick}
              className="lg:hidden text-gray-400 hover:text-white p-1 rounded-lg hover:bg-gray-800"
            >
              <MdClose size={20} />
            </button>
          </>
        )}
      </div>

      {/* Navigation */}
      <div
        className={`flex-1 overflow-y-auto ${collapsed ? "px-2" : "px-3"} py-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800`}
      >
        {/* Main Menu */}
        <div className="mb-6">
          {!collapsed && (
            <div className="flex items-center gap-2 mb-3 px-2">
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                Main Menu
              </p>
              <div className="flex-1 border-b border-gray-700"></div>
            </div>
          )}

          <ul className="space-y-1">
            {navLinks.menu.map((link, index) => (
              <li key={index}>
                <NavLink
                  to={link.path}
                  end={link.end}
                  onClick={onLinkClick}
                  className={({ isActive }) =>
                    `flex items-center w-full px-3 py-2.5 rounded-lg transition-colors relative ${
                      isActive
                        ? "bg-white text-gray-900 font-semibold"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    } ${collapsed ? "justify-center" : "gap-3"}`
                  }
                  title={collapsed ? link.name : ""}
                >
                  <span className="text-lg">{link.icon}</span>
                  {!collapsed && (
                    <span className="text-sm font-medium">{link.name}</span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Other Menu */}
        <div>
          {!collapsed && (
            <div className="flex items-center gap-2 mb-3 px-2">
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                Other
              </p>
              <div className="flex-1 border-b border-gray-700"></div>
            </div>
          )}

          <ul className="space-y-1">
            {navLinks.other.map((link, index) => (
              <li key={index}>
                {link.onClick ? (
                  <button
                    onClick={() => {
                      link.onClick();
                      onLinkClick?.();
                    }}
                    className={`flex items-center w-full px-3 py-2.5 rounded-lg transition-colors ${
                      link.danger
                        ? "text-red-400 hover:bg-red-900/20 hover:text-red-300"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    } ${collapsed ? "justify-center" : "gap-3"}`}
                    title={collapsed ? link.name : ""}
                  >
                    <span className="text-lg">{link.icon}</span>
                    {!collapsed && (
                      <span className="text-sm font-medium">{link.name}</span>
                    )}
                  </button>
                ) : (
                  <NavLink
                    to={link.path}
                    onClick={onLinkClick}
                    className={({ isActive }) =>
                      `flex items-center px-3 py-2.5 rounded-lg transition-colors ${
                        isActive
                          ? "bg-white text-gray-900 font-semibold"
                          : "text-gray-300 hover:bg-gray-800 hover:text-white"
                      } ${collapsed ? "justify-center" : "gap-3"}`
                    }
                    title={collapsed ? link.name : ""}
                  >
                    <span className="text-lg">{link.icon}</span>
                    {!collapsed && (
                      <span className="text-sm font-medium">{link.name}</span>
                    )}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* User Profile - Bottom */}
      {!collapsed && (
        <div className="p-4 border-t border-gray-700 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-medium text-sm">
                {user?.name?.charAt(0)?.toUpperCase() || "S"}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate text-white">
                {user?.name || "Student User"}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {user?.email || "student@example.com"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentsSidebar;
