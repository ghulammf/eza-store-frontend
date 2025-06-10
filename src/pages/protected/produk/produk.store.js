import { create } from "zustand";

const produkModalStore = create((set) => ({
    modalCreate: false,
    modalUpdate: false,
    modalDelete: false,
    produkId: "",
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
    setProdukId: (id) => {
        set({ produkId: id })
    },
    clearProdukId: () => {
        set({ produkId: "" })
    }
}))

export default produkModalStore