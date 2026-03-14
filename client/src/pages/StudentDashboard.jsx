import React, { useState, useMemo, useCallback } from "react";
import {
  MdAssignment,
  MdPending,
  MdEvent,
  MdCheckCircle,
  MdCancel,
  MdSearch,
  MdFilterList,
  MdRefresh,
  MdWork,
  MdCalendarToday,
  MdTrendingUp,
} from "react-icons/md";
import { useAppContext } from "../context/AppContext";
import useStudentApplications from "../hooks/useStudentApplications";
import useGetInternships from "../hooks/useGetInternships";
import StatsSkeleton from "../components/skeletons/StatsSkeleton";
import InternshipCardSkeleton from "../components/skeletons/InternshipCardSkeleton";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler,
);

const StudentDashboard = () => {
  const { user } = useAppContext();
  const {
    applications,
    statusCounts,
    loading: appLoading,
  } = useStudentApplications("all");
  const { internships, loading: intLoading } = useGetInternships({}, 1, 5);

  // Enhanced filters
  const [filters, setFilters] = useState({
    status: "",
    search: "",
  });
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const limit = 5;

  // Filter applications with search
  const filteredApplications = useMemo(() => {
    let filtered = applications;

    if (filters.status) {
      filtered = filtered.filter(
        (app) => app.status?.toLowerCase() === filters.status.toLowerCase(),
      );
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (app) =>
          app.internship_title?.toLowerCase().includes(searchLower) ||
          app.company_name?.toLowerCase().includes(searchLower),
      );
    }

    return filtered;
  }, [applications, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredApplications.length / limit);
  const paginatedApps = useMemo(
    () => filteredApplications.slice((page - 1) * limit, page * limit),
    [filteredApplications, page, limit],
  );

  // Handle filter changes
  const handleFilterChange = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  }, []);

  // Handle refresh
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    // Trigger data refresh logic here
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  // Enhanced summary cards with gradient backgrounds
  const summaryCards = [
    {
      title: "Total Applications",
      count: statusCounts.all,
      icon: <MdAssignment className="text-blue-400" />,
      gradient: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-900",
    },
    {
      title: "Pending",
      count: statusCounts.pending,
      icon: <MdPending className="text-yellow-400" />,
      gradient: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-900",
    },
    {
      title: "Interview",
      count: statusCounts.interview,
      icon: <MdEvent className="text-purple-400" />,
      gradient: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-900",
    },
    {
      title: "Accepted",
      count: statusCounts.accepted,
      icon: <MdCheckCircle className="text-green-400" />,
      gradient: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-900",
    },
    {
      title: "Rejected",
      count: statusCounts.rejected,
      icon: <MdCancel className="text-red-400" />,
      gradient: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      textColor: "text-red-900",
    },
  ];

  // Enhanced chart data with gradients
  const chartColors = {
    pending: { bg: "rgba(251, 191, 36, 0.8)", border: "#FBBF24" },
    interview: { bg: "rgba(59, 130, 246, 0.8)", border: "#3B82F6" },
    accepted: { bg: "rgba(16, 185, 129, 0.8)", border: "#10B981" },
    rejected: { bg: "rgba(239, 68, 68, 0.8)", border: "#EF4444" },
  };

  const barChartData = {
    labels: ["Pending", "Interview", "Accepted", "Rejected"],
    datasets: [
      {
        label: "Number of Applications",
        data: [
          statusCounts.pending,
          statusCounts.interview,
          statusCounts.accepted,
          statusCounts.rejected,
        ],
        backgroundColor: [
          chartColors.pending.bg,
          chartColors.interview.bg,
          chartColors.accepted.bg,
          chartColors.rejected.bg,
        ],
        borderColor: [
          chartColors.pending.border,
          chartColors.interview.border,
          chartColors.accepted.border,
          chartColors.rejected.border,
        ],
        borderWidth: 2,
        borderRadius: 8,
        barPercentage: 0.7,
      },
    ],
  };

  const pieChartData = {
    labels: ["Pending", "Interview", "Accepted", "Rejected"],
    datasets: [
      {
        data: [
          statusCounts.pending,
          statusCounts.interview,
          statusCounts.accepted,
          statusCounts.rejected,
        ],
        backgroundColor: [
          "rgba(251, 191, 36, 0.9)",
          "rgba(59, 130, 246, 0.9)",
          "rgba(16, 185, 129, 0.9)",
          "rgba(239, 68, 68, 0.9)",
        ],
        borderColor: "#ffffff",
        borderWidth: 2,
        hoverOffset: 10,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#1F2937",
        titleColor: "#F3F4F6",
        bodyColor: "#D1D5DB",
        borderColor: "#374151",
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(156, 163, 175, 0.1)",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            weight: "500",
          },
        },
      },
      tooltip: {
        backgroundColor: "#1F2937",
        titleColor: "#F3F4F6",
        bodyColor: "#D1D5DB",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header with Refresh */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.name || "Student"}!
            </h1>
            <p className="text-gray-600 flex items-center gap-2">
              <MdTrendingUp className="text-blue-500" />
              Track and manage your internship applications
            </p>
          </div>
          <button
            onClick={handleRefresh}
            className="mt-4 sm:mt-0 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-2 text-gray-700 hover:text-blue-600"
          >
            <MdRefresh
              className={`text-lg ${refreshing ? "animate-spin" : ""}`}
            />
            <span>Refresh</span>
          </button>
        </div>

        {/* Sidebar-themed Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
          {summaryCards.map((card, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between items-center p-2 md:p-3 rounded-lg shadow border border-gray-700 bg-gray-900 text-white min-h-[80px] max-h-[110px] min-w-[120px] max-w-[160px]"
              style={{ backgroundColor: '#1a202c' }}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-xs md:text-sm font-semibold">{card.title}</span>
                <span className="text-lg md:text-xl">{card.icon}</span>
              </div>
              <div className="text-xl md:text-2xl font-bold mt-1">{card.count}</div>
            </div>
          ))}
        </div>

        {/* Enhanced Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Application Status Overview
            </h3>
            <div className="h-64">
              {appLoading ? (
                <StatsSkeleton />
              ) : (
                <Bar data={barChartData} options={chartOptions} />
              )}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Status Distribution
            </h3>
            <div className="h-64">
              {appLoading ? (
                <StatsSkeleton />
              ) : (
                <Pie data={pieChartData} options={pieOptions} />
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Applications Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <MdAssignment className="text-blue-500" />
                My Applications
              </h3>
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Search Input */}
                <div className="relative">
                  <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search applications..."
                    value={filters.search}
                    onChange={(e) =>
                      handleFilterChange("search", e.target.value)
                    }
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-full sm:w-64"
                  />
                </div>
                {/* Status Filter */}
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange("status", e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
                >
                  <option value="">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Interview">Interview</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Internship
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Applied Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {appLoading ? (
                  [...Array(3)].map((_, i) => (
                    <tr key={i}>
                      <td colSpan="5" className="px-6 py-4">
                        <div className="animate-pulse bg-gray-200 h-6 rounded" />
                      </td>
                    </tr>
                  ))
                ) : paginatedApps.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-400">
                        <MdAssignment className="text-4xl mb-2" />
                        <p>No applications found matching your criteria</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginatedApps.map((app, idx) => (
                    <tr
                      key={app._id}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                        {(page - 1) * limit + idx + 1}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                        {app.internship_title || "Internship"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {app.company_name || "N/A"}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            app.status === "Accepted"
                              ? "bg-green-100 text-green-800"
                              : app.status === "Rejected"
                                ? "bg-red-100 text-red-800"
                                : app.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : app.status === "Interview"
                                    ? "bg-purple-100 text-purple-800"
                                    : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {app.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 flex items-center gap-2">
                        <MdCalendarToday className="text-gray-400" />
                        {app.createdAt
                          ? new Date(app.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              },
                            )
                          : "N/A"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Enhanced Pagination */}
          {totalPages > 1 && (
            <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="text-sm text-gray-600">
                  Showing {(page - 1) * limit + 1} to{" "}
                  {Math.min(page * limit, filteredApplications.length)} of{" "}
                  {filteredApplications.length} applications
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage(1)}
                    disabled={page === 1}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      page === 1
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    First
                  </button>
                  <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      page === 1
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    Previous
                  </button>
                  <span className="px-4 py-1.5 bg-blue-500 text-white rounded-lg text-sm font-medium">
                    {page}
                  </span>
                  <button
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      page === totalPages
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    Next
                  </button>
                  <button
                    onClick={() => setPage(totalPages)}
                    disabled={page === totalPages}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      page === totalPages
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    Last
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Latest Internships Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <MdWork className="text-blue-500" />
              Latest Internships
            </h3>
          </div>
          <div className="p-6">
            {intLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(2)].map((_, i) => (
                  <InternshipCardSkeleton key={i} />
                ))}
              </div>
            ) : internships.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <MdWork className="text-4xl mx-auto mb-2" />
                <p>No internships available at the moment</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {internships.map((intern) => (
                  <div
                    key={intern._id}
                    className="group p-4 border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {intern.title}
                      </h4>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <MdCalendarToday />
                        {new Date(intern.posted_at).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                          },
                        )}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {intern.company_name}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="px-2 py-1 bg-gray-100 rounded-full">
                        {intern.type || "Internship"}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 rounded-full">
                        {intern.location || "Remote"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
