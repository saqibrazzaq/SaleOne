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
