import React from "react";
import firebase from "firebase/compat/app";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { app, uiConfig } from "../../../utils/firebase";
import logo from "../../../Image/logo.png";
import { GithubAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
function Login() {
  return (
    <div className="max-w-lg mx-auto">
      <div className="mt-8 py-10 text-center shadow-pri">
        <div className="flex justify-center">
          <img className="w-32" src={logo} />
        </div>
        <h2 className="text-3xl text-gray-700 font-bold py-2">
          Login to Tiktok
        </h2>
        <div className="py-2">
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
