import { create } from "zustand";
import AuthService from "../services/auth.service";

const authStore = create((set, get) => ({
    username: localStorage.getItem('username') || null,
    role: localStorage.getItem('role') || null,
    accessToken: localStorage.getItem('accessToken') || null,

    // Flag status
    isAuthenticated: !!localStorage.getItem('accessToken'),
    isLoading: false,

    login: async (username, password) => {
        set({ isLoading: true })
        try {
            const user = await AuthService.login(username, password);
            localStorage.setItem('username', user.data.username)
            localStorage.setItem('role', user.data.role)
            localStorage.setItem("accessToken", user.data.accessToken)
            set({
                username: user.data.username,
                role: user.data.role,
                accessToken: user.data.accessToken,
            })
        } finally {
            set({ isLoading: false })
        }
    },

    setAccessToken: (token) => {
        localStorage.setItem('accessToken', token)
        set({ accessToken: token, isAuthenticated: true })
    },

    refreshToken: async () => {
        try {
            const newAccessToken = await AuthService.refreshToken()
            localStorage.setItem('accessToken', newAccessToken)
            set({ accessToken: newAccessToken, isAuthenticated: true })
            return newAccessToken
        } catch (err) {
            console.error('Refresh token failed', err);
            get().logout()
            throw err
        }
    },

    logout: async () => {
        try {
            await AuthService.logout();
        } catch (error) {
            console.warn('Logout error: ', error);
        }

        localStorage.removeItem('username')
        localStorage.removeItem('role')
        localStorage.removeItem('accessToken')
        set({
            username: null,
            role: null,
            accessToken: null,
            isAuthenticated: false
        })
    }
}))

export default authStore