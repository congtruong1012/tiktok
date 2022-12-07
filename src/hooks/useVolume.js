import { useEffect, useRef, useState } from "react";
import useToggle from "./useToggle";

export default function useVolume() {
  const [volume, setVolume] = useState(0);

  const videoRef = useRef();
  const prevVolume = useRef();

  const handleChangeMaximun = () => {
    setVolume((prev) => (prev > 0 ? 0 : prevVolume.current));
  };

  const handleChangeVolume = (value) => setVolume(value);

  useEffect(() => {
    const currentVolume =
      (localStorage.getItem("volume") || videoRef.current.volume) * 100;
    setVolume(currentVolume);
  }, []);

  useEffect(() => {
    if (volume > 0) {
      prevVolume.current = volume;
    }
    videoRef.current.volume = +volume / 100;
    localStorage.setItem("volume", +volume / 100);
  }, [volume]);

  return { volume, handleChangeVolume, handleChangeMaximun, videoRef };
}
