import React from "react";
import Widget from "../Layout/Widget";
import User from "../User";

function FollowingAccount() {
  return (
    <Widget title=" Following accounts" text="See more">
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

export default FollowingAccount;
