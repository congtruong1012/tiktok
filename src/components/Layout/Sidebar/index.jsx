import React from "react";
import { Link } from "react-router-dom";
import IconFollow from "../../../icons/IconFollow";
import IconHome from "../../../icons/IconHome";
import IconLive from "../../../icons/IconLive";
import Discover from "../../Discover";
import FollowingAccount from "../../FollowingAccount";
import SuggestAccount from "../../SuggestAccount";

function Sidebar() {
  const navbar = [
    {
      icon: IconHome,
      label: "For You",
      link: "/",
    },
    {
      icon: IconFollow,
      label: "Following",
      link: "/",
    },
    {
      icon: IconLive,
      label: "Live",
      link: "/",
    },
  ];

  return (
    <div className="py-2">
      <ul className="py-2 border-b border-gray-100 border-solid">
        {navbar.map((item, index) => (
          <li className="hover:bg-slate-50 p-2" key={item.label}>
            <Link to={item.link} className="flex items-center">
              <item.icon
                fill={
                  index === 0
                    ? "rgba(254, 44, 85, 1.0)"
                    : "rgba(22, 24, 35, 1.0)"
                }
              />
              <span
                className={`ml-2 text-lg font-bold ${
                  index === 0 ? "text-primary" : "text-black"
                }`}
              >
                {item.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <SuggestAccount />
      <FollowingAccount />
      <Discover />
      <div className="text-sm text-gray-400 text-center my-2">© 2022 TikTok</div>
    </div>
  );
}

export default Sidebar;
