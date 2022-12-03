import React from "react";
import CommentItem from "../../../components/Comment/CommentItem";
import Image from "../../../components/Layout/Image";
import Scrollbar from "../../../components/Layout/Scrollbar";
import IconArrowDown from "../../../icons/IconArrowDown";
import IconEmoji from "../../../icons/IconEmoji";
import IconTag from "../../../icons/IconTag";

function Comment() {
  return (
    <>
      {/* List comment */}
      <Scrollbar className=" flex-1">
        <div className="flex flex-col space-y-2 px-8 py-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((comment) => (
            <div key={comment}>
              <CommentItem />
              {comment % 3 !== 0 ? (
                <div className="flex items-center space-x-1 ml-14 font-normal text-sm cursor-pointer hover:underline">
                  <span>View more replies (8)</span>
                  <IconArrowDown />
                </div>
              ) : (
                <div className="ml-14 mt-2">
                  {" "}
                  <CommentItem />
                  <CommentItem />
                  <CommentItem />
                </div>
              )}
            </div>
          ))}
        </div>
      </Scrollbar>
      {/* Add comment */}
      <div className="flex space-x-6 px-8 py-5 border-t border-solid border-gray-300">
        <div className="relative flex-grow">
          <input
            type="text"
            name=""
            id=""
            className="w-full bg-gray-100 rounded-lg text-sm py-2"
            placeholder="Add comment..."
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex space-x-2">
            <span className="cursor-pointer p-1 rounded-lg hover:bg-gray-300">
              <IconTag className="w-[22px] h-[22px] " />
            </span>
            <span className="cursor-pointer p-1 rounded-lg hover:bg-gray-300">
              <IconEmoji className="w-[22px] h-[22px]" />
            </span>{" "}
          </div>
        </div>
        <button className="text-sm text-primary">Post</button>
      </div>
    </>
  );
}

export default Comment;
