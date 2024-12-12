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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  const totalHarga = barangData.reduce((acc, curr) => acc + curr.harga_barang, 0);
  return (
    <div className="relative overflow-x-auto sm:rounded-lg w-max mt-5">
      <h2 style={{ padding: 12 }}>Tabel Barang</h2>
        <ToastContainer position="top-right" autoClose={3000} />
        <table
          style={{ width: "100%", borderCollapse: "collapse" }}
          className="border border-gray-300 text-sm"
        >
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">No</th>
              <th className="border border-gray-300 px-4 py-2">Nama Barang</th>
              <th className="border border-gray-300 px-4 py-2">Kategori</th>
              <th className="border border-gray-300 px-4 py-2">Jumlah Stok</th>
              <th className="border border-gray-300 px-4 py-2">Supplier</th>
              <th className="border border-gray-300 px-4 py-2">Masuk</th>
              <th className="border border-gray-300 px-4 py-2">Keluar</th>
              <th className="border border-gray-300 px-4 py-2">Harga Barang</th>
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
                  {barang.kategori}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {barang.stok}
                </td>
                
                <td className="border border-gray-300 px-4 py-2">
                  {barang.supplier}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {barang.jumlah_masuk}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {barang.jumlah_keluar}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(barang.harga)}
                </td>
              </tr>
            ))}
            <tr>
              <td
                colSpan="7"
                className="border border-gray-300 px-4 py-2 font-bold text-right"
              >
                TOTAL
              </td>
              <td className="border border-gray-300 px-4 py-2 font-bold">
                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(barangData.reduce((acc, curr) => acc + curr.total_harga, 0))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  );
};

export default TableLaporan;
