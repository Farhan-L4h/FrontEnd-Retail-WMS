import React, { useState, useEffect } from "react";
import axios from "axios";

export default function TableSupplier() {
  const [supplierData, setSupplierData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({ id: "", nama_supplier: "", kontak: "", alamat: "" });
  const [deleteData, setDeleteData] = useState({ id: "", nama_supplier: "", kontak: "", alamat: "" });
  const [isEdit, setIsEdit] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10  ;

  const totalPages = Math.ceil(supplierData.length / itemsPerPage);
  const currentData = supplierData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/supplier");
        const supplier = Array.isArray(response.data)
          ? response.data
          : response.data.data;
        setSupplierData(supplier || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
    setFormData({ id: "", nama_supplier: "", kontak: "", alamat: "" });
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
        if (!formData.id) return alert("ID supplier tidak ditemukan");
  
        await axios.put(`http://127.0.0.1:8000/api/supplier/${formData.id}/update`, {
          nama_supplier: formData.nama_supplier,
          kontak: formData.kontak,
          alamat: formData.alamat,
        });
      } else {
        await axios.post("http://127.0.0.1:8000/api/supplier", {
          nama_supplier: formData.nama_supplier,
          kontak: formData.kontak,
          alamat: formData.alamat,
        });
      }
  
      // Refresh data supplier setelah berhasil submit
      const response = await axios.get("http://127.0.0.1:8000/api/supplier");
      setSupplierData(Array.isArray(response.data) ? response.data : response.data.data);
  
      // Tutup modal setelah berhasil
      if (isEdit) toggleEditModal();
      else toggleAddModal();
  
      resetForm(); // Reset form
    } catch (err) {
      alert("Terjadi kesalahan: " + err.message);
    }
  };
  

  const handleEdit = (supplier) => {
    setFormData(supplier);
    setIsEdit(true);
    toggleEditModal();
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/supplier/${deleteData.id}/destroy`);
      const response = await axios.get("http://127.0.0.1:8000/api/supplier");
      setSupplierData(Array.isArray(response.data) ? response.data : response.data.data);
      toggleDeleteModal();
    } catch (err) {
      alert("Terjadi kesalahan: " + err.message);
    }
  };

  const confirmDelete = (supplier) => {
    setDeleteData(supplier);
    toggleDeleteModal();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="m-2 bg-white p-4 rounded-md w-full">
      <div className="flex flex-row my-2">
        <div className="text-start flex w-full">
          <h3 className="text-xl font-semibold">Table Supplier</h3>
          <button
            onClick={toggleAddModal}
            className="ml-auto text-green-800 bg-green-300 hover:bg-green-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1"
          >
            Tambah Supplier
          </button>
        </div>
      </div>

{/* Table Supplier */}
      <div className="relative overflow-x-auto sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs font-medium text-gray-700 uppercase bg-gray-200 bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Nama Supplier
              </th>
              <th scope="col" className="px-6 py-3">
                Kontak
              </th>
              <th scope="col" className="px-6 py-3">
                Alamat
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((supplier) => (
              <tr
                key={supplier.id}
                className="odd:bg-white even:bg-gray-100 border-gray-600"
              >
                <td className="px-6 py-4">{supplier.id}</td>
                <td className="px-6 py-4">{supplier.nama_supplier}</td>
                <td className="px-6 py-4">{supplier.kontak}</td>
                <td className="px-6 py-4">{supplier.alamat}</td>
                <td className="px-6 py-4">
                  <a
                    onClick={() => handleEdit(supplier)}
                    className="font-medium text-xs bg-blue-400 rounded-md px-3 py-1 m-2 text-blue-800 hover:underline"
                  >
                    Edit
                  </a>
                  <a
                    onClick={() => confirmDelete(supplier)}
                    className="font-medium p-2 m-1 text-xs rounded-md bg-red-400 text-red-800 px-2 py-1  hover:underline"
                  >
                    Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

{/* Pagination */}
      {supplierData.length > itemsPerPage && (
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`mx-1 px-3 py-1 rounded-md ${
                currentPage === index + 1
                  ? "border border-blue-500 bg-white text-black hover:bg-blue-500 hover:text-white"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}

{/* ModalCreate */}
      {isAddModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-40 bg-gray-800 bg-opacity-50">
          <div className="relative p-4 w-full max-w-md bg-white rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Tambah Supplier</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="nama_supplier"
                  className="block mb-2 text-sm font-medium text-start"
                >
                  Nama Supplier
                </label>
                <input
                  type="text"
                  id="nama_supplier"
                  name="nama_supplier"
                  value={formData.nama_supplier}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="kontak"
                  className="block mb-2 text-sm font-medium text-start"
                >
                  Kontak
                </label>
                <input
                  type="text"
                  id="kontak"
                  name="kontak"
                  value={formData.kontak}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="alamat"
                  className="block mb-2 text-sm font-medium text-start"
                >
                  Alamat
                </label>
                <input
                  type="text"
                  id="alamat"
                  name="alamat"
                  value={formData.alamat}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2 rounded-md"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={toggleAddModal}
                  className="mr-2 bg-gray-200 px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="text-white bg-blue-600 px-4 py-2 rounded-md"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

{/* ModalEdit */}
      {isEditModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-40 bg-gray-800 bg-opacity-50">
          <div className="relative p-4 w-full max-w-md bg-white rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Edit Supplier</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="nama_supplier"
                  className="block mb-2 text-sm font-medium"
                >
                  Nama Supplier
                </label>
                <input
                  type="text"
                  id="nama_supplier"
                  name="nama_supplier"
                  value={formData.nama_supplier}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="kontak"
                  className="block mb-2 text-sm font-medium"
                >
                  Kontak
                </label>
                <input
                  type="text"
                  id="kontak"
                  name="kontak"
                  value={formData.kontak}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="alamat"
                  className="block mb-2 text-sm font-medium"
                >
                  Alamat
                </label>
                <input
                  type="text"
                  id="alamat"
                  name="alamat"
                  value={formData.alamat}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2 rounded-md"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={toggleEditModal}
                  className="mr-2 bg-gray-200 px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="text-white bg-blue-600 px-4 py-2 rounded-md"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="relative p-4 w-full max-w-md bg-white rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Are you sure?</h3>
            <p>Apakah Anda yakin ingin menghapus supplier {deleteData.nama_supplier}?</p>
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
