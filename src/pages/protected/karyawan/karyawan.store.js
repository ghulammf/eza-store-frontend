import { create } from "zustand";

const karyawanModalStore = create((set) => ({
    modalCreate: false,
    modalUpdate: false,
    modalDelete: false,
    userDelete: "",
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
    setUserDelete: (username) => {
        set({ userDelete: username })
    }
}))

export default karyawanModalStore