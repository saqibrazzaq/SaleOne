import { api } from "./axiosconfig"
import { defineCancelApiObject } from "./axiosUtils"

export const CountryApi = {
  get: async function (countryId, cancel = false) {
    if (!countryId) return {};
    const response = await api.request({
      url: `/countries/` + countryId,
      method: "GET",
      // retrieving the signal value by using the property name
      signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  getCountryWithStatesCount: async function (countryId, cancel = false) {
    if (!countryId) return {};
    const response = await api.request({
      url: `/countries/GetCountryWithStatesCount/` + countryId,
      method: "GET",
      // retrieving the signal value by using the property name
      signal: cancel ? cancelApiObject[this.getCountryWithStatesCount.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  search: async function (searchParams, cancel = false) {
    // console.log("search countries ")
    const response = await api.request({
      url: "/countries/search",
      method: "GET",
      params: searchParams,
      signal: cancel ? cancelApiObject[this.search.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  searchWithStatesCount: async function (searchParams, cancel = false) {
    // console.log("search countries with states count")
    const response = await api.request({
      url: "/countries/searchWithStatesCount",
      method: "GET",
      params: searchParams,
      signal: cancel ? cancelApiObject[this.searchWithStatesCount.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  create: async function (country, cancel = false) {
    const response = await api.request({
      url: `/countries`,
      method: "POST",
      data: country,
      signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  update: async function (countryId, country, cancel = false) {
    await api.request({
      url: `/countries/` + countryId,
      method: "PUT",
      data: country,
      signal: cancel ? cancelApiObject[this.update.name].handleRequestCancellation().signal : undefined,
    })
  },
  delete: async function (countryId, cancel = false) {
    const response = await api.request({
      url: `/countries/` + countryId,
      method: "DELETE",
      // retrieving the signal value by using the property name
      signal: cancel ? cancelApiObject[this.delete.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  count: async function (cancel = false) {
    const response = await api.request({
      url: "/countries/count",
      method: "GET",
      signal: cancel ? cancelApiObject[this.count.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
}

// defining the cancel API object for ProductAPI
const cancelApiObject = defineCancelApiObject(CountryApi)
