import { create } from "zustand";

const cartStore = create((set, get) => ({
    items: [],

    addToCart: (produk, jumlah = 1) => {
        set((state) => {
            const existingItemIndex = state.items.findIndex(item => item.produk.id === produk.id)

            if (existingItemIndex !== -1) {
                const updatedItems = [...state.items];
                updatedItems[existingItemIndex].jumlah += jumlah;
                return { items: updatedItems }
            } else {
                return { items: [...state.items, { produk, jumlah }] }
            }
        })
    },
    updateQuantity: (produkId, jumlah) => {
        set((state) => {
            const updatedItems = state.items.map(item => {
                if (item.produk.id === produkId) {
                    return { ...item, jumlah: parseInt(jumlah) }
                }
                return item
            }).filter(item => item.jumlah > 0)
            return { items: updatedItems }
        })
    },
    removeFromCart: (produkId) => {
        set((state) => ({
            items: state.items.filter(item => item.produk.id !== produkId)
        }))
    },
    getTotal: () => {
        return get().items.reduce((total, item) => {
            return total + (item.produk.harga_jual * item.jumlah)
        }, 0)
    },
    clearCart: () => {
        set({ items: [] })
    }
}))

export default cartStore