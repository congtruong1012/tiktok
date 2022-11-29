import React, { useEffect, useRef, useState } from "react";
import HoverVideoPlayer from "react-hover-video-player";
import Image from "../Layout/Image";
function SuggestAccountNonLogin() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
        <div
          className="relative w-full h-[300px] bg-slate-400  shadow-lg"
          key={item}
        >
          <div className="w-full h-full ">
            <HoverVideoPlayer
              className="w-full h-full rounded-lg"
              videoClassName="w-full h-full object-cover"
              videoSrc="https://files.fullstack.edu.vn/f8-tiktok/videos/840-63723a60f27a2.mp4"
              pausedOverlay={
                <Image
                  className="w-full h-full object-cover"
                  src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-p-0037-aiso/osfcYAfEwqYagwszc8fzML4SAhDJJ8eAePE1cy~tplv-f5insbecw7-1:480:480.jpeg?x-expires=1669748400&x-signature=F%2B68bQeBvTOEswtfLTn2Hy8%2FYZo%3D"
                />
              }
              restartOnPaused
            />
          </div>
          {/* <div className="absolute w-full h-1/2 bottom-0 z-10">
            <div className="bg-red-100 w-full h-full">Text</div>
          </div> */}
        </div>
      ))}
    </div>
  );
}

export default SuggestAccountNonLogin;
