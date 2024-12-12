import { useState } from "react";
import "../App.css";
import "../index.css";
import SideBar from "../components/SideBar";
import NavBar from "../components/Navbar2";
import { Link } from "react-router-dom";
import Table from "../components/Table";
import LinkPath from "../components/LinkPath";
import Chart from "../components/chart1";
import Footer from "../components/Footer";
import LowStockTable from "./gudang/TbStokRendah";
import ExpiringSoonTable from "./gudang/TbExpired";
import TableRak from "./gudang/TableRak";
import Chart2 from "../components/chart2";

function App() {
  const [count, setCount] = useState(0);

  const tableName = "Tabel Barang";

  const columns = [
    { header: "Nama Barang", field: "nama" },
    { header: "Image", field: "image" },
    { header: "Kategori", field: "kategori" },
  ];

  const data = [
    {
      nama: "Beng Beng",
      image: "image",
      kategori: "Makanan",
      harga: "3000",
      supplier: "supplier 1",
    },
    {
      nama: "Beng Beng",
      image: "image",
      kategori: "Makanan",
      harga: "3000",
      supplier: "supplier 1",
    },
    {
      nama: "Beng Beng",
      image: "image",
      kategori: "Makanan",
      harga: "3000",
      supplier: "supplier 1",
    },
    {
      nama: "Beng Beng",
      image: "image",
      kategori: "Makanan",
      harga: "3000",
      supplier: "supplier 1",
    },
  ];

  return (
    <>
      {/* NavBar */}
      <div className="fixed top-0 w-full z-40">
        <NavBar />
      </div>

      <div className="flex flex-row mt-16">
        {/* Sidebar */}
        <div className="w-64 bg-gray-100 fixed top-0 z-30 mt-7">
          <SideBar />
        </div>

        {/* Konten utama */}
        <div className="ml-64 p-6 w-max">
            <LinkPath />
            <div className="flex w-full ">

              {/* Barang Masuk */}
              <div className="bg-green-400 w-full px-6 py-6 rounded-md m-2 flex gap-6 items-center">
                <div className="flex gap-2 items-center">
                  <svg
                    class="w-6 h-6 text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.024 3.783A1 1 0 0 1 6 3h12a1 1 0 0 1 .976.783L20.802 12h-4.244a1.99 1.99 0 0 0-1.824 1.205 2.978 2.978 0 0 1-5.468 0A1.991 1.991 0 0 0 7.442 12H3.198l1.826-8.217ZM3 14v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5h-4.43a4.978 4.978 0 0 1-9.14 0H3Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <p className="text-white text-xl">Barang Masuk</p>
                </div>
                <input
                  type="text"
                  value={20}
                  className="bg-gray-100 w-16 text-center text-lg font-semibold text-green-500 border-none h-10 rounded-lg"
                  disabled
                />
              </div>

              <div className="bg-blue-400 w-full px-6 py-6 rounded-md m-2 flex gap-6 items-center">
                <div className="flex gap-2 items-center">
                  <svg
                    class="w-6 h-6 text-white dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.024 3.783A1 1 0 0 1 6 3h12a1 1 0 0 1 .976.783L20.802 12h-4.244a1.99 1.99 0 0 0-1.824 1.205 2.978 2.978 0 0 1-5.468 0A1.991 1.991 0 0 0 7.442 12H3.198l1.826-8.217ZM3 14v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5h-4.43a4.978 4.978 0 0 1-9.14 0H3Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <p className="text-white text-xl">Barang Keluar</p>
                </div>
                <input
                  type="text"
                  value={20}
                  className="bg-gray-100 w-16 text-center text-lg font-semibold text-blue-500 border-none h-10 rounded-lg"
                  disabled
                />
              </div>

              <div className="bg-orange-300 w-full px-6 py-6 rounded-md m-2 flex gap-6 items-center">
                <div className="flex gap-2 items-center">
                  <svg
                    class="w-6 h-6 text-white dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.024 3.783A1 1 0 0 1 6 3h12a1 1 0 0 1 .976.783L20.802 12h-4.244a1.99 1.99 0 0 0-1.824 1.205 2.978 2.978 0 0 1-5.468 0A1.991 1.991 0 0 0 7.442 12H3.198l1.826-8.217ZM3 14v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5h-4.43a4.978 4.978 0 0 1-9.14 0H3Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <p className="text-white text-xl">Barang Pindah</p>
                </div>
                <input
                  type="text"
                  value={9}
                  className="bg-gray-100 w-16 text-center text-lg font-semibold text-yellow-500 border-none h-10 rounded-lg"
                  disabled
                />
              </div>
            </div>

            <div className="flex w-full max-w-full">
              <Chart />
              <Chart2 />
            </div>

            <div className="flex">
              {/* <Table tableName={tableName} columns={columns} data={data} />
              <Table tableName={tableName} columns={columns} data={data} /> */}
              <LowStockTable />
              <ExpiringSoonTable />
            </div>
            <Footer />
          </div>
        </div>
    </>
  );
}

export default App;
