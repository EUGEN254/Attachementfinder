import React, { useRef, useEffect, useState } from "react";
import { companies } from "../assets/assets";

const TrustedCompanies = () => {
  const scrollContainerRef = useRef(null);
  const animationRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(1); // pixels per frame

  useEffect(() => {
    // Start continuous scrolling
    startContinuousScroll();

    // Cleanup on component unmount
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isHovered]);

  const startContinuousScroll = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    const scroll = () => {
      if (scrollContainerRef.current && !isHovered) {
        const container = scrollContainerRef.current;
        const maxScrollLeft = container.scrollWidth / 2; // Half because we duplicated

        // Increment scroll position
        container.scrollLeft += scrollSpeed;

        // Reset to beginning when we've scrolled through half (the duplicated part)
        if (container.scrollLeft >= maxScrollLeft) {
          container.scrollLeft = 0;
        }
      }

      // Continue the animation
      animationRef.current = requestAnimationFrame(scroll);
    };

    animationRef.current = requestAnimationFrame(scroll);
  };

  // Pause scrolling on hover
  const pauseScroll = () => {
    setIsHovered(true);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  // Resume scrolling when mouse leaves
  const resumeScroll = () => {
    setIsHovered(false);
    startContinuousScroll();
  };

  // If companies is empty or undefined, show placeholder
  if (!companies || companies.length === 0) {
    return (
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>Loading companies...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Trusted by Leading Companies
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of students who have secured internships at Kenya's
            top companies
          </p>
        </div>

        {/* Continuous Scrolling Companies */}
        <div
          className="relative"
          onMouseEnter={pauseScroll}
          onMouseLeave={resumeScroll}
        >
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10"></div>

          {/* Scrollable Companies Container */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto py-4 scrollbar-hide"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
              overflow: "hidden", // Hide scrollbar but keep functionality
            }}
          >
            {/* First set of companies */}
            <div className="flex space-x-8">
              {companies.map((company, index) => (
                <CompanyCard
                  key={`first-${company.id || index}`}
                  company={company}
                />
              ))}
            </div>

            {/* Duplicate set for seamless loop */}
            <div className="flex space-x-8 ml-8">
              {companies.map((company, index) => (
                <CompanyCard
                  key={`second-${company.id || index}`}
                  company={company}
                />
              ))}
            </div>

            {/* Third set for even smoother scrolling (optional) */}
            <div className="flex space-x-8 ml-8">
              {companies.map((company, index) => (
                <CompanyCard
                  key={`third-${company.id || index}`}
                  company={company}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Separate component for company card
const CompanyCard = ({ company }) => (
  <div className="flex-none w-[180px] group cursor-pointer hover:scale-105 transition-transform duration-300">
    <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:bg-white border border-gray-100 hover:border-blue-100">
      {/* Logo Container */}
      <div className="h-20 flex items-center justify-center mb-3">
        {company.logo ? (
          <img
            src={company.logo}
            alt={company.name || "Company"}
            className="max-h-12 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/150?text=Logo";
            }}
          />
        ) : (
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-gray-500 text-xs">Logo</span>
          </div>
        )}
      </div>

      {/* Company Info */}
      <div className="text-center">
        <h3 className="font-semibold text-gray-900 text-sm mb-1">
          {company.name || "Company Name"}
        </h3>
        <p className="text-xs text-gray-500">
          {company.industry || "Industry"}
        </p>
      </div>
    </div>
  </div>
);

export default TrustedCompanies;
