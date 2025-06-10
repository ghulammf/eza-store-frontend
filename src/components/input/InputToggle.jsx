const ToggleInput = ({ value, onClick, labelTrue, labelFalse }) => {
  return (
    <span className="flex items-center justify-center gap-3">
      <button
        type="button"
        onClick={onClick}
        value={value}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
          value ? "bg-green-500" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
            value ? "translate-x-6" : "translate-x-1"
          }`}
        ></span>
      </button>
      {value ? (
        <span className="text-sm text-green-400">{labelTrue}</span>
      ) : (
        <span className="text-sm text-amber-400">{labelFalse}</span>
      )}
    </span>
  );
};

export default ToggleInput;
