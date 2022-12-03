import React from "react";
import CommonLayout from "../../../components/Layout/CommonLayout";
import Image from "../../../components/Layout/Image";
import Tab from "../../../components/Layout/Tab";
import IconLink from "../../../icons/IconLink";
import IconMoreHorizontal from "../../../icons/IconMoreHorizontal";
import IconShared from "../../../icons/IconShared";
import IconVerified from "../../../icons/IconVerified";
import ListVideo from "./ListVideo";
import ProfileInfo from "./ProfileInfo";

function Profile() {
  return (
    <CommonLayout>
      <div className="flex flex-col space-y-6">
        <ProfileInfo />
        <ListVideo />
      </div>
    </CommonLayout>
  );
}

export default Profile;
