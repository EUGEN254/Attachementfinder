import React from "react";

const InternshipCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 animate-pulse">
      {/* Image skeleton */}
      <div className="h-32 bg-gray-200"></div>

      <div className="p-4">
        {/* Title skeleton */}
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>

        {/* Location, duration, stipend skeletons */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-16"></div>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-16"></div>
          </div>
          <div className="flex items-center gap-1 col-span-2">
            <div className="w-4 h-4 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-20"></div>
          </div>
        </div>

        {/* Description skeleton */}
        <div className="space-y-2 mb-3">
          <div className="h-3 bg-gray-200 rounded w-full"></div>
          <div className="h-3 bg-gray-200 rounded w-5/6"></div>
        </div>

        {/* Skills skeleton */}
        <div className="flex flex-wrap gap-1 mb-3">
          <div className="h-5 bg-gray-200 rounded-full w-14"></div>
          <div className="h-5 bg-gray-200 rounded-full w-16"></div>
          <div className="h-5 bg-gray-200 rounded-full w-12"></div>
        </div>

        {/* Button skeleton */}
        <div className="h-8 bg-gray-200 rounded-lg w-full"></div>
      </div>
    </div>
  );
};

export default InternshipCardSkeleton;