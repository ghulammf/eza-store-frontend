import axios from "axios";
import authStore from "../store/auth.store";
import AuthService from "../services/auth.service";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
})

api.interceptors.request.use(
    (config) => {
        const token = authStore.getState().accessToken
        if (token) config.headers['Authorization'] = `Bearer ${token}`
        return config
    },
    (error) => Promise.reject(error)
)

api.interceptors.response.use(
    (res) => res,
    async (error) => {
        const originalRequest = error.config
        if (error.response?.status === 401 && error.response?.data?.message === 'TOKEN_EXPIRED' && !originalRequest._retry) {
            originalRequest._retry = true;
            originalRequest._silentRefresh = true
            try {
                console.log('Token expired, attempting refresh...')
                const newToken = await AuthService.refreshToken()
                authStore.getState().setAccessToken(newToken)
                originalRequest.headers['Authorization'] = `Bearer ${newToken}`
                return api(originalRequest)
            } catch (error) {
                console.error('Refres Token failed', error);
                authStore.getState().logout()
                return Promise.reject(error)
            }
        }

        if (error.response?.status === 401) authStore.getState().logout()

        return Promise.reject(error)
    }
)

export default api