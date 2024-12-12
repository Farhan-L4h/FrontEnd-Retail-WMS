import React, { useState, useEffect } from "react";
import axios from "axios";

function TbExpired() {
  const [expiringSoonItems, setExpiringSoonItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/expired-barang-terdekat");
        setExpiringSoonItems(response.data.barang_akan_kadaluarsa);
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

  return (
    <div className="m-2 bg-white p-4 rounded-md w-full">
      <h3 className="text-lg font-semibold mb-4">Tabel Expired</h3>
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
                Tanggal Expired
              </th>
            </tr>
          </thead>
          <tbody>
            {expiringSoonItems.map((item) => (
              <tr key={item.id} className="odd:bg-white even:bg-gray-100 border-gray-600">
                <td className="px-6 py-4">{item.id}</td>
                <td className="px-6 py-4">{item.nama_barang}</td>
                <td className="px-6 py-4">{item.exp_barang}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TbExpired;