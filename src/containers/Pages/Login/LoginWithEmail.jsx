import React from "react";
import logo from "../../../Image/logo.png";

const styleForm =
  "mt-1 rounded-md  border-gray-300  shadow-sm  focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50";

function LoginWithEmail() {
  return (
    <div className="py-6 text-center">
      <div className="flex justify-center">
        <img className="w-32" src={logo} />
      </div>
      <h2 className="text-3xl text-gray-700 font-bold py-2">Login</h2>
      <div className={`flex flex-wrap space-y-4 m-4`}>
        <div className="basis-full">
          <input
            type="text"
            className={`w-full ${styleForm}`}
            placeholder="Enter email..."
          />
        </div>
        <div className="basis-full">
          <input
            type="text"
            className={`w-full ${styleForm}`}
            placeholder="Enter password..."
          />
        </div>
        <button className="w-full bg-blue-400 text-white rounded-md py-3">
          Login
        </button>
      </div>
    </div>
  );
}

export default LoginWithEmail;
