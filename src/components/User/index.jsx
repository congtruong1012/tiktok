import React, { useRef } from "react";
import { Link } from "react-router-dom";
import IconVerified from "../../icons/IconVerified";
import Image from "../Layout/Image";

function User(props) {
  const { user } = props;
  const fullname = `${user?.first_name} ${user?.last_name}`;
  return (
    <Link
      to={`/profile/@${user?.nickname}`}
      className="flex items-center cursor-pointer hover:bg-gray-50 py-2 px-2"
    >
      <div className="h-9 w-9 overflow-hidden rounded-full mr-3">
        <Image
          src={user?.avatar}
          alt="user"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex-grow">
        <div className="text-base text-gray-600 font-bold flex hover:underline">
          <span className="relative">
            {user?.full_name || fullname}
            {user?.tick && (
              <IconVerified className="absolute -right-4 top-[2px]" />
            )}
          </span>
        </div>
        <div className="text-xs text-gray-400 py-0">{user?.nickname}</div>
      </div>
    </Link>
  );
}

export default User;
