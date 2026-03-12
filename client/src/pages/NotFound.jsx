// pages/NotFound.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  MdArrowBack,
  MdHome,
  MdSearch,
  MdHelp,
  MdEmail,
  MdWarning,
  MdExplore,
  MdWork,
  MdSchool,
} from "react-icons/md";

const NotFound = () => {
  const navigate = useNavigate();

  const suggestions = [
    { icon: <MdHome />, text: "Go to Homepage", path: "/" },
    { icon: <MdWork />, text: "Browse Internships", path: "/internships" },
    { icon: <MdSchool />, text: "How It Works", path: "/how-it-works" },
    { icon: <MdHelp />, text: "Help Center", path: "/faq" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full">
        {/* Main content */}
        <div className="text-center mb-8">
          {/* Large 404 graphic */}
          <div className="relative mb-8">
            <div className="text-[12rem] md:text-[16rem] font-bold text-gray-200 leading-none select-none">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white bg-opacity-90 p-6 rounded-2xl shadow-xl">
                <div className="w-24 h-24 bg-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MdWarning size={48} className="text-white" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  Page Not Found
                </h1>
                <p className="text-gray-600">
                  The page you're looking for doesn't exist or has been moved.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search suggestion */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <MdSearch size={20} className="text-gray-600" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">Looking for something?</h2>
              <p className="text-sm text-gray-500">Try searching our platform</p>
            </div>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search internships, companies, resources..."
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
            <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>

        {/* Quick links */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => navigate(suggestion.path)}
              className="bg-white border border-gray-100 rounded-xl p-4 hover:border-gray-200 hover:shadow-sm transition group text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 group-hover:bg-gray-200 transition">
                  {suggestion.icon}
                </div>
                <div>
                  <span className="font-medium text-gray-900">{suggestion.text}</span>
                  <p className="text-xs text-gray-400 mt-0.5">Click to visit</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Help section */}
        <div className="bg-gray-900 rounded-2xl p-6 text-white">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-semibold mb-1">Still can't find what you need?</h3>
              <p className="text-sm text-gray-300">
                Our support team is ready to help you find the right path.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigate("/contact")}
                className="px-5 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition font-medium flex items-center gap-2"
              >
                <MdEmail size={16} />
                Contact Us
              </button>
              <button
                onClick={() => navigate(-1)}
                className="px-5 py-2 border border-gray-700 rounded-lg hover:bg-gray-800 transition flex items-center gap-2"
              >
                <MdArrowBack size={16} />
                Go Back
              </button>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">
            Error 404 • The requested URL was not found on this server
          </p>
          <div className="flex justify-center gap-4 mt-4 text-xs text-gray-300">
            <button onClick={() => navigate("/")} className="hover:text-gray-900">Home</button>
            <span>•</span>
            <button onClick={() => navigate("/privacy")} className="hover:text-gray-900">Privacy</button>
            <span>•</span>
            <button onClick={() => navigate("/terms")} className="hover:text-gray-900">Terms</button>
            <span>•</span>
            <button onClick={() => navigate("/sitemap")} className="hover:text-gray-900">Sitemap</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;