import React from "react";

const StatsSkeleton = () => {
  return (
    <div className="flex justify-between items-center px-1 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-48"></div>
    </div>
  );
};

export default StatsSkeleton;