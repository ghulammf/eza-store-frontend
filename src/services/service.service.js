import api from "../api/api"

const API_URL = '/api/v1/services'

const ServiceService = {
    create: async function (formData) {
        const response = await api.post(API_URL, formData, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return response.data
    },
    getAll: async function (query, byStatus, page, limit) {
        const response = await api.get(API_URL + `?search_query=${query}&byStatus=${byStatus}&page=${page}&limit=${limit}`)
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
    },
    getHistory: async function (rentang, inputDate) {
        const response = await api.get(API_URL + `/histories?rentang=${rentang}&input_date=${inputDate}`)
        return response.data
    }
}

export default ServiceService