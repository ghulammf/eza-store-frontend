import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import TransaksiService from "../../../services/transaksi.service";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import Main from "../../../layouts/Main";
import jsPDF from "jspdf";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import Button2 from "../../../components/Button";
import autoTable from "jspdf-autotable";
import Select from "../../../components/input/InputSelect";
import DateInput from "../../../components/input/InputDate";
import IDRFormat from "../../../utils/IDR-format";
import KategoriService from "../../../services/kategori.service";

function Table() {
  const start = true;
  const [kategori, setKategori] = useState("");
  const [kondisi, setKondisi] = useState("");
  const [rentang, setRentang] = useState("");
  const [inputDate, setInputDate] = useState("");
  const [data, setData] = useState([]);
  const [dataProduk, setDataProduk] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (start) {
      getData();
    }
  }, [kondisi, kategori, rentang, inputDate]);

  const getData = async () => {
    try {
      const response = await TransaksiService.getHistory(
        kategori,
        kondisi,
        rentang,
        inputDate
      );
      setData(response.data);
      setDataProduk(response.data.dataProduk);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const getCategories = async () => {
    try {
      const response = await KategoriService.getAll();
      setCategories(response.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();

    // Judul
    doc.setFontSize(18);
    doc.text(
      `Riwayat Transaksi ${getFormatTanggal(data.rentang, data.inputDate)}`,
      14,
      16
    );

    // Ringkasan Transaksi
    doc.setFontSize(12);
    let yOffset = 30;
    doc.text(
      `Kategori: ${kategori == "" ? "Semua kategori" : kategori}`,
      14,
      yOffset
    );
    doc.text(
      `Kondisi: ${kondisi == "" ? "Semua kondisi" : kondisi}`,
      14,
      yOffset + 10
    );
    doc.text(
      `Periode: ${rentang == "" ? "Harian" : rentang}`,
      14,
      yOffset + 20
    );
    doc.text(
      `Tanggal: ${getFormatTanggal(data.rentang, data.inputDate)}`,
      14,
      yOffset + 30
    );

    yOffset += 40;

    doc.text(`Total Produk Terjual: ${data.summary.totalTerjual}`, 14, yOffset);
    doc.text(
      `Total Harga Beli: ${IDRFormat(data.summary.totalHargaBeli)}`,
      14,
      yOffset + 10
    );
    doc.text(
      `Total Harga Jual: ${IDRFormat(data.summary.totalHargaJual)}`,
      14,
      yOffset + 20
    );
    doc.text(
      `Total Keuntungan: ${IDRFormat(data.summary.totalKeuntungan)}`,
      14,
      yOffset + 30
    );

    // Data Transaksi
    yOffset += 50;
    autoTable(doc, {
      head: [
        [
          "Nama Produk",
          "Jumlah",
          "Harga Beli",
          "Harga Jual",
          "Keuntungan",
          "Tanggal Transaksi",
        ],
      ],
      body: data.dataProduk.map((item) => [
        item.nama_produk,
        item.jumlah,
        IDRFormat(item.harga_beli),
        IDRFormat(item.harga_jual),
        IDRFormat(item.keuntungan),
        new Date(item.createdAt).toLocaleString(),
      ]),
      startY: yOffset,
    });

    // Menyimpan PDF
    doc.save("riwayat_transaksi.pdf");
  };

  function getFormatTanggal(rentang, inputDate) {
    let formatTanggal = "";
    if (rentang == "harian") {
      formatTanggal = format(inputDate, "dd-MMM-yyyy");
    } else if (rentang == "bulanan") {
      formatTanggal = format(inputDate, "MMM-yyyy");
    } else if (rentang == "tahunan") {
      formatTanggal = format(inputDate, "yyyy");
    }
    return formatTanggal;
  }

  return (
    <div className="w-full bg-white rounded-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Riwayat Transaksi</h1>
      <hr className="my-2 sm:my-3 md:my-5 lg:my-6 text-slate-200" />
      <div className="h-fit grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 items-center py-5 md:gap-4">
        <Select
          value={kategori}
          onChange={(e) => setKategori(e.target.value)}
          onClick={getCategories}
          option={categories.map((item) => {
            return (
              <option key={item.id} value={item.nama_kategori}>
                {item.nama_kategori}
              </option>
            );
          })}
          defaultSelect={"Semua"}
          label={"Pilih Kategori"}
        />
        <Select
          value={kondisi}
          onChange={(e) => setKondisi(e.target.value)}
          option={
            <>
              <option value="baru">Baru</option>
              <option value="seken">Seken</option>
            </>
          }
          defaultSelect={"Semua"}
          label={"Pilih Kondisi"}
        />
        <Select
          value={rentang}
          onChange={(e) => setRentang(e.target.value)}
          option={
            <>
              <option value="harian">Harian</option>
              <option value="bulanan">Bulanan</option>
              <option value="tahunan">Tahunan</option>
            </>
          }
          defaultSelect={"Hari ini"}
          label={"Pilih Periode"}
        />
        <DateInput
          value={inputDate}
          onChange={(e) => setInputDate(e.target.value)}
        />

        {dataProduk.length > 0 && (
          <Button2
            label={"Export PDF"}
            icon={<ArrowUpTrayIcon className="text-white size-5" />}
            onClick={handleExportPDF}
          />
        )}
      </div>

      {data.length !== 0 ? (
        <div className="grid gap-7 bg-white p-[3%] rounded-xl border border-slate-200">
          {/* Summary */}
          <section className="p-3 sm:p-4 md:p-5 rounded-2xl border border-slate-200">
            <h2 className="text-xl font-semibold mb-3">Ringkasan</h2>

            <table className="w:full sm:w-[75%] md:w-1/2">
              <tbody>
                <tr className="h-7">
                  <td className="">Periode</td>
                  <td className="font-medium">
                    : {data.rentang == "" ? "Harian" : data.rentang}
                  </td>
                </tr>
                <tr className="h-7">
                  <td>Tanggal</td>
                  <td className="font-medium">
                    : {getFormatTanggal(data.rentang, data.inputDate)}
                  </td>
                </tr>
                <tr className="h-7">
                  <td>Total Produk Terjual</td>
                  <td className="font-medium">: {data.summary.totalTerjual}</td>
                </tr>
                <tr className="h-7">
                  <td>Total Harga Beli</td>
                  <td className="font-medium">
                    : {IDRFormat(data.summary.totalHargaBeli)}
                  </td>
                </tr>
                <tr className="h-7">
                  <td>Total Harga Jual</td>
                  <td className="font-medium">
                    : {IDRFormat(data.summary.totalHargaJual)}
                  </td>
                </tr>
                <tr className="h-7">
                  <td>Total Keuntungan</td>
                  <td className="font-medium">
                    : {IDRFormat(data.summary.totalKeuntungan)}
                  </td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Detail Data */}

          <section className="p-3 sm:p-4 md:p-5 rounded-2xl border border-slate-300 overflow-auto">
            <h2 className="text-xl font-semibold mb-4">Detail Transaksi</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto rounded-2xl">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="font-medium px-4 py-2">Nama Produk</th>
                    <th className="font-medium px-4 py-2">Jumlah</th>
                    <th className="font-medium px-4 py-2">Harga Beli</th>
                    <th className="font-medium px-4 py-2">Harga Jual</th>
                    <th className="font-medium px-4 py-2">Keuntungan</th>
                    <th className="font-medium px-4 py-2">Tanggal</th>
                  </tr>
                </thead>
                <tbody>
                  {data.dataProduk.length > 0 ? (
                    data.dataProduk.map((item) => (
                      <tr
                        key={item.id}
                        className="border-b-[1px] border-slate-200 text-center"
                      >
                        <td className="px-4 py-2 md:py-3">
                          {item.nama_produk}
                        </td>
                        <td className="px-4 py-2 md:py-3">{item.jumlah}</td>
                        <td className="px-4 py-2 md:py-3">
                          {IDRFormat(item.harga_beli)}
                        </td>
                        <td className="px-4 py-2 md:py-3">
                          {IDRFormat(item.harga_jual)}
                        </td>
                        <td className="px-4 py-2 md:py-3">
                          {IDRFormat(item.keuntungan)}
                        </td>
                        <td className="px-4 py-2 md:py-3">
                          {format(
                            new Date(item.createdAt),
                            "dd MMM yyyy, h:m a"
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center p-4">
                        Tidak ada data transaksi pada{" "}
                        {format(data.inputDate, "dd-MMM-yyy")}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      ) : (
        <p>Tidak ada data</p>
      )}
    </div>
  );
}

function SellHistory() {
  return (
    <Main>
      <Table />
    </Main>
  );
}

export default SellHistory;
