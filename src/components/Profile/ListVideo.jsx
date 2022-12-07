import PropTypes from "prop-types";
import React, { useState } from "react";
import Tab from "../Layout/Tab";
import VideoLiked from "./VideoLiked";
import YourVideo from "./YourVideo";

function ListVideo(props) {
  const [tabActive, setTabActive] = useState(0);

  const handleClick = (tab) => setTabActive(tab);

  return (
    <Tab
      tabList={[
        { value: 0, title: "Videos", content: <YourVideo /> },
        { value: 1, title: "Liked", content: <VideoLiked /> },
      ]}
      className="justify-start"
      activeTab={tabActive}
      onChange={handleClick}
    />
  );
}

ListVideo.propTypes = {};

export default ListVideo;
