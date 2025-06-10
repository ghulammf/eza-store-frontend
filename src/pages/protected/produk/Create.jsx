import { useState } from "react";
import produkModalStore from "./produk.store";
import toast from "react-hot-toast";
import ProdukService from "../../../services/produk.service";
import Select from "../../../components/input/InputSelect";
import KategoriService from "../../../services/kategori.service";
import InputText from "../../../components/input/InputText";

const Create = () => {
  const modalCreate = produkModalStore((state) => state.modalCreate);
  const hideModalCreate = produkModalStore((state) => state.hideModalCreate);
  const [nama_produk, setNama_produk] = useState("");
  const [stok, setStok] = useState(0);
  const [harga_beli, setHarga_beli] = useState(0);
  const [harga_jual, setHarga_jual] = useState(0);
  const [kondisi, setKondisi] = useState("");
  const [kategori, setKategori] = useState("");
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const response = await KategoriService.getAll();
      setCategories(response.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nama_produk", nama_produk);
    formData.append("stok", stok);
    formData.append("harga_beli", harga_beli);
    formData.append("harga_jual", harga_jual);
    formData.append("kondisi", kondisi);
    formData.append("kategori", kategori);

    try {
      const response = await ProdukService.create(formData);
      hideModalCreate();
      clearData();
      location.reload();
      toast.success(response.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const clearData = () => {
    setNama_produk("");
    setStok(0);
    setHarga_beli(0);
    setHarga_jual(0);
    setKondisi("");
    setKategori("");
  };

  return (
    <div className="relative flex justify-center ">
      {modalCreate && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-gray-300/75 "
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <span
              className="hidden sm:inline-block sm:h-screen sm:align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
              <h3
                className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white"
                id="modal-title"
              >
                Create new Product
              </h3>

              <form className="mt-4">
                <InputText
                  label={"Nama"}
                  type={"text"}
                  value={nama_produk}
                  onChange={(e) => setNama_produk(e.target.value)}
                  placeholder={"nama produk"}
                  text={"Type Product Name"}
                />
                <InputText
                  label={"Stok"}
                  type={"text"}
                  value={stok}
                  onChange={(e) => setStok(e.target.value)}
                  placeholder={"stok"}
                  text={"Type the Stock"}
                />
                <InputText
                  label={"Harga Beli"}
                  type={"number"}
                  value={harga_beli}
                  onChange={(e) => setHarga_beli(e.target.value)}
                  placeholder={"harga beli"}
                  text={"Type the Buy Price"}
                />
                <InputText
                  label={"Harga Jual"}
                  type={"number"}
                  value={harga_jual}
                  onChange={(e) => setHarga_jual(e.target.value)}
                  placeholder={"harga jual"}
                  text={"Type the Sell Price"}
                />
                <div className="flex gap-2 my-0">
                  <Select
                    value={kondisi}
                    onChange={(e) => setKondisi(e.target.value)}
                    placeholder={"pilih kondisi"}
                    label={"Kondisi"}
                    defaultSelect={"Pilih Kondisi"}
                    option={
                      <>
                        <option value="baru">Baru</option>
                        <option value="seken">Seken</option>
                      </>
                    }
                  />
                  <Select
                    value={kategori}
                    onChange={(e) => setKategori(e.target.value)}
                    placeholder={"pilih kategori"}
                    label={"Kategori"}
                    defaultSelect={"Pilih Kategori"}
                    onClick={getCategories}
                    option={categories.map((item) => {
                      return (
                        <option key={item.id} value={item.id}>
                          {item.nama_kategori}
                        </option>
                      );
                    })}
                  />
                </div>

                <div className="mt-14 sm:flex sm:items-center sm:-mx-2">
                  <button
                    type="button"
                    onClick={() => {
                      hideModalCreate();
                      clearData();
                    }}
                    className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    onClick={handleCreate}
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Create;
