import { create } from "zustand";

const serviceMenuModalStore = create((set) => ({
    modalCreate: false,
    modalUpdate: false,
    modalDelete: false,
    serviceMenuId: "",
    showModalCreate: () => {
        set({ modalCreate: true })
    },
    showModalUpdate: () => {
        set({ modalUpdate: true })
    },
    showModalDelete: () => {
        set({ modalDelete: true })
    },
    hideModalCreate: () => {
        set({ modalCreate: false })
    },
    hideModalUpdate: () => {
        set({ modalUpdate: false })
    },
    hideModalDelete: () => {
        set({ modalDelete: false })
    },
    setServiceMenuId: (id) => {
        set({ serviceMenuId: id })
    },
    clearServiceMenuId: () => {
        set({ serviceMenuId: "" })
    }
}))

export default serviceMenuModalStore