import { useCallback } from "react";
import useSafeState from "./useSafeState";

export default function useToggle(init = false) {
  const [open, setOpen] = useSafeState(init);

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);
  const handleToggle = () => setOpen((prev) => !prev);

  return [open, handleOpen, handleClose, handleToggle];
}
