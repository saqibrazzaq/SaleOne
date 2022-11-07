import { api } from "./axiosconfig"
import { defineCancelApiObject } from "./axiosUtils"

export const CategoryApi = {
  get: async function (categoryId, cancel = false) {
    if (!categoryId) return {};
    const response = await api.request({
      url: `/categories/` + categoryId,
      method: "GET",
      // retrieving the signal value by using the property name
      signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  search: async function (searchParams, cancel = false) {
    // console.log("search countries ")
    const response = await api.request({
      url: "/categories/search",
      method: "GET",
      params: searchParams,
      signal: cancel ? cancelApiObject[this.search.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  searchWithProductsCount: async function (searchParams, cancel = false) {
    // console.log("search countries with states count")
    const response = await api.request({
      url: "/categories/searchWithProductsCount",
      method: "GET",
      params: searchParams,
      signal: cancel ? cancelApiObject[this.searchWithProductsCount.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  create: async function (category, cancel = false) {
    const response = await api.request({
      url: `/categories`,
      method: "POST",
      data: category,
      signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  update: async function (categoryId, category, cancel = false) {
    await api.request({
      url: `/categories/` + categoryId,
      method: "PUT",
      data: category,
      signal: cancel ? cancelApiObject[this.update.name].handleRequestCancellation().signal : undefined,
    })
  },
  delete: async function (categoryId, cancel = false) {
    const response = await api.request({
      url: `/categories/` + categoryId,
      method: "DELETE",
      // retrieving the signal value by using the property name
      signal: cancel ? cancelApiObject[this.delete.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  count: async function (cancel = false) {
    const response = await api.request({
      url: "/categories/count",
      method: "GET",
      signal: cancel ? cancelApiObject[this.count.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  
}

// defining the cancel API object for ProductAPI
const cancelApiObject = defineCancelApiObject(CategoryApi)
