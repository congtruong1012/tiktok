import React from "react";
import { useSelector } from "react-redux";
import Modal from "../../../components/Layout/Modal";
import useSafeState from "../../../hooks/useSafeState";
import Login from "../../Pages/Login";
import Register from "../../Pages/Register";

export function AuthLogin(props) {
  const { Component, onClick = () => {}, ...rest } = props;
  const [open, setOpen] = useSafeState(false);
  const isLogin = useSelector((state) => state.app.isLogin);
  const [page, setPage] = useSafeState(0);
  const handleOpen = () => setOpen(true);
  const handleClose = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setOpen(false);
  };

  const handleClick = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (isLogin) {
      onClick();
    } else {
      handleOpen();
    }
  };

  const handleLoginSuccess = (e) => {
    handleClose();
    if (typeof onClick === "function") onClick();
  };

  const changePage = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setPage(page === 2 ? 1 : 2);
  };

  const passProps = {
    ...rest,
    onClick: handleClick,
  };

  return (
    <>
      <Component {...passProps} />
      <Modal
        isOpen={open}
        onModalClose={handleClose}
        bodyClassName={`w-[500px] max-h-[693px] overflow-hidden`}
        footer={
          <div className="border-t border-solid border-gray-300 flex justify-center items-center py-4">
            <div className="text-basic">
              <span className=" text-gray-500 mr-1.5">
                {[0, 1].includes(page)
                  ? "Don't have an account?"
                  : "Already have an account?"}
              </span>
              <span
                onClick={changePage}
                className="cursor-pointer text-primary font-semibold hover:underline"
              >
                {[0, 1].includes(page) ? "Sign Up" : "Log In"}
              </span>
            </div>
          </div>
        }
        iconBack={[1, 2].includes(page)}
        iconBackProps={{
          onClick: () => setPage(0),
        }}
      >
        {[0, 1].includes(page) && (
          <Login onClick={handleLoginSuccess} setPage={setPage} page={page} />
        )}
        {page === 2 && <Register onClick={handleLoginSuccess} />}
      </Modal>
    </>
  );
}
