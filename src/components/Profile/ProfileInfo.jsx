import { useQuery } from "@tanstack/react-query";
import Tippy from "@tippyjs/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  makeSelectUserInfo,
  userStorage,
} from "../../containers/Features/User/reducer";
import useFollowUser from "../../hooks/useFllowUser";
import useToggle from "../../hooks/useToggle";
import IconEdit from "../../icons/IconEdit";
import IconFollowing from "../../icons/IconFollowing";
import IconLink from "../../icons/IconLink";
import IconMoreHorizontal from "../../icons/IconMoreHorizontal";
import IconShared from "../../icons/IconShared";
import IconUser from "../../icons/IconUser";
import IconVerified from "../../icons/IconVerified";
import { getAnUser } from "../../services/userService";
import Image from "../Layout/Image";
import NoDataProfile from "./NoDataProfile";
import UpdateUser from "./UpdateUser";

function ProfileInfo() {
  const { id } = useParams();

  const [open, handleOpen, handleClose] = useToggle();

  const dispatch = useDispatch();

  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ["profile", id],
    queryFn: () => getAnUser(id),
    onSuccess: (rs) => {
      dispatch(
        userStorage({
          byId: { [rs?.id]: rs },
          allIds: [rs?.id],
        })
      );
    },
    retry: 0,
  });

  const userLogin = useSelector((state) => state.app.user);
  const userInfo = useSelector((state) => makeSelectUserInfo(state, data?.id));

  const { handleFollow } = useFollowUser({
    userId: userInfo?.id,
    status: userInfo?.is_followed,
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
    <>
      {isSuccess && (
        <div className="relative flex flex-col space-y-4">
          <div className="flex space-x-4">
            <div className="h-28 w-28 overflow-hidden rounded-full">
              <Image className="w-full h-full" src={userInfo?.avatar} />
            </div>
            <div className="flex flex-col">
              <h2 className="font-bold text-2xl flex items-center space-x-2">
                <span>{`${userInfo?.first_name} ${userInfo?.last_name}`}</span>
                <IconVerified className="w-5 h-5" />
              </h2>
              <span className="font-medium text-lg inline-block mt-1 flex-grow">
                {userInfo?.nickname}
              </span>
              <div className="flex space-x-2 items-center">
                {userLogin?.id !== userInfo?.id ? (
                  <>
                    {userInfo?.is_followed ? (
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
                            onClick={handleFollow}
                            className="inline-block p-2.5 border border-solid border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer"
                          >
                            <IconFollowing />
                          </span>
                        </Tippy>
                      </>
                    ) : (
                      <button
                        className="bg-primary text-white font-semibold py-1.5 px-20 rounded-md"
                        onClick={handleFollow}
                      >
                        Follow
                      </button>
                    )}
                  </>
                ) : (
                  <button
                    onClick={handleOpen}
                    className="flex items-center space-x-2 px-4 py-1.5 text-base font-bold border border-gray-200 rounded-md"
                  >
                    <IconEdit className="w-5 h-5" />
                    <span>Edit profile</span>
                  </button>
                  // <UpdateUser user={userInfo} />
                )}
              </div>
            </div>
          </div>
          <div className="flex space-x-5">
            <div>
              <b>{userInfo?.followings_count}</b> Following
            </div>
            <div>
              <b>{userInfo?.followers_count}</b> Follower
            </div>
            <div>
              <b>{userInfo?.likes_count}</b> Likes
            </div>
          </div>
          <h2 className="whitespace-pre-line">{userInfo?.bio}</h2>
          <a
            href={userInfo?.website_url}
            className="text-primary flex items-center space-x-1"
          >
            <IconLink fill="rgba(254, 44, 85, 1.0)" />
            <span className="font-bold hover:underline">
              {userInfo?.website_url}
            </span>
          </a>
          <div className="absolute top-0 left-[80%]">
            <div className="flex space-x-4">
              <IconShared className="cursor-pointer" />
              <IconMoreHorizontal className="cursor-pointer" />
            </div>
          </div>
        </div>
      )}
      {isError && (
        <NoDataProfile
          className="mt-32"
          title="Couldn't find this account"
          description="Looking for videos? Try browsing our trending creators, hashtags,
            and sounds."
        />
      )}
      {open && (
        <UpdateUser open={open} handleClose={handleClose} user={userLogin} />
      )}
    </>
  );
}

export default ProfileInfo;
