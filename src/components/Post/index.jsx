import { formatDistanceToNow, isValid } from "date-fns";
import React, { useEffect, useRef } from "react";
import { AuthLogin } from "../../containers/HOCs/AuthLogin";
import HoverCard from "../../containers/HOCs/HoverCard";
import { useViewPort } from "../../hooks/useViewPort";
import IconComment from "../../icons/IconComment";
import IconHeart from "../../icons/IconHeart";
import IconShared from "../../icons/IconShared";
import Image from "../Layout/Image";
import Video from "../Video";
// import PropTypes from 'prop-types'

function Post(props) {
  const { video } = props;
  // const { avatar, user, dateCreated, desc, post, like, comment } = video;
  const reactions = [
    {
      icon: IconHeart,
      num: video?.likes_count || 0,
      className: `${video?.is_liked ? "bg-red-400" : ""}`,
    },
    {
      icon: IconComment,
      num: video?.comments_count || 0,
    },
    {
      icon: IconShared,
      num: "Share",
    },
  ];

  return (
    <div className="flex py-5 border-b">
      <div className="flex-shrink-0 flex-grow-0 mr-2">
        <div className="w-14 h-14 rounded-full overflow-hidden">
          <HoverCard
            Component={Image}
            src={video?.user?.avatar}
            alt="user"
            className="w-full h-full object-cover"
            userId={video?.user?.nickname}
          />
        </div>
      </div>
      <div className="px-2 flex-grow">
        <div className="flex">
          <div className="flex-grow">
            <HoverCard
              Component="a"
              className="flex items-center"
              userId={video?.user?.nickname}
              href="#"
            >
              <h5 className="text-lg font-bold mr-2">{`${video?.user?.first_name} ${video?.user?.last_name}`}</h5>
              {video?.user?.nickname && (
                <div className="text-gray-600">
                  <span> · </span>
                  <span className="text-sm font-semibold ">
                    {video?.user?.nickname}
                  </span>
                </div>
              )}
              <div className="ml-1 text-gray-400">
                <span> · </span>
                <span className="text-sm">
                  {isValid(new Date(video?.published_at)) &&
                    formatDistanceToNow(new Date(video?.published_at), {
                      addSuffix: true,
                    })}
                </span>
              </div>
            </HoverCard>
            <p className="py-1 leading-5 whitespace-pre-line">
              {video?.description}
            </p>
          </div>
          <div className="">
            {video?.user?.is_followed === false && (
              <button className="rounded-lg px-3 py-1 hover:bg-red-50 text-primary font-semibold border border-primary">
                Follow
              </button>
            )}
          </div>
        </div>

        <div className="flex my-2">
          <div className="w-1/2">
            <Video {...props} />
          </div>
          <div className="w-1/2 flex flex-col justify-end pl-4">
            {reactions.map((item, i) => (
              <div
                className={`text-center w-14 cursor-pointer my-2 ${
                  item?.className || ""
                }`}
                key={String(i)}
              >
                {/* <button className="block mx-auto rounded-full p-3 text-center bg-slate-100">
                  <item.icon className="w-6 h-6" />
                </button> */}
                <AuthLogin
                  Component="button"
                  className="block mx-auto rounded-full p-3 text-center bg-slate-100"
                  onClick={() => console.log("Oke na")}
                >
                  <item.icon className="w-6 h-6" />
                </AuthLogin>
                <div className="text-sm font-bold mt-1">{item.num}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Post.propTypes = {};

export default Post;
