import React from "react";
import Widget from "../Layout/Widget";
import User from "../User";

function SuggestAccount() {
  return (
    <Widget title="Suggested accounts" text="See all">
      <ul className="px-2 ">
        <li className="p-2">
          <User />
        </li>
        <li className="p-2">
          <User />
        </li>
        <li className="p-2">
          <User />
        </li>
        <li className="p-2">
          <User />
        </li>
        <li className="p-2">
          <User />
        </li>
      </ul>
    </Widget>
  );
}

export default SuggestAccount;
