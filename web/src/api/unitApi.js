import { api } from "./axiosconfig"
import { defineCancelApiObject } from "./axiosUtils"

export const UnitApi = {
  get: async function (unitId, cancel = false) {
    if (!unitId) return {};
    const response = await api.request({
      url: `/units/` + unitId,
      method: "GET",
      // retrieving the signal value by using the property name
      signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  search: async function (searchParams, cancel = false) {
    // console.log("search countries ")
    const response = await api.request({
      url: "/units/search",
      method: "GET",
      params: searchParams,
      signal: cancel ? cancelApiObject[this.search.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  create: async function (unit, cancel = false) {
    const response = await api.request({
      url: `/units`,
      method: "POST",
      data: unit,
      signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  update: async function (unitId, unit, cancel = false) {
    await api.request({
      url: `/units/` + unitId,
      method: "PUT",
      data: unit,
      signal: cancel ? cancelApiObject[this.update.name].handleRequestCancellation().signal : undefined,
    })
  },
  delete: async function (unitId, cancel = false) {
    const response = await api.request({
      url: `/units/` + unitId,
      method: "DELETE",
      // retrieving the signal value by using the property name
      signal: cancel ? cancelApiObject[this.delete.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  count: async function (cancel = false) {
    const response = await api.request({
      url: "/units/count",
      method: "GET",
      signal: cancel ? cancelApiObject[this.count.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
}

// defining the cancel API object for ProductAPI
const cancelApiObject = defineCancelApiObject(UnitApi)
