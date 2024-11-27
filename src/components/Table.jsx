import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Table({ columns, data, tableName }) {
  const location = useLocation();
  const createLink = `${location.pathname}/create`;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Menghitung data yang akan ditampilkan
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="m-2 bg-white p-4 rounded-md max-h-screen">
      <div className="flex flex-row my-2">
        <div className="text-start flex w-full">
          <h3 className="text-xl font-semibold">{tableName || "Table Data"}</h3>
        </div>

        {/* Render tombol tambah jika createLink ada */}
        {location.pathname !== "/Gudang" && createLink && (
          <Link to={createLink}>
            <button className="bg-green-300 py-1 px-3 hover:bg-green-500 rounded-md text-green-900 hover:text-white font-medium ps-3">
              Tambah
            </button>
          </Link>
        )}

        {/* Render tombol Toggle modal hanya jika di path /gudang */}
        {location.pathname === "/Gudang" && (
          <button
            onClick={toggleModal}
            className="block  bg-green-300 py-1 px-3 hover:bg-green-500 rounded-md text-green-900 hover:text-white font-medium ps-3"
          >
            Tambah
          </button>
        )}
      </div>

      <div className="relative overflow-x-auto sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs font-medium text-gray-700 uppercase bg-gray-200 bg-gray-100">
            <tr>
              {columns.map((column, index) => (
                <th key={index} scope="col" className="px-6 py-3">
                  {column.header}
                </th>
              ))}
              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="odd:bg-white even:bg-gray-100 border-gray-600"
              >
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 text-xs font-normal">
                    {row[column.field]}
                  </td>
                ))}
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

          {/* pagination */}
          {/* Pagination */}
          {data.length > itemsPerPage && (
            <div className="flex translate-x-full justify-center mt-4">
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
        </table>
      </div>
    </div>
  );
}
