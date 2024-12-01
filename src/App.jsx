import "./App.css";
import "./index.css";
import Dashboard from "./Admin/dashboard";
import Gudang from "./Admin/gudang/Gudang";
import Laporan from "./Admin/gudang/Laporan";
import Barang from "./Admin/barang/Barang";
import BarangCreate from "./Admin/barang/CreateBarang";
import Aktifitas from "./Admin/aktifitas/Aktifitas";
import Pemindahan from "./Admin/aktifitas/Pemindahan";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Notfound from "./components/NotFound";
import Login from "./Login/Login";
import Register from "./Login/Register";

function App() {
  return (
    <div className="app w-full">
      <BrowserRouter>
        {/* Routes membungkus semua Route */}
        <Routes>
          
          <Route path="/" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Gudang" element={<Gudang />} />
          <Route path="/Gudang/Rak/Create" element={<Gudang />} />
          <Route path="/Gudang/Kategori/Create" element={<Gudang />} />
          <Route path="/Gudang/Supplier/Create" element={<Gudang />} />

          <Route path="/Barang" element={<Barang />} />
          <Route path="/Barang/Create" element={<BarangCreate />} />

          <Route path="/AktifitasBarang" element={<Aktifitas />} />
          <Route path="/Laporan" element={<Laporan />} />
          <Route path="/PemindahanBarang" element={<Pemindahan />} />

          {/* page notfound */}
          <Route path="*" element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
