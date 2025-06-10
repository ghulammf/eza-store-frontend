import { useState } from "react";
import cartStore from "../../../store/cart.store";
import { ArchiveBoxArrowDownIcon } from "@heroicons/react/24/outline";
import Button2 from "../../../components/Button";
import IDRFormat from "../../../utils/IDR-format";

function ProductCard({ produk, namaProduk, kondisi, stok, hargaJual }) {
  const [jumlah, setJumlah] = useState(1);
  const addToCart = cartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    if (jumlah > stok) {
      alert("Jumlah melebihi stok !!");
      return;
    }

    if (jumlah < 1) {
      alert("Jumlah minimal 1");
      return;
    }

    addToCart(produk, parseInt(jumlah));
    setJumlah(1);
  };

  return (
    <div className="bg-white w-full h-fit rounded-lg border border-slate-200 hover:shadow-md overflow-hidden">
      <div className="p-5">
        <section className="flex justify-between items-center">
          <h3 className="text-md font-medium">{namaProduk}</h3>
          <span
            className={
              kondisi == "baru"
                ? `inline-flex items-center bg-gradient-to-r from-green-400 to-green-600 text-white text-xs font-medium px-2.5 py-1 rounded-md shadow-sm`
                : `inline-flex items-center bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-md`
            }
          >
            {kondisi}
          </span>
        </section>

        <section className="mt-2 flex justify-between items-center">
          <p className="text-gray-600">
            Stok: <span className={stok < 5 ? "text-red-500" : ""}>{stok}</span>
          </p>
          <p className="font-medium">{IDRFormat(hargaJual)}</p>
        </section>

        <section className="mt-4 flex justify-between items-center space-x-2">
          <input
            type="number"
            min="1"
            max={10}
            value={jumlah}
            onChange={(e) => setJumlah(e.target.value)}
            className="w-16 p-1 border border-slate-200 rounded text-center"
          />
          <Button2
            icon={<ArchiveBoxArrowDownIcon className="text-white size-5" />}
            label={stok === 0 ? "Stok Habis" : "Tambah"}
            onClick={handleAddToCart}
            disabled={stok === 0 ? true : ""}
          />
          {/* <button
            onClick={handleAddToCart}
            disabled={stok === 0}
            className={`flex-1 py-2 px-4 rounded ${
              stok === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
          >
            {stok === 0 ? "Stok Habis" : "Tambah"}
          </button> */}
        </section>
      </div>
    </div>
  );
}

export default ProductCard;
