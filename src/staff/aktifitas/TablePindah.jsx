import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TablePindah() {
  const [pindahData, setPindahData] = useState([]);
  const [barangOptions, setBarangOptions] = useState([]);
  const [rakOptions, setRakOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
  const [editData, setEditData] = useState(null);
  const [formData, setFormData] = useState({
    id_barang: "",
    id_rak_awal: "",
    id_rak_baru: "",
    jumlah_pindah: "",
  });

  const itemsPerPage = 15;
  const totalPages = Math.ceil(pindahData.length / itemsPerPage);
  const currentData = pindahData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const fetchData = async () => {
    setLoading(true);
    try {
      const [pindahResponse, barangResponse, rakResponse] = await Promise.all([
        axios.get("http://127.0.0.1:8000/api/pemindahan"),
        axios.get("http://127.0.0.1:8000/api/barang"),
        axios.get("http://127.0.0.1:8000/api/rak"),
      ]);

      setPindahData(pindahResponse.data.data || []);
      setBarangOptions(barangResponse.data.data || []);
      setRakOptions(rakResponse.data.data || []);
    } catch (err) {
      setError(err.message);
      toast.error("Gagal memuat data pindah!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/pemindahan/${deleteData.id}/destroy`
      );
      toast.success(`Data Pemindahan ${deleteData.nama_barang} berhasil dihapus!  `);
      setIsDeleteModalOpen(false);
      setDeleteData(null);
      fetchData();
    } catch (err) {
      toast.error("Gagal menghapus data pindah!");
      setIsDeleteModalOpen(false);  // Close the modal even if deletion fails
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="m-2 bg-white p-4 rounded-md w-full">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Table Pindah</h3>
      </div>

      <div className="relative overflow-x-auto sm:rounded-lg w-max">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200">
            <tr>
              <th className="px-6 py-3">Barang</th>
              <th className="px-6 py-3">Lokasi Awal</th>
              <th className="px-6 py-3">Lokasi Baru</th>
              <th className="px-6 py-3">Tanggal</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((pindah) => (
              <tr key={pindah.id} className="border-b">
                <td className="px-6 py-4">{pindah.nama_barang || "No data"}</td>
                <td className="px-6 py-4">{pindah.nama_rak_asal || "No data"}</td>
                <td className="px-6 py-4">{pindah.nama_rak_tujuan || "No data"}</td>
                <td className="px-6 py-4">
                  {new Date(pindah.tanggal_update).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => {
                      setDeleteData(pindah);
                      setIsDeleteModalOpen(true);
                    }}
                    className="font-medium bg-red-200 rounded-lg px-2 py-1 text-xs text-red-800 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Delete */}
      {isDeleteModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-40">
          <div className="bg-white p-6 rounded-md shadow-md w-96">
            <h2 className="text-lg font-semibold mb-4">Konfirmasi Hapus</h2>
            <p>Apakah Anda yakin ingin menghapus data Pemindahan {deleteData?.nama_barang}?</p>
            <div className="flex justify-center gap-2 mt-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="bg-gray-500 text-white px-3 py-1 rounded"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
