import Tippy from "@tippyjs/react";
import React, { useEffect, useRef, useState } from "react";
import Image from "../../../components/Layout/Image";
import useToggle from "../../../hooks/useToggle";
import IconMute from "../../../icons/IconMute";
import IconPlay from "../../../icons/IconPlay";
import IconTikTok from "../../../icons/IconTikTok";
import IconUnmute from "../../../icons/IconUnmute";

function VideoDetail() {
  const [play, onOpen, onClose, handleToggle] = useToggle(true);
  const [volume, setVolume] = useState(0);
  const ref = useRef();
  const prevVolume = useRef();

  const handleChangeMaximun = () => {
    setVolume((prev) => (prev > 0 ? 0 : prevVolume.current));
  };

  useEffect(() => {
    if (volume > 0) {
      prevVolume.current = volume;
    }
    ref.current.volume = volume / 100;
  }, [volume]);

  useEffect(() => {
    if (play) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
     ref.current.muted = !!play;
  }, [play]);

  return (
    <>
      <div className="relative w-full h-full">
        <span className="absolute top-5 left-20">
          <IconTikTok />
        </span>
        <Tippy
          interactive
          content={
            <div className="text-center">
              <input
                type="range"
                max="100"
                className="-rotate-90 !ml-12 !mb-8"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                style={{ "--value": `${volume}%` }}
              />
            </div>
          }
        >
          <span
            onClick={handleChangeMaximun}
            className="absolute right-5 bottom-4 cursor-pointer z-[100]"
          >
            {volume > 0 ? (
              <IconUnmute className="w-7 h-7 text-white" />
            ) : (
              <IconMute className="w-7 h-7 text-white " />
            )}
          </span>
        </Tippy>
        {!play && (
          <span
            onClick={handleToggle}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100]"
          >
            <IconPlay className="w-14 h-14 text-white" />
          </span>
        )}
        <div
          style={{ filter: "blur(20px)" }}
          className="absolute inset-0 opacity-20 bg-no-repeat bg-cover bg-center bg-[url('https://files.fullstack.edu.vn/f8-tiktok/videos/8-630268a15142b.jpg')]"
        ></div>
        <div
          onClick={handleToggle}
          className="absolute inset-0 bg-transparent z-[99] px-20 w-full h-full"
        >
          <div className="flex justify-center h-full">
            <video
              ref={ref}
              loop
              className="w-auto h-full object-contain shadow-lg"
              src="https://files.fullstack.edu.vn/f8-tiktok/videos/838-6371fd17211a6.mp4"
            ></video>
          </div>
        </div>
      </div>
    </>
  );
}

export default VideoDetail;
