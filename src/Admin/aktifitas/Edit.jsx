import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContex";
import "../../App.css";
import "../../index.css";
import SideBar from "../../components/SideBar";
import NavBar from "../../components/Navbar2";
import LinkPath from "../../components/LinkPath";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditAktif() {
  const [formData, setFormData] = useState({
    id_barang: "",
    jumlah_barang: "",
    id_rak: "",
    alasan: "",
    tanggal: new Date().toISOString().split("T")[0],
    status: "",
    username: "",
    exp_barang: "",
  });

  const [barangOptions, setBarangOptions] = useState([]);
  const [rakOptions, setRakOptions] = useState([]);
  const [stokBarang, setStokBarang] = useState(null); // State untuk menyimpan stok barang
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams(); // Mendapatkan ID aktivitas dari parameter URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Ambil data barang, rak, dan aktivitas
        const [barangResponse, rakResponse, aktivitasResponse] =
          await Promise.all([
            axios.get("http://127.0.0.1:8000/api/barang"),
            axios.get("http://127.0.0.1:8000/api/rak"),
            axios.get(`http://127.0.0.1:8000/api/aktivitas/${id}/show`), // Ambil data aktivitas
          ]);

        setBarangOptions(barangResponse.data.data || []);
        setRakOptions(rakResponse.data.data || []);

        // Validasi data aktivitas sebelum digunakan
        const aktivitas = aktivitasResponse.data?.data || {};
        setFormData({
          id_barang: aktivitas.id_barang || "", // Pastikan ini benar
          jumlah_barang: aktivitas.jumlah_barang || "",
          id_rak: aktivitas.id_rak || "",
          alasan: aktivitas.alasan || "",
          tanggal: new Date().toISOString().split("T")[0],
          status: aktivitas.status || "",
          username: aktivitas.username || user?.username || "",
          exp_barang: aktivitas.exp_barang || "",
        });

        // Ambil stok barang jika `id_barang` ada
        if (aktivitas.id_barang) {
          const stokResponse = await axios.get(
            `http://127.0.0.1:8000/api/barang/${aktivitas.id_barang}/show`
          );
          setStokBarang(stokResponse.data.data?.stok || 0);
        } else {
          setStokBarang(null);
        }
      } catch (err) {
        setError("Gagal memuat data");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.id_barang ||
      !formData.jumlah_barang ||
      !formData.id_rak ||
      !formData.exp_barang
    ) {
      toast.error("Semua field wajib diisi!");
      return;
    }

    try {
      await axios.put(
        `http://127.0.0.1:8000/api/aktivitas/${id}/update`,
        formData
      ); // Gunakan PUT untuk update
      toast.success("Aktivitas berhasil diperbarui!");
      setTimeout(() => navigate("/AktifitasBarang"), 1000);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Gagal memperbarui aktivitas. Silakan coba lagi.";
      toast.error(errorMessage);
      console.error("Error updating data:", err);
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
                    <select
                      id="id_barang"
                      name="id_barang"
                      value={formData.id_barang}
                      onChange={handleChange}
                      className="border rounded-lg w-full p-2.5"
                      required
                      disabled
                    >
                      {barangOptions.map((barang) => (
                        <option key={barang.id} value={barang.id}>
                          {barang.nama_barang}
                        </option>
                      ))}
                    </select>
  
                    {formData.id_barang && stokBarang !== null && (
                      <p className="text-sm text-gray-600">
                        Stok saat ini: {stokBarang}
                      </p>
                    )}
  
                    <div>
                      <label htmlFor="jumlah_barang" className="block text-sm font-medium">
                        Jumlah Barang
                      </label>
                      <input
                        type="number"
                        id="jumlah_barang"
                        name="jumlah_barang"
                        value={formData.jumlah_barang}
                        onChange={handleChange}
                        placeholder="Masukkan Jumlah"
                        className="border rounded-lg w-full p-2.5"
                        required
                      />
                    </div>
  
                    <div>
                      <label htmlFor="id_rak" className="block text-sm font-medium">
                        Rak
                      </label>
                      <select
                        id="id_rak"
                        name="id_rak"
                        value={formData.id_rak}
                        onChange={handleChange}
                        className="border rounded-lg w-full p-2.5"
                        required
                      >
                        {rakOptions.map((rak) => (
                          <option key={rak.id} value={rak.id}>
                            {rak.nama_rak}
                          </option>
                        ))}
                      </select>
                    </div>
  
                    <div>
                      <label htmlFor="exp_barang" className="block text-sm font-medium">
                        Exp Barang
                      </label>
                      <input
                        type="date"
                        id="exp_barang"
                        name="exp_barang"
                        value={formData.exp_barang}
                        onChange={handleChange}
                        className="border rounded-lg w-full p-2.5"
                        required
                      />
                    </div>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                  <button
                    type="button"
                    onClick={() => navigate("/AktifitasBarang")}
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

export default EditAktif;
