import { api } from "./axiosconfig"
import { defineCancelApiObject } from "./axiosUtils"

export const PaymentMethodApi = {
  get: async function (paymentMethodId, cancel = false) {
    if (!paymentMethodId) return {};
    const response = await api.request({
      url: `/PaymentMethods/` + paymentMethodId,
      method: "GET",
      // retrieving the signal value by using the property name
      signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  getAll: async function (cancel = false) {
    const response = await api.request({
      url: `/PaymentMethods`,
      method: "GET",
      // retrieving the signal value by using the property name
      signal: cancel ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  create: async function (paymentMethod, cancel = false) {
    const response = await api.request({
      url: `/PaymentMethods`,
      method: "POST",
      data: paymentMethod,
      signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  update: async function (paymentMethodId, paymentMethod, cancel = false) {
    await api.request({
      url: `/PaymentMethods/` + paymentMethodId,
      method: "PUT",
      data: paymentMethod,
      signal: cancel ? cancelApiObject[this.update.name].handleRequestCancellation().signal : undefined,
    })
  },
  delete: async function (paymentMethodId, cancel = false) {
    const response = await api.request({
      url: `/PaymentMethods/` + paymentMethodId,
      method: "DELETE",
      // retrieving the signal value by using the property name
      signal: cancel ? cancelApiObject[this.delete.name].handleRequestCancellation().signal : undefined,
    })
    
    return response.data
  },
  
}

// defining the cancel API object for ProductAPI
const cancelApiObject = defineCancelApiObject(PaymentMethodApi)
