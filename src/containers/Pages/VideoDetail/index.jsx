import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import Tippy from "@tippyjs/react";
import { formatDistanceToNowStrict, isValid } from "date-fns";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import ButtonFollow from "../../../components/ButtonFollow";
import CommentInput from "../../../components/Comment/CommentInput";
import ListComment from "../../../components/Comment/ListComment";
import CommonLayout from "../../../components/Layout/CommonLayout";
import Image from "../../../components/Layout/Image";
import useFollowUser from "../../../hooks/useFllowUser";
import IconArrow from "../../../icons/IconArrow";
import IconComment from "../../../icons/IconComment";
import IconHeart from "../../../icons/IconHeart";
import IconMoreHorizontal from "../../../icons/IconMoreHorizontal";
import IconMusic from "../../../icons/IconMusic";
import IconMute from "../../../icons/IconMute";
import IconPlay from "../../../icons/IconPlay";
import IconShared from "../../../icons/IconShared";
import { listComments } from "../../../services/commentService";
import { getVideo } from "../../../services/videoService";
import { makeSelectUserInfo, userStorage } from "../../Features/User/reducer";
import {
  makeSelectVideoInfo,
  videoStorage,
} from "../../Features/Video/reducer";
import HoverCard from "../../HOCs/HoverCard";
import Video from "./Video";

function VideoDetail() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const {
    data,
    isLoadingComments,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["comments", id],
    queryFn: ({ pageParam = 1 }) => listComments(id, pageParam),
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

  const { data: video, isLoadingVideo } = useQuery({
    queryKey: ["video", id],
    queryFn: () => getVideo(id),
    onSuccess: ({ data: rs }) => {
      dispatch(
        videoStorage({
          byId: { [rs?.id]: rs },
          allIds: [rs?.id],
        })
      );
      dispatch(
        userStorage({
          byId: { [rs?.user.id]: rs?.user },
          allIds: [rs?.user.id],
        })
      );
    },
  });

  const videoInfo = useSelector((state) => makeSelectVideoInfo(state, id));
  const userInfo = useSelector((state) =>
    makeSelectUserInfo(state, videoInfo?.user?.id)
  );

  const { handleFollow } = useFollowUser({
    userId: userInfo?.id,
    status: userInfo?.is_followed,
  });

  return (
    <CommonLayout>
      <div className="flex flex-col space-y-4">
        {isLoadingVideo ? (
          <div>Loading video ...</div>
        ) : (
          <>
            <Link to="/" className="flex space-x-4">
              <IconArrow className="-rotate-180" />
              <span>Back to For You</span>
            </Link>
            <Video video={videoInfo} />
            {/* Description */}
            <div>
              <p className="mb-2">{video?.description}</p>
              {videoInfo?.music && (
                <div className="flex space-x-1 items-center">
                  <IconMusic className="h-5 w-5" />
                  <span className="font-semibold">{videoInfo?.music}</span>
                </div>
              )}
            </div>
            {/* Info user */}
            <div className="flex space-x-4 border-t border-b border-gray-200 border-solid py-5">
              <HoverCard
                Component="div"
                userId={userInfo?.nickname}
                className="w-10 h-10 overflow-hidden rounded-full"
              >
                <Image src={userInfo?.avatar} className="w-full h-full" />
              </HoverCard>
              <div className="max-h-[145px]">
                <HoverCard
                  Component={Link}
                  userId={userInfo?.nickname}
                  to={`/profile/@${userInfo?.nickname}`}
                  className="line-clamp-1 font-bold text-lg hover:underline"
                >
                  {`${userInfo?.first_name} ${userInfo?.last_name}`}
                </HoverCard>
                <div className="flex items-center space-x-1 text-gray-400 text-sm">
                  <span className="flex-grow line-clamp-1">
                    {userInfo?.nickname}
                  </span>
                  <span>·</span>
                  <span className="flex-grow line-clamp-1">
                    {isValid(new Date(videoInfo?.updated_at))
                      ? formatDistanceToNowStrict(
                          new Date(videoInfo?.updated_at),
                          {
                            addSuffix: true,
                          }
                        )
                      : ""}
                  </span>
                </div>
              </div>
              <div>
                <ButtonFollow
                  className="px-6 py-1.5"
                  isFollowed={userInfo?.is_followed}
                  onClick={handleFollow}
                />
              </div>
            </div>
          </>
        )}
        {isLoadingComments ? (
          <div>Loading comments ...</div>
        ) : (
          <>
            {/* Number Comment And Input */}
            <div
              id="comments"
              className="flex flex-col space-y-4 border-b border-gray-200 border-solid pb-6"
            >
              <h2 className="font-bold text-lg">
                {videoInfo?.comments_count} Comments
              </h2>
              <CommentInput queryKey="comments" videoId={id} />
            </div>
            <div className="flex flex-col space-y-4">
              {data?.pages.map((page, index) => (
                <ListComment
                  key={String(index)}
                  comments={page?.data || []}
                  queryKey="comments"
                  videoId={id}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </CommonLayout>
  );
}

export default VideoDetail;
