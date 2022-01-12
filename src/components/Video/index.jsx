import React, { useEffect, useRef, useState } from "react";
import { useViewPort } from "../../hooks/useViewPort";
import IconMute from "../../icons/IconMute";
import IconPause from "../../icons/IconPause";
import IconPlay from "../../icons/IconPlay";
import IconUnmute from "../../icons/IconUnmute";
// import PropTypes from 'prop-types'

function Video(props) {
  const { video } = props;
  const { post } = video;

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0);

  const ref = useRef(null);
  const volumeRef = useRef(null);
  const prevVolume = useRef(volume);

  const isShow = useViewPort(ref, {
    root: null,
    rootMargin: "0px",
    threshold: 0.45,
  });

  const handleChange = () => {
    setIsPlaying((prev) => {
      if (prev) ref.current.pause();
      else ref.current.play();
      return !prev;
    });
  };

  const handleChangeVolume = (e) => {
    const value = +e.target.value;
    volumeRef.current.style.setProperty("--value", `${value}%`);
    ref.current.volume = value / 100;
    setVolume(value);
  };

  const handleChangeMaximun = () => {
    let value;
    if (volume > 0) {
      prevVolume.current = volume;
      value = 0;
    } else value = prevVolume.current;
    volumeRef.current.style.setProperty("--value", `${value}%`);
    ref.current.volume = value / 100;
    setVolume(value);
  };

  useEffect(() => {
    if (ref.current) {
      const currentVolume = ref.current.volume * 100;
      setVolume(currentVolume);
      volumeRef.current.style.setProperty("--value", `${currentVolume}%`);
    }
  }, []);

  useEffect(() => {
    if (ref.current && isShow) {
      ref.current.play();
      setIsPlaying(true);
    } else {
      ref.current.pause();
      setIsPlaying(false);
    }
  }, [isShow]);

  return (
    <div className="relative video">
      <video loop src={post} ref={ref}>
        {/* <source src={post} /> */}
      </video>
      <span
        onClick={handleChange}
        className="absolute z-10 left-5 bottom-4 cursor-pointer control"
      >
        {isPlaying ? (
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
          onClick={() => console.log(volume)}
          ref={volumeRef}
        />
      </div>
    </div>
  );
}

Video.propTypes = {};

export default Video;
