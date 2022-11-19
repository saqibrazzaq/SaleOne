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
  sendForgotPasswordEmail: async function (data, cancel = false) {
    // console.log("search countries ")
    const response = await api.request({
      url: "/auth/send-forgot-password-email",
      method: "GET",
      params: data,
      signal: cancel ? cancelApiObject[this.sendForgotPasswordEmail.name].handleRequestCancellation().signal : undefined,
    })
    // console.log(response.data)
    return response.data
  },
  resetPassword: async function (data, cancel = false) {
    const response = await api.request({
      url: `/auth/reset-password`,
      method: "POST",
      data: data,
      signal: cancel
        ? cancelApiObject[this.resetPassword.name].handleRequestCancellation().signal
        : undefined,
    });

    return response.data;
  },
};

// defining the cancel API object for ProductAPI
const cancelApiObject = defineCancelApiObject(AuthApi);
