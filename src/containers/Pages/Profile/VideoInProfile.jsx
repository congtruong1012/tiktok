import React from "react";
import HoverVideoPlayer from "react-hover-video-player";
import IconPlay from "../../../icons/IconPlay";

function VideoInProfile() {
  return (
    <div className="grid grid-cols-3 gap-2">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
        <>
          <div className="relative">
            <HoverVideoPlayer
              kye={item}
              className=" w-full h-[269px] rounded-lg"
              videoClassName="w-full h-full object-cover"
              videoSrc="https://files.fullstack.edu.vn/f8-tiktok/videos/840-63723a60f27a2.mp4"
              restartOnPaused
            />
            <div className="line-clamp-1">
              Đời không như là mơ Đời không như là mơ Đời không như là mơ
            </div>
            <div className="absolute bottom-0 left-2">
              <div className="flex space-x-2 items-center">
                <IconPlay />
                <span className="text-white py-2 font-semibold">123K</span>
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
}

export default VideoInProfile;
