import React, { useEffect, useRef } from "react";
import { useViewPort } from "../../hooks/useViewPort";
import IconComment from "../../icons/IconComment";
import IconHeart from "../../icons/IconHeart";
import IconShared from "../../icons/IconShared";
import Video from "../Video";
// import PropTypes from 'prop-types'

function Post(props) {
  const { video } = props;
  const { avatar, user, dateCreated, desc, post, like, comment } = video;
  const reactions = [
    {
      icon: IconHeart,
      num: like,
    },
    {
      icon: IconComment,
      num: comment,
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
          <img src={avatar} alt="user" className="w-full h-full object-cover" />
        </div>
      </div>
      <div className="px-2">
        <div className="flex">
          <div className="flex-grow">
            <a href="/" className="flex items-center">
              <h5 className="text-lg font-bold mr-2">{user}</h5>
              <span className="text-sm text-gray-400">
                {" · "} {dateCreated}
              </span>
            </a>
            <p className="py-1 leading-5 whitespace-pre-line">{desc}</p>
          </div>
          <div className="">
            <button className="rounded-lg px-3 py-1 hover:bg-red-50 text-primary font-semibold border border-primary">
              Follow
            </button>
          </div>
        </div>

        <div className="flex my-2">
          <div className="w-1/2">
            <Video {...props} />
          </div>
          <div className="w-1/2 flex flex-col justify-end pl-4">
            {reactions.map((item, i) => (
              <div
                className="text-center w-14 cursor-pointer my-2"
                key={String(i)}
              >
                <button className="block mx-auto rounded-full p-3 text-center bg-slate-100">
                  <item.icon className="w-6 h-6" />
                </button>
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
