import Button from "../../../components/Button";
import { useEffect, useState } from "react";
import serviceModalStore from "./service.store";
import toast from "react-hot-toast";
import ServiceService from "../../../services/service.service";
import { PlusIcon, TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import authStore from "../../../store/auth.store";
import Search from "../../../components/input/InputSearch";
import IDRFormat from "../../../utils/IDR-format";
import Select from "../../../components/input/InputSelect";
import Td from "../../../components/table/Td";
import Th from "../../../components/table/Th";
import Table from "../../../components/table/Table";
import Thead from "../../../components/table/Thead";
import Tbody from "../../../components/table/Tbody";
import Pagination from "../../../components/Pagination";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/20/solid";

function Not() {
  return (
    <span className="rounded-full border border-red-400 px-2.5 py-0.5 text-sm whitespace-nowrap text-red-400">
      proses
    </span>
  );
}

function Ok() {
  return (
    <span className="rounded-full border border-green-500 px-2.5 py-0.5 text-sm whitespace-nowrap text-green-400">
      selesai
    </span>
  );
}

function Data() {
  const start = true;
  const role = authStore((state) => state.role);
  const showModalCreate = serviceModalStore((state) => state.showModalCreate);
  const showModalUpdate = serviceModalStore((state) => state.showModalUpdate);
  const showModalDelete = serviceModalStore((state) => state.showModalDelete);
  const setServiceId = serviceModalStore((state) => state.setServiceId);
  const [services, setServices] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [query, setQuery] = useState("");
  const [byStatus, setByStatus] = useState("");

  useEffect(() => {
    if (start) {
      getServices();
    }
  }, [page, limit, query, byStatus]);

  const getServices = async () => {
    try {
      const response = await ServiceService.getAll(
        query,
        byStatus,
        page,
        limit
      );
      setPage(response.data.page);
      setPages(response.data.totalPage);
      setRows(response.data.totalRows);
      setLimit(response.data.limit);
      setServices(response.data.servicesHandphone);
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
      <h1 className="text-2xl font-semibold">Data Service Hp</h1>
      <hr className="my-2 sm:my-3 md:my-5 lg:my-6 text-slate-200" />
      <div className="w-full grid gap-4 sm:flex sm:items-center justify-between my-4">
        <Button
          icon={<PlusIcon className="size-5 text-white" />}
          label={"Tambah Service"}
          onClick={() => showModalCreate()}
        />
        <section className="grid gap-4 sm:flex sm:gap-8 items-center">
          <Select
            value={byStatus}
            onChange={(e) => setByStatus(e.target.value)}
            option={
              <>
                <option value={true}>Selesai</option>
                <option value={false}>Proses</option>
              </>
            }
            defaultSelect={"Semua"}
            label={"Pilih Status"}
          />

          <Search value={query} onChange={(e) => setQuery(e.target.value)} />
        </section>
      </div>

      <section className="sm:p-4 md:p-5 rounded-2xl border border-slate-200">
        <div className="overflow-x-auto">
          <Table>
            <Thead>
              <Th label={"No."} />
              <Th label={"Nama Klien"} />
              <Th label={"Nama Handphone"} />
              <Th label={"Alamat"} />
              <Th label={"Kendala"} />
              <Th label={"Status"} />
              <Th label={"Total ongkos"} />
              {role === "ADMIN" && <Th />}
            </Thead>
            <Tbody>
              {services?.map((service, index) => {
                return (
                  <tr
                    className="border-b border-slate-300 text-center"
                    key={service.id}
                  >
                    <Td content={index + 1} />
                    <Td content={service.nama_klien} />
                    <Td content={service.nama_handphone} />
                    <Td content={service.alamat} />
                    <Td
                      content={service.detail_service_handphone?.map(
                        (detail) => {
                          return (
                            <p
                              key={detail.id}
                              className="flex items-center gap-3 text-start py-1"
                            >
                              <span className="">
                                {service.status ? (
                                  <CheckCircleIcon className="text-green-400 size-5" />
                                ) : (
                                  <ExclamationCircleIcon className="text-orange-400 size-5" />
                                )}
                              </span>
                              <span>{detail.nama_service}</span>
                            </p>
                          );
                        }
                      )}
                    />
                    <Td content={service.status ? <Ok /> : <Not />} />
                    <Td content={IDRFormat(service.total_ongkos)} />
                    {role === "ADMIN" && (
                      <Td
                        content={
                          <span className="inline-flex divide-x divide-gray-300 overflow-hidden rounded border border-gray-300 bg-white shadow-sm">
                            <button
                              type="button"
                              className="cursor-pointer px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 focus:relative"
                              aria-label="Edit"
                              onClick={() => {
                                setServiceId(service.id);
                                showModalUpdate();
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
                                setServiceId(service.id);
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
