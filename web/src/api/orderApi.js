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
  getMyOrder: async function (orderId, cancel = false) {
    if (!orderId) return {};
    const response = await api.request({
      url: `/orders/myorders/` + orderId,
      method: "GET",
      // retrieving the signal value by using the property name
      signal: cancel ? cancelApiObject[this.getMyOrder.name].handleRequestCancellation().signal : undefined,
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
  myOrders: async function (searchParams, cancel = false) {
    // console.log("my orders ")
    const response = await api.request({
      url: "/orders/myorders",
      method: "GET",
      params: searchParams,
      signal: cancel ? cancelApiObject[this.myOrders.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  myOrderItems: async function (searchParams, cancel = false) {
    // console.log("my orders ")
    const response = await api.request({
      url: "/orders/myorders/items-search",
      method: "GET",
      params: searchParams,
      signal: cancel ? cancelApiObject[this.myOrderItems.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  orderItems: async function (searchParams, cancel = false) {
    // console.log("my orders ")
    const response = await api.request({
      url: "/orders/search-items",
      method: "GET",
      params: searchParams,
      signal: cancel ? cancelApiObject[this.orderItems.name].handleRequestCancellation().signal : undefined,
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
  updateStatus: async function (orderId, status, cancel = false) {
    await api.request({
      url: `/orders/update-status/` + orderId,
      method: "PUT",
      data: status,
      signal: cancel ? cancelApiObject[this.updateStatus.name].handleRequestCancellation().signal : undefined,
    })
  },
  deleteOrderItem: async function (orderItemId, cancel = false) {
    const response = await api.request({
      url: `/orders/delete-order-item/` + orderItemId,
      method: "DELETE",
      // retrieving the signal value by using the property name
      signal: cancel ? cancelApiObject[this.deleteOrderItem.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
}

// defining the cancel API object for ProductAPI
const cancelApiObject = defineCancelApiObject(OrderApi)
