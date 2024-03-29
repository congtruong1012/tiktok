import React from "react";
import CommonLayout from "../../../components/Layout/CommonLayout";
import Header from "../../../components/Layout/Header";
import Sidebar from "../../../components/Layout/Sidebar";
import Video from "../../Features/Video";

function Home() {
  return (
    <CommonLayout>
      <Video type="for-you" />
    </CommonLayout>
  );
}

export default Home;
