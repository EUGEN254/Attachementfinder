// components/students/StudentDashboardLayout.jsx
import React, { useState, useRef, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  MdMenu,
  MdChevronLeft,
  MdChevronRight,
  MdNotifications,
  MdPerson,
  MdSettings,
  MdLogout,
  MdEmail,
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
} from "react-icons/md";
import StudentsSidebar from "./StudentsSidebar";
import TopNavbar from "../TopNavbar";
import { useAppContext } from "../../context/AppContext";

const StudentDashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { user, logout } = useAppContext();
  const navigate = useNavigate();
  const profileMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar with responsive behavior */}
      <div
        className={`
        fixed lg:static inset-y-0 left-0 z-30
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <StudentsSidebar
          collapsed={sidebarCollapsed}
          onLinkClick={() => setSidebarOpen(false)}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col h-screen">
        {/* TopNavbar */}
        <TopNavbar />

        {/* Top Bar */}
        <div className="bg-white shadow-sm sticky top-0 z-10 flex-shrink-0">
          <div className="flex items-center justify-between px-4 h-12">
            {/* Left side */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100"
              >
                <MdMenu size={24} />
              </button>

              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="hidden lg:flex items-center justify-center w-8 h-8 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {sidebarCollapsed ? (
                  <MdChevronRight size={20} />
                ) : (
                  <MdChevronLeft size={20} />
                )}
              </button>

              <span className="font-semibold text-gray-900 lg:hidden">
                Student Dashboard
              </span>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">
              {user && (
                <span className="hidden lg:inline text-sm text-gray-600">
                  Welcome,{" "}
                  <span className="font-semibold text-gray-900">
                    {user.name}
                  </span>
                </span>
              )}

              <button
                onClick={() => navigate("/student/dashboard/notifications")}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg relative"
              >
                <MdNotifications size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Profile dropdown */}
              <div className="relative" ref={profileMenuRef}>
                <button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="flex items-center gap-1 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <MdPerson size={20} />
                  {profileMenuOpen ? (
                    <MdKeyboardArrowUp size={16} className="hidden sm:block" />
                  ) : (
                    <MdKeyboardArrowDown
                      size={16}
                      className="hidden sm:block"
                    />
                  )}
                </button>

                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 border border-gray-200 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">
                        {user?.name || "Student User"}
                      </p>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                        <MdEmail size={12} />
                        {user?.email || "student@example.com"}
                      </p>
                    </div>

                    <div className="py-2">
                      <button
                        onClick={() => {
                          navigate("/student/dashboard/profile");
                          setProfileMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <MdPerson size={16} className="text-gray-500" />
                        Your Profile
                      </button>

                      <button
                        onClick={() => {
                          navigate("/student/dashboard/settings");
                          setProfileMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <MdSettings size={16} className="text-gray-500" />
                        Settings
                      </button>
                    </div>

                    <div className="border-t border-gray-100 py-2">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <MdLogout size={16} />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Page Content - Scrollable Area with Fixed Height */}
        <main className="flex-1 p-4 lg:p-10 overflow-y-auto modern-scrollbar ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentDashboardLayout;
