import { UserIcon } from "@heroicons/react/20/solid";

function Button({ label, onClick = null, disabled = false }) {
  return (
    <button
      className="cursor-pointer inline-block rounded-sm border border-indigo-600 bg-indigo-600 h-fit px-7 py-2.5 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:ring-3 focus:outline-hidden"
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

function Button2({ label, icon, onClick = null, disabled = false }) {
  return (
    <>
      <button
        className=" cursor-pointer inline-flex h-10 w-fit items-center justify-center gap-2 whitespace-nowrap rounded-md bg-indigo-500 px-5 text-sm font-medium tracking-wide text-white hover:bg-indigo-600 transition duration-300  hover:shadow-xl focus:bg-indigo-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-slate-300-300 disabled:bg-slate-300 disabled:shadow-none"
        onClick={onClick}
        disabled={disabled}
      >
        <span className="order-2">{label}</span>
        <span className="relative only:-mx-5">{icon}</span>
      </button>
    </>
  );
}

export default Button2;
