import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import TransaksiService from "../../../services/transaksi.service";
import toast from "react-hot-toast";
import { format } from "date-fns";
import ServiceService from "../../../services/service.service";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  const start = true;
  const [dataProduk, setDataProduk] = useState([]);
  const [dataService, setDataService] = useState([]);

  // Fungsi untuk konversi ke format bulan-tahun (e.g., "Mei 2025")
  //   const formatBulanTahun = (tanggalStr) => {
  //     const bulanIndo = [
  //       "Januari",
  //       "Februari",
  //       "Maret",
  //       "April",
  //       "Mei",
  //       "Juni",
  //       "Juli",
  //       "Agustus",
  //       "September",
  //       "Oktober",
  //       "November",
  //       "Desember",
  //     ];
  //     const date = new Date(tanggalStr);
  //     return `${bulanIndo[date.getMonth()]} ${date.getFullYear()}`;
  //   };

  const date = "2025-05-01T02:40:27.163Z";
  const startDate = new Date(date).toISOString().split("T")[0];
  const endDate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (start) {
      getDataProduk();
      getDataService();
    }
  }, []);

  const getDataProduk = async () => {
    try {
      const response = await TransaksiService.getHistory("", "", "tahunan", "");
      setDataProduk(response.data.dataProduk);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const getDataService = async () => {
    try {
      const response = await ServiceService.getHistory("tahunan", "");
      setDataService(response.data.dataService);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const monthCountProduk = {};
  const monthCountService = {};

  dataProduk.map((produk) => {
    const month = new Date(produk.createdAt).toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
    monthCountProduk[month] =
      (monthCountProduk[month] || 0) + produk.keuntungan;
    //produk.reduce((sum, item) => sum + item.jumlah, 0);
  });

  dataService.map((service) => {
    const month = new Date(service.createdAt).toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
    monthCountService[month] =
      (monthCountService[month] || 0) + service.total_ongkos;
  });

  const lineData = {
    labels: Object.keys(monthCountService),
    datasets: [
      {
        label: "Total Pendapatan Produk",
        data: Object.values(monthCountProduk),
        borderColor: "rgb(59,130,246)", // blue-500
        backgroundColor: "rgba(59,130,246,0.2)",
        tension: 0.4,
      },
      {
        label: "Total Pendapatan Service",
        data: Object.values(monthCountService),
        borderColor: "rgb(34,197,94)", // green-500
        backgroundColor: "rgba(34,197,94,0.2)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="bg-white p-[5%] sm:p-[3%] rounded-2xl shadow-lg overflow-auto h-[300px] sm:h-full">
      <h1 className="text-lg text-center font-semibold mb-4">
        Laporan Pendapatan Bulanan
      </h1>
      <Line className="w-[300px] sm:h-full overflow-auto" data={lineData} />
    </div>
  );
};

export default LineChart;
