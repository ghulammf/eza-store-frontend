import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import ReactPaginate from "react-paginate";

function Pagination({ rows, page, pages, onPageChange }) {
  return (
    <div className="grid items-center md:flex md:justify-around md:items-baseline my-4">
      <p className="text-center text-sm sm:text-[1rem]">
        Total Rows: {rows} Page: {rows ? page + 1 : 0} of {pages}
      </p>
      <ReactPaginate
        previousLabel={
          <span className="inline-flex items-center justify-center h-10 gap-4 px-4 text-sm font-medium transition duration-300 focus-visible:outline-none stroke-slate-700 text-slate-700 hover:stroke-emerald-500 hover:text-emerald-500 focus:bg-emerald-50 focus:stroke-emerald-600 focus:text-emerald-600">
            <span className="order-2 md:sr-only">Prev</span>
            <ChevronLeftIcon className="text-gray-700 size-4" />
          </span>
        }
        nextLabel={
          <span className="inline-flex items-center justify-center h-10 gap-4 px-4 text-sm font-medium transition duration-300 focus-visible:outline-none stroke-slate-700 text-slate-700 hover:stroke-emerald-500 hover:text-emerald-500 focus:bg-emerald-50 focus:stroke-emerald-600 focus:text-emerald-600">
            <span className="md:sr-only">Next</span>
            <ChevronRightIcon className="text-gray-700 size-4" />
          </span>
        }
        pageCount={pages}
        onPageChange={onPageChange}
        containerClassName="flex justify-center items-baseline mt-4 space-x-2"
        pageLinkClassName="px-3 py-1 border rounded text-gray-700 hover:bg-blue-600"
        previousLinkClassName="px-3 py-1 border rounded text-gray-700 hover:bg-blue-100"
        nextLinkClassName="px-3 py-1 border rounded text-gray-700 hover:bg-blue-100"
        activeLinkClassName="bg-blue-500 text-white"
        disabledLinkClassName="opacity-50 cursor-not-allowed"
      />
    </div>
  );
}

export default Pagination;
