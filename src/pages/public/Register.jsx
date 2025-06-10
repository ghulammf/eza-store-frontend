import { Link, useNavigate } from "react-router-dom";
import ezaLogo from "../../assets/images/eza-store.png";
import Button from "../../components/Button";
import { useState } from "react";
import toast from "react-hot-toast";
import AuthService from "../../services/auth.service";
import {
  EnvelopeIcon,
  UserIcon,
  UserPlusIcon,
} from "@heroicons/react/20/solid";
import InputPassword from "../../components/input/InputPassword";
import InputAuth from "../../components/input/InputAuth";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await AuthService.register(
        username,
        email,
        password,
        confirmPassword
      );
      toast.success(response.message);
      navigate("/auth/login");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src={ezaLogo}
          //src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-40 w-auto"
        />
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleRegister} className="space-y-6">
          <InputAuth
            label={"username"}
            icon={UserIcon}
            type={"text"}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputAuth
            label={"email"}
            icon={EnvelopeIcon}
            type={"email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputPassword
            label={"password"}
            type={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputPassword
            label={"password"}
            type={"password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div className="flex w-full justify-center">
            <Button
              label={"Register"}
              icon={<UserPlusIcon className="size-5 text-white" />}
            />
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Have an account?{" "}
          <Link to={"/auth/login"}>
            <span className="font-semibold text-indigo-600 hover:text-indigo-500">
              Login
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
