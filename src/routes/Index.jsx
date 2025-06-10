import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../pages/public/Home";
import Register from "../pages/public/Register";
import Login from "../pages/public/Login";
// Dashboard Sources
import Dashboard from "../pages/protected/dashboard/Dashboard";
// Produk Sources
import Produk from "../pages/protected/produk/Produk";
// Service Sources
import Service from "../pages/protected/service/Service";
// Karyawan Sources
import Karyawan from "../pages/protected/karyawan/Karyawan";
// Transaksi Sources
import Transaksi from "../pages/protected/transaksi/Transaksi";
//Statistik Sources
import BestSelling from "../pages/protected/statistik/BestSelling";
import SellHistory from "../pages/protected/statistik/SellHistory";
import ServiceHistory from "../pages/protected/statistik/ServiceHistory";
import ServiceHandphoneMenu from "../pages/protected/service_handphone_menu/ServiceHandphoneMenu";

function AppRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/coba" element={<BestSelling />} />
        {/* ==== Public Routes === */}
        <Route path="/" element={<PublicRoute component={Home} />} />
        <Route
          path="/auth/register"
          element={<PublicRoute component={Register} />}
        />
        <Route path="/auth/login" element={<PublicRoute component={Login} />} />

        {/* Protected Routes */}
        {/* ==== Admin Routes ==== */}
        <Route
          path="/admin/dashboard"
          element={<ProtectedRoute component={Dashboard} />}
        />
        <Route
          path="/admin/users"
          element={<ProtectedRoute component={Karyawan} />}
        />
        <Route
          path="/admin/products"
          element={<ProtectedRoute component={Produk} />}
        />
        <Route
          path="/admin/services"
          element={<ProtectedRoute component={Service} />}
        />
        <Route
          path="/admin/services/phones/menu"
          element={<ProtectedRoute component={ServiceHandphoneMenu} />}
        />
        <Route
          path="/admin/transactions"
          element={<ProtectedRoute component={Transaksi} />}
        />
        <Route
          path="/admin/bestselling"
          element={<ProtectedRoute component={BestSelling} />}
        />
        <Route
          path="/admin/sellhistory"
          element={<ProtectedRoute component={SellHistory} />}
        />
        <Route
          path="/admin/servicehistory"
          element={<ProtectedRoute component={ServiceHistory} />}
        />

        {/* ==== User Routes ==== */}
        <Route
          path="/dashboard"
          element={<ProtectedRoute component={Dashboard} />}
        />
        <Route
          path="/products"
          element={<ProtectedRoute component={Produk} />}
        />
        <Route
          path="/services"
          element={<ProtectedRoute component={Service} />}
        />
        <Route
          path="/services/phones/menu"
          element={<ProtectedRoute component={ServiceHandphoneMenu} />}
        />
        <Route
          path="/transactions"
          element={<ProtectedRoute component={Transaksi} />}
        />
        <Route
          path="/bestselling"
          element={<ProtectedRoute component={BestSelling} />}
        />
        <Route
          path="/sellhistory"
          element={<ProtectedRoute component={SellHistory} />}
        />
        <Route
          path="/servicehistory"
          element={<ProtectedRoute component={ServiceHistory} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoute;
