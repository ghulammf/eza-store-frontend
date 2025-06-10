import { create } from "zustand";

const serviceModalStore = create((set) => ({
    modalCreate: false,
    modalUpdate: false,
    modalDelete: false,
    serviceId: "",
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
    setServiceId: (id) => {
        set({ serviceId: id })
    },
    clearServiceId: () => {
        set({ serviceId: "" })
    }
}))

export default serviceModalStore