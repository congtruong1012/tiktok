import React from "react";
import CommentInput from "../../../components/Comment/CommentInput";
import CommentItem from "../../../components/Comment/CommentItem";
import ListComment from "../../../components/Comment/ListComment";
import Image from "../../../components/Layout/Image";
import Scrollbar from "../../../components/Layout/Scrollbar";
import IconArrowDown from "../../../icons/IconArrowDown";
import IconEmoji from "../../../icons/IconEmoji";
import IconTag from "../../../icons/IconTag";

function Comment() {
  return (
    <>
      {/* List comment */}
      <Scrollbar className="flex-1">
        <ListComment />
      </Scrollbar>
      <CommentInput />
    </>
  );
}

export default Comment;
