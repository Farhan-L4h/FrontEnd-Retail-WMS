import './App.css';
import './index.css';
import Dashboard from './Admin/dashboard';
import Gudang from './Admin/gudang/Gudang';
import Barang from './Admin/barang/Barang';
import BarangCreate from './Admin/barang/CreateBarang'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="app w-full">
      <BrowserRouter>
        {/* Routes membungkus semua Route */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/Gudang" element={<Gudang />} />
          <Route path="/Barang" element={<Barang />} />
          <Route path="/Barang/Create" element={<BarangCreate />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
