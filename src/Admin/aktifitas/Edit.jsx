import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../../App.css";
import "../../index.css";
import SideBar from "../../components/SideBar";
import NavBar from "../../components/Navbar2";
import LinkPath from "../../components/LinkPath";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditBarang() {
  const { id } = useParams(); // Get ID from URL params
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

  const [rakOptions, setrakOptions] = useState([]);
  const [barangOptions, setbarangOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Fetch data for category, supplier, and product details
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [rakResponse, barangResponse, aktivitasResponse] =
          await Promise.all([
            axios.get("http://127.0.0.1:8000/api/rak"),
            axios.get("http://127.0.0.1:8000/api/barang"),
            axios.get(`http://127.0.0.1:8000/api/aktivitas/${id}/show`), // Use id param for API request
          ]);

        setrakOptions(rakResponse.data.data);
        setbarangOptions(barangResponse.data.data);

        // Set existing product data to form
        const aktivitasData = aktivitasResponse.data.data;
        setFormData({
          id_barang: aktivitasData.id_barang || "",
          jumlah_barang: aktivitasData.jumlah_barang || "",
          id_rak: aktivitasData.id_rak || "",
          alasan: aktivitasData.alasan || "",
          tanggal:aktivitasData.tanggal || new Date().toISOString().split("T")[0],
          status: aktivitasData.status || "",
          username: aktivitasData.username || "",
          harga_barang: aktivitasData.harga_barang || "",
          exp_barang: aktivitasData.exp_barang
            ? new Date(aktivitasData.exp_barang).toISOString().split("T")[0]
            : "",
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
    if (
      !formData.id_barang ||
      !formData.jumlah_barang ||
      !formData.id_rak ||
      !formData.alasan ||
      !formData.exp_barang
    ) {
      toast.error("field wajib diisi!");
      return;
    }

    // Prepare FormData for sending
    const formPayload = {
      id_barang: formData.id_barang,
      jumlah_barang: formData.jumlah_barang,
      id_rak: formData.id_rak,
      alasan: formData.alasan,
      exp_barang: formData.exp_barang,
      username: formData.username,
      harga_barang: formData.harga_barang,
      status: formData.status,
    };

    try {
      await axios.put(
        `http://127.0.0.1:8000/api/aktivitas/${id}/update`,
        formPayload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success("Barang berhasil diperbarui!");
      setTimeout(() => navigate("/AktifitasBarang"), 2000);
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
          <ToastContainer position="top-right" autoClose={3000} />
          <div className="w-full flex justify-center">
            {loading ? (
              <p>Loading data...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white p-5 rounded-md text-start"
              >
                <div className="w-full">
                  {/* Input Id Barang */}
                  <div className="mb-5">
                    <label
                      htmlFor="id_barang"
                      className="block text-sm font-medium"
                    >
                      Pilih Barang
                    </label>
                    <select
                      id="id_barang"
                      name="id_barang"
                      value={formData.id_barang}
                      onChange={handleChange}
                      className="border rounded-lg w-full p-2.5"
                      required
                      disabled
                    >
                      <option value="" disabled>
                        Pilih barang
                      </option>
                      {barangOptions.length > 0 ? (
                        barangOptions.map((barang) => (
                          <option key={barang.id} value={barang.id}>
                            {barang.nama_barang}
                          </option>
                        ))
                      ) : (
                        <option disabled>Data tidak tersedia</option>
                      )}
                    </select>
                  </div>

                  {/* Select rak */}
                  <div className="mb-5">
                    <label
                      htmlFor="id_rak"
                      className="block text-sm font-medium"
                    >
                      Pilih Rak
                    </label>
                    <select
                      id="id_rak"
                      name="id_rak"
                      value={formData.id_rak}
                      onChange={handleChange}
                      className="border rounded-lg w-full p-2.5"
                      required
                    >
                      <option value="" disabled>
                        Pilih Rak
                      </option>
                      {rakOptions.length > 0 ? (
                        rakOptions.map((rak) => (
                          <option key={rak.id} value={rak.id}>
                            {rak.nama_rak}
                          </option>
                        ))
                      ) : (
                        <option disabled>Data tidak tersedia</option>
                      )}
                    </select>
                  </div>

                  {/* jumlah barang */}
                  <div className="mb-5">
                    <label
                      htmlFor="jumlah_barang"
                      className="block text-sm font-medium"
                    >
                      jumlah_barang
                    </label>
                    <input
                      type="number"
                      id="jumlah_barang"
                      name="jumlah_barang"
                      value={formData.jumlah_barang}
                      onChange={handleChange}
                      className="border rounded-lg w-full p-2.5"
                      placeholder="jumlah_barang"
                      required
                    />
                  </div>
                  {/* Select alasan */}
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
                      <option value="diterima">diterima</option>
                      <option value="return">return</option>
                      <option value="dibuang">Expired</option>
                      <option value="diambil">Diambil</option>
                    </select>
                  </div>

                  <div className="mt-5">
                    <label htmlFor="exp_barang">Exp Barang</label>
                    <input
                      type="date"
                      id="exp_barang"
                      name="exp_barang"
                      value={formData.exp_barang}
                      className="border rounded-lg w-full p-2.5"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => navigate("/AktifitasBarang")} // Kembali tanpa simpan
                    className="font-xs border border-black bg-white text-black hover:bg-black hover:text-white px-3 py-1 rounded"
                  >
                    Kembali
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
          </div>
        </div>
      </div>
    </>
  );
}

export default EditBarang;
