import React from 'react';

const Unauthorized = () => {
    <section class="w-screen min-h-screen content-center" style={{ backgroundColor: "#394867" }}>
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div class="mx-auto max-w-screen-sm text-center">
        <h1 class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl ">
          Maaf Kamu Tidak Bisa Mengakses Halaman Ini
        </h1>
        <a
          href="/"
          class="inline-flex text-white bg-blue-400 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4"
        >
          Kembali
        </a>
      </div>
    </div>
  </section>
};

export default Unauthorized;
