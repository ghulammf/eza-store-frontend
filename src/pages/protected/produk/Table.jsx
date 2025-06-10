import Button from "../../../components/Button";
import { useEffect, useState } from "react";
import produkModalStore from "./produk.store";
import ProdukService from "../../../services/produk.service";
import toast from "react-hot-toast";
import KategoriService from "../../../services/kategori.service";
import authStore from "../../../store/auth.store";
import { TrashIcon, PencilIcon, PlusIcon } from "@heroicons/react/24/outline";
import IDRFormat from "../../../utils/IDR-format";
import Search from "../../../components/input/InputSearch";
import Select from "../../../components/input/InputSelect";
import Th from "../../../components/table/Th";
import Td from "../../../components/table/Td";
import Thead from "../../../components/table/Thead";
import Table from "../../../components/table/Table";
import Tbody from "../../../components/table/Tbody";
import Pagination from "../../../components/Pagination";

function Second() {
  return (
    <span className="inline-flex items-center bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-md">
      seken
    </span>
  );
}

function New() {
  return (
    <span className="inline-flex items-center bg-gradient-to-r from-green-400 to-green-600 text-white text-xs font-medium px-2.5 py-0.5 rounded-md shadow-sm">
      baru
    </span>
  );
}

function Data() {
  const start = true;
  const showModalCreate = produkModalStore((state) => state.showModalCreate);
  const showModalUpdate = produkModalStore((state) => state.showModalUpdate);
  const showModalDelete = produkModalStore((state) => state.showModalDelete);
  const setProdukId = produkModalStore((state) => state.setProdukId);
  const role = authStore((state) => state.role);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [query, setQuery] = useState("");
  const [byCondition, setByCondition] = useState("");
  const [byCategory, setByCategory] = useState("");

  useEffect(() => {
    if (start) {
      getCategories();
      getProducts();
    }
  }, [page, limit, query, byCategory, byCondition]);

  const getProducts = async () => {
    try {
      const response = await ProdukService.getAll(
        query,
        byCondition,
        byCategory,
        page,
        limit
      );
      setProducts(response.data.products);
      setPage(response.data.page);
      setPages(response.data.totalPage);
      setRows(response.data.totalRows);
      setLimit(response.data.limit);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const getCategories = async () => {
    try {
      const response = await KategoriService.getAll();
      setCategories(response.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const changePage = ({ selected }) => {
    setPage(selected);
    if (selected === 9) toast.error("Data tidak ditemukan");
  };

  return (
    <div className="w-full bg-white rounded-2xl mx-auto p-6">
      <h1 className="text-2xl font-semibold">Inventory Produk</h1>
      <hr className="my-2 sm:my-3 md:my-5 lg:my-6 text-slate-200" />
      <div className="w-full grid gap-3 sm:flex sm:items-center justify-between my-4">
        {role === "ADMIN" && (
          <Button
            icon={<PlusIcon className="text-white size-5" />}
            label={"Tambah Produk"}
            onClick={() => showModalCreate()}
          />
        )}
        <section className="grid gap-3 sm:flex sm:gap-8 items-center">
          <Select
            value={byCategory}
            onChange={(e) => setByCategory(e.target.value)}
            option={categories.map((item) => {
              return (
                <option key={item.id} value={item.id}>
                  {item.nama_kategori}
                </option>
              );
            })}
            defaultSelect={"Semua"}
            label={"Pilih Kategori"}
          />
          <Select
            value={byCondition}
            onChange={(e) => setByCondition(e.target.value)}
            option={
              <>
                <option key={1} value={"baru"}>
                  {"Baru"}
                </option>
                <option key={2} value={"seken"}>
                  {"Seken"}
                </option>
              </>
            }
            defaultSelect={"Semua"}
            label={"Pilih Kondisi"}
          />
          <Search value={query} onChange={(e) => setQuery(e.target.value)} />
        </section>
      </div>

      <section className="sm:p-4 md:p-5 rounded-2xl border border-slate-200">
        <div className="overflow-x-auto">
          <Table>
            <Thead>
              <Th label={"No."} />
              <Th label={"Nama Produk"} />
              <Th label={"Stok"} />
              <Th label={"Harga Beli"} />
              <Th label={"Harga Jual"} />
              <Th label={"Kondisi"} />
              <Th label={"Kategori"} />
              {role === "ADMIN" ? <Th /> : ""}
            </Thead>

            <Tbody>
              {products.map((product, index) => {
                return (
                  <tr
                    className="border-b-[1px] border-slate-200 text-center"
                    key={product.id}
                  >
                    <Td content={index + 1} />
                    <Td content={product.nama_produk} />
                    <Td content={product.stok} />
                    <Td content={IDRFormat(product.harga_beli)} />
                    <Td content={IDRFormat(product.harga_jual)} />
                    <Td
                      content={product.kondisi == "baru" ? <New /> : <Second />}
                    />
                    <Td content={product.kategori.nama_kategori} />
                    {role === "ADMIN" ? (
                      <Td
                        content={
                          <span className="inline-flex divide-x divide-gray-300 overflow-hidden rounded border border-gray-300 bg-white shadow-sm">
                            <button
                              type="button"
                              className="cursor-pointer px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 focus:relative"
                              aria-label="Edit"
                              onClick={() => {
                                showModalUpdate();
                                setProdukId(product.id);
                              }}
                            >
                              <PencilIcon className="size-4 text-gray-700" />
                            </button>

                            {/* read icon */}
                            <button
                              type="button"
                              className="cursor-pointer px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 focus:relative"
                              aria-label="Delete"
                              onClick={() => {
                                showModalDelete();
                                setProdukId(product.id);
                              }}
                            >
                              <TrashIcon className="size-4 text-gray-700" />
                            </button>
                          </span>
                        }
                      />
                    ) : (
                      ""
                    )}
                  </tr>
                );
              })}
            </Tbody>
          </Table>
        </div>
      </section>

      <Pagination
        rows={rows}
        page={page}
        pages={pages}
        onPageChange={changePage}
      />
    </div>
  );
}

export default Data;
