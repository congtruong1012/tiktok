import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import React from "react";
import HoverVideoPlayer from "react-hover-video-player";
import { useInView } from "react-intersection-observer";
import { useParams } from "react-router-dom";
import IconPlay from "../../../icons/IconPlay";
import { getAnUser } from "../../../services/userService";
import { getUserVideo } from "../../../services/videoService";
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
        console.log(
          "aaaa",
          current_page < total_pages ? current_page + 1 : undefined
        );
        return current_page < total_pages ? current_page + 1 : undefined;
      },
      enabled: !!profile?.id,
    });
  const passProps = {
    isLoading,
    hasNextPage,
    data,
    isFetchingNextPage,
    fetchNextPage,
  };
  return <VideoInProfile {...passProps} />;
}

export default YourVideo;
