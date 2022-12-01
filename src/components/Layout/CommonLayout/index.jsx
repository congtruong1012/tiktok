import React from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";

function CommonLayout(props) {
  return (
    <div className="max-w-6xl mx-auto h-full">
      <Header />
      <div className="flex">
        <div className="w-[356px]">
          <Sidebar />
        </div>
        <div className="flex-grow">
          <div className="px-6 py-4">{props.children}</div>
        </div>
      </div>
    </div>
  );
}

export default CommonLayout;
