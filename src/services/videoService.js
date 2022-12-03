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

export const getUserVideo = async (userId, page = 1) => {
  try {
    const res = await httpRequest.get(`users/${userId}/videos`, {
      params: {
        page,
      },
    });
    return res?.data;
  } catch (error) {
    throw error;
  }
};

export const getVideoLiked = async (userId, page = 1) => {
  try {
    const res = await httpRequest.get(`users/${userId}/liked-videos`, {
      params: {
        page,
      },
    });
    return res?.data;
  } catch (error) {
    throw error;
  }
};
