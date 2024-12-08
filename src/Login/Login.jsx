import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContex';
import Logo from "../assets/image/LogoHitam.png";
import Modal from 'react-modal'; // Import Modal
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Pastikan untuk mengatur elemen modal
Modal.setAppElement('#root');

export default function Login() {
  const [loginInput, setLoginInput] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false); // State untuk membuka/menutup modal
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!loginInput || !password) {
      setError("Username/Email dan password wajib diisi");
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login: loginInput, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const { user, token } = data;

        localStorage.setItem('token', token); // Simpan token
        login({ username: user.username, role: user.role, token });
        
        // Setelah login berhasil, buka modal
        // alert('Login Berhasil');

        setModalOpen(true); 
        
        
        // Simpan role dan arahkan setelah modal ditutup
        setTimeout(() => {
          if (user.role === 'admin') {
            navigate('/dashboard');
          } else if (user.role === 'staff') {
            navigate('/staff/dashboard');
          }
          toast.success(`Login dengan ${user.username} Berhasil`);
        }, 1000); // Delay agar modal bisa tampil sebelum navigasi
      } else {
        setError(data.message || "Login gagal");
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Terjadi kesalahan jaringan');
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk menutup modal
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-screen bg-gray-300">
      <div className="p-6 bg-white rounded shadow-md w-full max-w-sm">
        <div className="flex justify-center items-center mb-6">
          <img src={Logo} className="h-10" alt="Logo" />
          <h2 className="text-2xl font-semibold ml-2">Login</h2>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>} {/* Pesan error di form */}

        <form onSubmit={handleLogin} className="text-start">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="login">
              Username | Email
            </label>
            <input
              type="text"
              id="login"
              value={loginInput}
              onChange={(e) => setLoginInput(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="flex justify-between items-center pt-4">
            <p className="text-xs">
              Belum punya akun?{" "}
              <Link to="/register" className="text-blue-600 hover:underline">
                Daftar sekarang
              </Link>
            </p>
            <button
              type="submit"
              disabled={loading}
              className={`px-3 py-1 bg-black text-white rounded hover:bg-gray-800 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </div>
        </form>
      </div>

      {/* Modal untuk Login berhasil */}
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        contentLabel="Login Successful"
        className="Modal"
        overlayClassName="Overlay"
      >
        <h2>Login Berhasil!</h2>
        <p>Selamat datang kembali, Anda berhasil login.</p>
        <button
          onClick={closeModal}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Oke
        </button>
      </Modal>

      <ToastContainer />
    </div>
  );
}
