import React, { useState, useEffect } from "react";
import {
  MdSearch,
  MdLocationOn,
  MdAccessTime,
  MdAttachMoney,
  MdFilterList,
  MdClose,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";
import StatsSkeleton from "../components/skeletons/StatsSkeleton";
import FilterSkeleton from "../components/skeletons/FilterSkeleton";
import InternshipCardSkeleton from "../components/skeletons/InternshipCardSkeleton";
import { useAppContext } from "../context/AppContext";
import useGetInternships from "../hooks/useGetInternships";
import ApplicationModal from "../components/students/ApplicationModal";

const FindInternship = () => {
  console.log("🔥 InternshipsPage RENDER");
  
  useEffect(() => {
    console.log("💧 InternshipsPage MOUNTED");
    
    return () => {
      console.log("🧹 InternshipsPage UNMOUNTED");
    };
  }, []);
  
  const { currency } = useAppContext();
  const [showFilters, setShowFilters] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  
  // Use our custom hook
  const {
    // Data
    internships,
    pagination,
    availableFilters,
    
    // Filters
    filters,
    updateFilter,
    clearFilters,
    hasActiveFilters,
    activeFiltersCount,
    
    // Pagination
    goToPage,
    nextPage,
    prevPage,
    
    // Status
    loading,
    error,
    
    // Refresh
    refresh,
  } = useGetInternships({}, 1, 8); // 8 items per page

  // Handle apply button click
  const handleApply = (internship) => {
    setSelectedInternship(internship);
    setShowApplicationModal(true);
  };

  // Handle successful application
  const handleApplicationSuccess = (applicationData) => {
    console.log("Application submitted successfully:", applicationData);
    // You could show a toast notification here
    // For now, the modal will show success message automatically
  };

  // Handle modal close
  const handleModalClose = () => {
    setShowApplicationModal(false);
    setSelectedInternship(null);
  };

  // Calculate display range
  const startIndex = (pagination.page - 1) * pagination.limit + 1;
  const endIndex = Math.min(startIndex + pagination.limit - 1, pagination.total);

  // Show loading skeletons
  if (loading && internships.length === 0) {
    return (
      <div className="space-y-4">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Find Internships</h1>
          <p className="text-gray-600 mt-1">
            Discover the perfect internship opportunity for you
          </p>
        </div>

        {/* Filter Skeleton */}
        <FilterSkeleton />

        {/* Stats Skeleton */}
        <StatsSkeleton />

        {/* Cards Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {[...Array(8)].map((_, index) => (
            <InternshipCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Find Internships</h1>
          <p className="text-gray-600 mt-1">
            Discover the perfect internship opportunity for you
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="text-4xl mb-3">⚠️</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Something went wrong</h3>
          <p className="text-sm text-gray-600 mb-3">{error}</p>
          <button
            onClick={refresh}
            className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Find Internships</h1>
        <p className="text-gray-600 mt-1">
          Discover the perfect internship opportunity for you
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden flex items-center gap-2 text-gray-600 mb-3"
        >
          <MdFilterList size={20} />
          <span>{showFilters ? "Hide Filters" : "Show Filters"}</span>
          {hasActiveFilters && (
            <span className="bg-gray-900 text-white text-xs px-2 py-0.5 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
          <div className="relative col-span-1 lg:col-span-2">
            <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by role or description..."
              value={filters.search}
              onChange={(e) => updateFilter("search", e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>

          <div className={`${showFilters ? 'block' : 'hidden'} lg:block col-span-1 lg:col-span-2`}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <select
                value={filters.location}
                onChange={(e) => updateFilter("location", e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              >
                <option value="">All Locations</option>
                {availableFilters.locations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>

              <select
                value={filters.internship_type}
                onChange={(e) => updateFilter("internship_type", e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              >
                <option value="">All Types</option>
                <option value="onsite">Onsite</option>
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
              </select>

              <select
                value={filters.experience_level}
                onChange={(e) => updateFilter("experience_level", e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              >
                <option value="">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-500">Active filters:</span>
            {filters.search && (
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                Search: {filters.search}
                <MdClose 
                  size={14} 
                  className="cursor-pointer hover:text-gray-900"
                  onClick={() => updateFilter("search", "")}
                />
              </span>
            )}
            {filters.location && (
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                {filters.location}
                <MdClose 
                  size={14} 
                  className="cursor-pointer hover:text-gray-900"
                  onClick={() => updateFilter("location", "")}
                />
              </span>
            )}
            {filters.internship_type && (
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center gap-1 capitalize">
                {filters.internship_type}
                <MdClose 
                  size={14} 
                  className="cursor-pointer hover:text-gray-900"
                  onClick={() => updateFilter("internship_type", "")}
                />
              </span>
            )}
            {filters.experience_level && (
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center gap-1 capitalize">
                {filters.experience_level}
                <MdClose 
                  size={14} 
                  className="cursor-pointer hover:text-gray-900"
                  onClick={() => updateFilter("experience_level", "")}
                />
              </span>
            )}
            {filters.skills && (
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                Skills: {filters.skills}
                <MdClose 
                  size={14} 
                  className="cursor-pointer hover:text-gray-900"
                  onClick={() => updateFilter("skills", "")}
                />
              </span>
            )}
            <button
              onClick={clearFilters}
              className="text-sm text-gray-600 hover:text-gray-900 underline"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Results Count */}
      {internships.length > 0 && (
        <div className="flex justify-between items-center px-1">
          <p className="text-sm text-gray-600">
            Showing {startIndex}-{endIndex} of {pagination.total} internships
          </p>
          {loading && (
            <p className="text-sm text-gray-500 animate-pulse">Updating...</p>
          )}
        </div>
      )}

      {/* Internship Cards Grid */}
      {internships.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {internships.map((internship) => (
              <div
                key={internship.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100"
              >
                <div className="h-32 overflow-hidden">
                  <img
                    src={internship.image_url || "/default-internship.jpg"}
                    alt={internship.title || internship.role}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "/default-internship.jpg";
                    }}
                  />
                </div>

                <div className="p-4">
                  <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-1">
                    {internship.title || internship.role}
                  </h3>

                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <MdLocationOn size={14} className="text-gray-400 flex-shrink-0" />
                      <span className="truncate">{internship.location}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <MdAccessTime size={14} className="text-gray-400 flex-shrink-0" />
                      <span className="truncate capitalize">{internship.internship_type || internship.duration}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-600 col-span-2">
                      <MdAttachMoney size={14} className="text-gray-400 flex-shrink-0" />
                      <span>
                        {internship.stipend_min && internship.stipend_max 
                          ? `${currency} ${internship.stipend_min} - ${internship.stipend_max}`
                          : internship.stipend 
                            ? `${currency} ${internship.stipend}`
                            : `${currency} ${internship.stipend || 'Not specified'}`
                        }
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                    {internship.description}
                  </p>

                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1">
                      {internship.required_skills?.slice(0, 3).map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                      {internship.required_skills?.length > 3 && (
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full">
                          +{internship.required_skills.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleApply(internship)}
                    className="w-full bg-gray-900 text-white py-1.5 rounded-lg hover:bg-gray-800 transition-colors text-xs font-medium"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
            
            {/* Show loading skeletons while fetching more data */}
            {loading && internships.length > 0 && (
              <>
                {[...Array(2)].map((_, index) => (
                  <InternshipCardSkeleton key={`loading-${index}`} />
                ))}
              </>
            )}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              <button
                onClick={prevPage}
                disabled={pagination.page === 1 || loading}
                className={`p-1.5 rounded-lg ${
                  pagination.page === 1 || loading
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <MdChevronLeft size={18} />
              </button>
              
              {/* Show limited page numbers */}
              {[...Array(Math.min(5, pagination.totalPages))].map((_, i) => {
                let pageNum;
                if (pagination.totalPages <= 5) {
                  pageNum = i + 1;
                } else if (pagination.page <= 3) {
                  pageNum = i + 1;
                } else if (pagination.page >= pagination.totalPages - 2) {
                  pageNum = pagination.totalPages - 4 + i;
                } else {
                  pageNum = pagination.page - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => goToPage(pageNum)}
                    disabled={loading}
                    className={`w-8 h-8 rounded-lg text-sm ${
                      pagination.page === pageNum
                        ? "bg-gray-900 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button
                onClick={nextPage}
                disabled={pagination.page === pagination.totalPages || loading}
                className={`p-1.5 rounded-lg ${
                  pagination.page === pagination.totalPages || loading
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <MdChevronRight size={18} />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="text-4xl mb-3">🔍</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No internships found</h3>
          <p className="text-sm text-gray-600 mb-3">Try adjusting your filters or search term</p>
          <button
            onClick={clearFilters}
            className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Application Modal */}
      <ApplicationModal
        isOpen={showApplicationModal}
        onClose={handleModalClose}
        internship={selectedInternship}
        onSuccess={handleApplicationSuccess}
      />
    </div>
  );
};

export default FindInternship;