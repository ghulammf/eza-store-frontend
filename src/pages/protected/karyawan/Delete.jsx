import toast from "react-hot-toast";
import karyawanModalStore from "./karyawan.store";
import KaryawanService from "../../../services/karyawan.service";
import { TrashIcon } from "@heroicons/react/24/outline";

const Delete = () => {
  const modalDelete = karyawanModalStore((state) => state.modalDelete);
  const hideModalDelete = karyawanModalStore((state) => state.hideModalDelete);
  const userDelete = karyawanModalStore((state) => state.userDelete);

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const response = await KaryawanService.delete(userDelete);
      hideModalDelete();
      location.reload();
      toast.success(response.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="relative flex justify-center ">
      {modalDelete && (
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

            <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-center align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
              <section className="flex justify-center my-4">
                <TrashIcon className="size-8 stroke-amber-700" />
              </section>

              <h3
                className="text-center text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white"
                id="modal-title"
              >
                Delete Karyawan?
              </h3>

              <form className="mt-4" action="#">
                <p>Data Karyawan akan dihapus secara permanen!</p>
                <div className="mt-14 sm:flex sm:items-center sm:-mx-2">
                  <button
                    type="button"
                    onClick={() => hideModalDelete()}
                    className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40 cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-red-500 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-40 cursor-pointer"
                    onClick={handleDelete}
                  >
                    Delete
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

export default Delete;
