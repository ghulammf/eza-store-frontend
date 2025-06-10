import { Navigate } from "react-router-dom";
import authStore from "../store/auth.store";

function ProtectedRoute({ component: Component }) {
  const role = authStore((state) => state.role);
  const logout = authStore((state) => state.logout);

  const accessToken = authStore((state) => state.accessToken);

  if (accessToken) {
    if (role === "ADMIN") {
      return <Component />;
    } else if (role === "KARYAWAN") {
      return <Component />;
    } else {
      logout();
      return <Navigate to={"/"} replace />;
    }
  } else {
    logout();
    return <Navigate to={"/"} replace />;
  }
}

export default ProtectedRoute;
