import httpReqesest from "../utils/httpRequest";
export const getAnUser = async (nickname) => {
  try {
    const res = await httpReqesest.get(`/users/${nickname}`);
    return res?.data?.data;
  } catch (error) {
    throw error;
  }
};
