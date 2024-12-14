import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user)); // Simpan seluruh objek user
    } else {
      localStorage.removeItem('user'); // Hapus data user dari localStorage jika tidak ada
    }
  }, [user]);

  const login = (userData) => {
    setUser(userData);  // Simpan objek user
    localStorage.setItem("user", JSON.stringify(userData)); // Simpan objek user ke localStorage
      // Navigasi setelah login berhasil
  };
  
  const logout = () => {
    setUser(null);
    navigate('/'); // Navigasi ke halaman login setelah logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
