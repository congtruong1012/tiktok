import PropTypes from "prop-types";
import { useState } from "react";
import noImage from "../../../Image/no-image.png";

function Image(props) {
  const { src, alt, className, fallback = noImage, ...rest } = props;

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      {...rest}
      onError={({ currentTarget }) => {
        currentTarget.onerror = null; // prevents looping
        currentTarget.src = fallback;
      }}
    />
  );
}

Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
  fallback: PropTypes.string,
};

export default Image;
