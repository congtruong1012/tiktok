import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import HoverVideoPlayer from "react-hover-video-player";
import { useInView } from "react-intersection-observer";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { userStorage } from "../../containers/Features/User/reducer";
import { AuthLogin } from "../../containers/HOCs/AuthLogin";
import IconVerified from "../../icons/IconVerified";
import { suggestAccounts } from "../../services/suggestAccounts";
import Image from "../Layout/Image";
import LoadingTikTok from "../Layout/Skeleton/LoadingTiktok";

function UserInfo({ user }) {
  return (
    <div className="absolute w-[calc(100%+0.5px)] h-2/3 bottom-0 z-10 py-4">
      <div className="w-full h-full text-center">
        <div className="w-12 h-12 rounded-full overflow-hidden mx-auto">
          <Image className="w-full h-full" src={user?.avatar} />
        </div>
        <div className="mt-2 font-bold text-white text-lg">
          {`${user?.first_name} ${user?.last_name}`}
        </div>
        <span className="relative text-white text-sm">
          <span>{user?.nickname}</span>
          {user?.tick && <IconVerified className="absolute -right-4 top-0" />}
        </span>
        <AuthLogin
          Component="button"
          className="block mx-auto mt-3 text-white bg-primary py-1.5 px-10 rounded-lg font-semibold"
        >
          <span>Follow</span>
        </AuthLogin>
      </div>
    </div>
  );
}

function SuggestAccountNonLogin() {
  const dispatch = useDispatch();

  const { isLoading, hasNextPage, data, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["suggest-account-nonlogin"],
      queryFn: ({ pageParam = 1 }) => suggestAccounts(pageParam, 12),
      getNextPageParam: (params) => {
        const { current_page, total_pages } = params?.meta?.pagination || {};
        return current_page < total_pages ? current_page + 1 : undefined;
      },
      onSuccess: (data) => {
        const byId = {};
        let allIds = [];
        data?.pages?.forEach((page) => {
          allIds = page?.data?.map((item) => item?.id || "") || [];
          page?.data.forEach((item) => {
            byId[item?.id] = item;
          });
        });
        dispatch(userStorage({ byId, allIds }));
      },
    });
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);
  return (
    <>
      <div className="flex flex-wrap w-[calc(100%+16px)] -m-[8px]">
        {isLoading ? (
          <>
            {[1, 2, 3].map((item) => (
              <div
                className="basis-1/3 max-w-1/3 flex-grow-0 p-[8px]  h-[300px]"
                key={item}
              >
                <div className="relative w-full h-full animate-pulse bg-gray-200"></div>
              </div>
            ))}
          </>
        ) : (
          <>
            {data?.pages.map((page) =>
              page?.data?.map((item) => (
                <Link
                  className="basis-1/3 max-w-1/3 flex-grow-0 p-[8px]  h-[300px]"
                  key={item?.id}
                  to={`/profile/@${item?.nickname}`}
                >
                  <div className="relative w-full h-full shadow-lg ">
                    <HoverVideoPlayer
                      className="w-[calc(100%+0.5px)] h-full rounded-xl overflow-hidden"
                      videoClassName="h-full object-cover"
                      videoSrc={item?.popular_video?.file_url}
                      hoverOverlay={<UserInfo user={item} />}
                      pausedOverlay={
                        <>
                          <Image
                            className="w-full h-full object-cover overflow-hidden"
                            src={item?.popular_video?.thumb_url}
                            loading="lazy"
                          />
                          <UserInfo user={item} />
                        </>
                      }
                      restartOnPaused
                    />
                  </div>
                </Link>
              ))
            )}
            {hasNextPage && <div ref={ref}></div>}
          </>
        )}
      </div>
      {isFetchingNextPage && (
        <div className="flex justify-center items-center my-3">
          <LoadingTikTok className="w-5 h-5" />
        </div>
      )}
    </>
  );
}

export default SuggestAccountNonLogin;
