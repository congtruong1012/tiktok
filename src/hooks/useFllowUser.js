import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { updateUser } from "../containers/Features/User/reducer";
import { followAccount, unfollowAccount } from "../services/followAccount";

export default function useFollowUser({ userId, status, onSuccess, onError }) {
  const dispatch = useDispatch();

  const { mutate: mutateFollow } = useMutation({
    mutationKey: ["follow", userId],
    mutationFn: (id) => followAccount(id),
    onSuccess: (rs) => {
      dispatch(
        updateUser({
          id: rs?.id,
          byId: rs,
        })
      );
      if (typeof onSuccess === "function") {
        onSuccess(rs);
      }
    },
    onError: (error) => {
      if (typeof onError === "function") {
        onError(error);
      }
    },
  });

  const { mutate: mutateUnfollow } = useMutation({
    mutationKey: ["unfollow", userId],
    mutationFn: (id) => unfollowAccount(id),
    onSuccess: (rs) => {
      dispatch(
        updateUser({
          id: rs?.id,
          byId: rs,
        })
      );
      if (typeof onError === "function") {
        onError(rs);
      }
    },
    onError: (error) => {
      if (typeof onError === "function") {
        onError(error);
      }
    },
  });

  const handleFollow = () => {
    status ? mutateUnfollow(userId) : mutateFollow(userId);
  };
  return { handleFollow };
}
