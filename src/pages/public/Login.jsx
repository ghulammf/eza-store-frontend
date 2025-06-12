import { Link } from "react-router-dom";
import ezaLogo from "../../assets/images/eza-store.png";
import Button from "../../components/Button";
import { useState } from "react";
import authStore from "../../store/auth.store";
import toast from "react-hot-toast";
import {
  ArrowRightStartOnRectangleIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import InputPassword from "../../components/input/InputPassword";
import InputAuth from "../../components/input/InputAuth";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const login = authStore((state) => state.login);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img alt="Your Company" src={ezaLogo} className="mx-auto h-40 w-auto" />
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleLogin} className="space-y-6">
          <InputAuth
            label={"username"}
            icon={UserIcon}
            type={"text"}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputPassword
            label={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex w-full justify-center">
            <Button
              label={"Login"}
              icon={
                <ArrowRightStartOnRectangleIcon className="size-5 text-white" />
              }
            />
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Haven't an account?{" "}
          <Link to={"/auth/register"}>
            <span className="font-semibold text-indigo-600 hover:text-indigo-500">
              Register
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
