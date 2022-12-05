import PropTypes from "prop-types";
import React from "react";

function ButtonFollow(props) {
  const { isFollowed, className, ...rest } = props;
  return (
    <button
      className={`${
        isFollowed
          ? "border-gray-300 hover:bg-stone-50 "
          : "border-primary text-primary hover:bg-red-50"
      }  border border-solid font-semibold rounded-lg   ${className}`}
      {...rest}
    >
      {isFollowed ? "Following" : "Follow"}
    </button>
  );
}

ButtonFollow.propTypes = {
  isFollowed: PropTypes.bool,
  className: PropTypes.string,
};

export default ButtonFollow;
