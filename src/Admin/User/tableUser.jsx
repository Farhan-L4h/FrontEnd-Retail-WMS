import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TabelUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add" or "edit"
  const [formData, setFormData] = useState({
    id: "", // Added to store user ID for edit mode
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "staff",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const currentUsers = users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => {
    fetchUsers();
  }, [currentPage]); // Ensure users are fetched again when currentPage changes

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/user");
      setUsers(response.data.users || []);
    } catch (err) {
      setError(err.message);
      toast.error("Gagal memuat data pengguna!");
    } finally {
      setLoading(false);
    }
  };

  const toggleModal = (mode = "add", user = {}) => {
    setModalMode(mode);
    if (mode === "edit") {
      setFormData({
        id: user.id,
        username: user.username,
        email: user.email,
        password: "",
        password_confirmation: "",
        role: user.role,
      });
    } else {
      resetForm();
    }
    setIsModalOpen(!isModalOpen);
  };

  const resetForm = () => {
    setFormData({
      id: "",
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
      role: "staff",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    if (formData.password && formData.password !== formData.password_confirmation) {
      toast.error("Password dan konfirmasi password tidak cocok!");
      setLoading(false);
      return;
    }
  
    const payload = {
      username: formData.username,
      email: formData.email,
      role: formData.role,
    };
  
    if (formData.password) {
      payload.password = formData.password;
      payload.password_confirmation = formData.password_confirmation;
    }
  
    try {
      if (modalMode === "edit") {
        // Use the user's ID for the update request
        const response = await axios.put(`http://127.0.0.1:8000/api/user/${formData.id}/update`, payload); 
        toast.success("Pengguna berhasil diperbarui!");
      } else {
        await axios.post("http://127.0.0.1:8000/api/user", payload);
        toast.success("Pengguna berhasil ditambahkan!");
      }
      fetchUsers(); // Refresh users list
      toggleModal(); // Close modal
    } catch (err) {
      if (err.response && err.response.status === 422) {
        // Handle validation error from the backend
        const errors = err.response.data.errors;
        let errorMessage = "Periksa inputan Anda:";
        for (const [field, messages] of Object.entries(errors)) {
          errorMessage += `\n${field}: ${messages.join(", ")}`;
        }
        toast.error(errorMessage); // Display validation errors
      } else {
        const errorMessage = err.response?.data?.message || "Gagal menyimpan pengguna!";
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Anda yakin ingin menghapus pengguna ini?")) {
      return;
    }

    try {
      setLoading(true);
      await axios.delete(`http://127.0.0.1:8000/api/user/${id}/destroy`);
      toast.success("Pengguna berhasil dihapus!");
      fetchUsers();
    } catch (err) {
      toast.error("Gagal menghapus pengguna!");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="m-2 bg-white p-4 rounded-md w-full">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex justify-between items-center my-2">
        <h3 className="text-xl font-semibold">Table User</h3>
        <button onClick={() => toggleModal("add")} className="text-green-800 bg-green-200 hover:bg-green-500 text-sm rounded-lg px-3 py-2">
          Tambah Pengguna
        </button>
      </div>

      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs font-medium text-gray-700 uppercase bg-gray-200">
          <tr>
            <th className="px-6 py-3">Username</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Role</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id} className="odd:bg-white even:bg-gray-100">
              <td className="px-6 py-4">{user.username}</td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">{user.role}</td>
              <td className="px-6 py-4">
                <button onClick={() => toggleModal("edit", user)} className="text-blue-500 hover:underline mx-1">
                  Edit
                </button>
                <button onClick={() => handleDelete(user.id)} className="text-red-500 hover:underline mx-1">
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40">
          <div className="bg-white p-4 rounded-md w-96">
            <h3 className="text-xl font-bold mb-4">{modalMode === "add" ? "Tambah Pengguna" : "Edit Pengguna"}</h3>
            <form onSubmit={handleSubmit}>
              <input type="text" name="username" value={formData.username} onChange={handleInputChange} placeholder="Username" className="w-full mb-2 p-2 border rounded" required />
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" className="w-full mb-2 p-2 border rounded" required />
              <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="Password" className="w-full mb-2 p-2 border rounded" required={modalMode === "add"} />
              <input
                type="password"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleInputChange}
                placeholder="Konfirmasi Password"
                className="w-full mb-2 p-2 border rounded"
                required={modalMode === "add"}
              />
              <select name="role" value={formData.role} onChange={handleInputChange} className="w-full mb-2 p-2 border rounded" required>
                <option value="staff">Staff</option>
                <option value="admin">Admin</option>
              </select>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={toggleModal} className="bg-gray-500 text-white px-4 py-2 rounded">
                  Batal
                </button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                  {modalMode === "add" ? "Tambah" : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Pagination */}
      {users.length > itemsPerPage && (
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button key={index} onClick={() => setCurrentPage(index + 1)} className={`mx-1 px-3 py-1 rounded-md ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}>
              {index + 1}
            </button>
          ))}
          {users.length <= itemsPerPage && currentPage !== 1 && setCurrentPage(1)}
        </div>
        
      )}
    </div>
  );
}
