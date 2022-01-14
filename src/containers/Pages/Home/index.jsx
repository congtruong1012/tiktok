import React from "react";
import Header from "../../../components/Layout/Header";
import Sidebar from "../../../components/Layout/Sidebar";
import Video from "../../Features/Video";

function Home() {
  return (
    <div className="max-w-6xl mx-auto h-full">
      <Header />
      <div className="flex">
        <div className="w-[356px]">
          <Sidebar />
        </div>
        <div className="flex-grow">
          <div className="px-6 py-2">
            <Video />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
