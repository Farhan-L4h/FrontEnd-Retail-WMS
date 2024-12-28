import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TableBarang() {
  const [barangData, setBarangData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteData, setDeleteData] = useState({ id: "", nama_barang: "" });

  const totalPages = Math.ceil(barangData.length / itemsPerPage);
  const currentData = barangData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/barang");
        const barang = Array.isArray(response.data) ? response.data : response.data.data;
        
        // Menilai kelengkapan data
        const sortedBarang = barang.map(item => {
          let kelengkapanScore = 0;

          // Skor stok, jika stok > 0, tambah skor
          if (item.stok > 0) {
            kelengkapanScore += 1;
          }

          // Skor expired, jika ada expired date, tambah skor
          if (item.exp_barang) {
            kelengkapanScore += 1;
          }

          // Skor lokasi rak, jika ada lokasi rak, tambah skor
          if (item.id_rak) {
            kelengkapanScore += 1;
          }

          item.kelengkapanScore = kelengkapanScore;
          return item;
        });

        // Urutkan berdasarkan skor kelengkapan (semakin tinggi skor, semakin atas)
        const sortedBarangData = sortedBarang.sort((a, b) => b.kelengkapanScore - a.kelengkapanScore);

        setBarangData(sortedBarangData || []);
      } catch (err) {
        setError(err.message);
        toast.error("Gagal memuat data barang!");
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleDelete = async () => {
    try {
      if (!deleteData.id) {
        toast.warning("ID barang tidak ditemukan!");
        return;
      }

      await axios.delete(
        `http://127.0.0.1:8000/api/barang/${deleteData.id}/destroy`
      );
      const response = await axios.get("http://127.0.0.1:8000/api/barang");
      setBarangData(
        Array.isArray(response.data) ? response.data : response.data.data
      );
      toggleDeleteModal();
      toast.success(`Barang ${deleteData.nama_barang} berhasil dihapus.`);
    } catch (err) {
      toast.error("Terjadi kesalahan: " + err.message);
    }
  };

  const confirmDelete = (barang) => {
    setDeleteData({ id: barang.id, nama_barang: barang.nama_barang });
    toggleDeleteModal();
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
        <h3 className="text-xl font-semibold">Table Barang</h3>
        <Link to="/Barang/create">
          <button className="text-green-800 bg-green-200 hover:bg-green-500 hover:text-green-200 text-sm rounded-lg px-3 py-2">
            Tambah Barang
          </button>
        </Link>
      </div>

      <div className="relative overflow-x-auto sm:rounded-lg w-max">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200">
            <tr>
              <th className="px-2 py-3">No</th>
              <th className="px-6 py-3">Nama Barang</th>
              <th className="px-6 py-3">Image</th>
              <th className="px-3 py-3">Kategori</th>
              <th className="px-6 py-3">Stok</th>
              <th className="px-4 py-3">Lokasi</th>
              <th className="px-4 py-3">Exp</th>
              <th className="px-6 py-3">Harga</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((barang, index) => (
              // <tr key={barang.id} className="border-b">
              <tr key={barang.id} className="odd:bg-white even:bg-gray-100 border-gray-600">
                <td className="px-4 py-4">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td className="px-6 py-4">{barang.nama_barang}</td>
                <td className="px-6 py-4">
                  {barang.image && (
                    <img
                      src={barang.image}
                      alt={barang.nama_barang}
                      className="w-10 h-10 object-cover"
                    />
                  )}
                </td>
                <td className="px-2 py-4 text-wrap">{barang.kategori.nama_kategori}</td>
                <td className="px-6 py-4">{barang.exp_barang === null ? "0" : barang.stok}</td>
                <td className="px-6 py-4">{barang.rak || '-'}</td>
                <td className="px-6 py-4">{new Date(barang.exp_barang).toLocaleDateString(
                    "id-ID",
                    { year: "numeric", month: "short", day: "numeric" }
                  ) || '-'}</td>
                <td className="px-6 py-4">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(barang.harga)}</td>
                <td className="px-6 py-4">
                  <Link to={`/Barang/${barang.id}/edit`}>
                    <button className="font-medium text-xs bg-blue-200 rounded-xl px-3 py-1 ms-2 text-blue-800 hover:underline">
                      Edit
                    </button>
                  </Link>
                  <button
                    className="font-medium p-2 ms-1 text-xs rounded-xl bg-red-200 text-red-800 px-2 py-1 hover:underline"
                    onClick={() => confirmDelete(barang)}
                  >
                    Delete
                  </button>
                  <Link to={`/barang/${barang.id}/show`}>
                    <button className="font-medium p-2 ms-1 text-xs rounded-xl bg-green-200 text-green-800 px-2 py-1 hover:underline">
                      Show
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {barangData.length > itemsPerPage && (
            <div className="flex justify-center mt-4">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`mx-1 px-3 py-1 rounded-md ${
                    currentPage === index + 1
                      ? "border border-blue-500 bg-white text-black"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <div className="fixed top-0 z-40 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="relative p-4 w-full max-w-md bg-white rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Are you sure?</h3>
            <p>
              Apakah Anda yakin ingin menghapus barang {deleteData.nama_barang}?
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={toggleDeleteModal}
                className="mr-2 bg-gray-200 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="text-white bg-red-600 px-4 py-2 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
