import { useState, useEffect } from "react";
import "../../App.css";
import "../../index.css";
import SideBar from "../../components/SideBar";
import NavBar2 from "../../components/Navbar2";
import { Link } from "react-router-dom";
import Table from "../../components/Table";
import LinkPath from "../../components/LinkPath";
import ModalForm from "../../components/ModalForm";
import TableKategori from "./TableKategori";
import TableRak from "./TableRak";
import TableSupplier from "./TableSupplier";

function App() {
  const [count, setCount] = useState(0);
  const Rak = "/Gudang/Rak/Create";
  const Kategori = "/Gudang/Kategori/Create";
  const Supplier = "/Gudang/Supplier/Create";

  

  const columns = [
    { header: "Nama", field: "name" },
    { header: "Umur", field: "age" },
    { header: "Alamat", field: "address" },
  ];

  const data = [
    { name: "Tora", age: 20, address: "Malang" },
    { name: "Dio", age: 21, address: "Surabaya" },
    { name: "Ali", age: 22, address: "Jakarta" },
  ];

  const [kategori, setKategori] = useState([]);
  const [name, setName] = useState("");

  return (
    <>
      {/* NavBar */}
      <div className="fixed top-0 w-full z-40">
        <NavBar2 />
      </div>

      <div className="flex flex-row mt-16">
        {/* Sidebar */}
        <div className="w-64 bg-gray-100 mt- fixed top-0 z-30 mt-7">
          <SideBar />
        </div>

        {/* Konten utama */}
        <div className="ml-64 p-6">
          <LinkPath />
          <ModalForm />
          <div className="flex">
            <TableRak />
            <TableKategori />
          </div>
          <div className="flex">
            <TableSupplier />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
