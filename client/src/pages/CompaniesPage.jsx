import React, { useState, useEffect, useRef } from "react";
import {
  MdLocationOn,
  MdBusiness,
  MdPeople,
  MdWork,
  MdChevronLeft,
  MdChevronRight,
  MdSearch,
} from "react-icons/md";
import { companies, categories } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const CompaniesPage = () => {
  const navigate = useNavigate();
  
  // State for filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [companiesPerPage] = useState(8);
  
  // State for filtered companies
  const [filteredCompanies, setFilteredCompanies] = useState(companies);
  
  // Get unique locations
  const locations = [...new Set(companies.map(company => company.location))];
  
  // Get unique industries (using categories)
  const industries = categories;

  // Filter companies based on criteria
  useEffect(() => {
    let filtered = companies;

    if (searchTerm) {
      filtered = filtered.filter(company =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.industry.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(company => 
        company.industry === selectedCategory
      );
    }

    if (selectedLocation) {
      filtered = filtered.filter(company => 
        company.location === selectedLocation
      );
    }

    setFilteredCompanies(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedLocation]);

  // Pagination logic
  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = filteredCompanies.slice(indexOfFirstCompany, indexOfLastCompany);
  const totalPages = Math.ceil(filteredCompanies.length / companiesPerPage);

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedLocation('');
  };

  // Count active filters
  const activeFiltersCount = [searchTerm, selectedCategory, selectedLocation].filter(Boolean).length;

  return (
    <section className="mt-10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section - Matching FeaturedInternship style */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Top Companies</h2>
            <p className="text-gray-600 mt-2">
              Discover amazing internship opportunities at Kenya's leading companies
            </p>
          </div>

          {/* Stats */}
          <div className="hidden sm:flex space-x-2">
            <div className="px-4 py-2 bg-white rounded-lg shadow-sm">
              <span className="text-sm text-gray-600">{companies.length} Companies</span>
            </div>
          </div>
        </div>

        {/* Filters Section - Clean like FeaturedInternship */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search - Matching input style */}
            <div className="w-full lg:w-96">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search companies by name or industry..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                />
                <MdSearch className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap gap-3 w-full lg:w-auto">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[160px]"
              >
                <option value="">All Industries</option>
                {industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>

              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[160px]"
              >
                <option value="">All Locations</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>

              {activeFiltersCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Active Filters */}
          {activeFiltersCount > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {searchTerm && (
                <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                  "{searchTerm}"
                  <button onClick={() => setSearchTerm('')} className="ml-2 hover:text-gray-900">
                    ×
                  </button>
                </span>
              )}
              {selectedCategory && (
                <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                  {selectedCategory}
                  <button onClick={() => setSelectedCategory('')} className="ml-2 hover:text-gray-900">
                    ×
                  </button>
                </span>
              )}
              {selectedLocation && (
                <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                  {selectedLocation}
                  <button onClick={() => setSelectedLocation('')} className="ml-2 hover:text-gray-900">
                    ×
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Companies Grid */}
        {currentCompanies.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentCompanies.map(company => (
                <div
                  key={company.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Company Card - Matching internship card style */}
                  <div className="p-6">
                    {/* Logo - Like company logo in internship card */}
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center p-2 border border-gray-200">
                        <img
                          src={company.logo}
                          alt={company.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="ml-3">
                        <h3 className="font-semibold text-gray-900">
                          {company.name}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {company.industry}
                        </p>
                      </div>
                    </div>

                    {/* Location - Like in internship card */}
                    <div className="flex items-center text-gray-600 text-sm mb-3">
                      <MdLocationOn className="mr-1 flex-shrink-0" size={16} />
                      <span>{company.location}</span>
                    </div>

                    {/* Stats - Like skills section in internship card */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="flex items-center text-gray-600 text-xs">
                        <MdBusiness className="mr-1" size={14} />
                        <span>12+ Interns</span>
                      </div>
                      <div className="flex items-center text-gray-600 text-xs">
                        <MdWork className="mr-1" size={14} />
                        <span>5 Openings</span>
                      </div>
                    </div>

                    {/* Action Button - Matching Quick Apply style */}
                    <button 
                      onClick={() => navigate(`/companies/${company.id}`)}
                      className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors duration-300 text-sm font-medium"
                    >
                      View Internships
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination - Matching the theme */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-8 pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  Showing {indexOfFirstCompany + 1} to {Math.min(indexOfLastCompany, filteredCompanies.length)} of {filteredCompanies.length} companies
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <MdChevronLeft size={20} />
                  </button>
                  
                  <span className="px-4 py-2 text-sm text-gray-700">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <MdChevronRight size={20} />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          // Empty State - Matching the theme
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <MdBusiness size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No companies found</h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your search or filters to find more companies
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Why Partner Section - Matching featured section style */}
        {filteredCompanies.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Why Partner With Us?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <MdPeople size={24} className="text-gray-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Top Talent</h4>
                <p className="text-sm text-gray-600">
                  Access the brightest students from Kenya's top universities
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <MdWork size={24} className="text-gray-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Quick Hiring</h4>
                <p className="text-sm text-gray-600">
                  Streamlined process to find and hire the perfect intern
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <MdBusiness size={24} className="text-gray-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Verified Students</h4>
                <p className="text-sm text-gray-600">
                  All candidates are verified and ready to contribute
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CompaniesPage;