import Tippy from "@tippyjs/react";
import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import IconSearch from "../../icons/IconSearch";
import Scrollbar from "../Layout/Scrollbar";
import User from "../User";

function Search(props) {
  const ref = useRef();
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="w-1/3 relative">
        <Tippy
          visible={open}
          content={
            <Scrollbar className={`w-[350px] h-[300px] bg-white shadow-md`}>
              <div className="p-2">
                <User user={{ id: 3, name: "Cong", username: "congtruong" }} />
                <User user={{ id: 3, name: "Cong", username: "congtruong" }} />
                <User user={{ id: 3, name: "Cong", username: "congtruong" }} />
                <User user={{ id: 3, name: "Cong", username: "congtruong" }} />
                <User user={{ id: 3, name: "Cong", username: "congtruong" }} />
                <User user={{ id: 3, name: "Cong", username: "congtruong" }} />
                <div className="animate-pulse flex items-center cursor-pointer hover:bg-gray-50 py-2 px-2">
                  <div className="h-11 w-11 bg-slate-100 rounded-full mr-3"></div>
                  <div className="flex-grow">
                    <div className="text-base text-gray-600 font-bold flex">
                      <span className="relative"></span>
                    </div>
                    <div className="text-xs text-gray-400 py-0"></div>
                  </div>
                </div>
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
            ref={ref}
            onChange={(e) => {
              const { value } = e.target;
              if (value) {
                if (!open) setOpen(true);
              } else {
                if (open) setOpen(false);
              }
            }}
            onFocus={(e) => e.target.value && setOpen(true)}
          />
        </Tippy>
        <button className="absolute border-l rounded-tr-3xl rounded-br-3xl hover:bg-gray-200 px-4 py-2 border-gray-400 right-0 top-1/2 -translate-y-1/2">
          <IconSearch />
        </button>
      </div>
    </>
  );
}

Search.propTypes = {};

export default Search;
