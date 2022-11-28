import axios from "axios";

const httpRequest = axios.create({
  baseURL: "https://tiktok.fullstack.edu.vn/api/",
});

httpRequest.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (err) => Promise.reject(err)
);

export default httpRequest;
