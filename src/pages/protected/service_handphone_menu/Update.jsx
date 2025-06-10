import { useState } from "react";
import toast from "react-hot-toast";
import ServiceHandponeMenuServices from "../../../services/service_handphone_menu.service";
import serviceMenuModalStore from "./serviceMenu.store";
import InputText from "../../../components/input/InputText";

const Update = () => {
  const modalUpdate = serviceMenuModalStore((state) => state.modalUpdate);
  const hideModalUpdate = serviceMenuModalStore(
    (state) => state.hideModalUpdate
  );
  const serviceMenuId = serviceMenuModalStore((state) => state.serviceMenuId);
  const clearServiceMenuId = serviceMenuModalStore(
    (state) => state.clearServiceMenuId
  );
  const [nama_service, setNama_service] = useState("");
  const [ongkos, setOngkos] = useState(0);

  const clearData = () => {
    setNama_service("");
    setOngkos(0);
  };

  const getServiceHandponeMenu = async () => {
    try {
      const response = await ServiceHandponeMenuServices.getItem(serviceMenuId);
      setNama_service(response.data.nama_service);
      setOngkos(response.data.ongkos);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nama_service", nama_service);
    formData.append("ongkos", ongkos);
    try {
      const response = await ServiceHandponeMenuServices.update(
        serviceMenuId,
        formData
      );
      clearData();
      clearServiceMenuId();
      hideModalUpdate();
      toast.success(response.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="relative flex justify-center ">
      {modalUpdate && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-gray-300/75 "
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen px-7 pt-4 pb-20 text-center sm:block sm:p-0">
            <span
              className="hidden sm:inline-block sm:h-screen sm:align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="w-full relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
              <div className="flex justify-between">
                <h3
                  className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white"
                  id="modal-title"
                >
                  Update Service Menu
                </h3>

                <button
                  className="text-[10px] p-1 hover:bg-green-500 cursor-pointer rounded-md shadow-sm bg-green-100"
                  onClick={getServiceHandponeMenu}
                >
                  tampilkan data
                </button>
              </div>
              <form className="mt-4" action="#">
                <InputText
                  label={"Nama Service"}
                  type={"text"}
                  value={nama_service}
                  onChange={(e) => setNama_service(e.target.value)}
                  placeholder={"nama service"}
                  text={"Type Service Name"}
                />
                <InputText
                  label={"Ongkos"}
                  type={"number"}
                  value={ongkos}
                  onChange={(e) => setOngkos(e.target.value)}
                  placeholder={"ongkos"}
                  text={"Type the price"}
                />

                <div className="mt-14 sm:flex sm:items-center sm:-mx-2">
                  <button
                    type="button"
                    onClick={() => {
                      clearData();
                      clearServiceMenuId();
                      hideModalUpdate();
                    }}
                    className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40 cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-amber-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-amber-500 focus:outline-none focus:ring focus:ring-amber-300 focus:ring-opacity-40 cursor-pointer"
                    onClick={handleUpdate}
                  >
                    Update
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

export default Update;
