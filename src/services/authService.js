import httpRequest from "../utils/httpRequest";

export const login = async ({ email, password }) => {
  try {
    const res = await httpRequest.post("auth/login", {
      email,
      password,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const res = await httpRequest.get("auth/me");
    return res?.data;
  } catch (error) {
    console.log("getCurrentUser ~ error", error);
  }
};

export const getAnUser = async (nickname) => {
  try {
    const res = await httpRequest(`users/@${nickname}`);
    return res.data?.data || {};
  } catch (error) {
    console.log("error", error);
  }
};
