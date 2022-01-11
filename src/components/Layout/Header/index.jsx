import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import IconLogout from "../../../icons/IconLogout";
import IconMessage from "../../../icons/IconMessage";
import IconSearch from "../../../icons/IconSearch";
import IconSend from "../../../icons/IconSend";
import IconUpload from "../../../icons/IconUpload";
import IconUser from "../../../icons/IconUser";
import firebase from "firebase/compat/app";

function Header() {
  const nav = useNavigate();

  const isLogin = useSelector((state) => state.app.isLogin);
  const user = useSelector((state) => state.app.user);

  const handleLogout = () => {
    localStorage.removeItem("token");
    firebase.auth().signOut();
    nav("/login");
  };

  return (
    <>
      <div className="fixed left-0 right-0 bg-white shadow-sm z-30">
        <div className="flex mx-auto max-w-6xl justify-between items-center p-2">
          <div className="cursor-pointer">
            <Link
              data-e2e="tiktok-logo"
              className="tiktok-1431rw4-StyledLinkLogo e1an6zpe0"
              to="/"
            >
              <img src="https://sf16-scmcdn-sg.ibytedtos.com/goofy/tiktok/web/node/_next/static/images/logo-whole-c555aa707602e714ec956ac96e9db366.svg" />
            </Link>
          </div>
          <div className="w-1/3 relative">
            <input
              placeholder="Search accounts and videos"
              type="text"
              className="w-full border-none rounded-3xl outline-none bg-gray-100 px-4 py-2"
            />
            <button className="absolute border-l rounded-tr-3xl rounded-br-3xl hover:bg-gray-200 px-4 py-2 border-gray-400 right-0 top-1/2 -translate-y-1/2">
              <IconSearch />
            </button>
          </div>
          <div className="w-48">
            {isLogin ? (
              <div className="flex items-center justify-between">
                <IconUpload className="w-8 h-8 cursor-pointer" />
                <IconSend className="w-8 h-8 cursor-pointer" />
                <IconMessage className="w-8 h-8 cursor-pointer" />
                <div className="relative w-8 h-8 cursor-pointer avatar">
                  <img
                    src={user?.avatar}
                    alt="avt"
                    className="h-full w-full rounded-full "
                  />
                  <div className="absolute rounded-xl z-40 w-60 shadow-pri top-8 bg-white -right-2 menu">
                    <ul className="py-2">
                      <li className="block p-2 hover:bg-slate-50">
                        <Link to="#" className="flex items-center">
                          <IconUser className="w-6 h-6" />
                          <span className="ml-2 text-basic font-medium">
                            View profile
                          </span>
                        </Link>
                      </li>
                      <li className="block p-2 hover:bg-slate-50">
                        <div
                          onClick={handleLogout}
                          className="flex items-center"
                        >
                          <IconLogout className="w-6 h-6" />
                          <span className="ml-2 text-basic font-medium">
                            Logout
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center">
                <a href="#" className="text-base font-bold">
                  Upload
                </a>
                <Link
                  to="/login"
                  className="rounded ml-2 bg-primary py-2 px-8 text-white"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="h-16"></div>
    </>
  );
}

export default Header;
