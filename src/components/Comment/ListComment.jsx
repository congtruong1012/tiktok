import React from "react";
import IconArrowDown from "../../icons/IconArrow";
import CommentItem from "./CommentItem";

function ListComment(props) {
  const { comments, videoId, queryKey } = props;
  return (
    <>
      {comments?.map((comment) => (
        <div key={comment?.id}>
          <CommentItem
            comment={comment}
            queryKey={queryKey}
            videoId={videoId}
          />
          {/* {comment % 3 !== 0 ? (
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
          )} */}
        </div>
      ))}
    </>
  );
}

export default ListComment;
