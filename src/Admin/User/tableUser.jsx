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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteData, setDeleteData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 7;

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

  const handleDelete = (id, username) => {
    setDeleteData({ id, username });
    setIsDeleteModalOpen(true);
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

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const currentData = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="m-2 bg-white p-4 rounded-md w-full">
      <div className="container mx-auto mt-4">
        {/* <h1 className="text-lg font-bold text-gray-700 mb-4">Manajemen Pengguna</h1> */}
        <ToastContainer position="top-right" autoClose={3000} />

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="flex flex-row my-2">
          <div className="text-start flex w-full">
            <h3 className="text-xl font-semibold">User Management</h3>
            <button
              onClick={() => {
                setModalMode("add");
                toggleModal();
              }}
              className="ml-auto text-green-800 bg-green-200 hover:bg-green-500 hover:text-white text-sm rounded-lg px-3 py-2"
            >
              Tambah Pengguna
            </button>
          </div>
        </div>

        <div className="relative overflow-x-auto sm:rounded-lg w-full">
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
              {currentData.map((user, index) => (
                <tr key={user.id} className="bg-white border-b">
                  <td className="px-4 py-2">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td className="px-4 py-2">{user.username}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.role}</td>
                  <td className="px-4 py-2">
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(user)} className="font-medium text-xs bg-blue-200 rounded-xl px-3 py-1 ms-2 text-blue-800 hover:underline">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(user.id, user.username)} className="font-medium p-2 ms-1 text-xs rounded-xl bg-red-200 text-red-800 px-2 py-1 hover:underline">
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {users.length > itemsPerPage && (
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


          {modalOpen && (
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-40 bg-gray-800 bg-opacity-50">
              <div className="relative p-4 w-full max-w-md bg-white rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">{modalMode === "edit" ? "Edit Pengguna" : "Tambah Pengguna"}</h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-start">
                      Username:
                      <input type="text" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} required className="w-full border border-gray-300 p-2 rounded-md" />
                    </label>
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-start">
                      Email:
                      <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className="w-full border border-gray-300 p-2 rounded-md" />
                    </label>
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-start">
                      Password:
                      <input type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full border border-gray-300 p-2 rounded-md" />
                    </label>
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-start">
                      Konfirmasi Password:
                      <input type="password" value={formData.password_confirmation} onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })} className="w-full border border-gray-300 p-2 rounded-md" />
                    </label>
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-start">
                      Role:
                      <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} required className="w-full border border-gray-300 p-2 rounded-md">
                        <option value="" disabled>
                          Pilih Role
                        </option>
                        <option value="staff">Staff</option>
                        <option value="admin">Admin</option>
                      </select>
                    </label>
                  </div>
            
                  <div className="flex justify-end">
                    <button onClick={toggleModal} className="px-4 py-2 rounded-md mr-2 bg-white border border-black hover:bg-black hover:text-white">
                      Batal
                    </button>
                    <button type="submit" className="text-white border bg-black hover:bg-white hover:text-black hover:border border-black focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1">
                      {modalMode === "edit" ? "Update" : "Tambah"}
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
                <p>Apakah Anda yakin ingin menghapus pengguna {deleteData.username}?</p>
                <div className="flex justify-end mt-4">
                  <button onClick={() => setIsDeleteModalOpen(false)} className="mr-2 bg-gray-200 px-4 py-2 rounded-md">
                    Batal
                  </button>
                  <button
                    onClick={async () => {
                      try {
                        setLoading(true);
                        await axios.delete(`http://127.0.0.1:8000/api/user/${deleteData.id}/destroy`);
                        toast.success("Pengguna berhasil dihapus!");
                        fetchUsers();
                      } catch (err) {
                        toast.error("Gagal menghapus pengguna!");
                      } finally {
                        setLoading(false);
                        setIsDeleteModalOpen(false);
                      }
                    }}
                    className="text-white bg-red-600 px-4 py-2 rounded-md"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
