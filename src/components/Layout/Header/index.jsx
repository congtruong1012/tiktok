import { useMutation } from "@tanstack/react-query";
import firebase from "firebase/compat/app";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../../containers/App/reducer";
import { AuthLogin } from "../../../containers/HOCs/AuthLogin";
import IconLogout from "../../../icons/IconLogout";
import IconMessage from "../../../icons/IconMessage";
import IconSend from "../../../icons/IconSend";
import IconUpload from "../../../icons/IconUpload";
import IconUser from "../../../icons/IconUser";
import { logout as logoutApi } from "../../../services/authService";
import Search from "../../Search";
import Image from "../Image";

function Header() {
  const isLogin = useSelector((state) => state.app.isLogin);
  const user = useSelector((state) => state.app.user);
  const dispatch = useDispatch();
  const { mutate } = useMutation({
    mutationFn: logoutApi,
  });

  const handleLogout = () => {
    // firebase.auth().signOut();
    mutate("", {
      onSuccess: () => {
        localStorage.removeItem("token");
        dispatch(logout());
      },
      onError: () => alert("Logout failed"),
    });
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
          <Search />
          <div className="w-48">
            {isLogin ? (
              <div className="flex items-center justify-between">
                <IconUpload className="w-8 h-8 cursor-pointer" />
                <IconSend className="w-8 h-8 cursor-pointer" />
                <IconMessage className="w-8 h-8 cursor-pointer" />
                <div className="relative w-8 h-8 cursor-pointer avatar">
                  <Image
                    src={user?.avatar}
                    alt="avt"
                    className="h-full w-full rounded-full "
                  />
                  <div className="absolute rounded-xl z-40 w-60 shadow-pri top-8 bg-white -right-2 menu">
                    <ul className="py-2">
                      <li className="block p-2 hover:bg-slate-50">
                        <Link
                          to={`/profile/@${user?.nickname}`}
                          className="flex items-center"
                        >
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
              <div className="flex items-center space-x-4">
                <AuthLogin
                  Component="a"
                  className="rounded py-1.5 px-6 text-base font-semibold border border-solid border-gray-300  cursor-pointer"
                >
                  Upload
                </AuthLogin>
                <AuthLogin
                  Component="button"
                  className="rounded ml-2 bg-primary py-1.5 px-6 text-white font-semibold"
                  onClick={() => console.log("Oke na")}
                >
                  <span>Login</span>
                </AuthLogin>
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
