import api from "../api/api"

const URL = '/api/v1/users'

const KaryawanService = {
    getAll: async function (query, page, limit) {
        const response = await api.get(URL + `?search_query=${query}&page=${page}&limit=${limit}`)
        return response.data
    },
    delete: async function (username) {
        const response = await api.delete(URL + `/${username}`)
        return response.data
    }
}

export default KaryawanService