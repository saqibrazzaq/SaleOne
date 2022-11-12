import { api } from "./axiosconfig"
import { defineCancelApiObject } from "./axiosUtils"

export const CityApi = {
  get: async function (cityId, cancel = false) {
    if (cityId) {
      const response = await api.request({
        url: `/cities/` + cityId,
        method: "GET",
        // retrieving the signal value by using the property name
        signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
      })
  
      return response.data
    }
  },
  search: async function (searchParams, cancel = false) {
    // console.log(searchParams)
    const response = await api.request({
      url: "/cities/search",
      method: "GET",
      params: searchParams,
      signal: cancel ? cancelApiObject[this.search.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  searchCitiesWithAddressesCount: async function (searchParams, cancel = false) {
    // console.log(searchParams)
    const response = await api.request({
      url: "/cities/searchCitiesWithAddressesCount",
      method: "GET",
      params: searchParams,
      signal: cancel ? cancelApiObject[this.searchCitiesWithAddressesCount.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  getCityDetails: async function (cityId, cancel = false) {
    const response = await api.request({
      url: "/cities/GetCityDetails/" + cityId,
      method: "GET",
      signal: cancel ? cancelApiObject[this.getCityDetails.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  create: async function (city, cancel = false) {
    const response = await api.request({
      url: `/cities`,
      method: "POST",
      data: city,
      signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  update: async function (cityId, city, cancel = false) {
    await api.request({
      url: `/cities/` + cityId,
      method: "PUT",
      data: city,
      signal: cancel ? cancelApiObject[this.update.name].handleRequestCancellation().signal : undefined,
    })
  },
  delete: async function (cityId, cancel = false) {
    const response = await api.request({
      url: `/cities/` + cityId,
      method: "DELETE",
      // retrieving the signal value by using the property name
      signal: cancel ? cancelApiObject[this.delete.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  count: async function (cancel = false) {
    const response = await api.request({
      url: "/cities/count",
      method: "GET",
      signal: cancel ? cancelApiObject[this.count.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
}

// defining the cancel API object for ProductAPI
const cancelApiObject = defineCancelApiObject(CityApi)
