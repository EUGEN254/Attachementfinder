import React from "react";

const FilterSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
      {/* Mobile filter button skeleton */}
      <div className="lg:hidden flex items-center gap-2 mb-3">
        <div className="w-5 h-5 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-24"></div>
      </div>

      {/* Search and filter grid skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
        {/* Search input skeleton */}
        <div className="relative col-span-1 lg:col-span-2">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-gray-200 rounded"></div>
          <div className="w-full h-10 bg-gray-200 rounded-lg"></div>
        </div>

        {/* Filter selects skeleton - hidden on mobile */}
        <div className="hidden lg:block col-span-1 lg:col-span-2">
          <div className="grid grid-cols-3 gap-3">
            <div className="h-10 bg-gray-200 rounded-lg"></div>
            <div className="h-10 bg-gray-200 rounded-lg"></div>
            <div className="h-10 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSkeleton;