import { useState } from "react";
import "../../App.css";
import "../../index.css";
import SideBar from "../../components/SideBar";
import NavBar from "../../components/NavBar";
import { Link } from "react-router-dom";
import Table from "../../components/Table";
import FormModal from "../../components/modalForm";
import LinkPath from "../../components/LinkPath";

function App() {
  const [count, setCount] = useState(0);

  const tableName = 'Tabel Aktifitas Barang';

  const columns = [
    { header: "Nama Barang", field: "nama" },
    { header: "Image", field: "image" },
    { header: "Kategori", field: "kategori" },
    { header: "Harga", field: "harga" },
    { header: "Supplier", field: "supplier" },
  ];

  const data = [
    { nama: "Beng Beng", image: "image", kategori: "Makanan", harga: "3000", supplier: "supplier 1" },
    { nama: "Beng Beng", image: "image", kategori: "Makanan", harga: "3000", supplier: "supplier 1" },
    { nama: "Beng Beng", image: "image", kategori: "Makanan", harga: "3000", supplier: "supplier 1" },
    { nama: "Beng Beng", image: "image", kategori: "Makanan", harga: "3000", supplier: "supplier 1" },
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
          <SideBar>
            <ul>
              <li className="py-2 px-4 hover:bg-gray-200 rounded">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="py-2 px-4 hover:bg-gray-200 rounded">
                <Link to="/Gudang">Gudang</Link>
              </li>
            </ul>
          </SideBar>
        </div>

        {/* Konten utama */}
        <div className="ml-64 p-6 w-full">
          <LinkPath />
            <Table tableName={tableName} columns={columns} data={data} />
        </div>
      </div>
    </>
  );
}

export default App;
