import React, { useEffect, useState } from "react";
import "../App.css";
import "../index.css";
import SideBar from "../components/SideBar";
import NavBar from "../components/Navbar2";
import LinkPath from "../components/LinkPath";
import Chart from "../components/chart1";
import Chart2 from "../components/chart2";
import LowStockTable from "./gudang/TbStokRendah";
import ExpiringSoonTable from "./gudang/TbExpired";
import Footer from "../components/Footer";

const Dashboard = () => {
  const [data, setData] = useState({
    total_masuk: 0,
    total_keluar: 0,
    total_stok: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/aktivitas");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        console.log("API Response:", result);
        setData({
          total_masuk: result.total.total_masuk || 0,
          total_keluar: result.total.total_keluar || 0,
          total_stok: result.total.total_stok || 0
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      {/* Informasi Barang */}
      <div className="flex w-full ">
            {/* Barang Masuk */}
            <div className="bg-green-400 w-max px-6 py-6 rounded-md m-2 flex gap-6 items-center">
              <div className="flex gap-2 items-center">
                <svg
                  class="w-6 h-6 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 20 20"
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
                value={data.total_masuk || 0}
                className="bg-gray-100 w-16 text-center text-lg font-semibold text-green-500 border-none h-10 rounded-lg"
                disabled
              />
            </div>

            <div className="bg-blue-400 w-max px-6 py-6 rounded-md m-2 flex gap-6 items-center">
              <div className="flex gap-2 items-center">
                <svg
                  class="w-6 h-6 text-white dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 6a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1Zm0 12a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1Zm3.85-9.76A1 1 0 0 1 10.5 9v6a1 1 0 0 1-1.65.76l-3.5-3a1 1 0 0 1 0-1.52l3.5-3ZM12 10a1 1 0 0 1 1-1h5a1 1 0 1 1 0 2h-5a1 1 0 0 1-1-1Zm0 4a1 1 0 0 1 1-1h5a1 1 0 1 1 0 2h-5a1 1 0 0 1-1-1Z"
                    clip-rule="evenodd"
                  />
                </svg>

                <p className="text-white text-xl">Barang Keluar</p>
              </div>
              <input
                type="text"
                value={data.total_keluar || 0}
                className="bg-gray-100 w-16 text-center text-lg font-semibold text-blue-500 border-none h-10 rounded-lg"
                disabled
              />
            </div>

            <div className="bg-orange-300 w-max px-6 py-6 rounded-md m-2 flex gap-6 items-center">
              <div className="flex gap-2 items-center">
                <svg
                  class="w-6 h-6 text-white dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.024 3.783A1 1 0 0 1 6 3h12a1 1 0 0 1 .976.783L20.802 12h-4.244a1.99 1.99 0 0 0-1.824 1.205 2.978 2.978 0 0 1-5.468 0A1.991 1.991 0 0 0 7.442 12H3.198l1.826-8.217ZM3 14v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5h-4.43a4.978 4.978 0 0 1-9.14 0H3Zm5-7a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1Zm0 2a1 1 0 0 0 0 2h8a1 1 0 1 0 0-2H8Z"
                    clip-rule="evenodd"
                  />
                </svg>

                <p className="text-white text-xl">Total Stok</p>
              </div>
              <input
                type="text"
                value={data.total_stok || 0}
                className="bg-gray-100 w-16 text-center text-lg font-semibold text-yellow-500 border-none h-10 rounded-lg"
                disabled
              />
            </div>
          </div>

      {/* Grafik */}
      <div className="flex w-full max-w-full">
        <Chart />
        <Chart2 />
      </div>

      {/* Tabel */}
      <div className="flex">
        <LowStockTable />
        <ExpiringSoonTable />
      </div>
    </>
  );
};


const App = () => {
  return (
    <>
      {/* Navbar */}
      <div className="fixed top-0 w-full z-40">
        <NavBar />
      </div>

      <div className="flex flex-row mt-16">
        {/* Sidebar */}
        <div className="w-64 bg-gray-100 fixed top-0 z-30 mt-7">
          <SideBar />
        </div>

        {/* Konten Utama */}
        <div className="ml-64 p-6 w-max">
          <LinkPath />
          <Dashboard />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default App;

