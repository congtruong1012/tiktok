import React from "react";
import Post from "../../../components/Post";
function Video(props) {
  const videos = [
    {
      avatar:
        "https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/7e5186eb59cfca195f6841ad3010f16c.jpeg?x-expires=1641819600&x-signature=Ctud3L%2BpdpFeR1q7zCpUJLfzDHA%3D",
      user: "my0599",
      dateCreated: "2021-01-01",
      desc: "Dòng người vộ vàng bước qua... ######",
      post: "https://firebasestorage.googleapis.com/v0/b/authentication-f9b30.appspot.com/o/download.mp4?alt=media&token=01d89254-0cd8-4fb3-8441-fa77879c09b7",
      like: "50",
      comment: "20",
    },
    {
      avatar:
        "https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/063e1dea881b689033e9af8a5503b14d.jpg?x-expires=1641906000&x-signature=i6UpvHZADMVya4vAvd%2BNVgEqG94%3D",
      user: "thuychioffical",
      dateCreated: "2021-12-10",
      desc: "Có nhau trọn đời - Thuỳ Chi #thuychi #thuychiofficial #NhacHayMoiNgay",
      post: "https://firebasestorage.googleapis.com/v0/b/authentication-f9b30.appspot.com/o/TC.mp4?alt=media&token=db559dea-1fa4-4b65-8c9b-36fa6674d708",
      like: "19.5k",
      comment: "235",
    },
    {
      avatar:
        "https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-aiso/5d7f5520ca1074c38c55f77a13cd756a~c5_100x100.jpeg?x-expires=1641819600&x-signature=NbcgpEiGKBr8miAxxi6Q%2BX0d8GM%3D",
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
