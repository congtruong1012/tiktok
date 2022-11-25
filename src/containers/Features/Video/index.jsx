import React from "react";
import Post from "../../../components/Post";
function Video(props) {
  const videos = [
    {
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/authentication-f9b30.appspot.com/o/troll.png?alt=media&token=c84079f3-f71f-4266-b3d9-b7a69137d22e",
      user: "my0599",
      dateCreated: "2021-01-01",
      desc: "Con này nó rất láo…",
      post: "https://firebasestorage.googleapis.com/v0/b/authentication-f9b30.appspot.com/o/download.mp4?alt=media&token=01d89254-0cd8-4fb3-8441-fa77879c09b7",
      like: "50",
      comment: "20",
    },
    // {
    //   avatar:
    //     "https://firebasestorage.googleapis.com/v0/b/authentication-f9b30.appspot.com/o/thumb.webp?alt=media&token=ea45894c-dec5-41d6-9fff-ba0497ea198a",
    //   user: "thuychioffical",
    //   dateCreated: "2021-12-10",
    //   desc: "Nước mắt em lau bằng tình yêu mới - Thuỳ Chi\n#thuychi #thuychiofficial #NhacHayMoiNgay",
    //   post: "https://firebasestorage.googleapis.com/v0/b/authentication-f9b30.appspot.com/o/TC.mp4?alt=media&token=db559dea-1fa4-4b65-8c9b-36fa6674d708",
    //   like: "19.5k",
    //   comment: "235",
    // },
    {
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/authentication-f9b30.appspot.com/o/HAT.jpg?alt=media&token=0d364907-34dd-4b29-8cf7-3f460d54c849",
      user: "lii.musik",
      dateCreated: "1 day ago",
      desc: "Tôi có một chén rượu để xoa dịu hồng trần.",
      post: "https://firebasestorage.googleapis.com/v0/b/authentication-f9b30.appspot.com/o/HAT.mp4?alt=media&token=8604a062-d9e6-499e-906f-4f59d951e12d",
      like: "233",
      comment: "4",
    },
  ];

  return (
    <>
      {videos.map((video, i) => (
        <Post key={String(i)} video={video} />
      ))}
    </>
  );
}

Video.propTypes = {};

export default Video;
