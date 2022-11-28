import { api } from "./axiosconfig"
import { defineCancelApiObject } from "./axiosUtils"

export const OrderApi = {
  get: async function (orderId, cancel = false) {
    if (!orderId) return {};
    const response = await api.request({
      url: `/orders/` + orderId,
      method: "GET",
      // retrieving the signal value by using the property name
      signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  search: async function (searchParams, cancel = false) {
    // console.log("search countries ")
    const response = await api.request({
      url: "/orders/search",
      method: "GET",
      params: searchParams,
      signal: cancel ? cancelApiObject[this.search.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  create: async function (order, cancel = false) {
    const response = await api.request({
      url: `/orders`,
      method: "POST",
      data: order,
      signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  
}

// defining the cancel API object for ProductAPI
const cancelApiObject = defineCancelApiObject(OrderApi)
