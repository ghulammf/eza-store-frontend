import { TrashIcon } from "@heroicons/react/20/solid";
import serviceListMenu from "../../../store/serviceList.store";
import { CheckIcon } from "@heroicons/react/24/outline";

function ListMenu() {
  const menus = serviceListMenu((state) => state.menus);
  const removeMenu = serviceListMenu((state) => state.removeMenu);

  if (menus.length === 0)
    return (
      <p className="border border-dashed border-gray-500 text-gray-500 rounded-lg text-center h-[150px] content-center">
        Silahkan pilih service
      </p>
    );

  return (
    <div className="border border-gray-300 rounded-xl h-[150px] p-2 overflow-auto">
      <ul className="grid gap-1">
        {menus.map((menu) => {
          return (
            <li
              key={menu.serviceMenu.id}
              className="flex justify-between items-center gap-1 p-2 px-4 shadow-sm rounded-md"
            >
              {/* <CheckIcon className="text-green-500 size-4" /> */}
              <span>{menu.serviceMenu.nama_service}</span>
              <TrashIcon
                className="text-orange-300 size-5 cursor-pointer"
                onClick={() => {
                  removeMenu(menu.serviceMenu.id);
                }}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ListMenu;
