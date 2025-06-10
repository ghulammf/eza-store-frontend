import { KeyIcon } from "@heroicons/react/20/solid";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

function InputPassword({ label, value, onChange }) {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <label className="block text-sm/6 font-medium text-gray-900">
        {label}
      </label>
      <div className="mt-2 relative">
        <KeyIcon className="absolute top-2 left-3 size-5 text-slate-300" />
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          className="block w-full rounded-md bg-white px-3 ps-11 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        />
        {showPassword ? (
          <EyeSlashIcon
            className="absolute top-2 right-3 size-5 text-slate-400"
            onClick={handleShowPassword}
          />
        ) : (
          <EyeIcon
            className="absolute right-3 top-2 size-5 text-slate-400"
            onClick={handleShowPassword}
          />
        )}
      </div>
    </div>
  );
}

export default InputPassword;
