import firebase from "firebase/compat/app";
import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import IconUser from "../../../icons/IconUser";
import logo from "../../../Image/logo.png";
import { uiConfig } from "../../../utils/firebase";

function LoginFireBase(props) {
  const { setPage } = props;

  const handleSetPage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setPage(1);
  };

  return (
    <div className=" py-6 text-center">
      <div className="flex justify-center">
        <img className="w-32" src={logo} />
      </div>
      <h2 className="text-3xl text-gray-700 font-bold py-2">Login to Tiktok</h2>
      <div className="py-2">
        <button
          style={{
            boxShadow:
              "0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 12%)",
          }}
          className="relative inline-block font-medium bg-white text-gray-500 w-[220px] h-[40px] leading-[40px] text-sm"
          onClick={handleSetPage}
        >
          <span>Use phone/email</span>
          <IconUser className="absolute top-1/2 -translate-y-1/2 left-4 text-xl" />
        </button>
        {import.meta.env.MODE === "development" && (
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
            className="w-full"
          />
        )}
      </div>
    </div>
  );
}

export default LoginFireBase;
