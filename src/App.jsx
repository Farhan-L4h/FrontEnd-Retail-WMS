import React from 'react';
import './App.css';
import './index.css';
import Dashboard from './Admin/dashboard';
import Gudang from './Admin/gudang/Gudang';
import Laporan from './Admin/Laporan/Laporan';
import Barang from './Admin/barang/Barang';
import BarangCreate from './Admin/barang/CreateBarang';
import BarangEdit from './Admin/barang/EditBarang';
import BarangShow from './Admin/barang/ShowBarang';
import Aktifitas from './Admin/aktifitas/Aktifitas';
import Pemindahan from './Admin/aktifitas/Pemindahan';
import Notfound from './components/NotFound';
import Login from './Login/Login';
import Register from './Login/Register';
import Unauthorized from './components/Unauthorized';
// Impor lainnya...
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import Navigate for useNavigate
import { AuthProvider } from './context/AuthContex'; // Import AuthProvider
import ProtectedRoute from './ProtectedRoute'; // Import ProtectedRoute
import TambahAktif from './Admin/aktifitas/Tambah';
import TableUser from './Admin/User/user';
import KeluarAktif from './Admin/aktifitas/Keluar';
import EditAktif from './Admin/aktifitas/Edit';
import ShowAktiv from './Admin/aktifitas/Show';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="app w-full">
          <Routes>
            {/* Rute Public */}
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Rute Admin yang dilindungi */}
            <Route path="/dashboard" element={<ProtectedRoute role="admin" element={<Dashboard />} />} />
            <Route path="/gudang" element={<ProtectedRoute role="admin" element={<Gudang />} />} />
            <Route path="/barang" element={<ProtectedRoute role="admin" element={<Barang />} />} />
            <Route path="/barang/create" element={<ProtectedRoute role="admin" element={<BarangCreate />} />} />
            <Route path="/barang/:id/edit" element={<ProtectedRoute role="admin" element={<BarangEdit />} />} />
            <Route path="/barang/:id/show" element={<ProtectedRoute role="admin" element={<BarangShow />} />} />
            <Route path="/aktifitasBarang" element={<ProtectedRoute role="admin" element={<Aktifitas />} />} />
            <Route path="/aktifitasBarang/:id/edit" element={<ProtectedRoute role="admin" element={<EditAktif />} />} />
            <Route path="/aktifitasBarang/tambah" element={<ProtectedRoute role="admin" element={<TambahAktif />} />} />
            <Route path="/aktifitasBarang/keluar" element={<ProtectedRoute role="admin" element={<KeluarAktif />} />} />
            <Route path="/aktifitasBarang/:id/show" element={<ProtectedRoute role="admin" element={<ShowAktiv />} />} />
            <Route path="/laporan" element={<ProtectedRoute role="admin" element={<Laporan />} />} />
            <Route path="/pemindahanBarang" element={<ProtectedRoute role="admin" element={<Pemindahan />} />} />
            <Route path="/User" element={<ProtectedRoute role="admin" element={<TableUser />} />} />


            {/* Rute Staff yang dilindungi */}
            <Route path="/staff/dashboard" element={<ProtectedRoute role="staff" element={<Dashboard />} />} />
            <Route path="/staff/gudang" element={<ProtectedRoute role="staff" element={<Gudang />} />} />
            <Route path="/staff/pemindahan" element={<ProtectedRoute role="staff" element={<Pemindahan />} />} />
            <Route path="/staff/aktifitas" element={<ProtectedRoute role="staff" element={<Aktifitas />} />} />

            {/* Rute Unauthorized */}
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Halaman NotFound */}
            <Route path="*" element={<Notfound />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
