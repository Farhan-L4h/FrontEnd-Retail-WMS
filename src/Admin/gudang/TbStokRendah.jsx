import React, { useState, useEffect } from "react";
import axios from "axios";

function TbStokRendah() {
  const [lowStockItems, setLowStockItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/stok-barang-rendah");
        setLowStockItems(response.data.barang_stok_rendah);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const getStatus = (stok) => {
    if (stok > 0 && stok <= 10) {
      return "Menipis";
    } else {
      return "Habis";
    }
  };

  const getStatusBadge = (status) => {
    if (status === "Menipis") {
      return <span className="px-2 py-1 text-sm font-medium text-yellow-800 bg-yellow-200 rounded">{status}</span>;
    } else {
      return <span className="px-2 py-1 text-sm font-medium text-red-800 bg-red-200 rounded">{status}</span>;
    } 
  };
  

  return (
    <div className="m-2 bg-white p-4 rounded-md w-full">
      <h3 className="text-lg font-semibold mb-4">Tabel Stok Rendah</h3>
      <div className="relative overflow-x-auto sm:rounded-lg w-full">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs font-medium text-gray-700 uppercase bg-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Nama Barang
              </th>
              <th scope="col" className="px-6 py-3">
                Stok
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {lowStockItems.map((item) => (
              <tr key={item.id} className="odd:bg-white even:bg-gray-100 border-gray-600">
                <td className="px-6 py-4">{item.id}</td>
                <td className="px-6 py-4">{item.nama_barang}</td>
                <td className="px-6 py-4">{item.stok}</td>
                <td className="px-6 py-4">{getStatusBadge(getStatus(item.stok))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TbStokRendah;