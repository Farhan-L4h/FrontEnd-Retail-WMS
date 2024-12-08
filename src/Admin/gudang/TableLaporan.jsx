import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TableLaporan = () => {
  const [barangData, setBarangData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/laporan");
        console.log(response);
        const barang = Array.isArray(response.data)
          ? response.data
          : response.data.data;
        setBarangData(barang || []);
      } catch (err) {
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

  return (
    <div className="m-2 bg-white p-4 rounded-md w-max">
      {/* Table */}
      <div className="relative overflow-x-auto sm:rounded-lg w-full">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 style={{padding: 12}}>Tabel Laporan</h2>
      <table border="2" cellpadding="10" cellspacing="0" className="text-start">
  <thead>
    <tr>
      <th>ID Barang</th>
      <th>Nama Barang</th>
      <th>Kategori</th>
      <th>Supplier</th>
      <th>Kontak Supplier</th>
      <th>Kode Rak</th>
      <th>Nama Rak</th>
      <th>Status</th>
      <th>Alasan</th>
    </tr>
  </thead>
  <tbody>
    {barangData.map((barang) => (
      <tr key={barang.id}>
        <td>{barang.id}</td>
        <td>{barang.nama_barang}</td>
        <td>{barang.nama_kategori}</td>
        <td>{barang.nama_supplier}</td>
        <td>{barang.kontak}</td>
        <td>{barang.kode_rak}</td>
        <td>{barang.nama_rak}</td>
        <td>{barang.status}</td>
        <td>{barang.alasan}</td>
      </tr>
    ))}
  </tbody>
</table>

      </div>
    </div>
  );
};

export default TableLaporan;
