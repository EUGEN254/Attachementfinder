import React, { useRef } from "react";

import {
  MdLocationOn,
  MdAccessTime,
  MdAttachMoney,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";
import { companies, internships } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const FeaturedInternship = () => {
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();
  const { currency } = useAppContext();
  const featuredInternships = internships.slice(0, 6); // Show more items for horizontal scrolling

  // Helper function to get company details by companyId
  const getCompanyDetails = (companyId) => {
    return companies.find((company) => company.id === companyId);
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400; // Adjust this value based on card width
      const currentScroll = scrollContainerRef.current.scrollLeft;

      scrollContainerRef.current.scrollTo({
        left:
          direction === "left"
            ? currentScroll - scrollAmount
            : currentScroll + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Navigation Buttons */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Featured Internships
            </h2>
            <p className="text-gray-600 mt-2">
              Discover top internship opportunities from leading companies
            </p>
          </div>

          {/* Navigation Buttons - Hidden on mobile, visible on tablet and up */}
          <div className="hidden sm:flex space-x-2">
            <button
              onClick={() => scroll("left")}
              className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Scroll left"
            >
              <MdChevronLeft size={24} className="text-gray-600" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Scroll right"
            >
              <MdChevronRight size={24} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div>
          {/* Scrollable Cards */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {featuredInternships.map((internship) => {
              const company = getCompanyDetails(internship.companyId);

              return (
                <div
                  key={internship.id}
                  className="flex-none w-full sm:w-[350px] bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 snap-start"
                >
                  {/* Internship Image */}
                  <div className="h-40 overflow-hidden">
                    <img
                      src={internship.image}
                      alt={internship.role}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    {/* Company Info */}
                    <div className="flex items-center mb-3">
                      <img
                        src={company?.logo}
                        alt={company?.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="ml-2">
                        <h3 className="font-semibold text-gray-900 text-sm">
                          {company?.name}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {company?.industry}
                        </p>
                      </div>
                    </div>

                    {/* Role */}
                    <h4 className="text-lg font-bold text-gray-900 mb-2">
                      {internship.role}
                    </h4>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {internship.description}
                    </p>

                    {/* Details - Compact */}
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="flex items-center text-gray-600 text-xs">
                        <MdLocationOn
                          className="mr-1 flex-shrink-0"
                          size={14}
                        />
                        <span className="truncate">{internship.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600 text-xs">
                        <MdAccessTime
                          className="mr-1 flex-shrink-0"
                          size={14}
                        />
                        <span className="truncate">{internship.duration}</span>
                      </div>
                      <div className="flex items-center text-gray-600 text-xs col-span-2">
                        <MdAttachMoney
                          className="mr-1 flex-shrink-0"
                          size={14}
                        />
                        <span>
                          {currency} {internship.stipend}
                        </span>
                      </div>
                    </div>

                    {/* Required Skills */}
                    <div className="mb-3">
                      <div className="flex flex-wrap gap-1">
                        {internship.requiredSkills
                          .slice(0, 2)
                          .map((skill, index) => (
                            <span
                              key={index}
                              className="px-2 py-0.5 bg-blue-100 text-gray-600 text-xs rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        {internship.requiredSkills.length > 2 && (
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                            +{internship.requiredSkills.length - 2}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Button */}
                    <button className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors duration-300 text-sm font-medium">
                      Quick Apply
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Scroll Hint */}
        <div className="sm:hidden flex justify-center mt-4">
          <div className="flex space-x-1">
            <div className="w-2 h-2 rounded-full bg-blue-600"></div>
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          </div>
          <p className="text-xs text-gray-500 ml-2">Swipe to see more</p>
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate("/internships")}
            className="inline-flex items-center px-6 py-2 border border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors duration-300 text-sm"
          >
            View All Internships
            <MdChevronRight size={18} className="ml-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedInternship;
