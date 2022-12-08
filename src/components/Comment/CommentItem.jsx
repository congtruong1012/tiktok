import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import Tippy from "@tippyjs/react";
import { formatDistanceToNowStrict } from "date-fns";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { makeSelectUserInfo } from "../../containers/Features/User/reducer";
import {
  makeSelectVideoInfo,
  updateVideo,
} from "../../containers/Features/Video/reducer";
import HoverCard from "../../containers/HOCs/HoverCard";
import useLikeComment from "../../hooks/useLikeComment";
import IconHeart from "../../icons/IconHeart";
import IconMoreHorizontal from "../../icons/IconMoreHorizontal";
import { deleteComment } from "../../services/commentService";
import Image from "../Layout/Image";

function IconLike({ isLiked, likesCount, handleLikeComment, vertical }) {
  return (
    <div
      className={`flex items-center ${
        vertical ? "space-x-2" : "flex-col  space-y-1"
      } cursor-pointer`}
    >
      <IconHeart
        onClick={handleLikeComment}
        className={`w-5 h-5 ${isLiked ? "text-primary" : "text-black"}`}
      />
      <span>{likesCount}</span>
    </div>
  );
}

function CommentItem(props) {
  const { comment, queryKey, videoId } = props;
  const userIdLogin = useSelector((state) => state?.app?.user?.id);
  const userInfo = useSelector((state) =>
    makeSelectUserInfo(state, comment?.user?.id)
  );
  const videoInfo = useSelector((state) => makeSelectVideoInfo(state, videoId));

  const dispatch = useDispatch();

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries([queryKey, videoId]);
      dispatch(
        updateVideo({
          id: videoId,
          byId: {
            ...videoInfo,
            comments_count: videoInfo?.comments_count - 1,
          },
        })
      );
    },
  });

  const { handleLikeComment } = useLikeComment({
    commentId: comment?.id,
    status: comment?.is_liked,
    onSuccess: (rs) => {
      Object.assign(comment, rs);
    },
  });

  return (
    <div className="flex space-x-4">
      <Link
        to={`/profile/${userInfo?.nickname}`}
        className="inline-block w-10 h-10 rounded-full overflow-hidden"
      >
        <HoverCard
          Component={Image}
          userId={userInfo?.nickname}
          className="w-full h-full cursor-pointer"
          src={userInfo?.avatar}
        ></HoverCard>
      </Link>
      <div className="flex-grow">
        <div className="flex flex-col">
          <HoverCard
            Component={Link}
            to={`/profile/@${userInfo?.nickname}`}
            userId={userInfo?.nickname}
            className="text-lg font-bold inline-block hover:underline"
          >
            {`${userInfo?.first_name} ${comment?.user?.last_name}`}
          </HoverCard>
          <span className="text-base">{comment?.comment}</span>
          <div className="flex items-center space-x-6 my-1  text-sm font-light">
            <span className="text-gray-400">
              {formatDistanceToNowStrict(
                new Date(comment?.updated_at || comment?.created_at),
                {
                  addSuffix: true,
                }
              )}
            </span>
            {queryKey === "comments" && (
              <IconLike
                isLiked={comment?.is_liked}
                likesCount={comment?.likes_count}
                handleLikeComment={handleLikeComment}
                vertical
              />
            )}
            <button className="font-normal">Reply</button>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-2 items-center ">
        {userInfo?.id === userIdLogin && (
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
        {queryKey === "modal-comments" && (
          <IconLike
            isLiked={comment?.is_liked}
            likesCount={comment?.likes_count}
            handleLikeComment={handleLikeComment}
          />
        )}
      </div>
    </div>
  );
}

export default CommentItem;
