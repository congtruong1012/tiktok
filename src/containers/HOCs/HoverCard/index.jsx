import { useMutation } from "@tanstack/react-query";
import Tippy from "@tippyjs/react";
import debounce from "lodash.debounce";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ButtonFollow from "../../../components/ButtonFollow";
import Image from "../../../components/Layout/Image";
import useFollowUser from "../../../hooks/useFllowUser";
import { getAnUser } from "../../../services/userService";
import { makeSelectUserInfo, userStorage } from "../../Features/User/reducer";
import { AuthLogin } from "../AuthLogin";

function HoverCard(props) {
  const { Component, userId, nickname, ...rest } = props;

  const dispatch = useDispatch();

  const { mutate } = useMutation({
    mutationKey: ["user", nickname],
    mutationFn: getAnUser,
  });

  const userInfo = useSelector((state) => makeSelectUserInfo(state, userId));

  const { handleFollow } = useFollowUser({
    userId: userInfo?.id,
    status: userInfo?.is_followed,
  });

  const onMouseEnter = () => {
    if (!userInfo)
      mutate(`@${nickname}`, {
        onSuccess: (rs) => {
          dispatch(
            userStorage({
              allIds: [rs?.id],
              byId: {
                [rs?.id]: rs,
              },
            })
          );
        },
      });
  };

  const fullname = `${userInfo?.first_name} ${userInfo?.last_name}`;

  return (
    <>
      <Tippy
        interactive
        content={
          <div className="bg-white w-[320px] p-4 shadow-md">
            <div className="flex justify-between mb-3">
              <Link
                to={`/profile/@${userInfo?.nickname}`}
                className="w-10 h-10 rounded-full overflow-hidden"
              >
                <Image src={userInfo?.avatar} className="w-full h-full" />
              </Link>
              <AuthLogin Component="div">
                <ButtonFollow
                  isFollowed={userInfo?.is_followed}
                  className="py-1 px-8"
                  onClick={handleFollow}
                />
              </AuthLogin>
            </div>
            <Link
              to={`/profile/@${userInfo?.nickname}`}
              className="font-bold text-lg hover:underline"
            >
              {userInfo?.full_name || fullname}
            </Link>
            <div className="text-sm">{userInfo?.nickname}</div>
            <div className="flex mt-1">
              <div className="mr-3">
                <span className="font-semibold">
                  {userInfo?.followers_count}
                </span>{" "}
                <span className="text-gray-400">
                  {userInfo?.followers_count > 1 ? "Followers" : "Follow"}
                </span>
              </div>
              <div>
                <span className="font-semibold">{userInfo?.likes_count}</span>{" "}
                <span className="text-gray-400">
                  {userInfo?.likes_count > 1 ? "Likes" : "Like"}
                </span>
              </div>
            </div>
            {userInfo?.bio && (
              <div className="text-sm mt-4">{userInfo?.bio}</div>
            )}
          </div>
        }
        delay={[800, 0]}
        placement="bottom-start"
      >
        <div
          style={{ width: "inherit", height: "inherit" }}
          onMouseEnter={onMouseEnter}
        >
          <Component {...rest} />
        </div>
      </Tippy>
    </>
  );
}

export default HoverCard;
