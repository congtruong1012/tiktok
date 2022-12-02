import firebase from "firebase/compat/app";
import React, { useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import Scrollbar from "../../../components/Layout/Scrollbar";
import useSafeState from "../../../hooks/useSafeState";
import IconBack from "../../../icons/IconBack";
import IconUser from "../../../icons/IconUser";
import logo from "../../../Image/logo.png";
import { uiConfig } from "../../../utils/firebase";
import LoginFireBase from "./Login";
import LoginWithEmail from "./LoginWithEmail";

export default function Login(props) {
  const { page } = props;
  return (
    <>
      {page === 0 && <LoginFireBase {...props} />}
      {page === 1 && <LoginWithEmail {...props} />}
    </>
  );
}
