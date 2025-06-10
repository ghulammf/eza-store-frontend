import Main from "../../../layouts/Main";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import PieChart from "./PieChart";

function Dashboard() {
  return (
    <Main>
      <div className="bg-gray-50 p-7 overflow-hidden">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Dashboard Penjualan
        </h1>

        <div className="p-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <PieChart />
          <BarChart />
        </div>
        <LineChart />
      </div>
    </Main>
  );
}

export default Dashboard;
