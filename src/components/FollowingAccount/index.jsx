import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { followAccounts } from "../../services/followAccount";
import SkeletonUser from "../Layout/Skeleton/SkeletonUser";
import Widget from "../Layout/Widget";
import User from "../User";

function FollowingAccount() {
  const { isLoading, isFetchingNextPage, hasNextPage, data, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["following-account"],
      queryFn: ({ pageParam }) => followAccounts(pageParam),
      getNextPageParam: (params) => {
        const { current_page, total_pages } = params?.meta?.pagination || {};
        return current_page < total_pages ? current_page + 1 : undefined;
      },
    });
  return (
    <Widget
      title=" Following accounts"
      text={hasNextPage ? "See more" : ""}
      onClickText={fetchNextPage}
    >
      <div className="px-2 ">
        {isLoading
          ? [1, 2, 3].map((item) => <SkeletonUser key={String(item)} />)
          : data?.pages.map((page) =>
              page?.data?.map((user) => (
                <User key={String(user?.id || 0)} user={user} />
              ))
            )}
        {isFetchingNextPage && <SkeletonUser />}
      </div>
    </Widget>
  );
}

export default FollowingAccount;
