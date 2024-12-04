import React from "react";

export default function Form() {
  return (
    <div className="w-full">
      <form class="mx-auto bg-white p-5 rounded-md">
        <div className="flex mx-auto gap-4">
          <div className="w-full">
            <div class="mb-5">
              <label
                for="nama"
                class="block mb-2 text-sm text-start font-medium text-gray-900"
              >
                Nama Barang
              </label>
              <input
                type="text"
                id="nama"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Masukan Nama"
                required
                name="nama"
              />
            </div>

            <div class="mb-5">
              <label
                for="kategori"
                class="block mb-2 text-start text-sm font-medium text-gray-900"
              >
                Kategori
              </label>
              <select
                id="kategori"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option selected>Pilih Kategori</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="FR">France</option>
                <option value="DE">Germany</option>
              </select>
            </div>

            <div class="mb-5">
              <label
                for="email"
                class="block mb-2 text-sm text-start font-medium text-gray-900"
              >
                Tanggal Expired
              </label>
              <input
                type="date"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder=""
                required
              />
            </div>

            <div className="mb-5">
              <label
                for="website-admin"
                class="block mb-2 text-sm text-start font-medium text-gray-900"
              >
                Harga Barang
              </label>
              <div class="flex">
                <span class="inline-flex items-center px-3 text-sm text-white bg-black border rounded-e-0 border-e-0 rounded-s-md">
                  Rp.
                </span>
                <input
                  type="text"
                  id="harga"
                  class="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5"
                  placeholder="Masukan Harga Barang"
                />
              </div>
            </div>

            <div class="mb-5">
              <label
                htmlFor="description"
                className="block mb-2 text-start text-sm font-medium text-gray-900"
              >
                Deskripsi
              </label>
              <textarea
                id="description"
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write product description here"
              ></textarea>
            </div>
          </div>
          <div className="w-full">
            <div className="mb-5">
              <label
                class="block mb-2 text-start text-sm font-medium text-gray-900"
                for="file_input"
              >
                Upload file
              </label>
              <input
                class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                id="file_input"
                type="file" 
              />
            </div>
            <div class="mb-5">
              <label
                for="satuan"
                class="block mb-2 text-start text-sm font-medium text-gray-900"
              >
                Satuan
              </label>
              <select
                id="satuan"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option selected>Pilih Satuan</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="FR">France</option>
                <option value="DE">Germany</option>
              </select>
            </div>
            <div class="mb-5">
              <label
                for="supplier"
                class="block mb-2 text-start text-sm font-medium text-gray-900"
              >
                Supplier
              </label>
              <select
                id="supplier"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option selected>Pilih Supplier</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="FR">France</option>
                <option value="DE">Germany</option>
              </select>
            </div>
            <div class="mb-5">
              <label
                for="Lokasi"
                class="block mb-2 text-sm text-start font-medium text-gray-900"
              >
                Lokasi
              </label>
              <input
                type="text"
                id="Lokasi"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Masukan Lokasi"
                required
                name="Lokasi"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="reset"
            class="border border-black bg-white text-black hover:bg-black border hover:text-white  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="text-white border bg-black hover:bg-white hover:border border-black hover:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
