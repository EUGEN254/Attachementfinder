import React from "react";
import { MdPhone, MdEmail } from "react-icons/md";

const TopNavbar = () => {
  return (
    <div className="bg-gray-900 text-white text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 sm:py-2">
        {/* Mobile: Stack vertically, Desktop: Flex row */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
          
          {/* Contact Info - Centered on mobile, left on desktop */}
          <div className="flex items-center justify-center sm:justify-start space-x-4 sm:space-x-6">
            
            {/* Phone */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              <MdPhone size={16} className="sm:size-[18px]" />
              <span className="truncate max-w-[120px] sm:max-w-none">
                +254115418682
              </span>
            </div>
            
            {/* Divider for mobile */}
            <span className="text-gray-600 sm:hidden">|</span>
            
            {/* Email */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              <MdEmail size={16} className="sm:size-[18px]" />
              <span className="truncate max-w-[140px] sm:max-w-none">
                support@internshiphub.com
              </span>
            </div>
            
          </div>
          
          {/* Optional right side - Hidden on mobile, visible on tablet and up */}
          <div className="hidden sm:block text-gray-300 text-center sm:text-right text-xs sm:text-sm">
            Find your next internship opportunity
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;