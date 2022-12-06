import { useMutation } from "@tanstack/react-query";
import PropTypes from "prop-types";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Image from "../../../components/Layout/Image";
import Modal from "../../../components/Layout/Modal";
import useToggle from "../../../hooks/useToggle";
import IconEdit from "../../../icons/IconEdit";
import { updateCurrentUser } from "../../../services/authService";
import { checkToken } from "../../App/reducer";
import { updateUser } from "../../Features/User/reducer";

function UpdateUser(props) {
  const { open, handleClose, user } = props;

  const formData = new FormData();

  const { mutate } = useMutation({
    mutationFn: updateCurrentUser,
  });

  const dispatch = useDispatch();
  const nav = useNavigate();

  const {
    register,
    control,
    formState: { errors, isValid },
    watch,
    setValue,
    handleSubmit,
  } = useForm({
    defaultValues: {
      nickname: user?.nickname,
      first_name: user?.first_name,
      last_name: user?.last_name,
      bio: user?.bio,
      avatar: user?.avatar,
    },
    mode: "onChange",
  });

  const bio = watch("bio")?.trim()?.length;

  const handleUpload = (e, options = {}) => {
    let ele = document.createElement("input");

    Object.assign(ele, { type: "file", hidden: true }, options);
    document.body.appendChild(ele);
    ele.click();
    ele.onchange = async (e) => {
      try {
        const files = e.target.files;
        for (const file of files) {
          formData.append("avatar", file);
          setValue("avatar", URL.createObjectURL(file));
        }
      } catch (error) {
        onError(error);
      }
    };
    document.body.removeChild(ele);
  };

  const onSubmit = (data) => {
    formData.append("nickname", data?.nickname);
    formData.append("first_name", data?.first_name);
    formData.append("last_name", data?.last_name);
    formData.append("bio", data?.bio);
    mutate(formData, {
      onSuccess: ({ data: rs }) => {
        dispatch(checkToken({ data: rs, isLogin: true }));
        dispatch(updateUser({ id: [rs?.id], byId: rs }));
        nav(`/profile/@${rs?.nickname}`);
        handleClose();
      },
    });
  };

  return (
    <>
      {open && (
        <Modal
          isOpen={open}
          onModalClose={handleClose}
          title="Edit profile"
          bodyClassName="h-[90%] max-w-xl pt-10"
          footer={
            <div className="flex space-x-4 justify-end px-4 pt-1 pb-3 text-sm font-medium">
              <button
                onClick={handleClose}
                className="py-2 px-6 rounded-lg border border-solid border-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit(onSubmit)}
                disabled={!isValid}
                className="py-2 px-6 rounded-lg font-semibold bg-primary text-white disabled:bg-gray-300"
              >
                Save
              </button>
            </div>
          }
        >
          {/* border-t border-solid border-gray-200 */}
          <div className="flex flex-col space-y-4 p-4">
            <div className="flex ">
              <h3 className="text-base font-semibold w-[120px]">
                Profile photo
              </h3>
              <div className="relative w-24 h-24 text-center ml-32 ">
                <Controller
                  name="avatar"
                  control={control}
                  render={({ field }) => (
                    <>
                      {console.log(field.value)}
                      <Image
                        src={field.value}
                        className="w-full h-full rounded-full overflow-hidden"
                      />
                    </>
                  )}
                  rules={{
                    required: true,
                  }}
                />
                <span className="absolute right-1 bottom-1 bg-white p-1 rounded-full shadow-lg cursor-pointer">
                  <IconEdit onClick={handleUpload} className=" w-5 h-5" />
                </span>
              </div>
            </div>
            <div className="flex pt-4 border-t border-solid border-gray-200">
              <h3 className="text-base font-semibold w-[120px]">Username</h3>
              <div className="flex flex-col space-y-3">
                <div className="w-[360px]">
                  <input
                    type="text"
                    className={`text-base rounded-lg bg-gray-100 ${
                      errors?.nickname
                        ? "solid border-solid border-primary focus:!border-primary"
                        : "border-none"
                    }`}
                    {...register("nickname", {
                      required: "Username is required",
                      min: {
                        value: 2,
                        message:
                          "Include at least 2 characters in your username",
                      },
                    })}
                  />
                  {errors?.nickname && (
                    <p className="text-xs text-primary mt-0.5">
                      {errors?.nickname?.message}
                    </p>
                  )}
                </div>
                <span className="text-gray-400 text-xs">
                  {`http://localhost:9652/profile/${watch("nickname")}`}
                </span>
                <span className="text-gray-400 text-xs w-[360px]">
                  Usernames can only contain letters, numbers, underscores, and
                  periods. Changing your username will also change your profile
                  link.
                </span>
              </div>
            </div>
            <div className="flex pt-4 border-t border-solid border-gray-200">
              <h3 className="text-base font-semibold w-[120px] ">Name</h3>
              <div className="flex flex-col space-y-3">
                <div className="flex items-baseline space-x-2 w-[360px] ">
                  <div className="">
                    <input
                      type="text"
                      className={`text-base rounded-lg bg-gray-100 ${
                        errors?.first_name
                          ? "solid border-solid border-primary focus:!border-primary"
                          : "border-none"
                      }`}
                      placeholder="Enter first name..."
                      {...register("first_name", {
                        required: "First name is required",
                      })}
                    />
                    {errors?.first_name && (
                      <p className="text-xs text-primary mt-0.5">
                        {errors?.first_name?.message}
                      </p>
                    )}
                  </div>
                  <div className="">
                    <input
                      type="text"
                      className={`text-base rounded-lg bg-gray-100 ${
                        errors?.last_name
                          ? "solid border-solid border-primary focus:!border-primary"
                          : "border-none"
                      }`}
                      placeholder="Enter last name..."
                      {...register("last_name", {
                        required: "Last name is required",
                      })}
                    />
                    {errors?.last_name && (
                      <p className="text-xs text-primary mt-0.5">
                        {errors?.last_name?.message}
                      </p>
                    )}
                  </div>
                </div>
                <span className="text-gray-400 text-xs w-[360px]">
                  Your nickname can only be changed once every 7 days.
                </span>
              </div>
            </div>
            <div className="flex pt-4 border-t border-solid border-gray-200">
              <h3 className="text-base font-semibold w-[120px]">Bio</h3>
              <div className="flex flex-col space-y-0.5">
                <textarea
                  rows={3}
                  className="w-[360px] rounded-lg bg-gray-100 border-none resize-none text-base"
                  {...register("bio", {
                    required: "Bio is required",
                    maxLength: 80,
                  })}
                />
                <span className="text-gray-400 text-xs w-[360px]">
                  <span
                    className={`${
                      errors?.bio && bio > 0 ? "text-primary" : ""
                    }`}
                  >{`${bio}`}</span>
                  /80
                </span>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default UpdateUser;
