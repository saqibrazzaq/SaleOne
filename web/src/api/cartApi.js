import { api } from "./axiosconfig"
import { defineCancelApiObject } from "./axiosUtils"

export const CartApi = {
  get: async function (cancel = false) {
    const response = await api.request({
      url: `/cart`,
      method: "GET",
      // retrieving the signal value by using the property name
      signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  addToCart: async function (cartItem, cancel = false) {
    const response = await api.request({
      url: `/cart`,
      method: "POST",
      data: cartItem,
      signal: cancel ? cancelApiObject[this.addToCart.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  updateItem: async function (cartItemId, cartItem, cancel = false) {
    await api.request({
      url: `/cart/` + cartItemId,
      method: "PUT",
      data: cartItem,
      signal: cancel ? cancelApiObject[this.updateItem.name].handleRequestCancellation().signal : undefined,
    })
  },
  removeFromCart: async function (productId, cancel = false) {
    const response = await api.request({
      url: `/cart/` + productId,
      method: "DELETE",
      // retrieving the signal value by using the property name
      signal: cancel ? cancelApiObject[this.removeFromCart.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  
}

// defining the cancel API object for ProductAPI
const cancelApiObject = defineCancelApiObject(CartApi)
