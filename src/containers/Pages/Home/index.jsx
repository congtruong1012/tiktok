import React from "react";
import Header from "../../../components/Layout/Header";
import Sidebar from "../../../components/Layout/Sidebar";
import Video from "../../Features/Video";

function Home() {
  return (
    <div className="max-w-6xl mx-auto">
      <Header />
      <div className="flex">
        <div className="w-1/3">
          <Sidebar />
        </div>
        <div className="w-2/3">
          <div className="px-6 py-2">
            <Video />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
