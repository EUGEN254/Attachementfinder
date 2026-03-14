// pages/MyApplication.jsx
import React from "react";
import {
  MdWork,
  MdLocationOn,
  MdAccessTime,
  MdAttachMoney,
  MdPerson,
  MdSchool,
  MdEmail,
  MdCheckCircle,
  MdPending,
  MdCancel,
  MdSchedule,
  MdArrowBack,
  MdLogin,
  MdRefresh,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import useStudentApplications from "../hooks/useStudentApplications";

const MyApplication = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAppContext();
  
  // Use our custom hook
  const {
    applications,
    statusCounts,
    selectedStatus,
    changeStatusFilter,
    withdrawApplication,
    refresh,
    loading,
    error,
    hasApplications,
    isEmpty,
    isFetching,
  } = useStudentApplications("all");

  // Status badge component (same as before)
  const StatusBadge = ({ status }) => {
    const getStatusStyles = () => {
      switch (status?.toLowerCase()) {
        case "accepted":
          return "bg-green-100 text-green-700 border-green-200";
        case "interview scheduled":
          return "bg-blue-100 text-blue-700 border-blue-200";
        case "pending":
        case "under review":
          return "bg-yellow-100 text-yellow-700 border-yellow-200";
        case "rejected":
          return "bg-red-100 text-red-700 border-red-200";
        case "withdrawn":
          return "bg-gray-100 text-gray-700 border-gray-200";
        default:
          return "bg-gray-100 text-gray-700 border-gray-200";
      }
    };

    const getStatusIcon = () => {
      switch (status?.toLowerCase()) {
        case "accepted":
          return <MdCheckCircle className="mr-1" size={14} />;
        case "interview scheduled":
          return <MdSchedule className="mr-1" size={14} />;
        case "pending":
        case "under review":
          return <MdPending className="mr-1" size={14} />;
        case "rejected":
          return <MdCancel className="mr-1" size={14} />;
        case "withdrawn":
          return <MdCancel className="mr-1" size={14} />;
        default:
          return null;
      }
    };

    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyles()}`}
      >
        {getStatusIcon()}
        {status}
      </span>
    );
  };

  // Format date helper
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Not Authenticated View (same as before)
  if (!isAuthenticated) {
    return (
      <section className="mt-10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <MdArrowBack size={20} className="mr-1" />
            Go Back
          </button>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Header Image/Gradient */}
            <div className="h-28 bg-gradient-to-r from-gray-800 to-gray-900 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <MdWork size={34} className="text-white opacity-50" />
              </div>
            </div>

            {/* Content */}
            <div className="p-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Track Your Applications
              </h2>

              <p className="text-gray-600 max-w-md mx-auto mb-8">
                Sign in to view and track all your internship applications in
                one place. Get real-time updates on your application status.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate("/login")}
                  className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors text-lg font-medium"
                >
                  <MdLogin className="mr-2" size={20} />
                  Sign In to View Applications
                </button>

                <button
                  onClick={() => navigate("/find-internship")}
                  className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-lg font-medium"
                >
                  Browse Internships
                </button>
              </div>

              {/* Feature List */}
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-gray-200 pt-8">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
                    <MdCheckCircle size={24} className="text-gray-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Track Status
                  </h3>
                  <p className="text-sm text-gray-500">
                    Real-time updates on your applications
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
                    <MdSchedule size={24} className="text-gray-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Interview Schedule
                  </h3>
                  <p className="text-sm text-gray-500">
                    Never miss an interview date
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
                    <MdWork size={24} className="text-gray-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    All Applications
                  </h3>
                  <p className="text-sm text-gray-500">
                    View all your applications in one place
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Loading State
  if (loading) {
    return (
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                      <div className="flex-1">
                        <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error State
  if (error) {
    return (
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-4xl mb-3">⚠️</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Something went wrong</h3>
            <p className="text-sm text-gray-600 mb-6">{error}</p>
            <button
              onClick={refresh}
              className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <MdRefresh className="mr-2" size={18} />
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Authenticated View
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with User Info and Refresh */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center border-2 border-gray-200">
                <MdPerson size={32} className="text-gray-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {user?.name || "Student User"}
                </h1>
                <div className="flex flex-wrap gap-3 mt-1">
                  <span className="flex items-center text-sm text-gray-600">
                    <MdEmail className="mr-1" size={14} />
                    {user?.email || "student@example.com"}
                  </span>
                  <span className="flex items-center text-sm text-gray-600">
                    <MdSchool className="mr-1" size={14} />
                    Student
                  </span>
                </div>
              </div>
            </div>
            
            {/* Refresh Button */}
            <button
              onClick={refresh}
              disabled={isFetching}
              className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <MdRefresh className={`mr-2 ${isFetching ? 'animate-spin' : ''}`} size={18} />
              {isFetching ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
        </div>

        {/* Applications Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              My Applications ({statusCounts.all})
            </h2>

            {/* Status Filter Tabs */}
            {hasApplications && (
              <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                <button
                  onClick={() => changeStatusFilter("all")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedStatus === "all"
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  All ({statusCounts.all})
                </button>
                <button
                  onClick={() => changeStatusFilter("pending")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedStatus === "pending"
                      ? "bg-yellow-600 text-white"
                      : "bg-yellow-50 text-yellow-700 hover:bg-yellow-100"
                  }`}
                >
                  Pending ({statusCounts.pending})
                </button>
                <button
                  onClick={() => changeStatusFilter("interview")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedStatus === "interview"
                      ? "bg-blue-600 text-white"
                      : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                  }`}
                >
                  Interview ({statusCounts.interview})
                </button>
                <button
                  onClick={() => changeStatusFilter("accepted")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedStatus === "accepted"
                      ? "bg-green-600 text-white"
                      : "bg-green-50 text-green-700 hover:bg-green-100"
                  }`}
                >
                  Accepted ({statusCounts.accepted})
                </button>
                <button
                  onClick={() => changeStatusFilter("rejected")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedStatus === "rejected"
                      ? "bg-red-600 text-white"
                      : "bg-red-50 text-red-700 hover:bg-red-100"
                  }`}
                >
                  Rejected ({statusCounts.rejected})
                </button>
              </div>
            )}
          </div>

          {/* Applications Grid */}
          {applications.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                      {/* Left Side - Company and Role */}
                      <div className="flex items-start gap-4 mb-4 md:mb-0">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center p-2 border border-gray-200">
                          <MdWork size={24} className="text-gray-400" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {app.internship?.title || "Internship Position"}
                          </h3>
                          <p className="text-gray-600">
                            {app.internship?.company_name || "Company Name"}
                          </p>
                          <div className="flex flex-wrap gap-3 mt-2">
                            <span className="flex items-center text-sm text-gray-500">
                              <MdLocationOn className="mr-1" size={14} />
                              {app.internship?.location || "Location not specified"}
                            </span>
                            <span className="flex items-center text-sm text-gray-500">
                              <MdAccessTime className="mr-1" size={14} />
                              {app.internship?.internship_type || "Not specified"}
                            </span>
                            <span className="flex items-center text-sm text-gray-500">
                              <MdAttachMoney className="mr-1" size={14} />
                              {app.internship?.stipend
                                ? `$${app.internship.stipend}`
                                : "Stipend not specified"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right Side - Status and Date */}
                      <div className="flex flex-col items-start md:items-end">
                        <StatusBadge status={app.status} />
                        <p className="text-xs text-gray-400 mt-2">
                          Applied: {formatDate(app.applied_at)}
                        </p>
                        {app.updated_at !== app.applied_at && (
                          <p className="text-xs text-gray-400">
                            Updated: {formatDate(app.updated_at)}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Cover Letter Preview */}
                    {app.cover_letter && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-sm text-gray-600 line-clamp-2">
                          <span className="font-medium text-gray-700">Cover Letter: </span>
                          {app.cover_letter}
                        </p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="mt-4 flex gap-3">
                      <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium">
                        View Details
                      </button>
                      {app.status === "pending" && (
                        <button
                          onClick={() => withdrawApplication(app.id)}
                          className="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium"
                        >
                          Withdraw
                        </button>
                      )}
                      {app.status === "interview scheduled" && (
                        <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium">
                          Join Interview
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // No Applications State
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <MdWork size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No applications found
              </h3>
              <p className="text-gray-500 mb-6">
                You haven't applied to any internships yet. Start exploring
                opportunities!
              </p>
              <button
                onClick={() => navigate("/find-internship")}
                className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
              >
                Browse Internships
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MyApplication;