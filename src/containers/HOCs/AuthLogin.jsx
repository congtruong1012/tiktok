import React from "react";
import { useSelector } from "react-redux";
import Modal from "../../components/Layout/Modal";
import useSafeState from "../../hooks/useSafeState";
import Login from "../Pages/Login";

export function AuthLogin(props) {
  const { Component, onClick, ...rest } = props;
  const [open, setOpen] = useSafeState(false);
  const isLogin = useSelector((state) => state.app.isLogin);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = () => {
    if (isLogin) {
      onClick();
    } else {
      handleOpen();
    }
  };

  const handleLoginSuccess = () => {
    handleClose();
    if (typeof onClick === "function") onClick();
  };

  const passProps = {
    ...rest,
    onClick: handleClick,
  };

  return (
    <>
      <Component {...passProps} />
      <Modal isOpen={open} onModalClose={handleClose}>
        <Login onClick={handleLoginSuccess} />
      </Modal>
    </>
  );
}
