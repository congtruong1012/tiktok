import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import React from "react";
import HoverVideoPlayer from "react-hover-video-player";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import IconPlay from "../../../icons/IconPlay";
import { getAnUser } from "../../../services/userService";
import { getVideoLiked } from "../../../services/videoService";
import NoDataProfile from "./NoDataProfile";
import VideoInProfile from "./VideoInProfile";

function VideoLiked() {
  const { id } = useParams();

  const userLogin = useSelector((state) => state.app.user);

  const { data: profile } = useQuery({
    queryKey: ["profile", id],
    queryFn: () => getAnUser(id),
  });

  const {
    isLoading,
    fetchStatus,
    hasNextPage,
    data,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["videos-like", profile?.id],
    queryFn: ({ pageParam = 1 }) => getVideoLiked(profile?.id, pageParam),
    getNextPageParam: (params) => {
      const { current_page, total_pages } = params?.meta?.pagination || {};
      return current_page < total_pages ? current_page + 1 : undefined;
    },
    enabled: !!profile?.id && profile?.id === userLogin?.id,
  });
  const passProps = {
    isLoading: isLoading && fetchStatus !== "idle",
    hasNextPage,
    data,
    isFetchingNextPage,
    fetchNextPage,
  };
  return (
    <>
      <VideoInProfile {...passProps} />
      {data?.pages[0]?.data?.length === 0 ||
        (userLogin?.id !== profile?.id && (
          <NoDataProfile
            className="mt-10"
            title={
              userLogin?.id === profile?.id
                ? "No liked videos yet"
                : `This user's liked videos are private`
            }
            description={
              userLogin?.id === profile?.id
                ? "Videos you liked will appear here"
                : `Videos liked by ${profile?.nickname} are currently hidden`
            }
          />
        ))}
    </>
  );
}

export default VideoLiked;
