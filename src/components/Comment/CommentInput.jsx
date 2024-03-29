import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  makeSelectVideoInfo,
  updateVideo,
} from "../../containers/Features/Video/reducer";
import IconEmoji from "../../icons/IconEmoji";
import IconTag from "../../icons/IconTag";
import { createComment } from "../../services/commentService";

function CommentInput(props) {
  const { videoId, queryKey } = props;
  const inputRef = useRef();

  const videoInfo = useSelector((state) => makeSelectVideoInfo(state, videoId));

  const dispatch = useDispatch();

  const queryClient = useQueryClient();
  const { mutate, status } = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKey, videoId],
      });
      inputRef.current.value = "";
    },
  });

  const handleAddComment = (e) => {
    e.preventDefault();
    if (inputRef.current.value) {
      mutate(
        { videoId, body: { comment: inputRef.current?.value } },
        {
          onSuccess: () => {
            dispatch(
              updateVideo({
                id: videoId,
                byId: {
                  ...videoInfo,
                  comments_count: videoInfo?.comments_count + 1,
                },
              })
            );
          },
        }
      );
    }
  };

  return (
    <>
      {/* Add comment */}
      <div className="flex space-x-6">
        <div className="relative flex-grow">
          <form onSubmit={handleAddComment}>
            <input
              type="text"
              ref={inputRef}
              className="w-full bg-gray-100 rounded-lg text-sm py-2"
              placeholder="Add comment..."
            />
          </form>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex space-x-2">
            <span className="cursor-pointer p-1 rounded-lg hover:bg-gray-300">
              <IconTag className="w-[22px] h-[22px] " />
            </span>
            <span className="cursor-pointer p-1 rounded-lg hover:bg-gray-300">
              <IconEmoji className="w-[22px] h-[22px]" />
            </span>{" "}
          </div>
        </div>
        <button
          disabled={status === "loading"}
          onClick={handleAddComment}
          className="text-sm text-primary disabled:text-gray-300"
        >
          Post
        </button>
      </div>
    </>
  );
}

export default CommentInput;
