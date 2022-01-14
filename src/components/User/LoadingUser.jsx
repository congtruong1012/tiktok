import React from "react";

function LoadingUser() {
  return (
    <div className="flex items-center cursor-pointer my-2">
      <div className="h-9 w-9 overflow-hidden rounded-full mr-3 bg-gray-200"></div>
      <div className="flex-grow">
        <div className="h-4 w-3/4 bg-gray-200 my-1 rounded"></div>
        <div className="h-4 w-1/2 bg-gray-200 my-1 rounded"></div>
      </div>
    </div>
  );
}

export default LoadingUser;
