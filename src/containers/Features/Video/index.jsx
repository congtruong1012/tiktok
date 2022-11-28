import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Post from "../../../components/Post";
import { video } from "../../../services/videoService";
function Video(props) {
  const { type } = props;
  const { ref, inView } = useInView();
  const { isLoading, isFetchingNextPage, hasNextPage, data, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["videos"],
      queryFn: ({ pageParams = 1 }) => video(pageParams, type),
      getNextPageParam: (params) => {
        const { current_page, total_pages } = params?.meta?.pagination || {};
        return current_page < total_pages ? current_page + 1 : undefined;
      },
    });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  return (
    <div>
      {isLoading ? (
        <div>
          <div className="flex flex-wrap">
            <div className="animate-pulse bg-gray-200 w-14 h-14 rounded-full overflow-hidden mr-2"></div>
            <div className="flex-grow">
              <div className="animate-pulse bg-gray-200 w-[100px] h-3 rounded-lg"></div>
              <div className="animate-pulse bg-gray-200 w-[200px] h-3 rounded-lg mt-2"></div>
              <div className="animate-pulse bg-gray-200 w-[150px] h-3 rounded-lg mt-2"></div>
              <div className="mt-4 animate-pulse w-[320px] h-[400px] bg-gray-200 "></div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {data?.pages?.map((page) => {
            return page?.data?.map((video) => (
              <Post key={String(video?.id)} video={video} />
            ));
          })}
        </>
      )}
      <div ref={ref}></div>
    </div>
  );
}

Video.propTypes = {};

export default Video;
