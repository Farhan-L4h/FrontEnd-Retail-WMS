import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import API from "../services/api";
import Logo from "../assets/image/LogoHitam.png";

export default function Register() {
  const navigate = useNavigate();  // Initialize useNavigate hook
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "", // Add role field
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    // Validasi password dan konfirmasi password
    if (formData.password !== formData.password_confirmation) {
      setError("Password dan Konfirmasi Password tidak sama.");
      setLoading(false);
      return;
    }

    try {
      const response = await API.post("/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.password_confirmation, // Ensure confirmation password is sent
      });

      setSuccessMessage("Registrasi berhasil! Silakan login.");
      setFormData({ username: "", email: "", password: "", password_confirmation: "" });

      // Display modal alert for successful registration
      alert("Registrasi berhasil! Silakan login.");

      // Redirect to home page after successful registration
        navigate("/");  // Redirect to home page ("/")

    } catch (err) {
      setError(err.response?.data?.message || "Terjadi kesalahan saat registrasi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-screen bg-gray-300">
      <div className="p-6 bg-white rounded shadow-md w-full max-w-sm">
        <div className="flex justify-center items-center mb-2">
          <img src={Logo} className="h-10" alt="Logo" />
          <h2 className="text-2xl font-semibold">Register</h2>
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm text-start font-medium mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-start font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-start font-medium mb-2" htmlFor="password">
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
          <div className="mb-4">
            <label className="block text-sm text-start font-medium mb-2" htmlFor="password_confirmation">
              Konfirmasi Password
            </label>
            <input
              type="password"
              id="password_confirmation"
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="flex justify-end content-center gap-2 items-center pt-4">
            <p className="text-xs">
              Sudah punya akun?{" "}
              <a href="/" className="text-blue-600 hover:underline">
                Login Disini
              </a>
            </p>
            <button
              type="submit"
              disabled={loading}
              className={`px-3 py-1 border bg-black text-white rounded hover:bg-white hover:text-black hover:border border-black ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Loading..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
