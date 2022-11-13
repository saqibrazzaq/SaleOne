import { api } from "./axiosconfig"
import { defineCancelApiObject } from "./axiosUtils"

export const UserAddressApi = {
  get: async function (userAddressId, cancel = false) {
    if (!userAddressId) return {};
    const response = await api.request({
      url: `/userAddresses/` + userAddressId,
      method: "GET",
      // retrieving the signal value by using the property name
      signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  getPrimary: async function (cancel = false) {
    const response = await api.request({
      url: `/userAddresses/getPrimary/`,
      method: "GET",
      // retrieving the signal value by using the property name
      signal: cancel ? cancelApiObject[this.getPrimary.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  getAll: async function (cancel = false) {
    // console.log("search countries ")
    const response = await api.request({
      url: "/userAddresses",
      method: "GET",
      signal: cancel ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  create: async function (userAddress, cancel = false) {
    const response = await api.request({
      url: `/userAddresses`,
      method: "POST",
      data: userAddress,
      signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  update: async function (userAddressId, userAddress, cancel = false) {
    await api.request({
      url: `/userAddresses/` + userAddressId,
      method: "PUT",
      data: userAddress,
      signal: cancel ? cancelApiObject[this.update.name].handleRequestCancellation().signal : undefined,
    })
  },
  delete: async function (userAddressId, cancel = false) {
    const response = await api.request({
      url: `/userAddresses/` + userAddressId,
      method: "DELETE",
      // retrieving the signal value by using the property name
      signal: cancel ? cancelApiObject[this.delete.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
}

// defining the cancel API object for ProductAPI
const cancelApiObject = defineCancelApiObject(UserAddressApi)
