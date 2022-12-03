import httpRequest from "../utils/httpRequest";

export const followAccounts = async (page) => {
  try {
    const res = await httpRequest.get("me/followings", {
      params: {
        page,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const followAccount = async (userId) => {
  try {
    const res = await httpRequest.post(`users/${userId}/follow`);
    return res.data?.data;
  } catch (error) {
    throw error;
  }
};

export const unfollowAccount = async (userId) => {
  try {
    const res = await httpRequest.post(`users/${userId}/unfollow`);
    return res.data?.data;
  } catch (error) {
    throw error;
  }
};
