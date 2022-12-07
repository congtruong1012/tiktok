import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch } from "react-redux";
import CommentInput from "../../../components/Comment/CommentInput";
import ListComment from "../../../components/Comment/ListComment";
import Scrollbar from "../../../components/Layout/Scrollbar";
import LoadingTikTok from "../../../components/Layout/Skeleton/LoadingTiktok";
import SkeletonComment from "../../../components/Layout/Skeleton/SkeletonComment";
import { listComments } from "../../../services/commentService";
import { userStorage } from "../../Features/User/reducer";

function ModalComment(props) {
  const { videoId } = props;
  const { ref, inView } = useInView();

  const dispatch = useDispatch();

  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["modal-comments", videoId],
      queryFn: ({ pageParam = 1 }) => listComments(videoId, pageParam),
      getNextPageParam: (params) => {
        const { current_page, total_pages } = params?.meta?.pagination || {};
        return current_page < total_pages ? current_page + 1 : undefined;
      },
      onSuccess: (data) => {
        const byId = {};
        let allIds = [];
        data?.pages?.forEach((page) => {
          allIds = page?.data?.map((item) => item?.user?.id || "") || [];
          page?.data.forEach((item) => {
            byId[item?.user?.id] = item?.user;
          });
        });
        dispatch(userStorage({ byId, allIds }));
      },
    });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <>
      <Scrollbar className="flex-1">
        <div className="flex flex-col space-y-4 px-8 py-6">
          {isLoading ? (
            <SkeletonComment />
          ) : (
            <>
              {data?.pages?.map((page, index) => {
                return (
                  <ListComment
                    key={String(index)}
                    comments={page?.data || []}
                    queryKey="modal-comments"
                    videoId={videoId}
                  />
                );
              })}
              {isFetchingNextPage && (
                <div className="flex justify-center items-center my-2">
                  <LoadingTikTok className="w-5 h-5" />
                </div>
              )}
              {hasNextPage && <div ref={ref}></div>}
            </>
          )}
        </div>
      </Scrollbar>
      <div className="border-t border-solid border-gray-300 px-8 py-5">
        <CommentInput queryKey="modal-comments" videoId={videoId} />
      </div>
    </>
  );
}

export default ModalComment;
