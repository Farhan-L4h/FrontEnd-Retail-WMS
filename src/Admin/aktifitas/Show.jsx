import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../App.css";
import "../../index.css";
import SideBar from "../../components/SideBar";
import LinkPath from "../../components/LinkPath";
import Navbar2 from "../../components/Navbar2";
import { Link, useParams } from "react-router-dom";

export default function ShowAktiv() {
  const { id } = useParams(); // Ambil parameter `id` dari URL
  const [aktivitasData, setAktivitasData] = useState(null); // State untuk data aktivitas
  const [loading, setLoading] = useState(true); // State untuk loading status
  const [error, setError] = useState(null); // State untuk error message

  // Fetch data aktivitas saat komponen dimuat
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data for ID:", id); // tambahkan log untuk ID
        const response = await axios.get(
          `http://127.0.0.1:8000/api/aktivitas/${id}/show`
        );

        console.log("Full API Response:", response); // log seluruh response
        console.log("Response Data:", response.data); // log response.data
        console.log("Extracted Data:", response.data.data); // log data yang diekstrak
        
        const { success, data } = response.data;

        if (success && data) {
          setAktivitasData(data);
          console.log("Data set to state:", data); // log data yang disimpan ke state
        } else {
          setError("Failed to load data: Data not found");
        }
      } catch (err) {
        console.error("Error fetching data:", err);  // log error lengkap
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  // Tampilkan loading atau error jika ada
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Jika data aktivitas kosong
  if (!aktivitasData) return <p>Data aktivitas tidak ditemukan</p>;

  return (
    <>
      {/* NavBar */}
      <div className="fixed top-0 w-full z-40">
        <Navbar2 />
      </div>

      <div className="flex flex-row mt-16">
        {/* Sidebar */}
        <div className="w-64 bg-gray-100 mt- fixed top-0 z-30 mt-7">
          <SideBar />
        </div>

        {/* Main Content */}
        <div className="ml-64 p-6 w-full">
          <LinkPath />

          <div className="m-2 bg-white p-4 rounded-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">
                Detail Aktivitas {aktivitasData?.nama_barang}
              </h3>
              <Link to="/aktifitasBarang">
                <button className="bg-black text-white border border-black hover:bg-white hover:text-black rounded-lg px-3 py-1 text-sm">
                  Kembali
                </button>
              </Link>
            </div>

            <div className="relative overflow-x-auto sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                  <tr>
                    <th className="px-6 py-3">Field</th>
                    <th className="px-6 py-3">Details</th>
                  </tr>
                </thead>
                <tbody>
                <tr className="border-b odd:bg-white even:bg-gray-100">
                    <td className="px-6 py-4">Barang</td>
                    <td className="px-6 py-4">
                      <strong>{aktivitasData?.barang.nama_barang || "Tidak tersedia"}</strong>
                    </td>
                  </tr>
                  <tr className="border-b odd:bg-white even:bg-gray-100">
                    <td className="px-6 py-4">Status</td>
                    <td className="px-6 py-4">
                      {aktivitasData?.alasan === "diterima" ? (
                        <span className="bg-green-100 text-green-800 text-sm font-bold me-2 px-2.5 py-1.5 rounded dark:bg-green-900 dark:text-green-300">
                          Diterima
                        </span>
                      ) : aktivitasData?.alasan === "diambil" ? (
                        <span className="bg-blue-100 text-blue-800 text-sm font-bold me-2 px-2.5 py-1.5 rounded dark:bg-blue-900 dark:text-blue-300">
                          Diambil
                        </span>
                      ) : aktivitasData?.alasan === "dibuang" ? (
                        <span className="bg-gray-100 text-gray-800 text-sm font-bold me-2 px-2.5 py-1.5 rounded dark:bg-gray-700 dark:text-gray-300">
                          Expired
                        </span>
                      ) : aktivitasData?.alasan === "return" ? (
                        <span className="bg-yellow-100 text-yellow-800 text-sm font-bold me-2 px-2.5 py-1.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                          Return
                        </span>
                      ) : (
                        <span className="bg-red-100 text-red-800 text-sm font-bold me-2 px-2.5 py-1.5 rounded dark:bg-red-900 dark:text-red-300">
                          -
                        </span>
                      )}
                    </td>
                  </tr>
                  
                  <tr className="border-b odd:bg-white even:bg-gray-100">
                    <td className="px-6 py-4">Lokasi Rak</td>
                    <td className="px-6 py-4">
                      <strong>#{aktivitasData?.rak.kode_rak || "Tidak tersedia"}</strong>
                      <br /> {aktivitasData?.rak.nama_rak || "Tidak tersedia"}
                    </td>
                  </tr>
                  <tr className="border-b odd:bg-white even:bg-gray-100">
                    <td className="px-6 py-4">EXP Barang</td>
                    <td className="px-6 py-4">
                      {new Date(aktivitasData?.exp_barang).toLocaleDateString(
                    "id-ID",
                    { year: "numeric", month: "short", day: "numeric" }
                  ) || "Tidak tersedia"}
                    </td>
                  </tr>
                  <tr className="border-b odd:bg-white even:bg-gray-100">
                    <td className="px-6 py-4">Harga Perbarang</td>
                    <td className="px-6 py-4">
                      {aktivitasData?.barang.harga || "Tidak tersedia"}
                    </td>
                  </tr>
                  <tr className="border-b odd:bg-white even:bg-gray-100">
                    <td className="px-6 py-4">Total Harga</td>
                    <td className="px-6 py-4">
                      {aktivitasData?.total_harga || "Tidak tersedia"}
                    </td>
                  </tr>
                  <tr className="border-b odd:bg-white even:bg-gray-100">
                    <td className="px-6 py-4">Username</td>
                    <td className="px-6 py-4">
                      {aktivitasData?.username || "Tidak tersedia"}
                    </td>
                  </tr>
                  <tr className="border-b odd:bg-white even:bg-gray-100">
                    <td className="px-6 py-4">Tanggal Aktivitas</td>
                    <td className="px-6 py-4">
                    {new Date(aktivitasData?.tanggal_update).toLocaleDateString(
                    "id-ID",
                    { year: "numeric", month: "short", day: "numeric" }
                  ) || "Tidak tersedia"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
