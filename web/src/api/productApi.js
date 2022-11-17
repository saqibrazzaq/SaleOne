import { api } from "./axiosconfig"
import { defineCancelApiObject } from "./axiosUtils"

export const ProductApi = {
  get: async function (productId, cancel = false) {
    if (productId) {
      const response = await api.request({
        url: `/products/` + productId,
        method: "GET",
        // retrieving the signal value by using the property name
        signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
      })
  
      return response.data
    }
    
  },
  search: async function (searchParams, cancel = false) {
    // console.log("search countries ")
    const response = await api.request({
      url: "/products/search",
      method: "GET",
      params: searchParams,
      signal: cancel ? cancelApiObject[this.search.name].handleRequestCancellation().signal : undefined,
    })
    // console.log(response.data)
    return response.data
  },
  create: async function (product, cancel = false) {
    const response = await api.request({
      url: `/products`,
      method: "POST",
      data: product,
      signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  update: async function (productId, product, cancel = false) {
    await api.request({
      url: `/products/` + productId,
      method: "PUT",
      data: product,
      signal: cancel ? cancelApiObject[this.update.name].handleRequestCancellation().signal : undefined,
    })
  },
  delete: async function (productId, cancel = false) {
    const response = await api.request({
      url: `/products/` + productId,
      method: "DELETE",
      // retrieving the signal value by using the property name
      signal: cancel ? cancelApiObject[this.delete.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  count: async function (cancel = false) {
    const response = await api.request({
      url: "/products/count",
      method: "GET",
      signal: cancel ? cancelApiObject[this.count.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  countImages: async function (productId, cancel = false) {
    const response = await api.request({
      url: "/products/images/count/" + productId,
      method: "GET",
      signal: cancel ? cancelApiObject[this.countImages.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  getImage: async function (productImageId, cancel = false) {
    if (productImageId) {
      const response = await api.request({
        url: `/products/images/` + productImageId,
        method: "GET",
        // retrieving the signal value by using the property name
        signal: cancel ? cancelApiObject[this.getImage.name].handleRequestCancellation().signal : undefined,
      })
  
      return response.data
    }
  },
  createImage: async function (productId, fd, config, cancel = false) {
    const response = await api.request({
      url: `/products/images/` + productId,
      method: "POST",
      data: fd,
      signal: cancel ? cancelApiObject[this.createImage.name].handleRequestCancellation().signal : undefined,
    }, config)

    return response.data
  },
  deleteImage: async function (productImageId, cancel = false) {
    const response = await api.request({
      url: `/products/images/` + productImageId,
      method: "DELETE",
      // retrieving the signal value by using the property name
      signal: cancel ? cancelApiObject[this.deleteImage.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  updateMainImage: async function (dto, cancel = false) {
    console.log("inside update")
    await api.request({
      url: `/products/images/mainImage`,
      method: "PUT",
      data: dto,
      signal: cancel ? cancelApiObject[this.updateMainImage.name].handleRequestCancellation().signal : undefined,
    })
  },
}

// defining the cancel API object for ProductAPI
const cancelApiObject = defineCancelApiObject(ProductApi)
