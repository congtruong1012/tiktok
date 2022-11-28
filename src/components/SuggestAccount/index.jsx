import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import HoverCard from "../../containers/HOCs/HoverCard";
import { suggestAccounts } from "../../services/suggestAccounts";
import SkeletonUser from "../Layout/Skeleton/SkeletonUser";
import Widget from "../Layout/Widget";
import User from "../User";

function SuggestAccount() {
  const { isLoading, hasNextPage, data, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["suggest-account"],
      queryFn: ({ pageParam = 1 }) => suggestAccounts(pageParam),
      getNextPageParam: (params) => {
        const { current_page, total_pages } = params?.meta?.pagination || {};
        return current_page < total_pages ? current_page + 1 : undefined;
      },
    });
  return (
    <Widget
      title="Suggested accounts"
      text={hasNextPage ? "See all" : ""}
      onClickText={fetchNextPage}
    >
      <div className="px-2 ">
        {isLoading
          ? [1, 2, 3].map((item) => <SkeletonUser key={String(item)} />)
          : data.pages.map((page) =>
              page?.data?.map((user) => (
                <HoverCard
                  Component={User}
                  key={String(user?.id || 0)}
                  user={user}
                  userId={user?.nickname}
                />
                // <User key={String(user?.id || 0)} user={user} />
              ))
            )}
        {isFetchingNextPage && <SkeletonUser />}
      </div>
    </Widget>
  );
}

export default SuggestAccount;
