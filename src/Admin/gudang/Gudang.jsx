import { useState } from "react";
import "../../App.css";
import "../../index.css";
import SideBar from "../../components/SideBar";
import NavBar from "../../components/NavBar";
import { Link } from "react-router-dom";
import Table from "../../components/Table";
import LinkPaht from "../../components/LinkPath";
import FormModal from "../../components/modalForm";

function App() {
  const [count, setCount] = useState(0);
  const Rak = "/Gudang/Rak/Create";
  const Kategori = "/Gudang/Rak/Create";
  const Supplier = "/Gudang/Rak/Create";

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

  return (
    <>
      {/* NavBar */}
      <div className="fixed top-0 w-full z-40">
        <NavBar />
      </div>

      <div className="flex flex-row mt-16">
        {/* Sidebar */}
        <div className="w-64 bg-gray-100 mt- fixed top-0 z-30 mt-7">
          <SideBar />
        </div>

        {/* Konten utama */}
        <div className="ml-64 p-6 w-full">
            <LinkPaht />  
          <div className="flex">
            <Table createLink={Rak} columns={columns} data={data} />
            <Table createLink={Kategori} columns={columns} data={data} />
          </div>

          <div className="w-full">
            <Table createLink={Supplier} columns={columns} data={data} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
