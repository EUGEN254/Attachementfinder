// components/students/FindInternship.jsx
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
import { internships } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const FindInternship = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredInternships, setFilteredInternships] = useState(internships);
  const [showFilters, setShowFilters] = useState(false);
  const {currency} = useAppContext()

  const itemsPerPage = 8;

  const locations = [...new Set(internships.map(item => item.location))];
  const durations = [...new Set(internships.map(item => item.duration))];
  const allSkills = [...new Set(internships.flatMap(item => item.requiredSkills))];

  useEffect(() => {
    let filtered = internships;

    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedLocation) {
      filtered = filtered.filter(item => item.location === selectedLocation);
    }

    if (selectedDuration) {
      filtered = filtered.filter(item => item.duration === selectedDuration);
    }

    if (selectedSkill) {
      filtered = filtered.filter(item => 
        item.requiredSkills.includes(selectedSkill)
      );
    }

    setFilteredInternships(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedLocation, selectedDuration, selectedSkill]);

  const totalPages = Math.ceil(filteredInternships.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredInternships.slice(startIndex, endIndex);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedLocation("");
    setSelectedDuration("");
    setSelectedSkill("");
  };

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
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
          <div className="relative col-span-1 lg:col-span-2">
            <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by role or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>

          <div className={`${showFilters ? 'block' : 'hidden'} lg:block col-span-1 lg:col-span-2`}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              >
                <option value="">All Locations</option>
                {locations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>

              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              >
                <option value="">All Durations</option>
                {durations.map(dur => (
                  <option key={dur} value={dur}>{dur}</option>
                ))}
              </select>

              <select
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              >
                <option value="">All Skills</option>
                {allSkills.map(skill => (
                  <option key={skill} value={skill}>{skill}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {(searchTerm || selectedLocation || selectedDuration || selectedSkill) && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-500">Active filters:</span>
            {searchTerm && (
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                Search: {searchTerm}
                <MdClose 
                  size={14} 
                  className="cursor-pointer hover:text-gray-900"
                  onClick={() => setSearchTerm("")}
                />
              </span>
            )}
            {selectedLocation && (
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                {selectedLocation}
                <MdClose 
                  size={14} 
                  className="cursor-pointer hover:text-gray-900"
                  onClick={() => setSelectedLocation("")}
                />
              </span>
            )}
            {selectedDuration && (
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                {selectedDuration}
                <MdClose 
                  size={14} 
                  className="cursor-pointer hover:text-gray-900"
                  onClick={() => setSelectedDuration("")}
                />
              </span>
            )}
            {selectedSkill && (
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                {selectedSkill}
                <MdClose 
                  size={14} 
                  className="cursor-pointer hover:text-gray-900"
                  onClick={() => setSelectedSkill("")}
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
      <div className="flex justify-between items-center px-1">
        <p className="text-sm text-gray-600">
          Showing {startIndex + 1}-{Math.min(endIndex, filteredInternships.length)} of {filteredInternships.length} internships
        </p>
      </div>

      {/* Internship Cards Grid */}
      {currentItems.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {currentItems.map((internship) => (
              <div
                key={internship.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100"
              >
                <div className="h-32 overflow-hidden">
                  <img
                    src={internship.image}
                    alt={internship.role}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-4">
                  <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-1">
                    {internship.role}
                  </h3>

                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <MdLocationOn size={14} className="text-gray-400 flex-shrink-0" />
                      <span className="truncate">{internship.location}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <MdAccessTime size={14} className="text-gray-400 flex-shrink-0" />
                      <span className="truncate">{internship.duration}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-600 col-span-2">
                      {currency}
                      <span>{internship.stipend}</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                    {internship.description}
                  </p>

                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1">
                      {internship.requiredSkills.slice(0, 3).map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                      {internship.requiredSkills.length > 3 && (
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full">
                          +{internship.requiredSkills.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  <button className="w-full bg-gray-900 text-white py-1.5 rounded-lg hover:bg-gray-800 transition-colors text-xs font-medium">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`p-1.5 rounded-lg ${
                  currentPage === 1
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <MdChevronLeft size={18} />
              </button>
              
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 rounded-lg text-sm ${
                    currentPage === i + 1
                      ? "bg-gray-900 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`p-1.5 rounded-lg ${
                  currentPage === totalPages
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
    </div>
  );
};

export default FindInternship;