import React from "react";
import { Link } from "react-router-dom";
import Header from "../../../components/Layout/Header";
import Image from "../../../components/Layout/Image";
import IconPlay from "../../../icons/IconPlay";
import bgNotFound from "../../../Image/bg.png";
import smileImg from "../../../Image/smile.png";

function NotFound() {
  return (
    <div
      className="h-screen bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(${bgNotFound})` }}
    >
      <Header />
      <div className="flex justify-center items-center w-full">
        <div className="text-center">
          <div className="flex items-center space-x-4">
            <span className="font-bold text-[300px]">4</span>
            <img src={smileImg} className="w-[244px] h-[244px]" />
            <span className="font-bold text-[300px]">4</span>
          </div>
          <p className="text-gray-500 text-lg my-4">Couldn't find this page</p>
          <div className="font-bold text-2xl mb-4">
            Check out more trending videos on TikTok
          </div>
          <Link
            to="/"
            className="inline-block mx-auto space-x-2 text-white bg-primary py-3 px-40 rounded-lg"
          >
            <IconPlay className="w-5 h-5 inline-block" />
            <span className="inline-block font-semibold ">Watch now</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
