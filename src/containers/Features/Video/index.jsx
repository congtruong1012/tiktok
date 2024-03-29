import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import LoadingTikTok from "../../../components/Layout/Skeleton/LoadingTiktok";
import Post from "../../../components/Post";
import { video } from "../../../services/videoService";
import { makeSelectUserInfo, userStorage } from "../User/reducer";
import { videoStorage } from "./reducer";
function Video(props) {
  const { type } = props;
  const { ref, inView } = useInView();

  const dispatch = useDispatch();

  const { isLoading, isFetchingNextPage, hasNextPage, data, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["videos", type],
      queryFn: ({ pageParam = 1 }) => video(pageParam, type),
      getNextPageParam: (params) => {
        const { current_page, total_pages } = params?.meta?.pagination || {};
        return current_page < total_pages ? current_page + 1 : undefined;
      },
      onSuccess: (data) => {
        const byIdUser = {};
        let allIdsUser = [];

        const byIdVideo = {};
        let allIdsVideo = [];

        data?.pages?.forEach((page) => {
          allIdsUser = page?.data?.map((item) => item?.user?.id || "") || [];
          allIdsVideo = page?.data?.map((item) => item?.id || "") || [];
          page?.data.forEach((item) => {
            byIdUser[item?.user?.id] = item?.user;
            byIdVideo[item?.id] = item;
          });
        });
        dispatch(userStorage({ byId: byIdUser, allIds: allIdsUser }));
        dispatch(videoStorage({ byId: byIdVideo, allIds: allIdsVideo }));
      },
    });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  return (
    <>
      {isLoading ? (
        <div className="flex flex-wrap">
          <div className="animate-pulse bg-gray-200 w-14 h-14 rounded-full overflow-hidden mr-2"></div>
          <div className="flex-grow">
            <div className="animate-pulse bg-gray-200 w-[100px] h-3 rounded-lg"></div>
            <div className="animate-pulse bg-gray-200 w-[200px] h-3 rounded-lg mt-2"></div>
            <div className="animate-pulse bg-gray-200 w-[150px] h-3 rounded-lg mt-2"></div>
            <div className="mt-4 animate-pulse w-[320px] h-[400px] bg-gray-200 "></div>
          </div>
        </div>
      ) : (
        <>
          {data?.pages?.map((page) => {
            return page?.data?.map((video) => (
              <Post key={String(video?.id)} video={video} type={type} />
            ));
          })}
          {isFetchingNextPage && (
            <div className="flex justify-center items-center my-3">
              <LoadingTikTok className="w-5 h-5" />
            </div>
          )}
          {hasNextPage && <div ref={ref}></div>}
        </>
      )}
    </>
  );
}

Video.propTypes = {};

export default Video;
