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
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteData, setDeleteData] = useState({});
  const [formData, setFormData] = useState({
    id_barang: "",
    id_rak: "",
    jumlah_pindah: "",
  });
  const [barangOptions, setBarangOptions] = useState([]);
  const [rakOptions, setRakOptions] = useState([]);

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

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [barangResponse, rakResponse] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/barang"),
          axios.get("http://127.0.0.1:8000/api/rak"),
        ]);
        setBarangOptions(barangResponse.data.data || []);
        setRakOptions(rakResponse.data.data || []);
      } catch (err) {
        toast.error("Gagal memuat data barang atau rak!");
      }
    };
    fetchOptions();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
      setIsDeleteModalOpen(false);
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
    setIsDeleteModalOpen(true);
  };

  const handleCreate = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/api/pemindahan", formData);
      toast.success("Data berhasil ditambahkan!");
      setIsCreateModalOpen(false);
      // fetchData(); // Uncomment this if you want to refresh the list after creating
    } catch (err) {
      toast.error("Gagal memindahkan data!");
    }
  };

  const handleMove = (aktivitas) => {
    // Set form data based on the selected activity
    setFormData({
      id_barang: aktivitas.barang.id,
      id_rak: aktivitas.rak.id,
      jumlah_pindah: "",
    });
    setIsCreateModalOpen(true); // Open the modal for data movement
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="m-2 bg-white p-4 rounded-md w-full">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Table Aktivitas</h3>
        <div className="flex gap-2">
          <Link to="/aktifitasBarang/tambah">
            <button className="text-green-800 bg-green-200 hover:bg-green-500 hover:text-white text-sm rounded-lg px-3 py-2">
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
                <td className="px-6 py-4 text-xs">
                  <div className="flex gap-2">
                    <Link to={`/Aktifitas/${aktivitas.id}/edit`}>
                      <button className="bg-blue-200 text-blue-800 px-3 py-1 rounded-lg">
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => confirmDelete(aktivitas)}
                      className="bg-red-200 text-red-800 px-3 py-1 rounded-lg"
                    >
                      Delete
                    </button>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Link to={`/Aktifitas/${aktivitas.id}/show`}>
                      <button className="bg-green-200 text-green-800 px-3 py-1 rounded-lg ">
                        Show
                      </button>
                    </Link>
                    <button
                      onClick={() => handleMove(aktivitas)}
                      className="bg-yellow-200 text-yellow-800 py-1 px-3 rounded-lg "
                    >
                      Move
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Pemindahan Create/Edit */}
      {(isCreateModalOpen || isEditModalOpen) && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-40">
          <div className="bg-white p-6 rounded-md shadow-md w-96">
            <h2 className="text-lg font-semibold mb-4">
              {isCreateModalOpen ? "Pindahkan Data" : "Edit Data Pindah"}
            </h2>
            <div className="flex flex-col gap-4">
              <select disabled
                name="id_barang"
                value={formData.id_barang}
                onChange={handleInputChange}
                className="border rounded p-2"
              >
                <option value="">Pilih Barang</option>
                {barangOptions.map((barang) => (
                  <option key={barang.id} value={barang.id}>
                    {barang.nama_barang}
                  </option>
                ))}
              </select>
              <select
                name="id_rak"
                value={formData.id_rak}
                onChange={handleInputChange}
                className="border rounded p-2"
              >
                <option disabled value="">Pilih Lokasi Awal</option>
                {rakOptions.map((rak) => (
                  <option key={rak.id} value={rak.id}>
                    {rak.nama_rak}
                  </option>
                ))}
              </select>

              <input
                type="number"
                name="jumlah_pindah"
                value={formData.jumlah_pindah}
                onChange={handleInputChange}
                placeholder="Jumlah Barang"
                className="border rounded p-2"
              />
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => {
                  setIsCreateModalOpen(false);
                  setIsEditModalOpen(false);
                }}
                className="bg-gray-200 px-4 py-2 rounded"
              >
                Batal
              </button>
              <button
                onClick={isCreateModalOpen ? handleCreate : handleEdit}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                {isCreateModalOpen ? "Simpan" : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
