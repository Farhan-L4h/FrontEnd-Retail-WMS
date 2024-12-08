import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
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

  useEffect(() => {
    const fetchData = async () => {
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
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/api/pemindahan", formData);
      toast.success("Data berhasil ditambahkan!");
      setIsCreateModalOpen(false);
      fetchData();
    } catch (err) {
      toast.error("Gagal menambah data pindah!");
    }
  };

  const handleEdit = async () => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/pemindahan/${editData.id}`, formData);
      toast.success("Data berhasil diperbarui!");
      setIsEditModalOpen(false);
      fetchData();
    } catch (err) {
      toast.error("Gagal mengedit data pindah!");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="m-2 bg-white p-4 rounded-md w-full">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Table Pindah</h3>
        <button
          onClick={() => {
            setFormData({
              id_barang: "",
              id_rak_awal: "",
              id_rak_baru: "",
              jumlah_pindah: "",
            });
            setIsCreateModalOpen(true);
          }}
          className="text-green-800 bg-green-200 hover:bg-green-500 hover:text-green-200 text-sm rounded-lg px-3 py-2"
        >
          Tambah Pindah
        </button>
      </div>

      <div className="relative overflow-x-auto sm:rounded-lg w-max">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Barang</th>
              <th className="px-6 py-3">Lokasi Awal</th>
              <th className="px-6 py-3">Lokasi Baru</th>
              <th className="px-6 py-3">Jumlah Barang</th>
              <th className="px-6 py-3">Tanggal</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((pindah) => (
              <tr key={pindah.id} className="border-b">
                <td className="px-6 py-4">{pindah.id}</td>
                <td className="px-6 py-4">{pindah.barang?.nama_barang || "No data"}</td>
                <td className="px-6 py-4">{pindah.rak_awal?.nama_rak || "No data"}</td>
                <td className="px-6 py-4">{pindah.rak_baru?.nama_rak || "No data"}</td>
                <td className="px-6 py-4">{pindah.jumlah_pindah}</td>
                <td className="px-6 py-4">{new Date(pindah.tanggal_update).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: '2-digit' })}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => {
                      setEditData(pindah);
                      setFormData({
                        id_barang: pindah.id_barang,
                        id_rak_awal: pindah.id_rak_awal,
                        id_rak_baru: pindah.id_rak_baru,
                        jumlah_pindah: pindah.jumlah_pindah,
                      });
                      setIsEditModalOpen(true);
                    }}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Create/Edit */}
      {(isCreateModalOpen || isEditModalOpen) && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-40">
          <div className="bg-white p-6 rounded-md shadow-md w-96">
            <h2 className="text-lg font-semibold mb-4">
              {isCreateModalOpen ? "Tambah Data Pindah" : "Edit Data Pindah"}
            </h2>
            <div className="flex flex-col gap-4">
              <select
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
                name="id_rak_awal"
                value={formData.id_rak_awal}
                onChange={handleInputChange}
                className="border rounded p-2"
              >
                <option value="">Pilih Lokasi Awal</option>
                {rakOptions.map((rak) => (
                  <option key={rak.id} value={rak.id}>
                    {rak.nama_rak}
                  </option>
                ))}
              </select>
              <select
                name="id_rak_baru"
                value={formData.id_rak_baru}
                onChange={handleInputChange}
                className="border rounded p-2"
              >
                <option value="">Pilih Lokasi Baru</option>
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
