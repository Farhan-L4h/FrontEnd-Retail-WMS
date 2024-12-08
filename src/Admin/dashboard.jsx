import { useState } from "react";
import "../App.css";
import "../index.css";
import SideBar from "../components/SideBar";
import NavBar from "../components/Navbar2";
import { Link } from "react-router-dom";
import Table from "../components/Table";
import LinkPath from "../components/LinkPath";
import Chart from "../components/chart1";
import Footer from "../components/Footer";
import TableRak from "./gudang/TableRak";

function App() {
  const [count, setCount] = useState(0);

  const tableName = "Tabel Barang";

  const columns = [
    { header: "Nama Barang", field: "nama" },
    { header: "Image", field: "image" },
    { header: "Kategori", field: "kategori" },
  ];

  const data = [
    {
      nama: "Beng Beng",
      image: "image",
      kategori: "Makanan",
      harga: "3000",
      supplier: "supplier 1",
    },
    {
      nama: "Beng Beng",
      image: "image",
      kategori: "Makanan",
      harga: "3000",
      supplier: "supplier 1",
    },
    {
      nama: "Beng Beng",
      image: "image",
      kategori: "Makanan",
      harga: "3000",
      supplier: "supplier 1",
    },
    {
      nama: "Beng Beng",
      image: "image",
      kategori: "Makanan",
      harga: "3000",
      supplier: "supplier 1",
    },
  ];

  return (
    <>
      {/* NavBar */}
      <div className="fixed top-0 w-full z-40">
        <NavBar />
      </div>

      <div className="flex flex-row mt-16">
        {/* Sidebar */}
        <div className="w-64 bg-gray-100 fixed top-0 z-30 mt-7">
          <SideBar />
        </div>

        {/* Konten utama */}
        <div className="ml-64 p-6 w-full">
          <LinkPath />
          <div className="flex">
            
          </div>
          <div className="flex">
            <Chart />
            <Table tableName={tableName} columns={columns} data={data} />
          </div>
          <div className="flex w-max">
            <TableRak />
            <Table tableName={tableName} columns={columns} data={data} />
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
