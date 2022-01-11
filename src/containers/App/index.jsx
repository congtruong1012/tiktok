import firebase from "firebase/compat/app";
import "firebaseui/dist/firebaseui.css";
import { useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { config } from "../../utils/firebase";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import { checkToken } from "./reducer";

function App() {
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(async (user) => {
        console.log('.onAuthStateChanged ~ user', user)
        if (user) {
          const token = await user.getIdToken();
          localStorage.setItem("token", token);
          const fullname = user.displayName;
          const email = user.email;
          const avatar = user.photoURL;
          const isVerified = user.emailVerified;
          dispatch(
            checkToken({
              fullname,
              email,
              avatar,
              isVerified,
            })
          );
        }
      });
    return () => unregisterAuthObserver();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
