import React, { useState } from "react";
import API from "../services/api";
import Logo from "../assets/image/LogoHitam.png";

export default function Login() {
  const [formData, setFormData] = useState({ login: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await API.post("/login", formData); // Gunakan endpoint yang benar
      const { token } = response.data;

      if (token) {
        localStorage.setItem("authToken", token);
        alert("Login berhasil!");
        window.location.href = "/dashboard";
      } else {
        throw new Error("Token tidak ditemukan dalam respons.");
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Username atau password salah.");
      } else if (err.response?.status === 400) {
        setError("Permintaan tidak valid.");
      } else {
        setError(err.response?.data?.message || "Login gagal. Coba lagi.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-screen bg-gray-300">
      <div className="p-6 bg-white rounded shadow-md w-full max-w-sm">

      <div className="flex justify-center items-center mb-6">
      <img src={Logo} className="h-10" alt="Flowbite Logo" />
        <h2 className="text-2xl font-semibold">Login</h2>
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="text-start">
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="login"
            >
              Username | Email
            </label>
            <input
              type="text"
              id="login"
              name="login"
              value={formData.login}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="flex justify-between items-center pt-4">
            <p className="text-xs">
              Belum punya akun?{" "}
              <a href="/register" className="text-blue-600 hover:underline">
                Daftar sekarang
              </a>
            </p>
            <button
              type="submit"
              disabled={loading}
              className={`px-3 py-1 bg-black text-white rounded hover:bg-gray-800 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
