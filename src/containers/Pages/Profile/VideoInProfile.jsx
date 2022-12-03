import React, { useEffect } from "react";
import HoverVideoPlayer from "react-hover-video-player";
import { useInView } from "react-intersection-observer";
import LoadingTikTok from "../../../components/Layout/Skeleton/LoadingTiktok";
import IconPlay from "../../../icons/IconPlay";

function VideoInProfile(props) {
  const { isLoading, hasNextPage, data, isFetchingNextPage, fetchNextPage } =
    props;
  const { ref, inView } = useInView({});

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        {isLoading ? (
          <>
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse bg-gray-200 w-full h-[269px] rounded-lg"
              ></div>
            ))}
          </>
        ) : (
          <>
            {data?.pages?.map((page) =>
              page?.data?.map((item) => (
                <React.Fragment key={item?.id}>
                  <div className="relative">
                    <HoverVideoPlayer
                      className="w-full h-[269px] rounded-lg"
                      videoClassName="w-full h-full object-cover"
                      videoSrc={item?.file_url}
                      restartOnPaused
                    />
                    <div className="line-clamp-1">{item?.description}</div>
                    <div className="absolute bottom-0 left-2">
                      <div className="flex space-x-2 items-center">
                        <IconPlay />
                        <span className="text-white py-2 font-semibold">
                          {item?.likes_count}
                        </span>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              ))
            )}

            <div ref={ref}></div>
          </>
        )}
      </div>
      {isFetchingNextPage && (
        <div className="flex justify-center items-center">
          <LoadingTikTok className="w-5 h-5" />
        </div>
      )}
    </>
  );
}

export default VideoInProfile;
