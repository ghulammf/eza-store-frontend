import { Navigate } from "react-router-dom";
import authStore from "../store/auth.store";

const PublicRoute = ({ component: Component }) => {
  const role = authStore((state) => state.role);
  const accessToken = authStore((state) => state.accessToken);

  if (accessToken) {
    if (role === "ADMIN") {
      return <Navigate to={"/admin/dashboard"} replace />;
    } else if (role === "KARYAWAN") {
      return <Navigate to={"/dashboard"} replace />;
    }
  } else {
    return <Component />;
  }
  //return isAuth ? <Navigate to={"/dashboard"} replace /> : <Component />;
};

export default PublicRoute;
