import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom"; // Import useLocation hook
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TableRak() {
  const [rakData, setRakData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State for edit modal
  const [formData, setFormData] = useState({ id: "", kode_rak: "", nama_rak: "", lokasi_rak: "" });
  const [deleteData, setDeleteData] = useState({ id: "", kode_rak: "", nama_rak: "", lokasi_rak: "" });
  const [isEdit, setIsEdit] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(rakData.length / itemsPerPage);
  const currentData = rakData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const location = useLocation(); // Get the current location/path

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
        toast.success('Data Berhasil Diupdate')
      } else {
        await axios.post("http://127.0.0.1:8000/api/rak", {
          kode_rak: formData.kode_rak,
          nama_rak: formData.nama_rak,
          lokasi_rak: formData.lokasi_rak,
        });
        toast.success('Data Berhasil Ditambah')
      }

      // Refresh data rak setelah berhasil submit
      const response = await axios.get("http://127.0.0.1:8000/api/rak");
      setRakData(response.data.data || []);

      // Tutup modal setelah berhasil
      if (isEdit) toggleEditModal(); // Close edit modal after success
      else toggleAddModal();

      resetForm(); // Reset form
    } catch (err) {
      alert("Terjadi kesalahan: " + err.message);
    }
  };

  const handleEdit = (rak) => {
    setFormData(rak);
    setIsEdit(true);
    toggleEditModal(); // Open edit modal
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/rak/${deleteData.id}/destroy`);
      const response = await axios.get("http://127.0.0.1:8000/api/rak");
      setRakData(response.data.data);
      toggleDeleteModal();
      toast.success('Data Berhasil Dihapus')
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

  // Determine if we are on the '/dashboard' path
  const isDashboard = location.pathname === "/Dashboard" || location.pathname === "/Staff/dashboard";

  return (
    <div className="m-2 bg-white p-4 rounded-md w-max">
      <div className="flex flex-row my-2">
        <div className="text-start flex w-full">
          <h3 className="text-xl font-semibold">Table Rak</h3>
          {!isDashboard && (
            <button
              onClick={toggleAddModal}
              className="ml-auto text-green-800 bg-green-200 hover:bg-green-500 hover:text-green-200 text-sm rounded-lg px-3 py-2"
            >
              Tambah Rak
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="relative overflow-x-auto sm:rounded-lg w-full">
        <table className="w-full text-xs text-left rtl:text-right text-gray-500">
          <thead className="font-normal text-gray-700 uppercase bg-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3">ID</th>
              <th scope="col" className="px-6 py-3">Kode Rak</th>
              <th scope="col" className="px-6 py-3">Nama Rak</th>
              <th scope="col" className="px-6 py-3">Lokasi Rak</th>
              {!isDashboard && (
                <th scope="col" className="px-6 py-3">Action</th>
              )}
            </tr>
          </thead>
          <tbody>
            {currentData.map((rak) => (
              <tr key={rak.id} className="odd:bg-white even:bg-gray-100 border-gray-600 ">
                <td className="px-6 py-4">{rak.id}</td>
                <td className="px-6 py-4">{rak.kode_rak}</td>
                <td className="px-6 py-4">{rak.nama_rak}</td>
                <td className="px-6 py-4">{rak.lokasi_rak}</td>
                {!isDashboard && (
                  <td className="px-6 py-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(rak)}
                      className="font-medium text-xs bg-blue-200 rounded-xl px-3 py-1 m-2 text-blue-800 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => confirmDelete(rak)}
                      className="font-medium text-xs bg-red-200 rounded-xl px-3 py-1 m-2 text-red-800 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                )}
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
      {rakData.length <= itemsPerPage && currentPage !== 1 && setCurrentPage(1)}


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
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
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
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
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
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={toggleAddModal}
                  className="px-4 py-2 rounded-md mr-2 bg-white border border-black hover:bg-black hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="text-white border bg-black hover:bg-white hover:text-black hover:border border-black focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1"
                >
                  {isEdit ? "Edit Rak" : "Tambah Rak"}
                </button>
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
                <label htmlFor="kode_rak" className="block mb-2 text-sm text-start font-medium">Kode Rak</label>
                <input
                  type="text"
                  id="kode_rak"
                  name="kode_rak"
                  value={formData.kode_rak}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
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
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
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
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={toggleEditModal}
                  className="px-4 py-2 text-white bg-red-600 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-600 rounded-md"
                >
                  {isEdit ? "save" : "Tambah Rak"}
                </button>
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
            <p className="mb-4">Apakah Anda yakin ingin menghapus rak {deleteData.nama_rak}?</p>
            <div className="flex justify-end gap-2">
              <button
                type="button"
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
      <ToastContainer />
    </div>
  );
}
