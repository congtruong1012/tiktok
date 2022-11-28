import httpRequest from "../utils/httpRequest";

export const video = async (page, type = "for-you") => {
  try {
    const res = await httpRequest.get("videos", {
      params: {
        page,
        type,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
