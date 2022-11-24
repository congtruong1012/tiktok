import React from "react";
import IconVerified from "../../icons/IconVerified";

function User(props) {
  const { user } = props;
  return (
    <div className="flex items-center cursor-pointer hover:bg-gray-50 py-2 px-2">
      <div className="h-9 w-9 overflow-hidden rounded-full mr-3">
        <img
          // src="https://firebasestorage.googleapis.com/v0/b/authentication-f9b30.appspot.com/o/thumb.webp?alt=media&token=ea45894c-dec5-41d6-9fff-ba0497ea198a"
          src={`https://i.pravatar.cc/150?img=${user?.id || 0}`}
          alt="user"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex-grow">
        <div className="text-base text-gray-600 font-bold flex">
          <span className="relative">
            {user?.name}
            {user?.id % 3 === 0 && (
              <IconVerified className="absolute -right-4 top-[2px]" />
            )}
          </span>
        </div>
        <div className="text-xs text-gray-400 py-0">{user?.username}</div>
      </div>
    </div>
  );
}

export default User;
