import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import TransaksiService from "../../../services/transaksi.service";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

function BarChart() {
  const start = true;
  const [data, setData] = useState([]);

  useEffect(() => {
    if (start) {
      getData();
    }
  }, []);

  const getData = async () => {
    try {
      //const response = await TransaksiService.getAll();
      const response = await TransaksiService.getHistory("", "", "tahunan", "");
      setData(response.data.dataProduk);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const monthCount = {};

  data.map((produk) => {
    const month = new Date(produk.createdAt).toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
    monthCount[month] = (monthCount[month] || 0) + produk.jumlah;
    //produk.reduce((sum, item) => sum + item.jumlah, 0);
  });

  const barData = {
    labels: Object.keys(monthCount),
    datasets: [
      {
        label: "Jumlah Produk Terjual",
        data: Object.values(monthCount),
        backgroundColor: "#6366f1",
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-lg text-center font-semibold mb-4">
        Jumlah Penjualan per Bulan
      </h2>
      <Bar data={barData} />
    </div>
  );
}

export default BarChart;
