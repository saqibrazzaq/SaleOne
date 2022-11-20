import { api } from "./axiosconfig";
import { defineCancelApiObject } from "./axiosUtils";
import TokenService from "./token.service";

export const UserApi = {
  info: async function (cancel = false) {
    const response = await api.request({
      url: `/auth/info`,
      method: "GET",
      // retrieving the signal value by using the property name
      signal: cancel ? cancelApiObject[this.info.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  sendVerificationEmail: async function (cancel = false) {
    const response = await api.request({
      url: `/auth/send-verification-email`,
      method: "GET",
      // retrieving the signal value by using the property name
      signal: cancel ? cancelApiObject[this.sendVerificationEmail.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  verifyEmail: async function (data, cancel = false) {
    const response = await api.request({
      url: `/auth/verify-email`,
      method: "POST",
      data: data,
      signal: cancel ? cancelApiObject[this.verifyEmail.name].handleRequestCancellation().signal : undefined,
    });

    return response.data;
  },
  
};

// defining the cancel API object for ProductAPI
const cancelApiObject = defineCancelApiObject(UserApi);
