import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import Tippy from "@tippyjs/react";
import { formatDistanceToNow } from "date-fns";
import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import HoverCard from "../../containers/HOCs/HoverCard";
import IconHeart from "../../icons/IconHeart";
import IconMoreHorizontal from "../../icons/IconMoreHorizontal";
import { deleteComment } from "../../services/commentService";
import Image from "../Layout/Image";

function CommentItem(props) {
  const { comment, queryKey, videoId } = props;
  const userId = useSelector((state) => state?.app?.user?.id);

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries([queryKey, videoId]);
    },
  });

  return (
    <div className="flex space-x-4">
      <div className="w-10 h-10 rounded-full overflow-hidden">
        <HoverCard
          Component={Image}
          userId={comment?.user?.nickname}
          className="w-full h-full cursor-pointer"
          src={comment?.user?.avatar}
        ></HoverCard>
      </div>
      <div className="flex-grow">
        <div className="flex flex-col">
          <HoverCard
            Component={Link}
            to={`/profile/@${comment?.user?.nickname}`}
            userId={comment?.user?.nickname}
            className="text-lg font-bold inline-block hover:underline"
          >
            {`${comment?.user?.first_name} ${comment?.user?.last_name}`}
          </HoverCard>
          <span className="text-base">{comment?.comment}</span>
          <div className="flex space-x-6 my-1 text-gray-400 text-sm font-light">
            <span>
              {formatDistanceToNow(
                new Date(comment?.updated_at || comment?.created_at),
                {
                  addSuffix: true,
                }
              )}
            </span>
            <button className="font-light">Reply</button>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-2 items-center ">
        {comment.user?.id === userId && (
          <Tippy
            placement="bottom-end"
            interactive
            content={
              <ul className="bg-white py-2 font-semibold w-[200px] shadow-md">
                <li
                  onClick={(e) => {
                    e.stopPropagation();
                    mutate({ commentId: comment?.id });
                  }}
                  className="block px-4 py-2 cursor-pointer hover:bg-gray-50 hover:text-primary"
                >
                  Delete
                </li>
              </ul>
            }
          >
            <div className="cursor-pointer">
              <IconMoreHorizontal className="w-5 h-5 " />
            </div>
          </Tippy>
        )}
        <div className="text-center cursor-pointer">
          <IconHeart
            className={`w-5 h-5 ${
              comment?.is_liked ? "text-primary" : "text-black"
            }`}
          />
          <span>{comment?.likes_count}</span>
        </div>
      </div>
    </div>
  );
}

export default CommentItem;
