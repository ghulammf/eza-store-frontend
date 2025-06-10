import { Link } from "react-router-dom";
import ezaLogo from "../../assets/images/eza-store.png";
import Button from "../../components/Button";
import {
  UserPlusIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/20/solid";

function Figure() {
  return (
    <figure className="p-6 pb-0">
      <span className="relative inline-flex h-30 w-30 items-center justify-center rounded-full text-white">
        <img
          src={ezaLogo}
          alt="user name"
          title="user name"
          width="200"
          height="200"
          className="max-w-full rounded-full"
        />
      </span>
    </figure>
  );
}

function Label() {
  return (
    <div className="p-6">
      <header className="mb-4">
        <h3 className="text-xl font-medium text-slate-700">Eza Store App</h3>
        <p className=" text-slate-400">---------------------</p>
      </header>
    </div>
  );
}

function Home() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      {/*<!-- Component: User profile card --> */}
      <div className="max-w-[700px] overflow-hidden rounded bg-white text-center text-slate-500 shadow-md shadow-slate-200">
        {/*  <!-- Image --> */}
        <Figure />
        {/*  <!-- Body--> */}
        <Label />
        {/*  <!-- Action base sized with lead icon buttons  --> */}
        <div className="flex justify-end gap-2 p-6 pt-0">
          <Link to={"/auth/register"}>
            <Button
              label="Register"
              icon={<UserPlusIcon className="size-6 text-white" />}
            />
          </Link>
          <Link to={"/auth/login"}>
            <Button
              label="Login"
              icon={
                <ArrowRightStartOnRectangleIcon className="size-6 text-white" />
              }
            />
          </Link>
        </div>
      </div>
      {/*<!-- End User profile card --> */}
    </div>
  );
}

export default Home;
