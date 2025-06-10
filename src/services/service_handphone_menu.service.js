import api from "../api/api"

const API_URL = '/api/v1/phoneservices'

const ServiceHandponeMenuServices = {
    create: async function (formData) {
        const response = await api.post(API_URL, formData, {
            headers: {
                "Content-Type": 'application/json'
            }
        })
        return response.data
    },
    getAll: async function (query, page, limit) {
        const response = await api.get(API_URL + `?search_query=${query}&page=${page}&limit=${limit}`)
        return response.data
    },
    getItem: async function (id) {
        const response = await api.get(API_URL + `/${id}`)
        return response.data
    },
    update: async function (id, formData) {
        const response = await api.put(API_URL + `/${id}`, formData, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return response.data
    },
    delete: async function (id) {
        const response = await api.delete(API_URL + `/${id}`)
        return response.data
    }
}

export default ServiceHandponeMenuServices