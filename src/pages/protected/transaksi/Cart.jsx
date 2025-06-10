import { useState } from "react";
import { useNavigate } from "react-router-dom";
import cartStore from "../../../store/cart.store";
import TransaksiService from "../../../services/transaksi.service";
import toast from "react-hot-toast";
import { TrashIcon } from "@heroicons/react/24/outline";
import Button2 from "../../../components/Button";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import IDRFormat from "../../../utils/IDR-format";
import { ShoppingBagIcon } from "@heroicons/react/20/solid";

function Cart() {
  const { items, updateQuantity, removeFromCart, getTotal, clearCart } =
    cartStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast.error("keranjang kosong");
      return;
    }

    try {
      setIsProcessing(true);

      const transactionData = {
        items: items.map((item) => ({
          produkId: item.produk.id,
          jumlah: parseInt(item.jumlah),
        })),
      };

      const response = await TransaksiService.create(transactionData);

      toast.success(response.message);
      clearCart();
      navigate("/transactions");
    } catch (error) {
      console.error("Error during checkout:", error);

      if (error.response && error.response.data) {
        if (error.response.data.error === "Stok tidak mencukupi") {
          // Tampilkan pesan stok tidak cukup dengan detail
          const insufficientItems = error.response.data.details;
          alert(
            <div>
              <p>Stok tidak mencukupi untuk:</p>
              <ul>
                {insufficientItems.map((item) => (
                  <li key={item.produkId}>
                    {item.productName} (Minta: {item.requested}, Tersedia:{" "}
                    {item.available})
                  </li>
                ))}
              </ul>
            </div>,
            { duration: 5000 }
          );
        } else {
          alert(error.response.data.error || "Gagal melakukan transaksi");
        }
      } else {
        alert("Terjadi kesalahan saat memproses transaksi");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold mb-4">Keranjang Belanja</h2>
        <p className="text-gray-500">Keranjang belanja Anda kosong</p>
        <button
          //onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Belanja Sekarang
        </button>
      </div>
    );
  }
  return (
    <div className="w-full flex flex-col items-center bg-white max-h-[500px] sm:max-h-screen rounded-2xl border border-slate-200 py-5 overflow-auto">
      <ShoppingBagIcon className="size-9 sm:size-14 md:size-20 text-[#002696]" />
      <span className="sm:text-lg md:text-xl md:font-medium">
        Shopping Chart
      </span>
      <table className="border border-slate-200 w-[90%] mx-[10px] my-[5%] rounded-xl overflow-hidden">
        <tbody>
          <tr className="my-6 h-[200px] md:h-[300px] overflow-auto">
            {items.map((item) => {
              return (
                <td
                  key={item.produk.id}
                  className="flex my-0.5 py-6 px-6 rounded-2xl border border-slate-200 hover:shadow-md transition duration-300"
                >
                  {/* <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    alt={product.imageAlt}
                    src={product.imageSrc}
                    className="size-full object-cover"
                  />
                </div> */}

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3 className="relative">
                          <span>{item.produk.nama_produk}</span>
                          <span
                            className={
                              item.produk.kondisi == "baru"
                                ? `absolute top-[-10px] left-[-10px] inline-flex items-center justify-center gap-1 rounded-full border-2 border-white bg-emerald-500 p-1 text-sm text-white`
                                : `absolute top-[-10px] left-[-10px] inline-flex items-center justify-center gap-1 rounded-full border-2 border-white bg-amber-500 p-1 text-sm text-white`
                            }
                          >
                            <span className="sr-only"> online </span>
                          </span>
                        </h3>
                        <p className="ml-4">
                          {IDRFormat(item.produk.harga_jual)}
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.produk.jumlah}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <p className="text-gray-500">
                        Qty{" "}
                        {
                          <input
                            type="number"
                            min={1}
                            max={item.produk.stok}
                            value={item.jumlah}
                            onChange={(e) =>
                              updateQuantity(item.produk.id, e.target.value)
                            }
                          />
                        }
                      </p>

                      <div className="flex">
                        <button
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          <TrashIcon
                            className="size-5 text-slate-400 hover:text-slate-500 cursor-pointer"
                            onClick={() => removeFromCart(item.produk.id)}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </td>
              );
            })}
          </tr>
        </tbody>
        <tfoot>
          <tr className="bg-gray-50">
            <td className="px-0 py-4 text-center font-medium">
              Total <span className="font-normal">{IDRFormat(getTotal())}</span>
            </td>
          </tr>
        </tfoot>
      </table>

      <div className="mt-6 flex justify-center">
        <div className="">
          <Button2
            icon={<BanknotesIcon className="text-white size-5" />}
            label={isProcessing ? "Memproses..." : "Bayar Sekarang"}
            onClick={handleCheckout}
          />
        </div>
      </div>
    </div>
  );
}

export default Cart;
