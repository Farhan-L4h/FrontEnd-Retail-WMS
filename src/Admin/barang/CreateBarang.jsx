import { Link } from "react-router-dom";
import "../../App.css";
import "../../index.css";
import SideBar from "../../components/SideBar";
import NavBar from "../../components/NavBar";
import Form from "../../components/Form";
import LinkPath from "../../components/LinkPath";

function FormBarang() {
  return (
    <>
      {/* NavBar */}
      <div className="fixed top-0 w-full z-40">
        <NavBar />
      </div>

      <div className="flex flex-row min-h-screen pt-16">
        {/* Sidebar */}
        <div className="w-64 bg-gray-100 fixed top-7 h-full z-30">
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

        {/* Konten Utama */}
        <div className="ml-64 p-6 w-full h-full max-w-full">
          <LinkPath />
          <Form />
        </div>
      </div>
    </>
  );
}

export default FormBarang;
