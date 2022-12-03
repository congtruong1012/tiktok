import React from "react";
import "./index.css";

function LoadingTikTok(props) {
  const { className, ...rest } = props;
  return <span className={`tiktok-loader ${className}`} {...rest} />;
}

export default LoadingTikTok;
