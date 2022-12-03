import Tippy from "@tippyjs/react";
import PropTypes from "prop-types";
import React from "react";
import IconHeart from "../../icons/IconHeart";
import IconMoreHorizontal from "../../icons/IconMoreHorizontal";
import Image from "../Layout/Image";

function CommentItem(props) {
  return (
    <div className="flex space-x-4">
      <div className="w-10 h-10 rounded-full overflow-hidden">
        <Image className="w-full h-full" src="" />
      </div>
      <div className="flex-grow">
        <div className="flex flex-col spacing-y-2">
          <span>
            <a href="" className="text-lg font-bold hover:underline">
              Phạm thoại Review
            </a>
          </span>
          <span className="text-base">
            thôi mà từ từ hả lấy, chị mà lấy chồng em khóc đó
          </span>
          <div className="flex space-x-6 my-1 text-gray-400 text-sm font-light">
            <span>16d ago</span>
            <button className="font-light">Reply</button>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-2 items-center ">
        <Tippy placement="bottom-end" interactive content={<ul className="bg-white py-2 font-semibold w-[200px] shadow-md">
          <li className="block px-4 py-2 cursor-pointer hover:bg-gray-50 hover:text-primary">Update</li>
          <li className="block px-4 py-2 cursor-pointer hover:bg-gray-50 hover:text-primary">Delete</li>
        </ul>}>
          <div className="cursor-pointer">
            <IconMoreHorizontal className="w-5 h-5 " />
          </div>
        </Tippy>
        <div className="cursor-pointer">
          <IconHeart className="w-5 h-5 " />
          <span>10</span>
        </div>
      </div>
    </div>
  );
}

export default CommentItem;
