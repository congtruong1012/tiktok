import React from "react";
import { createPortal } from "react-dom";
import IconBack from "../../../icons/IconBack";
import IconCircleXMark from "../../../icons/IconCircleXMark";
import IconClose from "../../../icons/IconClose";
import Scrollbar from "../Scrollbar";

const Modal = ({
  children,
  isOpen = false,
  className = "",

  title,
  titleClassName,

  bodyClassName = "",
  onModalClose,
  footer,

  iconBack,
  iconBackProps,
}) => {
  if (typeof document === "undefined") return null;
  if (!isOpen) return null;
  return createPortal(
    <div
      className={`fixed inset-0 z-[9999]  ${
        isOpen ? "animate-fade" : ""
      } ${className}`}
    >
      <div
        className="fixed inset-0 bg-black bg-opacity-25"
        onClick={onModalClose}
      ></div>

      <div
        className={`absolute inset-0 z-50 m-auto bg-white max-w-lg h-[80%] ${bodyClassName} `}
      >
        <div
          aria-label="modal-close"
          className="absolute rounded-full cursor-pointer right-5 top-5"
          onClick={onModalClose}
        >
          <IconClose className="cursor-pointer w-5 h-5" />
        </div>
        {title && (
          <div
            className={`absolute -z-10 text-xl font-semibold left-0 right-0 top-0 p-4 border-b border-gray-200 border-solid ${titleClassName}`}
          >
            {title}
          </div>
        )}
        {iconBack && (
          <div
            aria-label="modal-back"
            className="absolute left-5 top-5"
            {...iconBackProps}
          >
            <IconBack
              className="cursor-pointer w-5 h-5"
              onClick={() => setPage(0)}
            />
          </div>
        )}
        <div className="flex flex-col h-full pt-8">
          <Scrollbar className="flex-1">{children}</Scrollbar>
          {footer}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
