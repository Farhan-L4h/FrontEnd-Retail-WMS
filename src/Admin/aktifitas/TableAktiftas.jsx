import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TableAktifitas() {
  const [aktivitasData, setAktivitasData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const totalPages = Math.ceil(aktivitasData.length / itemsPerPage);
  const currentData = aktivitasData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/aktivitas");
        setAktivitasData(response.data.data || []);
      } catch (err) {
        setError(err.message);
        toast.error("Gagal memuat data aktivitas!");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // delete handle
  const handleDelete = async () => {
    if (!deleteData.id) {
      toast.warning("ID aktivitas tidak ditemukan!");
      return;
    }

    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/aktivitas/${deleteData.id}/destroy`
      );
      setAktivitasData((prev) =>
        prev.filter((item) => item.id !== deleteData.id)
      );
      setIsDeleteModalOpen(false); // Changed from toggleDeleteModal() to setIsDeleteModalOpen(false) for clarity
      toast.success(
        `Aktivitas "${deleteData.nama_aktivitas}" berhasil dihapus.`
      );
    } catch (err) {
      toast.error(`Terjadi kesalahan: ${err.message}`);
    }
  };

  const confirmDelete = (aktivitas) => {
    setDeleteData({
      id: aktivitas.id,
      nama_aktivitas: aktivitas.nama_aktivitas,
    });
    setIsDeleteModalOpen(true); // Changed from toggleDeleteModal() to setIsDeleteModalOpen(true) for clarity
  };

  const toggleDeleteModal = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="m-2 bg-white p-4 rounded-md w-full">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Table Aktivitas</h3>
        <div className="flex gap-2">
          <Link to='/aktifitasBarang/tambah'>
          <button
            className="text-green-800 bg-green-200 hover:bg-green-500 hover:text-white text-sm rounded-lg px-3 py-2"
            >
            + Barang Masuk
          </button>
            </Link>
          <Link to="/Aktifitasbarang/keluar">
            <button className="text-blue-800 bg-blue-200 hover:bg-blue-500 hover:text-white text-sm rounded-lg px-3 py-2">
              + Barang Keluar
            </button>
          </Link>
        </div>
      </div>

      <div className="relative overflow-x-auto sm:rounded-lg w-max">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200">
            <tr>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Barang</th>
              <th className="px-6 py-3">Lokasi Rak</th>
              <th className="px-6 py-3">Exp Barang</th>
              <th className="px-6 py-3">Total</th>
              <th className="px-6 py-3">User</th>
              <th className="px-6 py-3">Tanggal</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((aktivitas) => (
              <tr key={aktivitas.id} className="border-b">
                <td className="px-6 py-4">
                  {aktivitas.alasan === "diterima" ? (
                    <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                      Diterima
                    </span>
                  ) : aktivitas.alasan === "diambil" ? (
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                      Diambil
                    </span>
                  ) : aktivitas.alasan === "dibuang" ? (
                    <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                      Expired
                    </span>
                  ) : aktivitas.alasan === "return" ? (
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                      return
                    </span>
                  ) : (
                    <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                      -
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {aktivitas.barang?.nama_barang || "Tidak ada data"}{" "}
                  <strong>x {aktivitas.jumlah_barang || 0}</strong>
                </td>
                <td className="px-6 py-4">
                  <strong>#{aktivitas.rak.kode_rak}</strong>
                  <br />
                  {aktivitas.rak?.nama_rak || "Tidak ada data"}
                </td>
                <td className="px-6 py-4">{aktivitas.exp_barang || "-"}</td>
                <td className="px-6 py-4">{aktivitas.total_harga || "-"}</td>
                <td className="px-6 py-4">{aktivitas.username || 0}</td>
                <td className="px-6 py-4">
                  {new Date(aktivitas.tanggal_update).toLocaleDateString(
                    "id-ID",
                    { year: "numeric", month: "short", day: "numeric" }
                  )}
                </td>
                <td className="px-6 py-4 flex gap-2 text-xs">
                  <Link to={`/Aktifitas/${aktivitas.id}/edit`}>
                    <button className="bg-blue-200 text-blue-800 px-3 py-1 rounded-md">
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => confirmDelete(aktivitas)}
                    className="bg-red-200 text-red-800 px-3 py-1 rounded-md"
                  >
                    Delete
                  </button>
                  <Link to={`/Aktifitas/${aktivitas.id}/show`}>
                    <button className="bg-green-200 text-green-800 px-3 py-1 rounded-lg ">
                      Show
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
