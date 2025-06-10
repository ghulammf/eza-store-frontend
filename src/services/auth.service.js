
import api from '../api/api';

//const API_URL = 'http://localhost:4000/api/auth'
const API_URL = import.meta.env.VITE_API_URL;

const AuthService = {
    register: async function (username, email, password, confirm_password) {
        const response = await api.post('/register', {
            username, email, password, confirm_password
        });
        return response.data
    },
    refreshToken: async function () {
        const response = await api.post('/refresh-token')
        const accessToken = response.data.data
        return accessToken
    },
    login: async function (username, password) {
        const response = await api.post('/api/auth/login', { username, password })
        return response.data
    },
    logout: async function () {
        const response = await api.post('/logout')
        return response.data
    }
}


export default AuthService