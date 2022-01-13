import React from "react";
import IconHashTag from "../../icons/IconHashTag";
import Widget from "../Layout/Widget";

function Discover() {
  const hashTags = [
    "Gieoquedaunam",
    "Khoedepdontet",
    "Menuquancafe",
    "Doyoulove?",
    "Luusoanhdi",
    "Hello2022",
    "Chao2022",
    "Dienmao2022"
  ];
  return (
    <Widget title="Discovers">
      {hashTags.map((item) => (
        <span key={item} className="inline-flex items-center py-1 m-1 text-sm px-2 rounded-2xl border-solid border border-gray-300 cursor-pointer">
          <IconHashTag />
          <span className="text-gray-500 ml-1">{item}</span>
        </span>
      ))}
    </Widget>
  );
}

export default Discover;
