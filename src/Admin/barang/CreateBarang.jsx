import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../App.css";
import "../../index.css";
import SideBar from "../../components/SideBar";
import NavBar from "../../components/Navbar2";
import LinkPath from "../../components/LinkPath";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function FormBarang() {
  const [formData, setFormData] = useState({
    image: "", // Gambar sebagai string Base64
    id_kategori: "",
    id_supplier: "",
    nama_barang: "",
    deskripsi: "",
    harga: "",
  });

  const [kategoriOptions, setKategoriOptions] = useState([]);
  const [supplierOptions, setSupplierOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Memuat data kategori dan supplier
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [kategoriResponse, supplierResponse] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/kategori"),
          axios.get("http://127.0.0.1:8000/api/supplier"),
        ]);
        setKategoriOptions(kategoriResponse.data.data);
        setSupplierOptions(supplierResponse.data.data);
      } catch (err) {
        setError("Gagal memuat data");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      // Simpan file gambar ke state
      setFormData((prev) => ({
        ...prev,
        [name]: files[0], // Simpan gambar sebagai file
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Validasi
    if (!formData.nama_barang || !formData.harga || !formData.id_supplier) {
      toast.error("Nama barang, harga, dan supplier wajib diisi!");
      return;
    }
  
    const formPayload = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "image" && formData[key]) {
        formPayload.append(key, formData[key], formData[key].name);
      } else {
        formPayload.append(key, formData[key]);
      }
    });
  
    axios
      .post("http://127.0.0.1:8000/api/barang", formPayload, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        setFormData({
          nama_barang: "",
          id_kategori: "",
          tanggal_expired: "",
          harga: "",
          deskripsi: "",
          id_supplier: "",
          image: null,
        });
        toast.success("Barang berhasil disimpan!");
        setTimeout(() => navigate("/barang"), 1000);
      })
      .catch((err) => {
        toast.error("Gagal menyimpan barang. Silakan coba lagi.");
        console.error("Gagal menyimpan data:", err);
      });
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
          <div className="w-full">
            {loading ? (
              <p>Loading data...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white p-5 rounded-md text-start"
              >
                <div className="flex gap-4">
                  <div className="w-1/2">
                    {/* Input Nama Barang */}
                    <div className="mb-5">
                      <label
                        htmlFor="nama_barang"
                        className="block text-sm font-medium"
                      >
                        Nama Barang
                      </label>
                      <input
                        type="text"
                        id="nama_barang"
                        name="nama_barang"
                        value={formData.nama_barang}
                        onChange={handleChange}
                        className="border rounded-lg w-full p-2.5"
                        placeholder="Masukkan Nama"
                        required
                      />
                    </div>

                    {/* Select Kategori */}
                    <div className="mb-5">
                      <label
                        htmlFor="id_kategori"
                        className="block text-sm font-medium"
                      >
                        Kategori
                      </label>
                      <select
                        id="id_kategori"
                        name="id_kategori"
                        value={formData.id_kategori}
                        onChange={handleChange}
                        className="border rounded-lg w-full p-2.5"
                        required
                      >
                        <option value="" disabled>
                          Pilih Kategori
                        </option>
                        {kategoriOptions.length > 0 ? (
                          kategoriOptions.map((kategori) => (
                            <option key={kategori.id} value={kategori.id}>
                              {kategori.nama_kategori}
                            </option>
                          ))
                        ) : (
                          <option disabled>Data tidak tersedia</option>
                        )}
                      </select>
                    </div>
                    {/* Input Harga */}
                    <div className="mb-5">
                      <label
                        htmlFor="harga"
                        className="block text-sm font-medium"
                      >
                        Harga
                      </label>
                      <input
                        type="number"
                        id="harga"
                        name="harga"
                        value={formData.harga}
                        onChange={handleChange}
                        className="border rounded-lg w-full p-2.5"
                        placeholder="Masukkan Harga"
                        required
                      />
                    </div>
                  </div>

                  <div className="w-1/2">
                    {/* Upload Gambar */}
                    <div className="mb-5">
                      <label
                        htmlFor="image"
                        className="block text-sm font-medium"
                      >
                        Upload Gambar
                      </label>
                      <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleChange}
                        className="border rounded-lg w-full"
                      />
                    </div>
                    {/* Select Supplier */}
                    <div className="mt-5">
                      <label htmlFor="id_supplier">Pilih Supplier</label>
                      <select
                        id="id_supplier"
                        name="id_supplier"
                        value={formData.id_supplier}
                        onChange={handleChange}
                        className="border rounded-lg w-full p-2.5"
                        required
                      >
                        <option value="" disabled>
                          Pilih Supplier
                        </option>
                        {supplierOptions.length > 0 ? (
                          supplierOptions.map((supplier) => (
                            <option key={supplier.id} value={supplier.id}>
                              {supplier.nama_supplier}
                            </option>
                          ))
                        ) : (
                          <option disabled>Tidak ada supplier tersedia</option>
                        )}
                      </select>
                    </div>

                    <div className="mt-5 mb-5">
                      <label
                        htmlFor="deskripsi"
                        className="block text-sm font-medium"
                      >
                        Deskripsi
                      </label>
                      <textarea
                        id="deskripsi"
                        name="deskripsi"
                        value={formData.deskripsi}
                        onChange={handleChange}
                        className="border rounded-lg w-full p-2.5"
                        placeholder="Masukkan Deskripsi"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => navigate("/barang")} // Kembali tanpa simpan
                    className="bg-white-400 border border-black hover:bg-black hover:text-white px-3 py-1 rounded"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="bg-black border text-white border-black hover:bg-white hover:text-black px-3 py-1 rounded"
                  >
                    Simpan
                  </button>
                </div>
              </form>
            )}

            {/* toast */}
            <ToastContainer position="top-right" autoClose={3000} />

          </div>
        </div>
      </div>
    </>
  );
}

export default FormBarang;
