import { api } from "./axiosconfig";
import { defineCancelApiObject } from "./axiosUtils";

export const RoleApi = {
  getAll: async function (cancel = false) {
    const response = await api.request({
      url: "/roles",
      method: "GET",
      signal: cancel ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  
};

// defining the cancel API object for ProductAPI
const cancelApiObject = defineCancelApiObject(RoleApi);
