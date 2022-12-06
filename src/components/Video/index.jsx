import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect, useMemo, useRef, useState } from "react";
import HoverVideoPlayer from "react-hover-video-player";
import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";
import { makeSelectVideoInfo } from "../../containers/Features/Video/reducer";
import ModalVideoDetail from "../../containers/HOCs/ModalVideoDetail";
import { useViewPort } from "../../hooks/useViewPort";
import IconMute from "../../icons/IconMute";
import IconPause from "../../icons/IconPause";
import IconPlay from "../../icons/IconPlay";
import IconUnmute from "../../icons/IconUnmute";
import Image from "../Layout/Image";

const sizeVideo = "calc(450px + ((100vw - 760px) / 1152) * 100)";

function Video(props) {
  const { video, type } = props;

  const { data } = useInfiniteQuery({
    queryKey: ["videos", type],
  });

  const [volume, setVolume] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [ratioVideo, setRatioVideo] = useState();

  const prevVolume = useRef(volume);
  const videoRef = useRef();
  const volumeRef = useRef();
  const { ref, inView } = useInView({
    rootMargin: "-10%",
    threshold: 0.6,
  });

  const handleChange = () => {
    setIsPlaying((prev) => {
      if (prev) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      return !prev;
    });
  };

  const handleChangeVolume = (e) => {
    setVolume(e.target.value);
  };

  const handleChangeMaximun = () => {
    setVolume((prev) => (prev > 0 ? 0 : prevVolume.current));
  };

  useEffect(() => {
    if (volume > 0) {
      prevVolume.current = volume;
    }
    videoRef.current.volume = +volume / 100;
    localStorage.setItem("volume", +volume / 100);
  }, [volume]);

  useEffect(() => {
    videoRef.current.muted = !inView;
    if (inView) {
      const currentVolume =
        (localStorage.getItem("volume") || videoRef.current.volume) * 100;
      setVolume(currentVolume);
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
    setIsPlaying(inView);
  }, [inView]);

  useEffect(() => {
    const ratio =
      video?.meta?.video?.resolution_x / video?.meta?.video?.resolution_y;
    setRatioVideo(ratio);
    // setClassSize(ratio < 1 ? sizeHeight : sizeWidth);
  }, []);

  const videos = useMemo(() => {
    const arr = [];
    data?.pages.map((page) =>
      page?.data?.forEach((item) => {
        arr.push(item);
      })
    );
    return arr;
  }, [data]);

  return (
    <div
      ref={ref}
      className="relative flex rounded-xl overflow-hidden video"
      style={{
        width: ratioVideo < 1 ? `calc(${sizeVideo}*${ratioVideo})` : "",
        height: ratioVideo > 1 ? `calc(${sizeVideo}/${ratioVideo})` : "",
      }}
    >
      <ModalVideoDetail
        Component={HoverVideoPlayer}
        video={video}
        videos={videos}
        callback={{
          cbOpen: () => videoRef.current.pause(),
          cbClose: () => videoRef.current.play(),
        }}
        videoClassName="object-cover"
        loop
        videoSrc={video?.file_url}
        videoRef={videoRef}
        focused={inView} // video focus then play video
        disableDefaultEventHandling
        pausedOverlay={
          <>
            <Image
              className="w-full h-full object-cover overflow-hidden"
              src={video?.thumb_url}
              loading="lazy"
            />
          </>
        }
      />
      <span
        onClick={handleChange}
        className="absolute z-10 left-5 bottom-4 cursor-pointer control"
      >
        {!isPlaying ? (
          <IconPlay className="w-7 h-7 text-white" />
        ) : (
          <IconPause className="w-7 h-7 text-white" />
        )}
      </span>
      <span
        onClick={handleChangeMaximun}
        className="absolute z-10 right-5 bottom-4 cursor-pointer control mute"
      >
        {volume > 0 ? (
          <IconUnmute className="w-7 h-7 text-white" />
        ) : (
          <IconMute className="w-7 h-7 text-white" />
        )}
      </span>
      <div className="absolute z-10 -right-6 bottom-20 -rotate-90 volume">
        <input
          type="range"
          max="100"
          value={volume}
          onChange={handleChangeVolume}
          ref={volumeRef}
          style={{ "--value": `${volume}%` }}
        />
      </div>
    </div>
  );
}

Video.propTypes = {};

export default Video;
