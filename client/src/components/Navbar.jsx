import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// React Icons
import {
  MdMenu,
  MdClose,
  MdLogin,
  MdBookmark,
  MdTrackChanges,
  MdMenuBook,
  MdPerson,
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
  MdEmail,
  MdSettings,
  MdLogout,
} from "react-icons/md";
import TopNavbar from "./TopNavbar";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAppContext();

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

  const navLinks = [
   
    { name: "Internships", path: "/internships" },
    { name: "Companies", path: "/companies" },
     { name: "How It Works", path: "/how-it-works" },
    ...(user
      ? [{ name: "My Applications", path: "/student/dashboard/applications" }]
      : []),
  ];

  const moreLinks = [
    {
      title: "Saved Internships",
      description: "View internships you bookmarked",
      icon: <MdBookmark size={20} />,
    },
    {
      title: "Application Tracker",
      description: "Track the status of applications",
      icon: <MdTrackChanges size={20} />,
    },
    {
      title: "Career Resources",
      description: "Resume & interview tips",
      icon: <MdMenuBook size={20} />,
    },
  ];

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-200 fixed w-full top-0 z-50">
      <TopNavbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-xl font-semibold">
            InternshipHub
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Links */}
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-sm font-medium px-3 py-2 rounded-full hover:bg-gray-100 transition"
              >
                {link.name}
              </Link>
            ))}

            {/* Clerk-style More dropdown */}
            <div className="relative">
              <button
                onClick={() => setMoreOpen(!moreOpen)}
                className="text-sm font-medium px-3 py-2 rounded-full hover:bg-gray-100 flex items-center transition"
              >
                More
                <svg
                  className={`ml-1 h-4 w-4 transition-transform ${
                    moreOpen ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4z"
                  />
                </svg>
              </button>

              {moreOpen && (
                <div className="absolute right-0 mt-3 w-72 bg-white border border-gray-200 shadow-lg rounded-xl p-3 z-50">
                  {" "}
                  {/* Added z-50 here */}
                  {moreLinks.map((item) => (
                    <Link
                      key={item.title}
                      to="#"
                      className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition"
                    >
                      <div className="bg-gray-100 text-black p-2 rounded-lg">
                        {item.icon}
                      </div>

                      <div>
                        <p className="font-semibold text-sm">{item.title}</p>
                        <p className="text-xs text-gray-500">
                          {item.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Login icon */}
            {user ? (
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
            ) : (
              <>
                <MdLogin
                  size={22}
                  onClick={() => navigate("/create-account")}
                  className="cursor-pointer hover:text-gray-500 transition"
                />
                <button
                  onClick={() => navigate("/create-account")}
                  className="bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 transition"
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          {/* Mobile Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <MdClose size={28} /> : <MdMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white border-b border-gray-200 relative z-50">
          {" "}
          {/* Added relative and z-50 */}
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="block px-3 py-2 rounded-md text-base hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <button
            onClick={() => {
              navigate("/create-account");
              setIsOpen(false);
            }}
            className="w-full bg-black text-white py-2 rounded-full mt-3"
          >
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
