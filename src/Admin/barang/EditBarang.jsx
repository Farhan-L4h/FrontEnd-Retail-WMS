import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../../App.css";
import "../../index.css";
import SideBar from "../../components/SideBar";
import NavBar from "../../components/NavBar";
import LinkPath from "../../components/LinkPath";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditBarang() {
  const { id } = useParams(); // Get ID from URL params
  const [formData, setFormData] = useState({
    image: null, // Image file
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

  // Fetch data for category, supplier, and product details
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [kategoriResponse, supplierResponse, barangResponse] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/kategori"),
          axios.get("http://127.0.0.1:8000/api/supplier"),
          axios.get(`http://127.0.0.1:8000/api/barang/${id}/show`), // Use id param for API request
        ]);
        setKategoriOptions(kategoriResponse.data.data);
        setSupplierOptions(supplierResponse.data.data);

        // Set existing product data to form
        setFormData({
          ...barangResponse.data.data,
          image: null, // Do not set image file, only reference
        });
      } catch (err) {
        setError("Failed to load data.");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]); // Depend on id, so data refreshes when the id changes in URL

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Input validation
    if (!formData.nama_barang || !formData.harga || !formData.id_supplier || !formData.id_kategori) {
      toast.error("Nama barang, harga, kategori, dan supplier wajib diisi!");
      return;
    }

    // Prepare FormData for sending
    const formPayload = new FormData();
    formPayload.append("nama_barang", formData.nama_barang);
    formPayload.append("deskripsi", formData.deskripsi);
    formPayload.append("harga", formData.harga.toString()); 
    formPayload.append("id_kategori", formData.id_kategori.toString()); 
    formPayload.append("id_supplier", formData.id_supplier.toString()); 
    if (formData.image) formPayload.append("image", formData.image);

    try {
      await axios.put(`http://127.0.0.1:8000/api/barang/${id}/update`, formPayload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Barang berhasil diperbarui!");
      navigate("/barang");
    } catch (err) {
      if (err.response && err.response.status === 422) {
        const errors = err.response.data.errors;
        Object.keys(errors).forEach((field) => {
          toast.error(errors[field][0]); // Show specific error message
        });
      } else {
        toast.error("Gagal memperbarui barang. Silakan coba lagi.");
      }
      console.error("Error updating data:", err.response?.data);
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
          <div className="w-full">
            {loading ? (
              <p>Loading data...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white p-5 rounded-md text-start">
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
                    className="bg-gray-400 hover:bg-gray-500 text-white p-2 rounded"
                  >
                    Kembali
                  </button>
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white p-2 rounded"
                  >
                    Simpan
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default EditBarang;
