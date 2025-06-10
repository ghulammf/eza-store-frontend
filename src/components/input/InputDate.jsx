import { CalendarDateRangeIcon } from "@heroicons/react/24/outline";

function DateInput({ value, onChange }) {
  return (
    <>
      <div className="relative my-6">
        <input
          id="id-11"
          type="date"
          name="id-11"
          placeholder="your name"
          value={value}
          className="peer relative h-10 w-full rounded border border-slate-200 px-4 pl-12 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          onChange={onChange}
        />
        <label
          htmlFor="id-11"
          className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-10 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:left-2 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
        >
          Pilih Tanggal
        </label>
        <CalendarDateRangeIcon className="absolute top-2.5 left-4 text-gray-500 size-5 stroke-slate-400 peer-disabled:cursor-not-allowed" />
      </div>
    </>
  );
}

export default DateInput;
