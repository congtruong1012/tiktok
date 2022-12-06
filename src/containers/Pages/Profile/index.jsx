import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
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
  const { id } = useParams();
  const { isError } = useQuery({
    queryKey: ["profile", id],
  });
  return (
    <CommonLayout>
      <div className="flex flex-col space-y-6">
        <ProfileInfo />
        {!isError && <ListVideo />}
      </div>
    </CommonLayout>
  );
}

export default Profile;
