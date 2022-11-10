import axios from "axios";
import authHeader from "./auth-header";
import { AuthApi } from "./authApi";
import TokenService from "./token.service";

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

// registering the custom error handler to the
// "api" axios instance
// api.interceptors.response.use(undefined, (error) => {
//   return errorHandler(error);
// });

api.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    console.log(err);
    if (originalConfig.url !== "/auth/login" && err.response) {
      // Access Token was expired
      console.log("Access token expired");
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        // console.log("calling refresh token");
        // try {
        //   const rs = await api.post("/auth/refresh-token", {
        //     accessToken: TokenService.getLocalAccessToken(),
        //     refreshToken: TokenService.getLocalRefreshToken(),
        //   });

        //   const { accessToken } = rs.data;
        //   console.log("New access token: " + accessToken)
        //   TokenService.updateLocalAccessToken(accessToken);

        //   return api(originalConfig);
        // } catch (_error) {
        //   return Promise.reject(_error);
        // }
        AuthApi.refreshToken()
          .then((res) => {
            console.log("Refresh token result: " + res.data);
          })
          .catch((err) => {
            console.log("Refresh token Error message: " + err?.response?.data?.Message);
          });
      }
    }

    return Promise.reject(err);
  }
);

api.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token; // for Spring Boot back-end
      // config.headers["x-access-token"] = token; // for Node.js Express back-end
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
