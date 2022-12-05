import { formatDistanceToNow, isValid } from "date-fns";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { makeSelectUserInfo } from "../../containers/Features/User/reducer";
import { AuthLogin } from "../../containers/HOCs/AuthLogin";
import HoverCard from "../../containers/HOCs/HoverCard";
import ModalVideoDetail from "../../containers/HOCs/ModalVideoDetail";
import useFollowUser from "../../hooks/useFllowUser";
import useLikeVideo from "../../hooks/useLikeVideo";
import IconComment from "../../icons/IconComment";
import IconHeart from "../../icons/IconHeart";
import IconShared from "../../icons/IconShared";
import ButtonFollow from "../ButtonFollow";
import Image from "../Layout/Image";
import Video from "../Video";
// import PropTypes from 'prop-types'

function Post(props) {
  const { video } = props;
  const ref = useRef();
  const userInfo = useSelector((state) =>
    makeSelectUserInfo(state, video?.user?.id)
  );

  const { pathname } = useLocation();

  const { handleFollow } = useFollowUser({
    userId: userInfo?.id,
    status: userInfo?.is_followed,
  });

  const { handleLikeVideo } = useLikeVideo({
    videoId: video?.id,
    status: video?.is_liked,
    onSuccess: (rs) => {
      Object.assign(video, rs);
    },
  });

  const reactions = [
    {
      icon: (
        <IconHeart
          className={`w-6 h-6 ${video?.is_liked ? "text-primary" : ""}`}
          onClick={handleLikeVideo}
        />
      ),
      num: video?.likes_count || 0,
    },
    {
      icon: (
        <ModalVideoDetail Component="span" video={video} ref={ref}>
          <IconComment className={`w-6 h-6 `} />
        </ModalVideoDetail>
      ),
      num: video?.comments_count || 0,
    },
    {
      icon: <IconShared fill="#000" />,
      num: "Share",
    },
  ];

  return (
    <div className="flex py-5 border-b">
      <div className="flex-shrink-0 flex-grow-0 mr-2">
        <div className="w-14 h-14 rounded-full overflow-hidden">
          <HoverCard
            Component={Image}
            userId={userInfo?.nickname}
            src={userInfo?.avatar}
            alt="user"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="px-2 flex-grow">
        <div className="flex">
          <div className="flex-grow">
            <HoverCard
              Component={Link}
              userId={userInfo?.nickname}
              className="flex items-center "
              to={`/profile/@${userInfo?.nickname}`}
            >
              <h5 className="text-lg font-bold mr-2 hover:underline">{`${userInfo?.first_name} ${userInfo?.last_name}`}</h5>
              {userInfo?.nickname && (
                <div className="text-gray-600">
                  <span> · </span>
                  <span className="text-sm font-semibold ">
                    {userInfo?.nickname}
                  </span>
                </div>
              )}
              <div className="ml-1 text-gray-400">
                <span> · </span>
                <span className="text-sm">
                  {isValid(
                    new Date(video?.updated_at || video?.published_at)
                  ) &&
                    formatDistanceToNow(
                      new Date(video?.updated_at || video?.published_at),
                      {
                        addSuffix: true,
                      }
                    )}
                </span>
              </div>
            </HoverCard>
            <p className="py-1 leading-5 whitespace-pre-line">
              {video?.description}
            </p>
          </div>

          {pathname !== "/following" && (
            <AuthLogin Component="div">
              <ButtonFollow
                isFollowed={userInfo?.is_followed}
                className="px-3 py-1 "
                onClick={handleFollow}
              />
            </AuthLogin>
          )}
        </div>

        <div className="flex my-2">
          <div className="w-1/2">
            <Video {...props} />
          </div>
          <div className="w-1/2 flex flex-col justify-end pl-4">
            {reactions.map((item, i) => (
              <div
                className={`text-center w-14 cursor-pointer my-2`}
                key={String(i)}
              >
                {/* <button className="block mx-auto rounded-full p-3 text-center bg-slate-100">
                  <item.icon className="w-6 h-6" />
                </button> */}
                <AuthLogin
                  Component="button"
                  className="block mx-auto rounded-full p-3 text-center bg-slate-100"
                >
                  {item.icon}
                </AuthLogin>
                <div className="text-sm font-bold mt-1">{item.num}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Post.propTypes = {};

export default Post;
