import api from "../api/api"

const API_URL = '/api/v1/transactions'

const TransaksiService = {
    create: async function (items) {
        const response = await api.post(API_URL, items)
        return response.data
    },
    getAll: async function () {
        const date = "2025-05-01T02:40:27.163Z"
        const startDate = new Date(date).toISOString().split('T')[0]
        const endDate = new Date().toISOString().split('T')[0]
        const response = await api.get(API_URL + `?startDate=${startDate}&endDate=${endDate}`)
        return response.data
    },
    getBestSelling: async function (kategori, kondisi, rentang) {
        const response = await api.get(API_URL + `/bestselling?kategori=${kategori}&kondisi=${kondisi}&rentang=${rentang}`)
        return response.data
    },
    getHistory: async function (kategori, kondisi, rentang, input_date) {
        const response = await api.get(API_URL + `/histories?kategori=${kategori}&kondisi=${kondisi}&rentang=${rentang}&input_date=${input_date}`)
        return response.data
    },
}

export default TransaksiService