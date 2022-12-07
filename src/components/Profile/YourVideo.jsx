import { isError, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import React from "react";
import HoverVideoPlayer from "react-hover-video-player";
import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NoDataProfile from "./NoDataProfile";
import { getAnUser } from "../../services/userService";
import { getUserVideo } from "../../services/videoService";
import VideoInProfile from "./VideoInProfile";

function YourVideo() {
  const { id } = useParams();
  const { data: profile } = useQuery({
    queryKey: ["profile", id],
    queryFn: () => getAnUser(id),
  });

  const { isLoading, hasNextPage, data, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["your-videos", profile?.id],
      queryFn: ({ pageParam = 1 }) => getUserVideo(profile?.id, pageParam),
      getNextPageParam: (params) => {
        const { current_page, total_pages } = params?.meta?.pagination || {};
        return current_page < total_pages ? current_page + 1 : undefined;
      },
      enabled: !!profile?.id,
    });

  const userLogin = useSelector((state) => state.app.user);

  const passProps = {
    isLoading,
    hasNextPage,
    data,
    isFetchingNextPage,
    fetchNextPage,
  };
  return (
    <>
      <VideoInProfile {...passProps} />
      {data?.pages[0]?.data?.length === 0 && (
        <NoDataProfile
          className="mt-10"
          title={
            userLogin?.id === profile?.id
              ? "Upload your first video"
              : `No content`
          }
          description={
            userLogin?.id === profile?.id
              ? "Your videos will appear here"
              : `This user has not published any videos.`
          }
        />
      )}
    </>
  );
}

export default YourVideo;
