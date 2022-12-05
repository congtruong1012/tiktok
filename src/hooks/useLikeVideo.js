import { useMutation } from "@tanstack/react-query";
import { likeVideo, unlikeVideo } from "../services/videoService";

export default function useLikeVideo({ videoId, status, onSuccess, onError }) {
  const { mutate: mutateLikeVideo } = useMutation({
    mutationKey: ["like-video", videoId],
    mutationFn: (id) => likeVideo(id),
    onSuccess: (rs) => {
      if (typeof onSuccess === "function") {
        onSuccess(rs?.data);
      }
    },
    onError: (error) => {
      if (typeof onError === "function") {
        onError(error);
      }
    },
  });

  const { mutate: mutateUnlikeVideo } = useMutation({
    mutationKey: ["unlike-video", videoId],
    mutationFn: (id) => unlikeVideo(id),
    onSuccess: (rs) => {
      if (typeof onSuccess === "function") {
        onSuccess(rs?.data);
      }
    },
    onError: (error) => {
      if (typeof onError === "function") {
        onError(error);
      }
    },
  });

  const handleLikeVideo = () => {
    status ? mutateUnlikeVideo(videoId) : mutateLikeVideo(videoId);
  };
  return { handleLikeVideo };
}
