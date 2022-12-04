import { api } from "./axiosconfig"
import { defineCancelApiObject } from "./axiosUtils"

export const CourierApi = {
  get: async function (courierId, cancel = false) {
    if (!courierId) return {};
    const response = await api.request({
      url: `/couriers/` + courierId,
      method: "GET",
      // retrieving the signal value by using the property name
      signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  search: async function (searchParams, cancel = false) {
    // console.log("search countries ")
    const response = await api.request({
      url: "/couriers/search",
      method: "GET",
      params: searchParams,
      signal: cancel ? cancelApiObject[this.search.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  searchWithDeliveryPlansCount: async function (searchParams, cancel = false) {
    // console.log("search countries ")
    const response = await api.request({
      url: "/couriers/searchWithDeliveryPlansCount",
      method: "GET",
      params: searchParams,
      signal: cancel ? cancelApiObject[this.searchWithDeliveryPlansCount.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  create: async function (courier, cancel = false) {
    const response = await api.request({
      url: `/couriers`,
      method: "POST",
      data: courier,
      signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  update: async function (courierId, courier, cancel = false) {
    await api.request({
      url: `/couriers/` + courierId,
      method: "PUT",
      data: courier,
      signal: cancel ? cancelApiObject[this.update.name].handleRequestCancellation().signal : undefined,
    })
  },
  delete: async function (courierId, cancel = false) {
    const response = await api.request({
      url: `/couriers/` + courierId,
      method: "DELETE",
      // retrieving the signal value by using the property name
      signal: cancel ? cancelApiObject[this.delete.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  count: async function (cancel = false) {
    const response = await api.request({
      url: "/couriers/count",
      method: "GET",
      signal: cancel ? cancelApiObject[this.count.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
}

// defining the cancel API object for ProductAPI
const cancelApiObject = defineCancelApiObject(CourierApi)
