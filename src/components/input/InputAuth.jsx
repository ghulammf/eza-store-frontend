function InputAuth({ label, icon: Icon, type, value, onChange }) {
  return (
    <div>
      <label className="block text-sm/6 font-medium text-gray-900">
        {label}
      </label>
      <div className="relative mt-2">
        <Icon className="absolute top-2 left-3 size-5 text-slate-300" />
        <input
          type={type}
          value={value}
          onChange={onChange}
          className="block w-full rounded-md bg-white px-3 ps-11 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        />
      </div>
    </div>
  );
}

export default InputAuth;
