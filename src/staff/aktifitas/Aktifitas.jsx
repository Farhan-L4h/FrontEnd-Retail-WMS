import { useState } from "react";
import "../../App.css";
import "../../index.css";
import SideBar from "../../components/SideBar";
import NavBar2 from "../../components/Navbar2";
import { Link } from "react-router-dom";
import Table from "../../components/Table";
import LinkPath from "../../components/LinkPath";
import TableAktifitas from "./TableAktiftas";
import Footer from "../../components/Footer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* NavBar */}
      <div className="fixed top-0 w-full z-40">
        <NavBar2 />
      </div>

      <div className="flex flex-row mt-16">
        {/* Sidebar */}
        <div className="w-64 bg-gray-100 mt- fixed top-0 z-30 mt-7">
          <SideBar/>
        </div>

        {/* Konten utama */}
        <div className="ml-64 p-6 w-max">
          <LinkPath />
          <TableAktifitas />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
