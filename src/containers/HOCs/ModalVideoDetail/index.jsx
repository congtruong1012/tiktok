import { format } from "date-fns";
import React, { useEffect, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import ButtonFollow from "../../../components/ButtonFollow";
import Image from "../../../components/Layout/Image";
import Modal from "../../../components/Layout/Modal";
import useFollowUser from "../../../hooks/useFllowUser";
import useLikeVideo from "../../../hooks/useLikeVideo";
import { useMounted } from "../../../hooks/useSafeState";
import useToggle from "../../../hooks/useToggle";
import IconCircleXMark from "../../../icons/IconCircleXMark";
import IconClose from "../../../icons/IconClose";
import IconComment from "../../../icons/IconComment";
import IconHeart from "../../../icons/IconHeart";
import IconMusic from "../../../icons/IconMusic";
import Comment from "../../Features/Comment";
import { makeSelectUserInfo } from "../../Features/User/reducer";
import HoverCard from "../HoverCard";
import ModalComment from "./ModalComment";
import VideoDetail from "./VideoDetail";

const modalRoot = document.createElement("div");
modalRoot.className = "modal-root";

function ModalVideoDetail(props, ref) {
  const { Component, callback = {}, video, ...rest } = props;
  const { cbOpen, cbClose } = callback;
  const [open, handleOpen, handleClose] = useToggle();

  const userInfo = useSelector((state) =>
    makeSelectUserInfo(state, video?.user?.id)
  );
  const isLogin = useSelector((state) => state.app?.isLogin);

  const { handleFollow } = useFollowUser({
    userId: userInfo?.id,
    status: userInfo?.is_followed,
  });

  const { handleLikeVideo } = useLikeVideo({
    videoId: video?.id,
    status: video?.is_liked,
  });

  const onOpen = (e) => {
    e.preventDefault();
    if (isLogin) handleOpen();
  };

  const onClose = () => {
    handleClose();
  };

  useLayoutEffect(() => () => (document.body.style.overflowY = "auto"), []);

  useEffect(() => {
    if (open) {
      if (typeof cbOpen === "function") cbOpen();
      document.body.style.overflowY = "hidden";
    } else {
      if (typeof cbClose === "function") cbClose();
      document.body.style.overflowY = "auto";
    }
  }, [open]);

  return (
    <>
      <Component onClick={onOpen} {...rest} ref={ref} />
      {open &&
        createPortal(
          <div
            className={`fixed inset-0 z-[999] animate-fade overflow-hidden ${
              open ? "modal-open" : ""
            }`}
          >
            <div
              onClick={onClose}
              className="absolute inset-0"
              style={{ background: "rgba(0,0,0)" }}
            ></div>
            <button
              onClick={onClose}
              className="absolute z-[50] top-5 left-5 inline-block p-1.5 rounded-full"
            >
              <IconClose fill="#fff" className="w-7 h-7" />
            </button>
            <div className="absolute z-10 flex w-screen h-screen">
              <div className="flex-grow flex-shrink ">
                <VideoDetail video={video} />
              </div>
              <div className="flex w-[544px] bg-white h-full">
                <div className="flex flex-col w-full">
                  <div className="p-8 pb-4 border-b border-solid border-gray-300 ">
                    {/* Info user */}
                    <div className="flex space-x-4">
                      <HoverCard
                        Component="div"
                        className="w-12 h-12 overflow-hidden rounded-full"
                        userId={`${userInfo?.nickname}`}
                      >
                        <Image
                          src={userInfo?.avatar}
                          className="w-full h-full"
                        />
                      </HoverCard>
                      <div className="flex-grow">
                        <HoverCard
                          Component={Link}
                          to={`/profile/@${video?.user.nickname}`}
                          className="font-bold text-lg hover:underline"
                          userId={`${userInfo?.nickname}`}
                        >{`${userInfo?.first_name} ${userInfo?.last_name}`}</HoverCard>
                        <div className="flex items-center text-sm">
                          <span className="font-normal ">
                            {userInfo?.nickname}
                          </span>
                          <span className="mx-1"> · </span>
                          <span className="font-normal text-sm">
                            {format(
                              new Date(
                                video?.updated_at || video?.published_at
                              ),
                              "dd-MM"
                            )}
                          </span>
                        </div>
                      </div>
                      <div>
                        {/* <button
                          onClick={handleFollow}
                          className={`${
                            userInfo?.is_followed
                              ? "border-gray-300 hover:bg-stone-50 "
                              : "border-primary text-primary hover:bg-red-50"
                          }   rounded-lg py-1 px-8 font-semibold border border-solid `}
                        >
                          {userInfo?.is_followed ? "Following" : "Follow"}
                        </button> */}
                        <ButtonFollow
                          isFollowed={userInfo?.is_followed}
                          className="py-1 px-8"
                          onClick={handleFollow}
                        />
                      </div>
                    </div>
                    {/* Description */}
                    <div className="my-3">{video?.description}</div>
                    {video?.music && (
                      <div className="flex items-center space-x-1 font-semibold cursor-pointer my-3 hover:underline">
                        <IconMusic className="w-5 h-5" />
                        <span>{video?.music}</span>
                      </div>
                    )}
                    {/* Reaction */}
                    <div className="my-4 flex space-x-4">
                      <div className="flex space-x-2 items-center cursor-pointer">
                        <IconHeart
                          onClick={handleLikeVideo}
                          className={`p-1.5 ${
                            video?.is_liked ? "text-primary" : "text-black"
                          } rounded-full bg-slate-100`}
                        />
                        <span className="text-xs font-semibold">
                          {video?.likes_count}
                        </span>
                      </div>
                      <div className="flex space-x-2 items-center cursor-pointer">
                        <IconComment className="p-1.5 bg-slate-100 rounded-full" />
                        <span className="text-xs font-semibold">
                          {video?.comments_count}
                        </span>
                      </div>
                    </div>
                    <div className="bg-gray-50 border border-solid border-gray-200 flex">
                      <p className=" pl-2 line-clamp-1 flex-1 text-sm my-2.5 text-gray-500">
                        {/* https://www.tiktok.com/@missgrand2021.thuytien/video/7171823844338978053?is_copy_url=1&is_from_webapp=v1 */}
                        {`http://localhost:9652/@${video?.user?.nickname}/video/${video?.id}`}
                      </p>
                      <span className=" py-2.5 inline-block text-sm font-semibold px-4 cursor-pointer hover:bg-slate-100">
                        Copy link
                      </span>
                    </div>
                  </div>
                  <ModalComment videoId={video?.id} />
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

export default React.forwardRef(ModalVideoDetail);
