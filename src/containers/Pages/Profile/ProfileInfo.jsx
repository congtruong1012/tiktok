import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import Tippy from "@tippyjs/react";
import React from "react";
import { useParams } from "react-router-dom";
import Image from "../../../components/Layout/Image";
import IconFollowing from "../../../icons/IconFollowing";
import IconLink from "../../../icons/IconLink";
import IconMoreHorizontal from "../../../icons/IconMoreHorizontal";
import IconShared from "../../../icons/IconShared";
import IconVerified from "../../../icons/IconVerified";
import {
  followAccount,
  unfollowAccount,
} from "../../../services/followAccount";
import { getAnUser } from "../../../services/userService";

function ProfileInfo() {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["profile", id],
    queryFn: () => getAnUser(id),
  });
  const { mutate: mutateFollow } = useMutation({
    mutationFn: () => followAccount(data?.id),
    onSuccess: (res) => {
      Object.assign(data, res);
    },
  });

  const { mutate: mutateUnfollow } = useMutation({
    mutationFn: () => unfollowAccount(data?.id),
    onSuccess: (res) => {
      Object.assign(data, res);
    },
  });

  return isLoading ? (
    <div className="flex space-x-4 animate-pulse">
      <div className="h-28 w-28 rounded-full bg-gray-200"></div>
      <div className="flex flex-col space-y-4">
        <h2 className="font-bold text-2xl flex items-center space-x-2 bg-gray-200 w-[230px] h-5 rounded-lg"></h2>
        <span className="font-medium text-lg inline-block mt-1 bg-gray-200 w-[200px] h-5 rounded-lg"></span>
      </div>
    </div>
  ) : (
    <div className="relative flex flex-col space-y-4">
      <div className="flex space-x-4">
        <div className="h-28 w-28 overflow-hidden rounded-full">
          <Image className="w-full h-full" src={data?.avatar} />
        </div>
        <div className="flex flex-col">
          <h2 className="font-bold text-2xl flex items-center space-x-2">
            <span>{`${data?.first_name} ${data?.last_name}`}</span>
            <IconVerified className="w-5 h-5" />
          </h2>
          <span className="font-medium text-lg inline-block mt-1 flex-grow">
            {data?.nickname}
          </span>
          <div className="flex space-x-2 items-center">
            {data?.is_followed ? (
              <>
                <button className="text-primary border border-primary border-solid font-semibold py-1.5 px-20 rounded-md">
                  Message
                </button>
                <Tippy
                  content={
                    <span className="bg-gray-500 text-white font-semibold p-2 rounded-md">
                      Unfollow
                    </span>
                  }
                  arrow
                  placement="bottom"
                >
                  <span
                    onClick={mutateUnfollow}
                    className="inline-block p-2.5 border border-solid border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer"
                  >
                    <IconFollowing />
                  </span>
                </Tippy>
              </>
            ) : (
              <button
                className="bg-primary text-white font-semibold py-1.5 px-20 rounded-md"
                onClick={mutateFollow}
              >
                Follow
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="flex space-x-5">
        <div>
          <b>{data?.followings_count}</b> Following
        </div>
        <div>
          <b>{data?.followers_count}</b> Follower
        </div>
        <div>
          <b>{data?.likes_count}</b> Likes
        </div>
      </div>
      <h2 className="whitespace-pre-line">{data?.bio}</h2>
      <a
        href={data?.website_url}
        className="text-primary flex items-center space-x-1"
      >
        <IconLink fill="rgba(254, 44, 85, 1.0)" />
        <span className="font-bold hover:underline">{data?.website_url}</span>
      </a>
      <div className="absolute top-0 left-[80%]">
        <div className="flex space-x-4">
          <IconShared className="cursor-pointer" />
          <IconMoreHorizontal className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;
