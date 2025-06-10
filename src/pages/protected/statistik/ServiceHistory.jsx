import toast from "react-hot-toast";
import Main from "../../../layouts/Main";
import ServiceService from "../../../services/service.service";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Button2 from "../../../components/Button";
import { format } from "date-fns";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import DateInput from "../../../components/input/InputDate";
import Select from "../../../components/input/InputSelect";
import IDRFormat from "../../../utils/IDR-format";

function Table() {
  const start = true;
  const [rentang, setRentang] = useState("");
  const [inputDate, setInputDate] = useState("");
  const [data, setData] = useState([]);
  const [dataService, setDataService] = useState([]);

  useEffect(() => {
    if (start) {
      getData();
    }
  }, [rentang, inputDate]);

  const getData = async () => {
    try {
      const response = await ServiceService.getHistory(rentang, inputDate);
      setData(response.data);
      setDataService(response.data.dataService);
      setRentang(response.data.rentang);
      setInputDate(response.data.inputDate);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();

    // Judul
    doc.setFontSize(16);
    doc.text(
      `Riwayat Transaksi ${getFormatTanggal(data.rentang, data.inputDate)}`,
      14,
      16
    );

    // Ringkasan Transaksi
    doc.setFontSize(12);
    let yOffset = 30;
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

    doc.text(`Total Service Hp: ${data.totalService}`, 14, yOffset);
    doc.text(
      `Total Pendapatan: ${IDRFormat(data.summary.totalPendapatan)}`,
      14,
      yOffset + 10
    );

    // Data Transaksi
    yOffset += 50;
    autoTable(doc, {
      head: [
        [
          "Nama Klien",
          "Nama Handphone",
          "Alamat",
          "Kendala",
          "Status",
          "Total Ongkos",
          "Tanggal Service",
        ],
      ],
      body: data.dataService.map((item) => [
        item.nama_klien,
        item.nama_handphone,
        item.alamat,
        //item.kendala,
        item.detail_service_handphone.map((detail) => {
          return detail.nama_service;
        }),
        item.status,
        IDRFormat(item.total_ongkos),
        new Date(item.createdAt).toLocaleString(),
      ]),
      startY: yOffset,
    });

    // Menyimpan PDF
    doc.save("riwayat_service_hp.pdf");
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
      <h1 className="text-2xl font-bold mb-4">Riwayat Service Hp</h1>
      <hr className="my-2 sm:my-3 md:my-5 lg:my-6 text-slate-200" />
      <div className="grid sm:flex sm:gap-4 items-center mb-4">
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

        {dataService.length > 0 && (
          <Button2
            label={"Export PDF"}
            icon={<ArrowUpTrayIcon className="text-white size-5" />}
            onClick={handleExportPDF}
          />
        )}
      </div>

      {data.length !== 0 ? (
        <div className="grid gap-7 bg-white p-[3%] rounded-xl shadow-lg">
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
                  <td>Total Service Hp</td>
                  <td className="font-medium">: {data.totalService}</td>
                </tr>
                <tr className="h-7">
                  <td>Total Pendapatan</td>
                  <td className="font-medium">
                    : {IDRFormat(data.summary.totalPendapatan)}
                  </td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Detail Data */}
          <section className="p-3 sm:p-4 md:p-5 rounded-2xl border border-slate-200 overflow-auto">
            <h2 className="text-xl font-semibold mb-4">Detail Service Hp</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto rounded-2xl overflow-hidden">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="font-medium px-4 py-2">Nama Klien</th>
                    <th className="font-medium px-4 py-2">Nama Handphone</th>
                    <th className="font-medium px-4 py-2">Alamat</th>
                    <th className="font-medium px-4 py-2">Kendala</th>
                    <th className="font-medium px-4 py-2">Status</th>
                    <th className="font-medium px-4 py-2">Total Ongkos</th>
                    <th className="font-medium px-4 py-2">Tanggal Service</th>
                  </tr>
                </thead>
                <tbody>
                  {data.dataService.length > 0 ? (
                    data.dataService.map((item) => (
                      <tr
                        key={item.id}
                        className="border-b-[1px] border-slate-200 text-center"
                      >
                        <td className="px-4 py-2 md:py-3">{item.nama_klien}</td>
                        <td className="px-4 py-2 md:py-3">
                          {item.nama_handphone}
                        </td>
                        <td className="px-4 py-2 md:py-3">{item.alamat}</td>
                        <td className="px-4 py-2 md:py-3">
                          {item.detail_service_handphone.map((detail) => {
                            return (
                              <p key={detail.id} className="text-start">
                                {detail.nama_service}
                              </p>
                            );
                          })}
                        </td>
                        <td className="px-4 py-2 md:py-3">
                          {item.status ? "selesai" : ""}
                        </td>
                        <td className="px-4 py-2 md:py-3">
                          {IDRFormat(item.total_ongkos)}
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
                        Tidak ada data service Hp pada{" "}
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

function ServiceHistory() {
  return (
    <Main>
      <Table />
    </Main>
  );
}

export default ServiceHistory;
