import React, { useState, useEffect } from "react";
import axios from "axios";

export default function TableKategori() {
  const [kategoriData, setKategoriData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({ id: "", nama_kategori: "" });
  const [deleteData, setDeleteData] = useState({ id: "", nama_kategori: "" });
  const [isEdit, setIsEdit] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Added to manage delete modal state

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(kategoriData.length / itemsPerPage);
  const currentData = kategoriData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Fecht Database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/kategori");
        const kategori = Array.isArray(response.data)
          ? response.data
          : response.data.data;
        setKategoriData(kategori || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // modals
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
  }; // Added to manage delete modal state

  const resetForm = () => {
    setFormData({ id: "", nama_kategori: "" });
    setIsEdit(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // submit respond
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      if (isEdit) {
        if (!formData.id) return alert("ID KATEGORI tidak ditemukan");
  
        await axios.put(`http://127.0.0.1:8000/api/kategori/${formData.id}/update`, {
          nama_kategori: formData.nama_kategori,
        });
      } else {
        await axios.post("http://127.0.0.1:8000/api/kategori", {
          nama_kategori: formData.nama_kategori,
        });
      }
  
      // Refresh data kategori setelah berhasil submit
      const response = await axios.get("http://127.0.0.1:8000/api/kategori");
      setKategoriData(Array.isArray(response.data) ? response.data : response.data.data);
  
      // Tutup modal setelah berhasil
      if (isEdit) toggleEditModal();
      else toggleAddModal();
  
      resetForm(); // Reset form
    } catch (err) {
      alert("Terjadi kesalahan: " + err.message);
    }
  };

  const handleEdit = (kategori) => {
    setFormData(kategori);
    setIsEdit(true);
    toggleEditModal();
  };

  const handleDelete = async () => {
    try {
      console.log("Deleting ID:", deleteData.id); // Debugging
      if (!deleteData.id) {
        alert("ID kategori tidak ditemukan!");
        return;
      }
  
      await axios.delete(`http://127.0.0.1:8000/api/kategori/${deleteData.id}/destroy`);
      const response = await axios.get("http://127.0.0.1:8000/api/kategori");
      setKategoriData(Array.isArray(response.data) ? response.data : response.data.data);
      toggleDeleteModal();
    } catch (err) {
      alert("Terjadi kesalahan: " + err.message);
    }
  };
  

  const confirmDelete = (kategori) => {
    setDeleteData({ id: kategori.id, nama_kategori: kategori.nama_kategori });
    toggleDeleteModal();
  };
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="m-2 bg-white p-4 rounded-md w-max">
      <div className="flex flex-row my-2">
        <div className="text-start flex w-full">
          <h3 className="text-xl font-semibold">Table Kategori</h3>
          <button
            onClick={toggleAddModal}
            className="ml-auto text-green-800 bg-green-300 hover:bg-green-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1"
          >
            Tambah Kategori
          </button>
        </div>
      </div>

      {/* Tabel */}
      <div className="relative overflow-x-auto sm:rounded-lg w-max">
        <table className="w-full text-xs text-left text-gray-500">
          <thead className="text-xs font-medium text-gray-700 uppercase bg-gray-200">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Nama</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((kategori) => (
              <tr
                key={kategori.id}
                className="odd:bg-white even:bg-gray-100 border-gray-600"
              >
                <td className="px-6 py-4">{kategori.id}</td>
                <td className="px-6 py-4">{kategori.nama_kategori}</td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(kategori)}
                    className="text-xs bg-blue-400 text-blue-800 px-3 py-1 rounded-md hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => confirmDelete(kategori)}
                    className="text-xs bg-red-400 text-red-800 px-3 py-1 rounded-md hover:underline"
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
      {kategoriData.length > itemsPerPage && (
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

      {/* Modal Add */}
      {isAddModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-40 bg-gray-800 bg-opacity-50">
          <div className="relative p-4 w-full max-w-md bg-white rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Tambah Kategori</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="nama_kategori"
                  className="block mb-2 text-sm font-medium text-start"
                >
                  Nama Kategori
                </label>
                <input
                  type="text"
                  id="nama_kategori"
                  name="nama_kategori"
                  value={formData.nama_kategori}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2 rounded-md"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={toggleAddModal}
                  className="px-4 py-2 rounded-md mr-2 bg-white border border-black hover:bg-black hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit" className="text-white border bg-black hover:bg-white hover:text-black hover:border border-black focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Edit */}
      {isEditModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-40 bg-gray-800 bg-opacity-50">
          <div className="relative p-4 w-full max-w-md bg-white rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Edit Kategori</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="nama_kategori"
                  className="block mb-2 text-sm font-medium text-start"
                >
                  Nama Kategori
                </label>
                <input
                  type="text"
                  id="nama_kategori"
                  name="nama_kategori"
                  value={formData.nama_kategori}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2 rounded-md"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={toggleEditModal}
                  className="px-4 py-2 rounded-md mr-2 bg-white border border-black hover:bg-black hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="text-white border bg-black hover:bg-white hover:text-black hover:border border-black focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <div className="fixed top-0 z-40 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="relative p-4 w-full max-w-md bg-white rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Are you sure?</h3>
            <p>Apakah Anda yakin ingin menghapus kategori {deleteData.nama_kategori}?</p>
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
