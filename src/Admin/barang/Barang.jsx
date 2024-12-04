import { useState } from "react";
import "../../App.css";
import "../../index.css";
import SideBar from "../../components/SideBar";
import LinkPath from "../../components/LinkPath";
import Navbar2 from "../../components/Navbar2";
import TableBarang from "./TableBarang";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* ToastContainer untuk menangani notifikasi */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* NavBar */}
      <div className="fixed top-0 w-full z-40">
        <Navbar2 />
      </div>

      <div className="flex flex-row mt-16">
        {/* Sidebar */}
        <div className="w-64 bg-gray-100 fixed top-0 z-30 mt-7">
          <SideBar />
        </div>

        {/* Konten utama */}
        <div className="ml-64 p-6 w-full">
          <LinkPath />
          <TableBarang />
        </div>
      </div>
    </>
  );
}

export default App;
