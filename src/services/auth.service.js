
import api from '../api/api';

//const API_URL = 'http://localhost:4000/api/auth'
const URL = '/api/auth'

const AuthService = {
    register: async function (username, email, password, confirm_password) {
        const response = await api.post(URL + '/register', {
            username, email, password, confirm_password
        });
        return response.data
    },
    refreshToken: async function () {
        const response = await api.post(URL + '/refresh-token')
        const accessToken = response.data.data
        return accessToken
    },
    login: async function (username, password) {
        const response = await api.post(URL + '/login', { username, password })
        return response.data
    },
    logout: async function () {
        const response = await api.post(URL + '/logout')
        return response.data
    }
}


export default AuthService