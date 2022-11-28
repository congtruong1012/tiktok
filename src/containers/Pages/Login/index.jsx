import firebase from "firebase/compat/app";
import React, { useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import useSafeState from "../../../hooks/useSafeState";
import IconBack from "../../../icons/IconBack";
import IconUser from "../../../icons/IconUser";
import logo from "../../../Image/logo.png";
import { uiConfig } from "../../../utils/firebase";
import LoginFireBase from "./Login";
import LoginWithEmail from "./LoginWithEmail";

export default function Login(props) {
  const [page, setPage] = useSafeState(0);
  return (
    // <div className="flex justify-center items-center min-h-screen">
    <div className="shadow-pri w-[500px] bg-white">
      {page === 1 && (
        <IconBack
          className="inline-block mt-4 ml-5 cursor-pointer text-xl"
          onClick={() => setPage(0)}
        />
      )}
      {page === 0 && <LoginFireBase setPage={setPage} {...props} />}
      {page === 1 && <LoginWithEmail setPage={setPage} {...props} />}
    </div>
    // </div>
  );
}
