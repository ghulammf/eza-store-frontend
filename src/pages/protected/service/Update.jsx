import toast from "react-hot-toast";
import ServiceService from "../../../services/service.service";
import serviceModalStore from "./service.store";
import { useState } from "react";
import ToggleInput from "../../../components/input/InputToggle";
import serviceListMenu from "../../../store/serviceList.store";
import ServiceHandponeMenuServices from "../../../services/service_handphone_menu.service";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { PlusCircleIcon, WrenchIcon } from "@heroicons/react/20/solid";
import ListMenu from "./ListMenu";
import InputText from "../../../components/input/InputText";

const Update = () => {
  const modalUpdate = serviceModalStore((state) => state.modalUpdate);
  const hideModalUpdate = serviceModalStore((state) => state.hideModalUpdate);
  const serviceId = serviceModalStore((state) => state.serviceId);
  const clearServiceId = serviceModalStore((state) => state.clearServiceId);

  const addMenu = serviceListMenu((state) => state.addMenu);
  const menus = serviceListMenu((state) => state.menus);
  const resetMenus = serviceListMenu((state) => state.resetMenus);
  const [nama_klien, setNama_klien] = useState("");
  const [nama_handphone, setNama_handphone] = useState("");
  const [alamat, setAlamat] = useState("");
  const [status, setStatus] = useState(false);
  const [servicePhoneMenus, setServicePhoneMenus] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  async function getServicesPhoneMenu() {
    try {
      const response = await ServiceHandponeMenuServices.getAll("", "", "");
      setServicePhoneMenus(response.data.servicesHandphoneMenu);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  const selectedMenuService = menus.map((item) => ({
    serviceHandphoneMenuId: item.serviceMenu.id,
  }));

  const getService = async () => {
    try {
      const response = await ServiceService.getItem(serviceId);
      setNama_klien(response.data.nama_klien);
      setNama_handphone(response.data.nama_handphone);
      setAlamat(response.data.alamat);
      setStatus(response.data.status);
      const detailMenuService = response.data.detail_service_handphone;
      detailMenuService.map((detail) => addMenu(detail.serviceHandphoneMenu));

      // Get Service Menu
      getServicesPhoneMenu();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = {
      nama_klien: nama_klien,
      nama_handphone: nama_handphone,
      alamat: alamat,
      status: status,
      menus: selectedMenuService,
    };

    try {
      const response = await ServiceService.update(serviceId, formData);
      clearData();
      clearServiceId();
      hideModalUpdate();
      toast.success(response.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const clearData = () => {
    setNama_klien("");
    setNama_handphone("");
    setAlamat("");
    setStatus("");
    clearServiceId();
    resetMenus();
    hideModalUpdate();
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
          <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <span
              className="hidden sm:inline-block sm:h-screen sm:align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-900 sm:my-8 w-[90%] lg:max-w-[50%] sm:p-6 sm:align-middle">
              <div className="flex justify-between">
                <h3
                  className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white"
                  id="modal-title"
                >
                  Update service
                </h3>
                <button
                  className="text-[10px] p-1 hover:bg-green-500 cursor-pointer rounded-md shadow-sm bg-green-100"
                  onClick={getService}
                >
                  tampilkan data
                </button>
              </div>

              <form className="mt-4" action="#">
                <section className="sm:grid grid-cols-2 gap-3 mb-5 sm:mb-0">
                  <section>
                    <InputText
                      label={"Nama Klien"}
                      type={"text"}
                      value={nama_klien}
                      onChange={(e) => setNama_klien(e.target.value)}
                      placeholder={"nama klien"}
                      text={"Type client name"}
                    />
                    <InputText
                      label={"Nama Handphone"}
                      type={"text"}
                      value={nama_handphone}
                      onChange={(e) => setNama_handphone(e.target.value)}
                      placeholder={"nama handphone"}
                      text={"Type handphone name"}
                    />
                    <InputText
                      label={"Alamat"}
                      type={"text"}
                      value={alamat}
                      onChange={(e) => setAlamat(e.target.value)}
                      placeholder={"alamat"}
                      text={"Type the address"}
                    />
                  </section>
                  <section className="mt-8">
                    <div className="relative z-10 ">
                      <section
                        className="flex justify-between items-center border border-slate-400 rounded-lg p-1 px-3 cursor-pointer"
                        onClick={() => {
                          getServicesPhoneMenu();
                          setShowMenu(!showMenu);
                        }}
                      >
                        <label className="block mb-1 text-slate-400">
                          Pilih menu service
                        </label>
                        {showMenu ? (
                          <ChevronUpIcon className="text-gray-700 size-4" />
                        ) : (
                          <ChevronDownIcon className="text-gray-700 size-4" />
                        )}
                      </section>

                      {showMenu ? (
                        <ul className="absolute w-full max-h-[250px] bg-white grid gap-1 border border-gray-300 rounded-lg overflow-auto p-3">
                          {servicePhoneMenus?.map((serviceMenu) => (
                            <li
                              key={serviceMenu.id}
                              className="flex justify-between items-center border border-gray-300 rounded-lg p-2 cursor-pointer"
                              onClick={() => {
                                addMenu(serviceMenu);
                                setShowMenu(false);
                              }}
                            >
                              <WrenchIcon className="text-gray-400 size-4" />
                              <span className="ml-2">
                                {serviceMenu.nama_service}
                              </span>
                              <PlusCircleIcon className="text-gray-500 size-5">
                                +
                              </PlusCircleIcon>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        ""
                      )}
                    </div>
                    <ListMenu />
                  </section>
                </section>
                <ToggleInput
                  value={status}
                  onClick={() => setStatus(!status)}
                  labelTrue={"selesai"}
                  labelFalse={"proses"}
                />

                {/* Button Cancel and Submit */}
                <div className="mt-10 sm:flex sm:items-center sm:-mx-2">
                  <button
                    type="button"
                    onClick={clearData}
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
