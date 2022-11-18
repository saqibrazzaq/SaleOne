import { api } from "./axiosconfig";
import { defineCancelApiObject } from "./axiosUtils";
import TokenService from "./token.service";

export const AuthApi = {
  login: async function (data, cancel = false) {
    const response = await api.request({
      url: `/auth/login`,
      method: "POST",
      data: data,
      signal: cancel
        ? cancelApiObject[this.login.name].handleRequestCancellation().signal
        : undefined,
    });

    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  },
  register: async function (data, cancel = false) {
    const response = await api.request({
      url: `/auth/register`,
      method: "POST",
      data: data,
      signal: cancel
        ? cancelApiObject[this.register.name].handleRequestCancellation().signal
        : undefined,
    });

    return response.data;
  },
  refreshToken: async function (cancel = false) {
    let data = {
          accessToken: TokenService.getLocalAccessToken(),
          refreshToken: TokenService.getLocalRefreshToken(),
        };
    const response = await api.request({
      url: `/auth/refresh-token`,
      method: "POST",
      data: data,
      signal: cancel ? cancelApiObject[this.refreshToken.name].handleRequestCancellation().signal : undefined,
    })
    TokenService.updateLocalAccessToken(response.data.accessToken);
    TokenService.updateLocalRefreshToken(response.data.refreshToken);
    return response.data
  },
  logout: async function () {
    // const response = await api.request({
    //   url: `/auth/logout`,
    //   method: "POST",
    //   signal: cancel ? cancelApiObject[this.logout.name].handleRequestCancellation().signal : undefined,
    // })

    localStorage.removeItem("user");
  },
  getCurrentUser: async function () {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);

    return null;
  },
};

// defining the cancel API object for ProductAPI
const cancelApiObject = defineCancelApiObject(AuthApi);
