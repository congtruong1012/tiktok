import React from "react";
import { useSelector } from "react-redux";
import CommonLayout from "../../../components/Layout/CommonLayout";
import Header from "../../../components/Layout/Header";
import Sidebar from "../../../components/Layout/Sidebar";
import SuggestAccountNonLogin from "../../../components/SuggestAccountNonLogin";
import Video from "../../Features/Video";

function Following() {
  const isLogin = useSelector((state) => state.app.isLogin);
  return (
    <CommonLayout>
      {isLogin ? <Video type="following" /> : <SuggestAccountNonLogin />}
    </CommonLayout>
  );
}

export default Following;
