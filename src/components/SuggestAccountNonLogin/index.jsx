import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import HoverVideoPlayer from "react-hover-video-player";
import { useInView } from "react-intersection-observer";
import { AuthLogin } from "../../containers/HOCs/AuthLogin";
import IconVerified from "../../icons/IconVerified";
import { suggestAccounts } from "../../services/suggestAccounts";
import Image from "../Layout/Image";
function SuggestAccountNonLogin() {
  const { isLoading, hasNextPage, data, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["suggest-account-nonlogin"],
      queryFn: ({ pageParam = 1 }) => suggestAccounts(pageParam, 12),
      getNextPageParam: (params) => {
        const { current_page, total_pages } = params?.meta?.pagination || {};
        return current_page < total_pages ? current_page + 1 : undefined;
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
        {data?.pages.map((page) =>
          page?.data?.map((item) => (
            <div
              className=" basis-1/3 max-w-1/3 flex-grow-0 p-[8px]  h-[300px]"
              key={item?.id}
            >
              <div className="relative w-full h-full shadow-lg ">
                <HoverVideoPlayer
                  className="w-[calc(100%+0.5px)] h-full rounded-lg "
                  videoClassName="h-full object-cover"
                  videoSrc={item?.popular_video?.file_url}
                  pausedOverlay={
                    <>
                      <Image
                        className="w-full h-full object-cover overflow-hidden"
                        src={item?.popular_video?.thumb_url}
                        loading="lazy"
                      />
                    </>
                  }
                  restartOnPaused
                />
                <div className="absolute w-[calc(100%+0.5px)] h-2/3 bottom-0 z-10 py-4">
                  <div className="w-full h-full text-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden mx-auto">
                      <Image className="w-full h-full" src={item?.avatar} />
                    </div>
                    <div className="mt-2 font-bold text-white text-lg">
                      {`${item?.first_name} ${item?.last_name}`}
                    </div>
                    <span className="relative text-white text-sm">
                      <span>{item?.nickname}</span>
                      {item?.tick && (
                        <IconVerified className="absolute -right-4 top-0" />
                      )}
                    </span>
                    <AuthLogin
                      Component="button"
                      className="block mx-auto mt-3 text-white bg-primary py-1.5 px-10 rounded-lg font-semibold"
                    >
                      <span>Follow</span>
                    </AuthLogin>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div ref={ref}></div>
    </>
  );
}

export default SuggestAccountNonLogin;
