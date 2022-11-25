import firebase from "firebase/compat/app";
import React, { useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import IconBack from "../../../icons/IconBack";
import IconUser from "../../../icons/IconUser";
import logo from "../../../Image/logo.png";
import { uiConfig } from "../../../utils/firebase";
import LoginFireBase from "./Login";
import LoginWithEmail from "./LoginWithEmail";

export default function Login() {
  const [page, setPage] = useState(0);
  return (
    <div className="max-w-lg mx-auto">
      <div className="mt-8 shadow-pri">
        {page === 1 && (
          <IconBack
            className="inline-block mt-4 ml-5 cursor-pointer text-xl"
            onClick={() => setPage(0)}
          />
        )}
        {page === 0 && <LoginFireBase setPage={setPage} />}
        {page === 1 && <LoginWithEmail setPage={setPage} />}
      </div>
    </div>
  );
}
