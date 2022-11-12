import { api } from "./axiosconfig"
import { defineCancelApiObject } from "./axiosUtils"

export const StateApi = {
  get: async function (stateId, cancel = false) {
    if (!stateId) return {};
    const response = await api.request({
      url: `/states/` + stateId,
      method: "GET",
      // retrieving the signal value by using the property name
      signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  search: async function (searchParams, cancel = false) {
    // console.log(searchParams)
    const response = await api.request({
      url: "/states/search",
      method: "GET",
      params: searchParams,
      signal: cancel ? cancelApiObject[this.search.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  searchStatesWithCitiesCount: async function (searchParams, cancel = false) {
    // console.log(searchParams)
    const response = await api.request({
      url: "/states/searchStatesWithCitiesCount",
      method: "GET",
      params: searchParams,
      signal: cancel ? cancelApiObject[this.searchStatesWithCitiesCount.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  getStateWithCountryAndCitiesCount: async function (stateId, cancel = false) {
    const response = await api.request({
      url: "/states/GetStateWithCountryAndCitiesCount/" + stateId,
      method: "GET",
      signal: cancel ? cancelApiObject[this.getStateWithCountryAndCitiesCount.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  create: async function (state, cancel = false) {
    const response = await api.request({
      url: `/states`,
      method: "POST",
      data: state,
      signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  update: async function (stateId, state, cancel = false) {
    await api.request({
      url: `/states/` + stateId,
      method: "PUT",
      data: state,
      signal: cancel ? cancelApiObject[this.update.name].handleRequestCancellation().signal : undefined,
    })
  },
  delete: async function (stateId, cancel = false) {
    const response = await api.request({
      url: `/states/` + stateId,
      method: "DELETE",
      // retrieving the signal value by using the property name
      signal: cancel ? cancelApiObject[this.delete.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  count: async function (cancel = false) {
    const response = await api.request({
      url: "/states/count",
      method: "GET",
      signal: cancel ? cancelApiObject[this.count.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
}

// defining the cancel API object for ProductAPI
const cancelApiObject = defineCancelApiObject(StateApi)
