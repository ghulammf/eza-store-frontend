import { useState } from "react";
import ezaLogo from "../assets/images/eza-store.png";
import { Link } from "react-router-dom";
import authStore from "../store/auth.store";
import toast from "react-hot-toast";
import {
  HomeIcon,
  QueueListIcon,
  WrenchScrewdriverIcon,
  ShoppingBagIcon,
  UsersIcon,
  ArrowLeftStartOnRectangleIcon,
  ChartBarSquareIcon,
  ClipboardDocumentListIcon,
  ClipboardDocumentCheckIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";

function Logo() {
  const username = authStore((state) => state.username);
  const role = authStore((state) => state.role);
  return (
    <div className="flex flex-col items-center gap-4 border-b border-slate-200 p-6">
      <div className="shrink-0">
        <span className="relative flex h-20 w-20 items-center justify-center rounded-full text-white">
          <img
            src={ezaLogo}
            alt="user name"
            title="user name"
            width="100"
            height="100"
            className="max-w-full rounded-full"
          />
          <span className="absolute bottom-0 right-0 inline-flex items-center justify-center gap-1 rounded-full border-2 border-white bg-emerald-500 p-1 text-sm text-white">
            <span className="sr-only"> online </span>
          </span>
        </span>
      </div>
      <div className="flex min-h-[2rem] w-full min-w-0 flex-col items-start justify-center gap-0 text-center">
        <h4 className="w-full truncate text-base text-slate-700">{username}</h4>
        <p className="w-full truncate text-sm text-slate-500">{role}</p>
      </div>
    </div>
  );
}

function Menu({ icon: Icon, label }) {
  return (
    <li className="px-7">
      <span className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-slate-100 hover:text-black focus:bg-slate-50 aria-[current=page]:bg-slate-100 aria-[current=page]:text-[#002696] ">
        <div className="flex items-center self-center">
          <Icon className="text-gray-800 size-5 md:size-6" />
        </div>
        <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm md:text-md font-medium">
          {label}
        </div>
      </span>
    </li>
  );
}

function Sidebar() {
  const [isSideOpen, setIsSideOpen] = useState(false);
  const role = authStore((state) => state.role);
  const logout = authStore((state) => state.logout);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      {/*  <!-- Component: Side navigation menu with user profile and alert message --> */}
      {/*  <!-- Mobile trigger --> */}
      <button
        title="Side navigation"
        type="button"
        className={`visible border fixed left-6 top-6 z-40 order-10 block h-10 w-10 self-center rounded bg-white opacity-100 lg:hidden ${
          isSideOpen
            ? "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(3)]:w-0 [&_span:nth-child(2)]:-rotate-45 "
            : ""
        }`}
        aria-haspopup="menu"
        aria-label="Side navigation"
        aria-expanded={isSideOpen ? " true" : "false"}
        aria-controls="nav-menu-4"
        onClick={() => setIsSideOpen(!isSideOpen)}
      >
        <div className="absolute top-1/2 left-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform">
          <span
            aria-hidden="true"
            className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-700 transition-all duration-300"
          ></span>
          <span
            aria-hidden="true"
            className="absolute block h-0.5 w-6 transform rounded-full bg-slate-900 transition duration-300"
          ></span>
          <span
            aria-hidden="true"
            className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
          ></span>
        </div>
      </button>

      {/*  <!-- Side Navigation --> */}
      <aside
        id="nav-menu-4"
        aria-label="Side navigation"
        className={`h-screen absolute lg:sticky top-0 bottom-0 left-0 z-40 min-w-72  max-w-72 shadow-lg bg-white transition-transform lg:translate-x-0 ${
          isSideOpen ? "translate-x-0" : " -translate-x-full"
        }`}
      >
        <div className="flex flex-col">
          <Logo />
          <nav
            aria-label="side navigation"
            className="flex-1 divide-y divide-slate-100 overflow-auto"
          >
            <div>
              <ul className="flex flex-1 flex-col gap-1 py-3">
                {/* dash */}

                <Link to={role === "ADMIN" ? "/admin/dashboard" : "/dashboard"}>
                  <Menu icon={HomeIcon} label={"Dashboard"} />
                </Link>
                <Link to={role === "ADMIN" ? "/admin/products" : "/products"}>
                  <Menu icon={QueueListIcon} label={"Produk"} />
                </Link>
                <Link to={role === "ADMIN" ? "/admin/services" : "/services"}>
                  <Menu icon={WrenchScrewdriverIcon} label={"Service Hp"} />
                </Link>
                <Link
                  to={
                    role === "ADMIN"
                      ? "/admin/services/phones/menu"
                      : "/services/phones/menu"
                  }
                >
                  <Menu
                    icon={DevicePhoneMobileIcon}
                    label={"Service Hp Menu"}
                  />
                </Link>
                <Link
                  to={
                    role === "ADMIN" ? "/admin/transactions" : "/transactions"
                  }
                >
                  <Menu icon={ShoppingBagIcon} label={"Transaksi"} />
                </Link>
                {role == "ADMIN" ? (
                  <Link to="/admin/users">
                    <Menu icon={UsersIcon} label={"Karyawan"} />
                  </Link>
                ) : (
                  ""
                )}
                <div className="mt-2">
                  <section className="relative flex justify-center w-full h-[0.3px] bg-slate-200">
                    <span className="absolute top-[-14px]  text-gray-300">
                      Statistik
                    </span>
                  </section>
                  <section className="relative top-2">
                    <Link
                      to={
                        role === "ADMIN" ? "/admin/bestselling" : "/bestselling"
                      }
                    >
                      <Menu
                        icon={ChartBarSquareIcon}
                        label={"Penjualan Terlaris"}
                      />
                    </Link>
                    <Link
                      to={
                        role === "ADMIN" ? "/admin/sellhistory" : "/sellhistory"
                      }
                    >
                      <Menu
                        icon={ClipboardDocumentListIcon}
                        label={"Laporan Penjualan"}
                      />
                    </Link>
                    <Link
                      to={
                        role === "ADMIN"
                          ? "/admin/servicehistory"
                          : "/servicehistory"
                      }
                    >
                      <Menu
                        icon={ClipboardDocumentCheckIcon}
                        label={"Laporan Service Hp"}
                      />
                    </Link>
                  </section>
                </div>
              </ul>
            </div>
          </nav>
          <footer className="border-t border-slate-200 p-3">
            <span
              className="flex items-center gap-3 rounded p-3 px-7 text-slate-900 transition-colors hover:text-[#002696] cursor-pointer"
              onClick={handleLogout}
            >
              <div className="flex items-center self-center ">
                <ArrowLeftStartOnRectangleIcon className="size-6 text-black" />
              </div>
              <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm font-medium">
                Logout
              </div>
            </span>
          </footer>
        </div>
      </aside>

      {/*  <!-- Backdrop --> */}
      <div
        className={`w-full fixed top-0 bottom-0 left-0 right-0 z-30 bg-slate-900/20 transition-colors ${
          isSideOpen ? "block" : "hidden"
        }`}
        onClick={() => setIsSideOpen(false)}
      >
        ssds
      </div>
      {/*  <!-- End Side navigation menu with user profile and alert message --> */}
    </>
  );
}

export default Sidebar;
