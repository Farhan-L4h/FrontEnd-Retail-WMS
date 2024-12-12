import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../App.css";
import "../../index.css";
import SideBar from "../../components/SideBar";
import LinkPath from "../../components/LinkPath";
import Navbar2 from "../../components/Navbar2";
import { Link, useParams } from "react-router-dom";

export default function ShowAktiv() {
  const { id } = useParams(); // Get the `id` from the URL parameters
  const [barangData, setBarangData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/aktivitas/${id}/show`
        );
        console.log(response.data); // Log data to check the response
        if (response.data.success) {
          setBarangData(response.data.data); // Access data from the 'data' property
        } else {
          setError("Failed to load data");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]); // Added dependency on `id`

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!barangData) return <p>Data not found</p>; // Handle case where data is missing

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
                Table show {barangData?.nama_barang}
              </h3>
              <Link to="/Barang">
                <button className="bg-black text-white border border-black hover:bg-white hover:text-black rounded-lg px-3 py-1 text-sm">
                  Kembali
                </button>
              </Link>
            </div>

            <div className="relative overflow-x-auto sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                  <tr className="text-wrap">
                    <th className="px-6 py-3">Field</th>
                    <th className="px-6 py-3">Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="px-6 py-4">Nama Barang</td>
                    <td className="px-6 py-4">
                      {barangData?.nama_barang || "Tidak tersedia"}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-6 py-4">Image</td>
                    <td className="px-6 py-4">
                      {barangData?.image ? (
                        <img
                          src={barangData?.image}
                          alt="Barang"
                          className="w-10 h-10 object-contain"
                        />
                      ) : (
                        <p>Tidak tersedia</p>
                      )}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-6 py-4">Kategori</td>
                    <td className="px-6 py-4">
                      {barangData?.kategori?.nama_kategori || "Tidak tersedia"}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-6 py-4">Tanggal Aktivitas</td>
                    <td className="px-6 py-4">
                      {barangData?.tanggal_aktivitas || "Tidak tersedia"}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-6 py-4">Jenis Aktivitas</td>
                    <td className="px-6 py-4">
                      {barangData?.jenis_aktivitas || "Tidak tersedia"}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-6 py-4">Jumlah</td>
                    <td className="px-6 py-4">
                      {barangData?.jumlah || "Tidak tersedia"}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-6 py-4">Deskripsi Aktivitas</td>
                    <td className="px-6 py-4">
                      {barangData?.deskripsi_aktivitas || "Tidak tersedia"}
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
