import { useQuery } from "@tanstack/react-query";
import Tippy from "@tippyjs/react";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import IconCircleXMark from "../../icons/IconCircleXMark";
import IconSearch from "../../icons/IconSearch";
import IconSpinner from "../../icons/IconSpinner";
import { search } from "../../services/searchService";
import Scrollbar from "../Layout/Scrollbar";
import SkeletonUser from "../Layout/Skeleton/SkeletonUser";
import User from "../User";
function Search(props) {
  const [keySearch, setKeySearch] = useState("");
  const searchDebounce = useDebounce(keySearch);

  const { isFetching, data } = useQuery({
    queryKey: ["search", searchDebounce],
    queryFn: () => search(searchDebounce),
    enabled: !!searchDebounce,
  });

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(data?.length > 0);
  }, [data]);

  return (
    <>
      <div className="w-1/3 relative">
        <Tippy
          visible={open}
          content={
            <Scrollbar className={`w-[350px] min-h-[300px] bg-white shadow-md`}>
              <div className="p-2">
                {isFetching ? (
                  <>
                    <SkeletonUser />
                    <SkeletonUser />
                    <SkeletonUser />
                  </>
                ) : (
                  <>
                    {data?.map((item) => (
                      <User user={item} key={item?.id} />
                    ))}
                  </>
                )}
              </div>
            </Scrollbar>
          }
          interactive
          onClickOutside={() => setOpen(false)}
        >
          <input
            placeholder="Search accounts and videos"
            type="text"
            className="w-full border-none rounded-3xl outline-none bg-gray-100 px-4 py-2"
            value={keySearch}
            onChange={(e) => {
              const { value } = e.target;
              setKeySearch(value);
              if (!value) {
                setOpen(false);
              }
            }}
            onFocus={(e) => e.target.value && data?.length > 0 && setOpen(true)}
          />
        </Tippy>
        {keySearch &&
          (isFetching ? (
            <IconSpinner className="absolute animate-spinner top-1/2 right-[70px] -translate-y-1/2 w-3 h-3 bg-gray-200" />
          ) : (
            <IconCircleXMark
              className="absolute top-1/2 right-[70px] -translate-y-1/2 w-3 h-3 bg-gray-200"
              onClick={() => setKeySearch("")}
            />
          ))}
        <span className="absolute right-14 top-1/2 -translate-y-1/2 w-[1px] h-1/2 bg-gray-300"></span>
        <button className="absolute rounded-tr-3xl rounded-br-3xl hover:bg-gray-200 px-4 py-2 border-gray-400 right-0 top-1/2 -translate-y-1/2">
          <IconSearch />
        </button>
      </div>
    </>
  );
}

Search.propTypes = {};

export default Search;
