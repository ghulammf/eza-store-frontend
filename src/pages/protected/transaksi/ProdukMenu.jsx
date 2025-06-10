import { useEffect, useState } from "react";
import ProductCard from "./ProdukCard";
import ProdukService from "../../../services/produk.service";
import toast from "react-hot-toast";
import Search from "../../../components/input/InputSearch";

function ProductMenu() {
  const start = true;
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  //let submitted;

  useEffect(() => {
    if (start) {
      searchProducts();
    }
  }, [query]);

  const searchProducts = async () => {
    try {
      const response = await ProdukService.search(query);
      setProducts(response.data.products);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        <p>Memuat Produk ...</p>
      </div>
    );
  }

  return (
    <div className="">
      <div className="mb-4 h-fit grid gap-4 sm:flex  justify-between items-center">
        <h2 className="text-xl font-semibold">Daftar Produk</h2>
        <Search value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>

      <hr className="text-slate-200" />

      {!loading && products.length > 0 && (
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          {products
            .map((product) => {
              return (
                <ProductCard
                  key={product.id}
                  produk={product}
                  namaProduk={product.nama_produk}
                  kondisi={product.kondisi}
                  stok={product.stok}
                  hargaJual={product.harga_jual}
                />
              );
            })
            .slice(0, 5)}
        </div>
      )}
      {!loading && products.length === 0 && query !== "" && (
        <p className="mt-4 text-gray-500">Tidak ada produk ditemukan.</p>
      )}
    </div>
  );
}

export default ProductMenu;
