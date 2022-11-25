import axios from "axios";
import React, { useEffect, useState } from "react";
import SkeletonUser from "../Layout/Skeleton/SkeletonUser";
import Widget from "../Layout/Widget";
import User from "../User";

function FollowingAccount() {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading((prev) => !prev);
    const timeout = setTimeout(() => {
      axios
        .get("https://jsonplaceholder.typicode.com/users", {
          params: { _limit: 5, _page: 2 },
        })
        .then((res) => res.data)
        .then((data) => {
          setLoading((prev) => !prev);
          setUsers(data);
        });
    }, [1000]);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <Widget title=" Following accounts" text="See more">
      <div className="px-2 ">
        {isLoading
          ? [1, 2].map((item) => <SkeletonUser key={String(item)} />)
          : users.map((user) => (
              <User key={String(user?.id || 0)} user={user} />
            ))}
      </div>
    </Widget>
  );
}

export default FollowingAccount;
