import api from "../api/api"

const URL = '/api/v1/categories'

const KategoriService = {
    create: async function (formData) {
        const response = await api.post(URL, formData)
        return response.data
    },
    getAll: async function () {
        const response = await api.get(URL)
        return response.data
    },
    getItem: async function (id) {
        const response = await api.get(URL + `/${id}`,)
        return response.data
    },
    update: async function (id, formData) {
        const response = await api.put(URL + `/${id}`, formData,)
        return response.data
    },
    delete: async function (id) {
        const response = await api.delete(URL + `/${id}`,)
        return response.data
    }
}

export default KategoriService