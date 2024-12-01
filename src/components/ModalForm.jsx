import React, { useState } from "react";

export default function FormModal({ title, fields, onSubmit }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    onSubmit(data);
    toggleModal(); // Tutup modal setelah submit
  };

  return (
    <div>
      {/* Tombol untuk membuka modal */}
      {/* <button
        onClick={toggleModal}
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Tambah {title}
      </button> */}

      {/* Modal content */}
      {isModalOpen && (
        <div
          className="fixed top-0 left-0 right-0 z-50 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50"
          onClick={toggleModal} // Menutup modal saat klik di luar
        >
          <div
            className="relative p-4 w-full max-w-md max-h-full bg-white rounded-lg shadow"
            onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup saat klik di dalam modal
          >
            <div className="flex items-center justify-between p-4 border-b rounded-t">
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              <button
                onClick={toggleModal}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            {/* Form untuk input data */}
            <form className="p-4" onSubmit={handleSubmit}>
              {fields.map((field, index) => (
                <div key={index} className="mb-4">
                  <label
                    htmlFor={field.name}
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    {field.label}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      id={field.name}
                      name={field.name}
                      rows="4"
                      className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                      placeholder={field.placeholder}
                    />
                  ) : field.type === "select" ? (
                    <select
                      id={field.name}
                      name={field.name}
                      className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                    >
                      {field.options.map((option, idx) => (
                        <option key={idx} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                      placeholder={field.placeholder}
                      required={field.required}
                    />
                  )}
                </div>
              ))}

              {/* Tombol untuk mengirimkan form */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={toggleModal}
                  className="ml-2 text-gray-700 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
