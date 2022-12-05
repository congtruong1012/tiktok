import { useMutation } from "@tanstack/react-query";
import { likeComment, unlikeComment } from "../services/commentService";

export default function useLikeComment({
  commentId,
  status,
  onSuccess,
  onError,
}) {
  const { mutate: mutateLikeComment } = useMutation({
    mutationKey: ["like-comment", commentId],
    mutationFn: (id) => likeComment(id),
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

  const { mutate: mutateUnlikeComment } = useMutation({
    mutationKey: ["unlike", commentId],
    mutationFn: (id) => unlikeComment(id),
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

  const handleLikeComment = () => {
    status ? mutateUnlikeComment(commentId) : mutateLikeComment(commentId);
  };
  return { handleLikeComment };
}
