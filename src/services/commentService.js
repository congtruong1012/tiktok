import httpRequest from "../utils/httpRequest";

export const listComments = async (videoId, page, per_page = 10) => {
  console.log("listComments  page", page);
  try {
    const res = await httpRequest.get(`videos/${videoId}/comments`, {
      params: {
        page,
        per_page,
      },
    });
    return res?.data;
  } catch (error) {
    throw error;
  }
};

export const createComment = async ({ videoId, body }) => {
  try {
    const res = await httpRequest.post(`videos/${videoId}/comments`, body);
    return res?.data;
  } catch (error) {
    throw error;
  }
};

export const deleteComment = async ({ commentId }) => {
  try {
    const res = await httpRequest.delete(`comments/${commentId}`);
    return res?.data;
  } catch (error) {
    throw error;
  }
};

export const likeComment = async (commentId) => {
  try {
    const res = await httpRequest.post(`comments/${commentId}/like`);
    return res?.data;
  } catch (error) {
    throw error;
  }
};

export const unlikeComment = async (commentId) => {
  try {
    const res = await httpRequest.post(`comments/${commentId}/unlike`);
    return res?.data;
  } catch (error) {
    throw error;
  }
};
