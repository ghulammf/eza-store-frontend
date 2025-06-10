import Button from "../../../components/Button";
import { useEffect, useState } from "react";
import produkModalStore from "./serviceMenu.store";
import toast from "react-hot-toast";
import { TrashIcon, PencilIcon, PlusIcon } from "@heroicons/react/24/outline";
import IDRFormat from "../../../utils/IDR-format";
import Search from "../../../components/input/InputSearch";
import Th from "../../../components/table/Th";
import Td from "../../../components/table/Td";
import Thead from "../../../components/table/Thead";
import Table from "../../../components/table/Table";
import Tbody from "../../../components/table/Tbody";
import ServiceHandponeMenuServices from "../../../services/service_handphone_menu.service";
import Pagination from "../../../components/Pagination";
import authStore from "../../../store/auth.store";

function Data() {
  const start = true;
  const showModalCreate = produkModalStore((state) => state.showModalCreate);
  const showModalUpdate = produkModalStore((state) => state.showModalUpdate);
  const showModalDelete = produkModalStore((state) => state.showModalDelete);
  const setServiceMenuId = produkModalStore((state) => state.setServiceMenuId);
  const role = authStore((state) => state.role);
  const [servicesMenu, setServicesMenu] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (start) {
      getServiceHandponeMenu();
    }
  }, [page, limit, query]);

  const getServiceHandponeMenu = async () => {
    try {
      const response = await ServiceHandponeMenuServices.getAll(
        query,
        page,
        limit
      );
      setServicesMenu(response.data.servicesHandphoneMenu);
      setPage(response.data.page);
      setPages(response.data.totalPage);
      setRows(response.data.totalRows);
      setLimit(response.data.limit);
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
      <h1 className="text-2xl font-semibold">Service Handphone Menu</h1>
      <hr className="my-2 sm:my-3 md:my-5 lg:my-6 text-slate-200" />
      <div className="w-full grid gap-3 sm:flex sm:items-center justify-between my-4">
        {role === "ADMIN" && (
          <Button
            icon={<PlusIcon className="text-white size-5" />}
            label={"Tambah Menu Service"}
            onClick={() => showModalCreate()}
          />
        )}
        <section className="grid gap-3 sm:flex sm:gap-8 items-center">
          <Search value={query} onChange={(e) => setQuery(e.target.value)} />
        </section>
      </div>

      <section className="sm:p-4 md:p-5 rounded-2xl border border-slate-200">
        <div className="overflow-x-auto">
          <Table>
            <Thead>
              <Th label={"No."} />
              <Th label={"Nama Service"} />
              <Th label={"Ongkos"} />
              {role === "ADMIN" && <Th />}
            </Thead>

            <Tbody>
              {servicesMenu.map((service, index) => {
                return (
                  <tr
                    className="border-b-[1px] border-slate-200 text-center"
                    key={service.id}
                  >
                    <Td content={index + 1} />
                    <Td content={service.nama_service} />
                    <Td content={IDRFormat(service.ongkos)} />
                    {role === "ADMIN" && (
                      <Td
                        content={
                          <span className="inline-flex divide-x divide-gray-300 overflow-hidden rounded border border-gray-300 bg-white shadow-sm">
                            <button
                              type="button"
                              className="cursor-pointer px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 focus:relative"
                              aria-label="Edit"
                              onClick={() => {
                                showModalUpdate();
                                setServiceMenuId(service.id);
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
                                setServiceMenuId(service.id);
                              }}
                            >
                              <TrashIcon className="size-4 text-gray-700" />
                            </button>
                          </span>
                        }
                      />
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
