import React from 'react';
import './App.css';
import './index.css';
import Dashboard from './Admin/dashboard';
import Gudang from './Admin/gudang/Gudang';
import Laporan from './Admin/Laporan/Laporan';
// barang
import Barang from './Admin/barang/Barang';
import BarangCreate from './Admin/barang/CreateBarang';
import BarangEdit from './Admin/barang/EditBarang';
import BarangShow from './Admin/barang/ShowBarang';
// aktivitas
import Aktifitas from './Admin/aktifitas/Aktifitas';
import EditAktif from './Admin/aktifitas/edit';
import TambahAktif from './Admin/aktifitas/Tambah';
import KeluarAktif from './Admin/aktifitas/Keluar';
import ShowAktiv from './Admin/aktifitas/Show';
import Pemindahan from './Admin/aktifitas/Pemindahan';
import Notfound from './components/NotFound';
import Login from './Login/Login';
import Register from './Login/Register';
import Unauthorized from './components/Unauthorized';
// Impor lainnya...
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContex';
import ProtectedRoute from './ProtectedRoute';
import TableUser from './Admin/User/user';

// Komponen untuk Staff
import StaffBarang from './staff/barang/Barang';
import StaffBarangCreate from './staff/barang/CreateBarang';
import StaffBarangEdit from './staff/barang/EditBarang';
import StaffBarangShow from './staff/barang/ShowBarang';
import StaffAktifitas from './staff/aktifitas/Aktifitas';
import StaffTambahAktif from './staff/aktifitas/Tambah';
import StaffKeluarAktif from './staff/aktifitas/Keluar';
import StaffEditAktif from './staff/aktifitas/Edit';
import StaffShowAktiv from './staff/aktifitas/Show';
import StaffPemindahan from './staff/aktifitas/Pemindahan';

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
            {/* Barang */}
            <Route path="/staff/barang" element={<ProtectedRoute role="staff" element={<StaffBarang />} />} />
            <Route path="/staff/barang/create" element={<ProtectedRoute role="staff" element={<StaffBarangCreate />} />} />
            <Route path="/staff/barang/:id/edit" element={<ProtectedRoute role="staff" element={<StaffBarangEdit />} />} />
            <Route path="/staff/barang/:id/show" element={<ProtectedRoute role="staff" element={<StaffBarangShow />} />} />
            {/* Aktivitas */}
            <Route path="/staff/aktifitas" element={<ProtectedRoute role="staff" element={<StaffAktifitas />} />} />
            <Route path="/staff/aktifitasBarang/:id/edit" element={<ProtectedRoute role="staff" element={<StaffEditAktif />} />} />
            <Route path="/staff/aktifitasBarang/tambah" element={<ProtectedRoute role="staff" element={<StaffTambahAktif />} />} />
            <Route path="/staff/aktifitasBarang/keluar" element={<ProtectedRoute role="staff" element={<StaffKeluarAktif />} />} />
            <Route path="/staff/aktifitasBarang/:id/show" element={<ProtectedRoute role="staff" element={<StaffShowAktiv />} />} />
            {/* Pemindahan */}
            <Route path="/staff/pemindahan" element={<ProtectedRoute role="staff" element={<StaffPemindahan />} />} />

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
