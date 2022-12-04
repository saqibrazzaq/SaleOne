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
  recalculateOrderTotals: async function (orderId, cancel = false) {
    const response = await api.request({
      url: `/orders/recalculate-order-totals/` + orderId,
      method: "GET",
      // retrieving the signal value by using the property name
      signal: cancel ? cancelApiObject[this.recalculateOrderTotals.name].handleRequestCancellation().signal : undefined,
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
  countByPaymentMethod: async function (paymentMethodId, cancel = false) {
    if (!paymentMethodId) return {};
    const response = await api.request({
      url: `/orders/count-by-payment-method/` + paymentMethodId,
      method: "GET",
      // retrieving the signal value by using the property name
      signal: cancel ? cancelApiObject[this.countByPaymentMethod.name].handleRequestCancellation().signal : undefined,
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
  addOrderItem: async function (orderItem, cancel = false) {
    const response = await api.request({
      url: `/orders/add-order-item`,
      method: "POST",
      data: orderItem,
      signal: cancel ? cancelApiObject[this.addOrderItem.name].handleRequestCancellation().signal : undefined,
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
  updatePaymentMethodForMyOrder: async function (orderId, paymentMethod, cancel = false) {
    await api.request({
      url: `/orders/myorders/update-payment-method/` + orderId,
      method: "PUT",
      data: paymentMethod,
      signal: cancel ? cancelApiObject[this.updatePaymentMethodForMyOrder.name].handleRequestCancellation().signal : undefined,
    })
  },
  updatePaymentMethod: async function (orderId, paymentMethod, cancel = false) {
    await api.request({
      url: `/orders/update-payment-method/` + orderId,
      method: "PUT",
      data: paymentMethod,
      signal: cancel ? cancelApiObject[this.updatePaymentMethod.name].handleRequestCancellation().signal : undefined,
    })
  },
  updateOrderItem: async function (orderItemId, orderItem, cancel = false) {
    await api.request({
      url: `/orders/update-order-item/` + orderItemId,
      method: "PUT",
      data: orderItem,
      signal: cancel ? cancelApiObject[this.updateOrderItem.name].handleRequestCancellation().signal : undefined,
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
