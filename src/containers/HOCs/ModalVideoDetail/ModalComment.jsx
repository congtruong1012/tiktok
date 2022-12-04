import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import CommentInput from "../../../components/Comment/CommentInput";
import ListComment from "../../../components/Comment/ListComment";
import Scrollbar from "../../../components/Layout/Scrollbar";
import LoadingTikTok from "../../../components/Layout/Skeleton/LoadingTiktok";
import SkeletonComment from "../../../components/Layout/Skeleton/SkeletonComment";
import { listComments } from "../../../services/commentService";

function ModalComment(props) {
  const { videoId } = props;
  const { ref, inView } = useInView();
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["modal-comments", videoId],
      queryFn: ({ pageParam = 1 }) => listComments(videoId, pageParam),
      getNextPageParam: (params) => {
        const { current_page, total_pages } = params?.meta?.pagination || {};
        return current_page < total_pages ? current_page + 1 : undefined;
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
      <CommentInput queryKey="modal-comments" videoId={videoId} />
    </>
  );
}

export default ModalComment;
