import React, { useState, useEffect } from "react";
import axios from "axios";

export default function TableKategori() {
  const [kategoriData, setKategoriData] = useState([]); // Ganti nama state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Hitung data yang akan ditampilkan berdasarkan halaman
  const totalPages = Math.ceil(kategoriData.length / itemsPerPage);
  const currentData = kategoriData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/kategori");
        const kategori = Array.isArray(response.data)
          ? response.data
          : response.data.data; // Akses array jika dibungkus dalam objek
        setKategoriData(kategori || []); // Default ke array kosong
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
    <div className="m-2 bg-white p-4 rounded-md">
      <div className="flex flex-row my-2">
        <div className="text-start flex w-full">
          <h3 className="text-xl font-semibold">Table Kategori</h3>
          {/* <button
            onClick={toggleModal}
            className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Tambah {title}
          </button> */}
        </div>
      </div>

      {/* Tabel */}
      <div className="relative overflow-x-auto sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs font-medium text-gray-700 uppercase bg-gray-200 bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Nama
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((kategori) => (
              <tr
                key={kategori.id}
                className="odd:bg-white even:bg-gray-100 border-gray-600"
              >
                <td className="px-6 py-4">{kategori.id}</td>
                <td className="px-6 py-4">{kategori.nama_kategori}</td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-xs bg-blue-400 rounded-md px-3 py-1 m-2 text-blue-800 hover:underline"
                  >
                    Edit
                  </a>
                  <a
                    href="#"
                    className="font-medium p-2 m-1 text-xs rounded-md bg-red-400 text-red-800 px-2 py-1  hover:underline"
                  >
                    Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {kategoriData.length > itemsPerPage && (
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`mx-1 px-3 py-1 rounded-md ${
                currentPage === index + 1
                  ? "border border-blue-500 bg-white text-black hover:bg-blue-500 hover:text-white"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
