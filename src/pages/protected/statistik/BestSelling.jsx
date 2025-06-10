import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import TransaksiService from "../../../services/transaksi.service";
import toast from "react-hot-toast";
import Main from "../../../layouts/Main";
import Button2 from "../../../components/Button";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import Select from "../../../components/input/InputSelect";
import KategoriService from "../../../services/kategori.service";
import Table from "../../../components/table/Table";
import Thead from "../../../components/table/Thead";
import Td from "../../../components/table/Td";
import Th from "../../../components/table/Th";
import Tbody from "../../../components/table/Tbody";
import IDRFormat from "../../../utils/IDR-format";

const Data = () => {
  const [data, setData] = useState([]);
  const [rentang, setRentang] = useState("");
  const [kategori, setKategori] = useState("");
  const [kondisi, setKondisi] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const response = await KategoriService.getAll();
      setCategories(response.data);
    } catch (error) {
      error(error.response.data.message);
    }
  };

  const getData = async () => {
    try {
      setLoading(true);
      const response = await TransaksiService.getBestSelling(
        kategori,
        kondisi,
        rentang
      );
      setData(response.data.dataProduk);
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [rentang, kategori, kondisi]);

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text(`Laporan Produk Terlaris (${rentang})`, 14, 15);

    autoTable(doc, {
      startY: 25,
      head: [
        [
          "Produk ID",
          "Nama Produk",
          "Kategori",
          "Kondisi",
          "Jumlah Terjual",
          "Keuntungan",
        ],
      ],
      body: data.map((item) => [
        item.produkId,
        item.nama_produk,
        item.kategori,
        item.kondisi,
        item._sum.jumlah,
        `Rp ${item._sum.keuntungan.toLocaleString("id-ID")}`,
      ]),
    });

    doc.save(`laporan-terlaris-${rentang}.pdf`);
  };

  return (
    <div className="w-full bg-white rounded-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Laporan Produk Terlaris</h1>
      <hr className="my-2 sm:my-3 md:my-5 lg:my-6 text-slate-200" />
      <div className=" h-fit grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 items-center py-5 md:gap-4">
        <Select
          value={kategori}
          onChange={(e) => setKategori(e.target.value)}
          onClick={getCategories}
          defaultSelect={"Semua"}
          option={categories.map((item) => {
            return (
              <option key={item.id} value={item.nama_kategori}>
                {item.nama_kategori}
              </option>
            );
          })}
          label={"Pilih Kategori"}
        />

        <Select
          value={kondisi}
          onChange={(e) => setKondisi(e.target.value)}
          defaultSelect={"Semua"}
          option={
            <>
              <option value="baru">Baru</option>
              <option value="seken">Seken</option>
            </>
          }
          label={"Pilih Kondisi"}
        />

        <Select
          value={rentang}
          onChange={(e) => setRentang(e.target.value)}
          defaultSelect={"Hari ini"}
          option={
            <>
              <option value="harian">Harian</option>
              <option value="bulanan">Bulanan</option>
              <option value="tahunan">Tahunan</option>
            </>
          }
          label={"Pilih Periode"}
        />
        {/* <input type="date" /> */}
        {data.length > 0 && (
          <Button2
            label={"Export PDF"}
            icon={<ArrowUpTrayIcon className="text-white size-5" />}
            onClick={exportPDF}
          />
        )}
      </div>

      {loading ? (
        <p>Loading data...</p>
      ) : (
        <div className="overflow-auto">
          <Table>
            <Thead>
              <Th label={"Produk ID"} />
              <Th label={"Nama"} />
              <Th label={"Kategori"} />
              <Th label={"kondisi"} />
              <Th label={"Jumlah Terjual"} />
              <Th label={"Keuntungan"} />
            </Thead>
            <Tbody>
              {Array.isArray(data) && data.length > 0 ? (
                data.map((item) => (
                  <tr
                    key={item.produkId}
                    className="border-b-[1px] border-slate-200 text-center"
                  >
                    <Td content={item.produkId} />
                    <Td content={item.nama_produk} />
                    <Td content={item.kategori} />
                    <Td content={item.kondisi} />
                    <Td content={item._sum.jumlah} />
                    <Td content={IDRFormat(item._sum.keuntungan)} />
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center p-4">
                    Tidak ada data Transaksi hari ini
                  </td>
                </tr>
              )}
            </Tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

function BestSelling() {
  return (
    <Main>
      <Data />
    </Main>
  );
}

export default BestSelling;
