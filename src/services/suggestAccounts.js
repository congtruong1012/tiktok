import httpRequest from "../utils/httpRequest";

export const suggestAccounts = async (page, per_page = 5) => {
  try {
    const res = await httpRequest.get("users/suggested", {
      params: {
        page,
        per_page,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
