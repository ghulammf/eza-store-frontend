import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import KaryawanService from "../../../services/karyawan.service";
import toast from "react-hot-toast";
import karyawanModalStore from "./karyawan.store";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Search from "../../../components/input/InputSearch";
import Thead from "../../../components/table/Thead";
import Tbody from "../../../components/table/Tbody";
import Th from "../../../components/table/Th";
import Td from "../../../components/table/Td";
import Table from "../../../components/table/Table";
import Pagination from "../../../components/Pagination";

function Data() {
  const start = true;
  const showModalDelete = karyawanModalStore((state) => state.showModalDelete);
  const setUserDelete = karyawanModalStore((state) => state.setUserDelete);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (start) {
      getUsers();
    }
  }, [page, query]);

  const getUsers = async () => {
    try {
      const response = await KaryawanService.getAll(query, page, limit);
      setUsers(response.data.users);
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
      <h1 className="font-semibold text-2xl">Data Karyawan</h1>
      <hr className="my-2 sm:my-3 md:my-5 lg:my-6 text-slate-200" />
      <div className="w-full sm:flex sm:items-center justify-end my-4">
        <Search value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>

      <section className="sm:p-4 md:p-5 rounded-2xl border border-slate-200">
        <div className="overflow-x-auto">
          <Table>
            <Thead>
              <Th label={"No."} />
              <Th label={"Nama "} />
              <Th label={"Email"} />
              <Th />
            </Thead>
            <Tbody>
              {users.map((user, index) => {
                return (
                  <tr
                    className="border-b-[1px] border-slate-200 text-center"
                    key={user.username}
                  >
                    <Td content={index + 1} />
                    <Td content={user.username} />
                    <Td content={user.email} />
                    <Td
                      content={
                        <span className="inline-flex divide-x divide-gray-300 overflow-hidden rounded border border-gray-300 bg-white shadow-sm">
                          <button
                            type="button"
                            className="cursor-pointer px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 focus:relative"
                            aria-label="Delete"
                            onClick={() => {
                              showModalDelete();
                              setUserDelete(user.username);
                            }}
                          >
                            <TrashIcon className="text-gray-700 size-4" />
                          </button>
                        </span>
                      }
                    />
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
