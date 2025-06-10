// src/stores/useMenuStore.js
import { create } from 'zustand'

const serviceListMenu = create((set) => ({
    menus: [],

    // Tambah menu berdasarkan ID
    addMenu: (serviceMenu) =>
        set((state) => {
            const isExist = state.menus.some(
                (menu) => menu.serviceHandphoneMenuId === serviceMenu.id
            )
            if (isExist) return state // Hindari duplikasi
            return {
                menus: [
                    ...state.menus,
                    { serviceMenu }
                ]
            }
        }),

    // Hapus menu berdasarkan ID
    removeMenu: (menuId) =>
        set((state) => ({
            menus: state.menus.filter(
                (menu) => menu.serviceMenu.id !== menuId
            )
        })),

    // removeMenu: (menuId) =>
    //     set((state) => ({
    //         menus: state.menus.filter(
    //             (menu) => menu.serviceHandphoneMenuId !== menuId
    //         )
    //     })),

    // Reset semua menu
    resetMenus: () =>
        set({
            menus: []
        })
}))

export default serviceListMenu
