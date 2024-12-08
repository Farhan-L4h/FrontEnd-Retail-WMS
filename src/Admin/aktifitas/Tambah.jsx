import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContex"; // Import useAuth

import "../../App.css";
import "../../index.css";
import SideBar from "../../components/SideBar";
import NavBar from "../../components/Navbar2";
import LinkPath from "../../components/LinkPath";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MasukAktif() {
  const [formData, setFormData] = useState({
    id_barang: "",
    jumlah_barang: "",
    id_rak: "",
    alasan: "diterima",
    tanggal: "",
    harga_barang: "",
    total: 0,
    status: "masuk", // Automatically set to "Keluar"
    username: "", // Changed from user_id to username
    exp_barang: "", // Added exp_barang
  });

  const [barangOptions, setBarangOptions] = useState([]);
  const [rakOptions, setRakOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useAuth(); // Destructuring user and userId from AuthContext

  const navigate = useNavigate();
  console.log(user); // Periksa apakah user sudah ada

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [barangResponse, rakResponse] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/barang"),
          axios.get("http://127.0.0.1:8000/api/rak"),
        ]);
        setBarangOptions(barangResponse.data.data);
        setRakOptions(rakResponse.data.data);
  
        // Set username dari user
        if (user && user.username) {
          setFormData((prevData) => ({
            ...prevData,
            username: user.username, // Ambil username dari useAuth
          }));
          console.log("Username pengguna:", user.username); // Debugging
        } else {
          console.warn("Pengguna tidak memiliki username.");
        }
      } catch (err) {
        setError("Gagal memuat data");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [user]); // Dependensi hanya user
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedFormData = {
        ...prev,
        [name]: value,
      };

      // Calculate the total whenever jumlah_barang or harga_barang changes
      if (name === "jumlah_barang" || name === "harga_barang") {
        const jumlah = parseFloat(updatedFormData.jumlah_barang) || 0;
        const harga = parseFloat(updatedFormData.harga_barang) || 0;
        updatedFormData.total = jumlah * harga;
      }

      return updatedFormData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const {
      id_barang,
      jumlah_barang,
      id_rak,
      alasan,
      tanggal,
      harga_barang,
      total,
      status,
      username,
      exp_barang, // Added exp_barang
    } = formData;
  
    if (
      !id_barang ||
      !jumlah_barang ||
      !id_rak ||
      !alasan ||
      !tanggal ||
      !harga_barang
    ) {
      toast.error("Semua field wajib diisi!");
      return;
    }
  
    const formPayload = new FormData();
    Object.keys(formData).forEach((key) =>
      formPayload.append(key, formData[key])
    );
  
    try {
      await axios.post("http://127.0.0.1:8000/api/aktivitas", formPayload);
      setFormData({
        id_barang: "",
        jumlah_barang: "",
        id_rak: "",
        alasan: "diambil",
        tanggal: "",
        harga_barang: "",
        total: 0,
        status: "Keluar", // Keep the default status "Keluar"
        username: "", // Reset the username after submission
        exp_barang: "", // Reset exp_barang after submission
      });
      toast.success("Barang berhasil Disimpan!");
      setTimeout(() => navigate("/AktifitasBarang"), 1000);
    } catch (err) {
      // Ambil pesan error dari response API
      const errorMessage =
        err.response?.data?.message || "Gagal menyimpan barang. Silakan coba lagi.";
  
      // Tampilkan pesan error dengan react-toastify
      toast.error(errorMessage);
  
      // Debugging
      console.error("Gagal menyimpan data:", err);
    }
  };
  

  return (
    <>
      <div className="fixed top-0 w-full z-40">
        <NavBar />
      </div>
      <div className="flex flex-row min-h-screen pt-16">
        <div className="w-64 bg-gray-100 fixed top-7 h-full z-30">
          <SideBar />
        </div>
        <div className="ml-64 p-6 w-full">
          <LinkPath />
          <div className="flex justify-center w-full">
            {loading ? (
              <p>Loading data...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white p-5 rounded-md text-start w-1/2"
              >
                <div className="flex flex-col gap-4">
                  <InputField
                    label="Nama Barang"
                    type="select"
                    name="id_barang"
                    value={formData.id_barang}
                    options={barangOptions}
                    onChange={handleChange}
                    required
                  />

                  <InputField
                    label="Jumlah Barang"
                    type="number"
                    name="jumlah_barang"
                    value={formData.jumlah_barang}
                    onChange={handleChange}
                    placeholder="Masukkan Jumlah"
                    required
                  />

                  <InputField
                    label="Harga Barang"
                    type="number"
                    name="harga_barang"
                    value={formData.harga_barang}
                    onChange={handleChange}
                    placeholder="Masukkan Harga"
                    required
                  />

                  <InputField
                    label="Lokasi Rak"
                    type="select"
                    name="id_rak"
                    value={formData.id_rak}
                    options={rakOptions}
                    onChange={handleChange}
                    required
                  />

                  <InputField
                    label="Tanggal"
                    type="date"
                    name="tanggal"
                    value={formData.tanggal}
                    onChange={handleChange}
                    required
                  />

                  <InputField
                    label="Total"
                    type="text"
                    name="total"
                    value={formData.total}
                    disabled
                    required
                  />

                  <InputField
                    label="Exp Barang"
                    type="date"
                    name="exp_barang"
                    value={formData.exp_barang}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex justify-end gap-2 mt-4">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        id_barang: "",
                        jumlah_barang: "",
                        id_rak: "",
                        alasan: "",
                        tanggal: "",
                        harga_barang: "",
                        total: 0,
                        status: "Keluar",
                        username: "", // Reset username on cancel
                        exp_barang: "", // Reset exp_barang on cancel
                      })
                    }
                    className="font-xs border border-black bg-white text-black hover:bg-black hover:text-white px-3 py-1 rounded"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="font-xs border border-black text-white bg-black hover:bg-white hover:text-black px-3 py-1 rounded"
                  >
                    Simpan
                  </button>
                </div>
              </form>
            )}
            <ToastContainer position="top-right" autoClose={3000} />
          </div>
        </div>
      </div>
    </>
  );
}

const InputField = ({
  label,
  type,
  name,
  value,
  options,
  onChange,
  ...rest
}) => (
  <div className="mb-5">
    <label htmlFor={name} className="block text-sm font-medium">
      {label}
    </label>
    {type === "select" ? (
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="border rounded-lg w-full p-2.5"
        {...rest}
      >
        <option value="" disabled>
          {`Pilih ${label}`}
        </option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.nama || option.nama_barang || option.nama_rak}
          </option>
        ))}
      </select>
    ) : (
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="border rounded-lg w-full p-2.5"
        {...rest}
      />
    )}
  </div>
);

export default MasukAktif;
