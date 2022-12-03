import { useMutation } from "@tanstack/react-query";
import Tippy from "@tippyjs/react";
import React, { useCallback, useState } from "react";
import Image from "../../../components/Layout/Image";
import { followAccount, unfollowAccount } from "../../../services/followAccount";
import { getAnUser } from "../../../services/userService";
import debounce from "../../../utils/debounce";
import { AuthLogin } from "../AuthLogin";

function HoverCard(props) {
  const { Component, userId, ...rest } = props;

  const { data, mutate } = useMutation({
    mutationFn: (nickname) => getAnUser(nickname),
  });

  const { mutate: mutateFollow } = useMutation({
    mutationFn: followAccount,
    onSuccess: (rs) => Object.assign(data, rs),
  });

  const { mutate: mutateUnfollow } = useMutation({
    mutationFn: unfollowAccount,
    onSuccess: (rs) => Object.assign(data, rs),
  });

  const deboundceMouseEnter = useCallback(
    debounce(() => mutate(`@${userId}`), 500),
    []
  );

  const onMouseEnter = () => {
    deboundceMouseEnter();
  };

  const fullname = `${data?.first_name} ${data?.last_name}`;

  return (
    <>
      <Tippy
        interactive
        content={
          <div className="bg-white w-[320px] p-4 shadow-md">
            <div className="flex justify-between mb-3">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <Image src={data?.avatar} className="w-full h-full" />
              </div>
              <AuthLogin Component="div">
                {data?.is_followed ? (
                  <button
                    onClick={() => mutateUnfollow(data?.id)}
                    className="rounded-lg px-3 py-1 hover:bg-gray-50  font-semibold border border-gray-200"
                  >
                    Following
                  </button>
                ) : (
                  <button
                    onClick={() => mutateFollow(data?.id)}
                    className="rounded-lg px-3 py-1 hover:bg-red-50 text-primary font-semibold border border-primary"
                  >
                    Follow
                  </button>
                )}
              </AuthLogin>
            </div>
            <div className="font-bold text-lg">
              {data?.full_name || fullname}
            </div>
            <div className="text-sm">{data?.nickname}</div>
            <div className="flex mt-1">
              <div className="mr-3">
                <span className="font-semibold">{data?.followers_count}</span>{" "}
                <span className="text-gray-400">
                  {data?.followers_count > 1 ? "Followers" : "Follow"}
                </span>
              </div>
              <div>
                <span className="font-semibold">{data?.likes_count}</span>{" "}
                <span className="text-gray-400">
                  {data?.likes_count > 1 ? "Likes" : "Like"}
                </span>
              </div>
            </div>
            {data?.bio && <div className="text-sm mt-4">{data?.bio}</div>}
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
