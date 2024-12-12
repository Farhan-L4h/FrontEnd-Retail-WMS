import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const TableLaporan = () => {
  const [barangData, setBarangData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/laporan");
        console.log(response.data); // Cek apa yang dikembalikan oleh API
        const barang = response.data.laporan; // Ambil data dari laporan
        console.log(barang); // Cek barang setelah diambil
        setBarangData(barang || []); // Set barangData
      } catch (err) {
        console.error(err); // Cek kesalahan
        setError(err.message);
        toast.error("Gagal memuat data barang!");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

//   format total stok
  const totalStok = FormData.total_stok;
  console.log(  'ini itu stok')

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <div className="relative overflow-x-auto sm:rounded-lg w-max mt-12">
      <h2 className="text-lg">Tabel Aktifitas Barang</h2>
        <ToastContainer position="top-right" autoClose={3000} />
        <table
          style={{ width: "100%", borderCollapse: "collapse" }}
          className="border border-gray-300 text-sm"
        >
          <thead className="text-start">
            <tr>
              <th className="border border-gray-300 px-4 py-2">No</th>
              <th className="border border-gray-300 px-4 py-2">Nama Barang</th>
              <th className="border border-gray-300 px-4 py-2">Expired</th>
              <th className="border border-gray-300 px-4 py-2">Lokasi Rak</th>
              
            </tr>
          </thead>
          <tbody>
            {barangData.map((barang, index) => (
              <tr key={barang.id} className="hover:bg-gray-100 text-start">
                <td className="border border-gray-300 px-4 py-2">
                  {index + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {barang.nama_barang}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {barang?.expired}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {barang?.lokasi_rak || '-'}
                </td>
              </tr>
            ))}
          
          </tbody>
        </table>
      </div>
  );
};

export default TableLaporan;
