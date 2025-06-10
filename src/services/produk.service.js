import api from "../api/api"

const API_URL = '/api/v1/products'

const ProdukService = {
    create: async function (formData) {
        const response = await api.post(API_URL, formData, {

            headers: {
                "Content-Type": "application/json"
            }
        })
        return response.data
    },
    getAll: async function (query, byCondition, byCategory, page, limit) {
        const response = await api.get(API_URL + `?search_query=${query}&byCondition=${byCondition}&byCategory=${byCategory}&page=${page}&limit=${limit}`)
        return response.data
    },
    getItem: async function (id) {
        const response = await api.get(API_URL + `/${id}`,)
        return response.data
    },
    update: async function (id, formData) {
        const response = await api.put(API_URL + `/${id}`, formData, {

            headers: {
                "Content-Type": "application/json"
            }
        })
        return response.data;
    },
    delete: async function (id) {
        const response = await api.delete(API_URL + `/${id}`,)
        return response.data
    },
    search: async function (query) {
        const response = await api.get(API_URL + `?search_query=${query}`,)
        return response.data
    }
}

export default ProdukService