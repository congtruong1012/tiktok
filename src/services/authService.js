import httpRequest from "../utils/httpRequest";

export const login = async ({ email, password }) => {
  try {
    const res = await httpRequest.post("auth/login", {
      email,
      password,
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const register = async ({ email, password, type = "email" }) => {
  try {
    const res = await httpRequest.post("auth/register", {
      type,
      email,
      password,
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    const res = await httpRequest.post("auth/logout");
    return res;
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const res = await httpRequest.get("auth/me");
    return res?.data;
  } catch (error) {
    throw error;
  }
};

export const getAnUser = async (nickname) => {
  try {
    const res = await httpRequest(`users/@${nickname}`);
    return res.data?.data || {};
  } catch (error) {
    throw error;
  }
};
