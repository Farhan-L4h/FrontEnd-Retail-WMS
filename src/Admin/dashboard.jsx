import { useState } from "react";
import "../App.css";
import "../index.css";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="bg-slate-300 w-full overflow-hidden">
        {/* NavBar */}
        <div className="fixed top-0 w-full z-40 bg-white">
          <NavBar />
        </div>

        {/* Wrapper untuk layout utama */}
        <div className="flex mt-16 w-full overflow-hidden">
          {/* Sidebar */}
          <div className="w-64 bg-gray-100 fixed top-0 mt-5">
            <SideBar>
              <ul>
                <li className="py-2 px-4">
                  <Link to="/">Dashboard</Link>
                </li>
                <li className="py-2 px-4">
                  <Link to="/Gudang">Gudang</Link>
                </li>
              </ul>
            </SideBar>
          </div>

          {/* Konten utama */}
          <div className="flex-1 p-6 ml-64 overflow-hidden">
            <h1 className="text-2xl font-bold">Selamat Datang di Aplikasi</h1>
            <p className="mt-4">Klik menu di sidebar untuk mulai navigasi.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
