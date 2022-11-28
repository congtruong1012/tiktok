import React from "react";
import CommonLayout from "../../../components/Layout/CommonLayout";
import Header from "../../../components/Layout/Header";
import Sidebar from "../../../components/Layout/Sidebar";
import Video from "../../Features/Video";

function Following() {
  return (
    <CommonLayout>
      <Video type="following" />
    </CommonLayout>
  );
}

export default Following;
