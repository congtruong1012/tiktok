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
