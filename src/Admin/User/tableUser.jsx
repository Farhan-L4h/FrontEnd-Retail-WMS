import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add" or "edit"
  const [formData, setFormData] = useState({
    id: "",
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

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

  const toggleModal = () => {
    setModalOpen(!modalOpen);
    if (!modalOpen) {
      setFormData({
        id: "",
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: "",
      });
    }
  };

  const handleEdit = (user) => {
    setModalMode("edit");
    setFormData(user);
    setModalOpen(true);
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
        await axios.put(`http://127.0.0.1:8000/api/user/${formData.id}/update`, payload);
        toast.success("Pengguna berhasil diperbarui!");
      } else {
        await axios.post("http://127.0.0.1:8000/api/user", payload);
        toast.success("Pengguna berhasil ditambahkan!");
      }
      fetchUsers();
      toggleModal();
    } catch (err) {
      if (err.response && err.response.status === 422) {
        const errors = err.response.data.errors;
        let errorMessage = "Periksa inputan Anda:";
        for (const [field, messages] of Object.entries(errors)) {
          errorMessage += `\n${field}: ${messages.join(", ")}`;
        }
        toast.error(errorMessage);
      } else {
        toast.error("Gagal menyimpan pengguna!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto mt-4">
      {/* <h1 className="text-lg font-bold text-gray-700 mb-4">Manajemen Pengguna</h1> */}
      <ToastContainer position="top-right" autoClose={3000} />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="flex justify-between mb-4">
        <button
          onClick={() => {
            setModalMode("add");
            toggleModal();
          }}
          className="text-green-800 bg-green-200 hover:bg-green-500 hover:text-white text-sm rounded-lg px-3 py-2"
        >
          Tambah Pengguna
        </button>
      </div>

      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Username</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="bg-white border-b">
              <td className="px-4 py-2">{user.id}</td>
              <td className="px-4 py-2">{user.username}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.role}</td>
              <td className="px-4 py-2">
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(user)} className="bg-blue-200 text-blue-800 px-3 py-1 rounded-lg">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(user.id)} className="bg-red-200 text-red-800 px-3 py-1 rounded-lg">
                    Hapus
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-40">
          <div className="bg-white p-6 rounded-md shadow-md w-96">
            <h2 className="text-lg font-semibold mb-4">
              {modalMode === "edit" ? "Edit Pengguna" : "Tambah Pengguna"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block">
                Username:
                <input type="text" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} required className="mt-1 p-2 border rounded w-full ml-0" />
              </label>
              <label className="block">
                Email:
                <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className="mt-1 p-2 border rounded w-full" />
              </label>
              <label className="block">
                Password:
                <input type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="mt-1 p-2 border rounded w-full" />
              </label>
              <label className="block">
                Konfirmasi Password:
                <input type="password" value={formData.password_confirmation} onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })} className="mt-1 p-2 border rounded w-full" />
              </label>
              <label className="block">
                Role:
                <input type="text" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} required className="mt-1 p-2 border rounded w-full" />
              </label>

              <div className="flex justify-end gap-2 mt-4">
                <button onClick={toggleModal} className="bg-gray-200 px-4 py-2 rounded">
                  Batal
                </button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                  {modalMode === "edit" ? "Update" : "Tambah"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
