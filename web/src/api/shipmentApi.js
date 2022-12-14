import { api } from "./axiosconfig"
import { defineCancelApiObject } from "./axiosUtils"

export const ShipmentApi = {
  get: async function (shipmentId, cancel = false) {
    if (!shipmentId) return {};
    const response = await api.request({
      url: `/shipments/` + shipmentId,
      method: "GET",
      // retrieving the signal value by using the property name
      signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  search: async function (searchParams, cancel = false) {
    // console.log("search countries ")
    const response = await api.request({
      url: "/shipments/search",
      method: "GET",
      params: searchParams,
      signal: cancel ? cancelApiObject[this.search.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  create: async function (shipment, cancel = false) {
    const response = await api.request({
      url: `/shipments`,
      method: "POST",
      data: shipment,
      signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  createFromOrder: async function (orderId, cancel = false) {
    const response = await api.request({
      url: `/shipments/createFromOrder/` + orderId,
      method: "POST",
      data: null,
      signal: cancel ? cancelApiObject[this.createFromOrder.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  update: async function (shipmentId, shipment, cancel = false) {
    await api.request({
      url: `/shipments/` + shipmentId,
      method: "PUT",
      data: shipment,
      signal: cancel ? cancelApiObject[this.update.name].handleRequestCancellation().signal : undefined,
    })
  },
  delete: async function (shipmentId, cancel = false) {
    const response = await api.request({
      url: `/shipments/` + shipmentId,
      method: "DELETE",
      // retrieving the signal value by using the property name
      signal: cancel ? cancelApiObject[this.delete.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
}

// defining the cancel API object for ProductAPI
const cancelApiObject = defineCancelApiObject(ShipmentApi)
