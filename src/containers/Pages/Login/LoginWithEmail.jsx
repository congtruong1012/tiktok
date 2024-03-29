import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Scrollbar from "../../../components/Layout/Scrollbar";
import logo from "../../../Image/logo.png";
import { login } from "../../../services/authService";
import { checkToken } from "../../App/reducer";

const styleForm =
  "my-1 rounded-md  border-gray-300  shadow-sm  focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50";

function LoginWithEmail({ onClick }) {
  const mutation = useMutation({
    mutationFn: (email, password) => login(email, password),
  });
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "congtruong1012@gmail.com",
      password: "123456",
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data, {
      onSuccess: ({ data }) => {
        localStorage.setItem("token", data?.meta?.token);
        if (typeof onClick === "function") onClick();
        const user = data?.data;
        dispatch(
          checkToken({
            data: user,
            isLogin: true,
          })
        );
      },
      onError: (error) => {
        const eError = {
          422: "The given data was invalid.",
          401: "Incorrect account or password",
          default: "Login failed",
        };
        const code = error?.response?.status;
        console.log('onSubmit  error', error);
        alert(eError[code || "default"]);
      },
    });
  };

  return (
    <div className="py-6 text-center">
      <div className="flex justify-center">
        <img className="w-32" src={logo} />
      </div>
      <h2 className="text-3xl text-gray-700 font-bold py-2">Login</h2>
      <div className={`flex flex-wrap space-y-4 m-4 `}>
        <div className="basis-full text-left">
          <input
            type="text"
            className={`w-full ${styleForm}`}
            placeholder="Enter email..."
            {...register("email", {
              required: "Email là bắt buộc",
            })}
          />
          {errors?.email && (
            <p className="text-red-600 text-sm pl-1">
              {errors?.email?.message}
            </p>
          )}
        </div>
        <div className="basis-full text-left">
          <input
            type="password"
            className={`w-full ${styleForm}`}
            placeholder="Enter password..."
            {...register("password", {
              required: "Mật khẩu là bắt buộc",
            })}
          />
          {errors?.password && (
            <p className="text-red-600 text-sm pl-1">
              {errors?.password?.message}
            </p>
          )}
        </div>
        <button
          onClick={handleSubmit(onSubmit)}
          className="w-full bg-primary text-white rounded-md py-3 font-semibold"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default LoginWithEmail;
