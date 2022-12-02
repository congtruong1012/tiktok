import React from "react";
import CommonLayout from "../../../components/Layout/CommonLayout";
import Image from "../../../components/Layout/Image";
import Tab from "../../../components/Layout/Tab";
import IconLink from "../../../icons/IconLink";
import IconMoreHorizontal from "../../../icons/IconMoreHorizontal";
import IconShared from "../../../icons/IconShared";
import IconVerified from "../../../icons/IconVerified";
import ListVideo from "./ListVideo";

function Profile() {
  return (
    <CommonLayout>
      <div className="flex flex-col space-y-6">
        <div className="relative flex flex-col space-y-4">
          <div className="flex space-x-4">
            <div className="h-28 w-28 overflow-hidden rounded-full">
              <Image className="w-full h-full" src="" />
            </div>
            <div className="flex flex-col">
              <h2 className="font-bold text-2xl flex items-center space-x-2">
                <span>Công Trương</span>
                <IconVerified className="w-5 h-5" />
              </h2>
              <span className="font-medium text-lg inline-block mt-1 flex-grow">
                congtruong
              </span>
              <div>
                <button className="bg-primary text-white font-semibold py-1.5 px-20 rounded-md">
                  Follow
                </button>
              </div>
            </div>
          </div>
          <div className="flex space-x-5">
            <div>
              <b>5</b> Following
            </div>
            <div>
              <b>958.7K</b> Follower
            </div>
            <div>
              <b>900</b> Likes
            </div>
          </div>
          <h2 className="whitespace-pre-line">
            𝑩𝒐𝒐𝒌𝒊𝒏𝒈 𝒂𝒏𝒅 𝑨𝒇𝒇𝒊𝒍𝒊𝒂𝒕𝒆 OPPA HUY IDOL TEAM 0976.96.6969
          </h2>
          <a href="#" className="text-primary flex items-center space-x-1">
            <IconLink fill="rgba(254, 44, 85, 1.0)" />
            <span className="font-bold hover:underline">
              https://www.facebook.com/
            </span>
          </a>
          <div className="absolute top-0 left-[80%]">
            <div className="flex space-x-4">
              <IconShared className="cursor-pointer" />
              <IconMoreHorizontal className="cursor-pointer" />
            </div>
          </div>
        </div>
        <ListVideo />
      </div>
    </CommonLayout>
  );
}

export default Profile;
