import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function Search({ value, onChange }) {
  return (
    <div className="relative">
      <input
        id="id-s03"
        type="search"
        value={value}
        onChange={onChange}
        name="id-s03"
        placeholder="Search here"
        aria-label="Search content"
        className="relative max-w-md h-10 px-8 pr-12 text-sm transition-all border rounded outline-none focus-visible:outline-none peer border-slate-200 text-slate-500 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-gray-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
      />
      <MagnifyingGlassIcon className="absolute top-2.5 left-2 size-5 cursor-pointer stroke-slate-400 peer-disabled:cursor-not-allowed" />
    </div>
  );
}

export default Search;
