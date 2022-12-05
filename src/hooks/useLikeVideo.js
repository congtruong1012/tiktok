import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { updateVideo } from "../containers/Features/Video/reducer";
import { likeVideo, unlikeVideo } from "../services/videoService";

export default function useLikeVideo({ videoId, status, onSuccess, onError }) {
  const dispatch = useDispatch();

  const { mutate: mutateLikeVideo } = useMutation({
    mutationKey: ["like-video", videoId],
    mutationFn: (id) => likeVideo(id),
    onSuccess: ({ data }) => {
      dispatch(
        updateVideo({
          id: data?.id,
          byId: data,
        })
      );
      if (typeof onSuccess === "function") {
        onSuccess(data);
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
    onSuccess: ({ data }) => {
      dispatch(
        updateVideo({
          id: data?.id,
          byId: data,
        })
      );
      if (typeof onSuccess === "function") {
        onSuccess(data);
      }
    },
    onError: (error) => {
      if (typeof onError === "function") {
        onError(error);
      }
    },
  });

  const handleLikeVideo = () => {
    console.log('handleLikeVideo  status', status);
    status ? mutateUnlikeVideo(videoId) : mutateLikeVideo(videoId);
  };
  return { handleLikeVideo };
}
