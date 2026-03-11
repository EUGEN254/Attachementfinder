import React, { useState, useEffect } from "react";
import { internships, companies, categories, skills } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const InternshipPage = () => {
  // State for filters
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [durationFilter, setDurationFilter] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [internshipsPerPage] = useState(6);

  const { currency } = useAppContext();

  // State for filtered internships
  const [filteredInternships, setFilteredInternships] = useState(internships);

  // Get unique locations from internships
  const locations = [
    ...new Set(internships.map((internship) => internship.location)),
  ];

  // Get unique durations
  const durations = [
    ...new Set(internships.map((internship) => internship.duration)),
  ];

  // Handle skill selection
  const handleSkillChange = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill],
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedSkills([]);
    setSearchTerm("");
    setLocationFilter("");
    setDurationFilter("");
    setCurrentPage(1);
  };

  // Filter internships based on all criteria
  useEffect(() => {
    let filtered = internships;

    if (searchTerm) {
      filtered = filtered.filter(
        (internship) =>
          internship.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
          internship.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()),
      );
    }

    if (locationFilter) {
      filtered = filtered.filter(
        (internship) => internship.location === locationFilter,
      );
    }

    if (durationFilter) {
      filtered = filtered.filter(
        (internship) => internship.duration === durationFilter,
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((internship) => {
        const role = internship.role.toLowerCase();
        switch (selectedCategory) {
          case "Software Development":
            return (
              role.includes("developer") ||
              role.includes("backend") ||
              role.includes("frontend") ||
              role.includes("mobile")
            );
          case "Marketing":
            return role.includes("marketing") || role.includes("community");
          case "Finance":
            return role.includes("finance");
          case "Data Analysis":
            return role.includes("data");
          case "Operations":
            return role.includes("logistics") || role.includes("operations");
          case "Design":
            return (
              role.includes("design") ||
              role.includes("ui") ||
              role.includes("ux")
            );
          default:
            return true;
        }
      });
    }

    if (selectedSkills.length > 0) {
      filtered = filtered.filter((internship) =>
        selectedSkills.every((skill) =>
          internship.requiredSkills.includes(skill),
        ),
      );
    }

    setFilteredInternships(filtered);
    setCurrentPage(1);
  }, [
    selectedCategory,
    selectedSkills,
    searchTerm,
    locationFilter,
    durationFilter,
  ]);

  // Pagination logic
  const indexOfLastInternship = currentPage * internshipsPerPage;
  const indexOfFirstInternship = indexOfLastInternship - internshipsPerPage;
  const currentInternships = filteredInternships.slice(
    indexOfFirstInternship,
    indexOfLastInternship,
  );
  const totalPages = Math.ceil(filteredInternships.length / internshipsPerPage);

  const getCompanyName = (companyId) => {
    const company = companies.find((c) => c.id === companyId);
    return company ? company.name : "Unknown Company";
  };

  const getCompanyLogo = (companyId) => {
    const company = companies.find((c) => c.id === companyId);
    return company ? company.logo : null;
  };

  // Count active filters
  const activeFiltersCount = [
    selectedCategory,
    ...selectedSkills,
    searchTerm,
    locationFilter,
    durationFilter,
  ].filter(Boolean).length;

  return (
    <div className="mt-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with stats */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Internships</h1>
              <p className="text-gray-600 mt-1">
                {filteredInternships.length} opportunities available
              </p>
            </div>

            {/* Mobile filter button */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="mt-4 md:hidden inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
              Filters
              {activeFiltersCount > 0 && (
                <span className="ml-2 bg-gray-100 text-gray-800 py-0.5 px-2 rounded-full text-xs">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>

          {/* Active filters bar */}
          {activeFiltersCount > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {selectedCategory && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-50 text-gray-700 border border-gray-200">
                  {selectedCategory}
                  <button
                    onClick={() => setSelectedCategory("")}
                    className="ml-2 hover:text-gray-900"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedSkills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-50 text-gray-700 border border-purple-200"
                >
                  {skill}
                  <button
                    onClick={() => handleSkillChange(skill)}
                    className="ml-2 hover:text-purple-900"
                  >
                    ×
                  </button>
                </span>
              ))}
              {locationFilter && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-50 text-green-700 border border-green-200">
                  {locationFilter}
                  <button
                    onClick={() => setLocationFilter("")}
                    className="ml-2 hover:text-green-900"
                  >
                    ×
                  </button>
                </span>
              )}
              {durationFilter && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-50 text-orange-700 border border-orange-200">
                  {durationFilter}
                  <button
                    onClick={() => setDurationFilter("")}
                    className="ml-2 hover:text-orange-900"
                  >
                    ×
                  </button>
                </span>
              )}
              {searchTerm && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-50 text-gray-700 border border-gray-200">
                  "{searchTerm}"
                  <button
                    onClick={() => setSearchTerm("")}
                    className="ml-2 hover:text-gray-900"
                  >
                    ×
                  </button>
                </span>
              )}
              <button
                onClick={clearFilters}
                className="text-sm text-gray-500 hover:text-gray-700 underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - Desktop */}
          <div
            className={`lg:w-80 ${showMobileFilters ? "block" : "hidden lg:block"}`}
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sticky top-24">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-semibold text-gray-900">Filters</h2>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-gray-600 hover:text-gray-800"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Search - Compact */}
              <div className="mb-5">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search internships..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  />
                  <svg
                    className="w-4 h-4 text-gray-400 absolute left-3 top-2.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              {/* Filter Groups */}
              <div className="space-y-5">
                {/* Category Filter */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location Filter */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Location
                  </label>
                  <select
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    <option value="">All Locations</option>
                    {locations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Duration Filter */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Duration
                  </label>
                  <select
                    value={durationFilter}
                    onChange={(e) => setDurationFilter(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    <option value="">All Durations</option>
                    {durations.map((duration) => (
                      <option key={duration} value={duration}>
                        {duration}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Skills Filter - Collapsible */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Skills
                  </label>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                    {skills.map((skill) => (
                      <label key={skill} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedSkills.includes(skill)}
                          onChange={() => handleSkillChange(skill)}
                          className="w-4 h-4 text-gray-600 border-gray-300 rounded focus:ring-gray-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          {skill}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Apply button for mobile */}
              <button
                onClick={() => setShowMobileFilters(false)}
                className="mt-5 w-full lg:hidden bg-gray-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-700"
              >
                Show Results
              </button>
            </div>
          </div>

          {/* Internships Grid */}
          <div className="flex-1">
            {currentInternships.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-5">
                  {currentInternships.map((internship) => (
                    <div
                      key={internship.id}
                      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 hover:border-gray-200"
                    >
                      <div className="flex p-5">
                        {/* Company Logo */}
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center p-2">
                            {getCompanyLogo(internship.companyId) ? (
                              <img
                                src={getCompanyLogo(internship.companyId)}
                                alt={getCompanyName(internship.companyId)}
                                className="max-w-full max-h-full object-contain"
                              />
                            ) : (
                              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                            )}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="ml-4 flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-gray-900 hover:text-gray-600 cursor-pointer">
                                {internship.role}
                              </h3>
                              <p className="text-sm text-gray-600 mt-0.5">
                                {getCompanyName(internship.companyId)}
                              </p>
                            </div>
                            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-50 text-gray-700">
                              {internship.duration}
                            </span>
                          </div>

                          <div className="mt-3 flex items-center text-sm text-gray-500">
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                            {internship.location}
                          </div>

                          <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                            {internship.description}
                          </p>

                          <div className="mt-3 flex flex-wrap gap-1">
                            {internship.requiredSkills
                              .slice(0, 3)
                              .map((skill) => (
                                <span
                                  key={skill}
                                  className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded"
                                >
                                  {skill}
                                </span>
                              ))}
                            {internship.requiredSkills.length > 3 && (
                              <span className="px-2 py-0.5 text-xs text-gray-500">
                                +{internship.requiredSkills.length - 3}
                              </span>
                            )}
                          </div>

                          <div className="mt-4 flex items-center justify-between">
                            <span className="text-lg font-bold text-gray-900">
                              {currency} {internship.stipend}
                            </span>
                            <button className="px-4 py-1.5 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors">
                              Apply
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8 flex items-center justify-between border-t border-gray-200 pt-6">
                    <div className="text-sm text-gray-600">
                      Showing {indexOfFirstInternship + 1} to{" "}
                      {Math.min(
                        indexOfLastInternship,
                        filteredInternships.length,
                      )}{" "}
                      of {filteredInternships.length} results
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                        className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      <span className="text-sm text-gray-700">
                        Page {currentPage} of {totalPages}
                      </span>
                      <button
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages),
                          )
                        }
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-10 h-10 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  No internships found
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                  Try adjusting your filters to find more opportunities
                </p>
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipPage;
