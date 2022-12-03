import React from "react";
import { createPortal } from "react-dom";
import Image from "../../../components/Layout/Image";
import Modal from "../../../components/Layout/Modal";
import useToggle from "../../../hooks/useToggle";
import IconCircleXMark from "../../../icons/IconCircleXMark";
import IconClose from "../../../icons/IconClose";
import IconComment from "../../../icons/IconComment";
import IconHeart from "../../../icons/IconHeart";
import Comment from "../../Features/Comment";
import VideoDetail from "./VideoDetail";

function ModalVideoDetail(props, ref) {
  const { Component, ...rest } = props;
  const [open, handleOpen, handleClose] = useToggle();

  const onOpen = () => {
    handleOpen();
    document.body.style.overflowY = "hidden";
  };

  const onClose = () => {
    handleClose();
    document.body.style.overflowY = "auto";
  };

  return (
    <>
      <Component onClick={onOpen} {...rest} ref={ref} />
      {open &&
        createPortal(
          <div className={`fixed inset-0 z-[999] animate-fade overflow-hidden`}>
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
                <VideoDetail />
              </div>
              <div className="flex w-[544px] bg-white h-full">
                <div className="flex flex-col w-full">
                  <div className="p-8 pb-4 border-b border-solid border-gray-300 ">
                    {/* Info user */}
                    <div className="flex space-x-4">
                      <div className="w-12 h-12 overflow-hidden rounded-full">
                        <Image src="" className="w-full h-full" />
                      </div>
                      <div className="flex-grow">
                        <h2 className="font-bold text-lg">Công trương</h2>
                        <div className="flex items-center text-sm">
                          <span className="font-normal ">congtruong</span>
                          <span className="mx-1"> · </span>
                          <span className="font-normal text-sm">10-10</span>
                        </div>
                      </div>
                      <div>
                        <button className="border-primary border border-solid text-primary rounded-lg py-1 px-8 font-semibold hover:bg-stone-50">
                          Follow
                        </button>
                      </div>
                    </div>
                    {/* Description */}
                    <div className="my-3">Huế dễ thương</div>
                    <div className="font-semibold cursor-pointer my-3 hover:underline">
                      Relaxing, cute everyday BGM - あび
                    </div>
                    {/* Reaction */}
                    <div className="my-4 flex space-x-4">
                      <div className="flex space-x-2 items-center cursor-pointer">
                        <IconHeart className="p-1.5 bg-slate-100 rounded-full" />
                        <span className="text-xs font-semibold">117K</span>
                      </div>
                      <div className="flex space-x-2 items-center cursor-pointer">
                        <IconComment className="p-1.5 bg-slate-100 rounded-full" />
                        <span className="text-xs font-semibold">117K</span>
                      </div>
                    </div>
                    <div className="bg-gray-50 border border-solid border-gray-200 flex">
                      <p className=" pl-2 line-clamp-1 flex-1 text-sm my-2.5">
                        https://www.tiktok.com/@missgrand2021.thuytien/video/7171823844338978053?is_copy_url=1&is_from_webapp=v1
                      </p>
                      <span className=" py-2.5 inline-block text-sm font-semibold px-4 cursor-pointer hover:bg-slate-100">
                        Copy link
                      </span>
                    </div>
                  </div>
                  <Comment />
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
