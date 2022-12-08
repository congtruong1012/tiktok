import Tippy from "@tippyjs/react";
import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import useSafeState from "../../../hooks/useSafeState";
import useToggle from "../../../hooks/useToggle";
import useVolume from "../../../hooks/useVolume";
import IconComment from "../../../icons/IconComment";
import IconHeart from "../../../icons/IconHeart";
import IconMoreHorizontal from "../../../icons/IconMoreHorizontal";
import IconMute from "../../../icons/IconMute";
import IconPause from "../../../icons/IconPause";
import IconPlay from "../../../icons/IconPlay";
import IconShared from "../../../icons/IconShared";
import IconUnmute from "../../../icons/IconUnmute";

function Video(props) {
  const { video } = props;

  const [open, onOpen, onClose] = useToggle();
  const [play, onPlay, onPause, onTogglePlay] = useToggle(true);

  const { volume, handleChangeVolume, handleChangeMaximun, videoRef } =
    useVolume();

  const scrollToComments = () => {
    document.getElementById("comments")?.scrollIntoView();
  };

  useEffect(() => {
    videoRef.current.muted = !play;
    if (play) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [play]);

  return (
    <div
      className="relative h-[606px] w-full bg-black"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <div
        className="absolute inset-0 opacity-10 bg-no-repeat bg-cover bg-center -z-1"
        style={{
          backgroundImage: `url(${video?.thumb_url})`,
          filter: "blur(20px)",
        }}
      ></div>
      {/* Video */}
      <div className="flex justify-center h-full">
        <video
          ref={videoRef}
          muted
          loop
          className="h-full"
          src={video?.file_url}
        ></video>
      </div>
      {/* Icon Play center */}
      <div onClick={onTogglePlay} className="absolute inset-0 z-[1]">
        {!play && (
          <span className="flex justify-center items-center w-full h-full">
            <IconPlay className="text-white w-10 h-10" />
          </span>
        )}
      </div>
      {/* Icon play or pause at edge */}
      {open && (
        <span
          onClick={onTogglePlay}
          className="absolute left-6 bottom-6 z-10 cursor-pointer"
        >
          {play ? (
            <IconPause className="text-white w-7 h-7" />
          ) : (
            <IconPlay className="text-white w-7 h-7" />
          )}
        </span>
      )}
      {/* Volume */}
      <Tippy
        interactive
        content={
          <div className="text-center">
            <input
              type="range"
              max="100"
              className="-rotate-90 !ml-12 !mb-8"
              value={volume}
              onChange={(e) => handleChangeVolume(+e.target.value)}
              style={{ "--value": `${volume}%` }}
            />
          </div>
        }
      >
        <span
          onClick={handleChangeMaximun}
          className="absolute right-20 bottom-6 z-10 cursor-pointer"
        >
          {volume > 0 ? (
            <IconUnmute className="w-7 h-7 text-white" />
          ) : (
            <IconMute className="w-7 h-7 text-white " />
          )}
        </span>
      </Tippy>
      {/*  Like, Comment, Share */}
      <div className="absolute right-6 bottom-6 flex flex-col space-y-2 items-center text-white">
        <div className="text-center cursor-pointer">
          <IconHeart
            className={`h-7 w-7 ${
              video?.is_liked ? "text-primary" : "text-black"
            }`}
          />
          <span>{video?.likes_count}</span>
        </div>
        <div onClick={scrollToComments} className="text-center cursor-pointer">
          <IconComment className="h-7 w-7" />
          <span>{video?.comments_count}</span>
        </div>
        <div className="text-center cursor-pointer">
          <IconShared className="h-7 w-7" />
          <span>{video?.shares_count}</span>
        </div>
        <div className="text-center cursor-pointer">
          <IconMoreHorizontal className="h-7 w-7" />
        </div>
      </div>
    </div>
  );
}

Video.propTypes = {};

export default Video;
