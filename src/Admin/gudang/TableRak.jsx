import React, { useState, useEffect } from "react";
import axios from "axios";

export default function TableRak() {
  const [rakData, setRakData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({ id: "", kode_rak: "", nama_rak: "", lokasi_rak: "" });
  const [deleteData, setDeleteData] = useState({ id: "", kode_rak: "", nama_rak: "", lokasi_rak: "" });
  const [isEdit, setIsEdit] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Added to manage delete modal state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(rakData.length / itemsPerPage);
  const currentData = rakData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const toggleAddModal = () => {
    setIsAddModalOpen(!isAddModalOpen);
    if (!isAddModalOpen) resetForm();
  };

  const toggleEditModal = () => {
    setIsEditModalOpen(!isEditModalOpen);
    if (!isEditModalOpen);
  };

  const toggleDeleteModal = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  const resetForm = () => {
    setFormData({ id: "", kode_rak: "", nama_rak: "", lokasi_rak: "" });
    setIsEdit(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        if (!formData.id) return alert("ID rak tidak ditemukan");

        await axios.put(`http://127.0.0.1:8000/api/rak/${formData.id}/update`, {
          kode_rak: formData.kode_rak,
          nama_rak: formData.nama_rak,
          lokasi_rak: formData.lokasi_rak,
        });
      } else {
        await axios.post("http://127.0.0.1:8000/api/rak", {
          kode_rak: formData.kode_rak,
          nama_rak: formData.nama_rak,
          lokasi_rak: formData.lokasi_rak,
        });
      }

      // Refresh data rak setelah berhasil submit
      const response = await axios.get("http://127.0.0.1:8000/api/rak");
      setRakData(response.data.data || []);

      // Tutup modal setelah berhasil
      if (isEdit) toggleEditModal();
      else toggleAddModal();

      resetForm(); // Reset form
    } catch (err) {
      alert("Terjadi kesalahan: " + err.message);
    }
  };


  const handleEdit = (rak) => {
    setFormData(rak);
    setIsEdit(true);
    toggleEditModal();
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/rak/${deleteData.id}/destroy`);
      const response = await axios.get("http://127.0.0.1:8000/api/rak");
      setRakData(response.data.data);
      toggleDeleteModal();
    } catch (err) {
      alert("Terjadi kesalahan: " + err.message);
    }
  };

  const confirmDelete = (rak) => {
    setDeleteData(rak);
    toggleDeleteModal();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/rak");
        setRakData(response.data.data || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="m-2 bg-white p-4 rounded-md">
      <div className="flex flex-row my-2">
        <div className="text-start flex w-full">
          <h3 className="text-xl font-semibold">Table Rak</h3>
          <button
            onClick={toggleAddModal}
            className="ml-auto text-green-800 bg-green-300 hover:bg-green-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1"
          >
            Tambah Rak
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="relative overflow-x-auto sm:rounded-lg">
        <table className="w-full text-xs text-left rtl:text-right text-gray-500">
          <thead className="font-normal text-gray-700 uppercase bg-gray-200 bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3">ID</th>
              <th scope="col" className="px-6 py-3">Kode Rak</th>
              <th scope="col" className="px-6 py-3">Nama Rak</th>
              <th scope="col" className="px-6 py-3">Lokasi Rak</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((rak) => (
              <tr key={rak.id} className="odd:bg-white even:bg-gray-100 border-gray-600 ">
                <td className="px-6 py-4">{rak.id}</td>
                <td className="px-6 py-4">{rak.kode_rak}</td>
                <td className="px-6 py-4">{rak.nama_rak}</td>
                <td className="px-6 py-4">{rak.lokasi_rak}</td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(rak)}
                    className="font-medium text-xs bg-blue-400 rounded-md px-3 py-1  text-blue-800 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => confirmDelete(rak)}
                    className="font-medium text-xs p-2 text-xs rounded-md bg-red-400 text-red-800 px-3 py-1  hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {rakData.length > itemsPerPage && (
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`mx-1 px-3 py-1 rounded-md ${currentPage === index + 1 ? "border border-blue-500 bg-white text-black hover:bg-blue-500 hover:text-white" : "bg-gray-100 text-gray-500"}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}

      {/* Modals */}
      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-40 bg-gray-800 bg-opacity-50">
          <div className="relative p-4 w-full max-w-md bg-white rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Tambah Rak</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="kode_rak" className="block mb-2 text-sm text-start font-medium">Kode Rak</label>
                <input
                  type="text"
                  id="kode_rak"
                  name="kode_rak"
                  value={formData.kode_rak}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="nama_rak" className="block mb-2 text-sm text-start font-medium">Nama Rak</label>
                <input
                  type="text"
                  id="nama_rak"
                  name="nama_rak"
                  value={formData.nama_rak}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="lokasi_rak" className="block mb-2 text-sm text-start font-medium">Lokasi Rak</label>
                <input
                  type="text"
                  id="lokasi_rak"
                  name="lokasi_rak"
                  value={formData.lokasi_rak}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2 rounded-md"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={toggleAddModal}
                  className="px-4 py-2 border rounded-md mr-2 bg-white border border-black hover:bg-black hover:text-white border"
                >
                  Cancel
                </button>
                <button type="submit" className="text-white border bg-black hover:bg-white hover:text-black hover:border border-black focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1 rounded-md">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-40 bg-gray-800 bg-opacity-50">
          <div className="relative p-4 w-full max-w-md bg-white rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Edit Rak</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="kode_rak" className="block mb-2 text-sm font-medium">Kode Rak</label>
                <input
                  type="text"
                  id="kode_rak"
                  name="kode_rak"
                  value={formData.kode_rak}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="nama_rak" className="block mb-2 text-sm font-medium">Nama Rak</label>
                <input
                  type="text"
                  id="nama_rak"
                  name="nama_rak"
                  value={formData.nama_rak}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="lokasi_rak" className="block mb-2 text-sm font-medium">Lokasi Rak</label>
                <input
                  type="text"
                  id="lokasi_rak"
                  name="lokasi_rak"
                  value={formData.lokasi_rak}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2 rounded-md"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={toggleEditModal}
                  className="px-4 py-2 text-sm text-gray-500 border rounded-md mr-2"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-40 bg-gray-800 bg-opacity-50">
          <div className="relative p-4 w-full max-w-md bg-white rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Hapus Rak</h3>
            <p>Apakah Anda yakin ingin menghapus rak dengan kode {deleteData.kode_rak}?</p>
            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={toggleDeleteModal}
                className="px-4 py-2 text-sm text-gray-500 border rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 text-sm text-white bg-red-500 rounded-md"
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
