import PropTypes from "prop-types";
import { useState } from "react";
import noImage from "../../../Image/no-image.png";

function Image(props) {
  const {
    src,
    alt,
    className,
    fallback: customFallback = noImage,
    ...rest
  } = props;
  const [fallback, setFallback] = useState("");

  const handleError = () => {
    setFallback(customFallback);
  };

  return (
    <img
      src={fallback || src}
      alt={alt}
      className={className}
      {...rest}
      onError={handleError}
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
