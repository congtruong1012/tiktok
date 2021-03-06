import axios from "axios";
import React, { useEffect, useState } from "react";
import Widget from "../Layout/Widget";
import User from "../User";
import LoadingUser from "../User/LoadingUser";

function SuggestAccount() {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading((prev) => !prev);
    const timeout = setTimeout(() => {
      axios
        .get("https://jsonplaceholder.typicode.com/users", {
          params: { _limit: 5, _page: 1 },
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
    <Widget title="Suggested accounts" text="See all">
      <ul className="px-2 ">
        {isLoading
          ? [1, 2].map((item) => <LoadingUser key={String(item)} />)
          : users.map((user) => (
              <li className="p-2">
                <User key={String(user?.id || 0)} user={user} />
              </li>
            ))}
      </ul>
    </Widget>
  );
}

export default SuggestAccount;
