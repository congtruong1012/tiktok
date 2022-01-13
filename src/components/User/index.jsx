import React from "react";

function User() {
  return (
    <div className="flex items-center cursor-pointer">
      <div className="h-9 w-9 overflow-hidden rounded-full mr-3">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/authentication-f9b30.appspot.com/o/thumb.webp?alt=media&token=ea45894c-dec5-41d6-9fff-ba0497ea198a"
          alt="user"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex-grow">
        <div className="text-base text-gray-600 font-bold lin">
          sinhanh.hair
        </div>
        <div className="text-xs text-gray-400 py-0">Sinh Anh Hair Salon</div>
      </div>
    </div>
  );
}

export default User;
