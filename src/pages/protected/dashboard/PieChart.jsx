import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import TransaksiService from "../../../services/transaksi.service";
import { Doughnut } from "react-chartjs-2";
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

function PieChart() {
  const start = true;
  const [data, setData] = useState([]);

  useEffect(() => {
    if (start) {
      getData();
    }
  }, []);

  const getData = async () => {
    try {
      const response = await TransaksiService.getHistory("", "", "tahunan", "");
      setData(response.data.dataProduk);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const pieCount = {
    "Handphone Baru": 0,
    "Handphone Seken": 0,
    Aksesoris: 0,
  };

  data?.map((item) => {
    const kategori = item.kategori;
    const kondisi = item.kondisi;
    if (kategori == "Handphone") {
      if (kondisi == "baru") pieCount["Handphone Baru"] += item.jumlah;
      else if (kondisi == "seken") pieCount["Handphone Seken"] += item.jumlah;
    } else if (kategori === "Aksesoris") {
      pieCount["Aksesoris"] += item.jumlah;
    }
  });

  const pieData = {
    labels: Object.keys(pieCount),
    datasets: [
      {
        data: Object.values(pieCount),
        backgroundColor: ["#04448c", "#3071ba", "#a5c8f0"],
        hoverOffset: 4,
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-lg">
      <h2 className="text-lg text-center font-semibold mb-4">Produk Terjual</h2>
      <Doughnut data={pieData} />
    </div>
  );
}

export default PieChart;
