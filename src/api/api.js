import axios from "axios";
import { errorResponse } from "@/utils/errorResponse";

const baseURL = "http://localhost:8080/api/";

const refresh = async () => {
  const rToken = localStorage.getItem("refresh_token");
  let newToken = null;
  if (rToken) {
    try {
      const res = await axios.post(baseURL + "auth/refresh", {
        refreshToken: rToken,
      });
      newToken = res.data.access_token;
    } catch (e) {
      errorResponse(e.response);
      newToken = null;
    }
  }
  return newToken;
};

const api = axios.create({
  baseURL: baseURL,
  headers: { "Content-Type": "application/json" },
  timeout: 15 * 1000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    errorResponse(error.response);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error.config;
    if (error.response.status === 401 && !prevRequest.sent) {
      prevRequest.sent = true;
      const newToken = await refresh();
      if (newToken) {
        localStorage.setItem("access_token", newToken);
      }
      return api(prevRequest);
    }
    return Promise.reject(error);
  }
);

export default api;
