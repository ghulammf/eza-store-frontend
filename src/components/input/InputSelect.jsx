function Select({
  value,
  onChange,
  option,
  label,
  defaultSelect,
  onClick = null,
}) {
  return (
    <section className="relative min-w-[120px] max-w-[150px]">
      <select
        className="peer relative h-10 w-full appearance-none rounded border border-slate-200 bg-white px-4 text-sm text-slate-500 outline-none transition-all autofill:bg-white focus:border-[#002696] focus-visible:outline-none focus:focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
        value={value}
        onChange={onChange}
        onClick={onClick}
      >
        <option value="">{defaultSelect}</option>
        {option}
      </select>
      <label
        htmlFor="id-04"
        className="bg-red-300 pointer-events-none absolute top-2.5 left-2 z-[1] px-2 text-sm text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-valid:-top-2 peer-valid:text-xs peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#002696] peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
      >
        {label}
      </label>
    </section>
  );
}

export default Select;
