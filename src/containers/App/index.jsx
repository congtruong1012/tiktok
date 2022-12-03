import { useMutation } from "@tanstack/react-query";
import firebase from "firebase/compat/app";
import "firebaseui/dist/firebaseui.css";
import { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CommonLayout from "../../components/Layout/CommonLayout";
import IconSpinner from "../../icons/IconSpinner";
import { getCurrentUser } from "../../services/authService";
import Following from "../Pages/Following";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Profile from "../Pages/Profile";
import { checkToken } from "./reducer";

function App() {
  const isLoading = useSelector((state) => state.app.isLoading);
  const isLogin = useSelector((state) => state.app.isLogin);
  const dispatch = useDispatch();
  const mutation = useMutation({
    mutationFn: getCurrentUser,
  });
  useLayoutEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(async (user) => {
        if (user) {
          const token = await user.getIdToken();
          localStorage.setItem("token", token);
          const fullname = user.displayName;
          const email = user.email;
          const avatar = user.photoURL;
          const isVerified = user.emailVerified;
          dispatch(
            checkToken({
              data: {
                fullname,
                email,
                avatar,
                isVerified,
              },
              isLogin: true,
            })
          );
        } else if (localStorage.getItem("token")) {
          mutation.mutate("", {
            onSuccess: ({ data }) => {
              const user = data?.data;
              dispatch(
                checkToken({
                  data: {
                    fullname:
                      user?.full_name ||
                      `${user?.first_name} ${user?.last_name}`,
                    email: user?.email,
                    avatar: user?.avatar,
                    isVerified: user?.tick,
                    nickname: user?.nickname,
                  },
                  isLogin: true,
                })
              );
            },
          });
        } else {
          dispatch(checkToken({ data: null, isLogin: false }));
        }
      });
    return () => unregisterAuthObserver();
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <IconSpinner className="h-14 w-14 animate-spin" />
        </div>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/following" element={<Following />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route
              path="*"
              element={
                <CommonLayout>
                  <div>Không tìm thấy </div>
                </CommonLayout>
              }
            />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
