import React, { useState } from "react";
import API from "../services/api";

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
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
      const response = await API.post("/user", formData);
      const { token } = response.data;

      if (token) {
        localStorage.setItem("authToken", token);
        alert("Login berhasil!");
        window.location.href = "/dashboard"; // Redirect to the dashboard or another page
      } else {
        throw new Error("Token tidak ditemukan dalam respons.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login gagal. Periksa kembali kredensial Anda."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-screen bg-gray-300">
      <div className="p-6 bg-white rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm text-start font-medium mb-2"
              htmlFor="username"
            >
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
            <label
              className="block text-sm text-start font-medium mb-2"
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
          <div className="flex justify-end content-center gap-2 items-center pt-4">
            <p className="text-xs"> 
              Belum punya akun?{" "}
              <a href="/register" className="text-blue-600 hover:underline">
                Register sekarang
              </a>
            </p>

            <button
              type="submit"
              disabled={loading}
              className={`px-3 py-1 border bg-black text-white rounded hover:bg-white hover:text-black hover:border border-black ${
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
