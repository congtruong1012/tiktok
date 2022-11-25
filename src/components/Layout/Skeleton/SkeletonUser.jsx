import React from "react";

function SkeletonUser() {
  return (
    <div className="animate-pulse flex items-center cursor-pointer hover:bg-gray-50 py-2 px-2">
      <div className="h-9 w-9 bg-gray-200 rounded-full mr-3"></div>
      <div className="flex-grow">
        <div className=" bg-gray-200 w-1/2 h-4 rounded-xl mb-2"></div>
        <div className="bg-gray-200 w-1/4 h-4 rounded-xl"></div>
      </div>
    </div>
  );
}

export default SkeletonUser;
