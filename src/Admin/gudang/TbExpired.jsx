import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContex"; // Pastikan path sesuai

const TbExpired = () => {
  const [expiredItems, setExpiredItems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [alasan, setAlasan] = useState("dibuang");
  const [status] = useState("keluar");
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth(); // Mengambil user dari context

  const fetchExpiredItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/expired-barang-terdekat");
      const items = response.data?.barang_akan_kadaluarsa;
      if (Array.isArray(items)) {
        setExpiredItems(items);
      } else {
        throw new Error("Data tidak valid");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Gagal memuat data barang expired.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpiredItems();
    console.log("Expired Items:", expiredItems); // Debugging
  }, []);

  const handleAddActivity = async () => {
    if (!selectedItem || !user) {
      alert("User tidak ditemukan atau barang tidak dipilih.");
      return;
    }

    setIsSaving(true);
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/buang-barang/${selectedItem.id_aktivitas}`,
        {
          id_barang: selectedItem.id_barang,
          username: user.username,
          id_rak: selectedItem.id_rak,
          status: "keluar",
          alasan,
          jumlah_barang: selectedItem.stok,
          exp_barang: null,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.success) {
        alert(response.data.message);
        setModalOpen(false);
        fetchExpiredItems(); // Refresh data setelah status diperbarui
      } else {
        alert("Gagal memperbarui data.");
      }
    } catch (error) {
      console.error("Error saat menambahkan aktivitas:", error);
      alert("Terjadi kesalahan saat menambah aktivitas.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleOpenModal = (itemId) => {
    const item = expiredItems.find((i) => i.id_aktivitas === itemId);
    if (!item) {
      alert("Barang tidak ditemukan.");
      return;
    }
    setSelectedItem(item);
    setModalOpen(true);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  
  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="m-2 bg-white p-4 rounded-md w-full">
      <h3 className="text-lg font-semibold mb-4">Tabel Expired</h3>
      <div className="relative overflow-x-auto sm:rounded-lg w-max">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs font-medium text-gray-700 uppercase bg-gray-200">
            <tr>
              <th className="px-6 py-3">No</th>
              <th className="px-6 py-3">Nama Barang</th>
              <th className="px-6 py-3">Tgl. Expired</th>
              <th className="px-6 py-3">Tindakan</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(expiredItems) && expiredItems.length > 0 ? (
              expiredItems.map((item, index) => (
                <tr key={item.id_aktivitas} className="hover:bg-gray-100">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{item.nama_barang}</td>
                  <td className="px-6 py-4">{formatDate(item.exp_barang)}</td>
                  <td className="px-6 py-4">
                    <button className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600" onClick={() => handleOpenModal(item.id_aktivitas)} title="Buang barang ini">
                      Buang
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-gray-500">
                  Tidak ada barang kedaluwarsa
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && selectedItem && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-40 bg-gray-800 bg-opacity-50">
          <div className="relative p-4 w-full max-w-md bg-white rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 justify-center text-center">
              <i className="fas fa-exclamation-circle text-red-500"></i>
              Tindakan Barang Expired
            </h3>
            <hr className="border-t-4 border-gray-400 w-1/2 mx-auto mt-1 mb-2" />
            <p className="mb-4 text-left">
              Nama Barang: <strong>{selectedItem.nama_barang}</strong>
            </p>
            <p className="mb-4 text-left">Tanggal Kedaluwarsa: {formatDate(selectedItem.exp_barang)}</p>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-left">Status:</label>
              <input
                className="w-full p-2 border border-gray-300 rounded bg-gray-200 text-gray-600 cursor-not-allowed"
                value={status}
                disabled
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-left">Alasan:</label>
              <select className="w-full p-2 border border-gray-300 rounded" value={alasan} onChange={(e) => setAlasan(e.target.value)}>
                <option value="dibuang">Dibuang</option>
                <option value="return">Return</option>
              </select>
            </div>
            <div className="flex justify-end gap-2">
              <button
               className="border border-black bg-white text-black hover:bg-black hover:text-white px-4 py-2 rounded"
                onClick={() => setModalOpen(false)}
              >
                Batal
              </button>
              <button
                className="px-4 py-2 border border-black text-white bg-black hover:bg-white hover:text-black rounded"
                onClick={handleAddActivity}
                disabled={isSaving}
              >
                {isSaving ? "Menyimpan..." : "Simpan"}

              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TbExpired;