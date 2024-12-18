import { useRef } from "react";
import "../../App.css";
import "../../index.css";
import SideBar from "../../components/SideBar";
import NavBar from "../../components/Navbar2";
import LinkPath from "../../components/LinkPath";
import TableLaporan from "./LaporanBarang";
import LaporanAktifitas from "./LaporanAktivitas";
import LaporanPindah from "./LaporanPindah";

function App() {
  // Ref untuk bagian yang akan dicetak
  const printRef = useRef();

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const originalContents = document.body.innerHTML;

    // Sementara ganti konten body dengan konten yang ingin dicetak
    document.body.innerHTML = printContents;
    window.print();

    // Kembalikan konten asli setelah cetak selesai
    document.body.innerHTML = originalContents;
    window.location.reload(); // Reload untuk mengembalikan state React
  };

  return (
    <>
      {/* NavBar */}
      <div className="fixed top-0 w-full z-40">
        <NavBar />
      </div>

      <div className="flex flex-row mt-16">
        {/* Sidebar */}
        <div className="w-64 bg-gray-100 mt- fixed top-0 z-30 mt-7">
          <SideBar />
        </div>

        {/* Konten utama */}
        <div className="ml-64 p-6 w-full">
          <LinkPath />
          <div className="flex justify-end text-sm">
            <button
              className="bg-black text-white px-3 py-1 rounded-lg m-2 border border-black hover:bg-white hover:text-black"
              onClick={handlePrint}
            >
              Print Laporan
            </button>
          </div>

          {/* Area yang akan dicetak */}
          <div ref={printRef}>
            <div className="m-2 bg-white p-8 rounded-md w-max">
<h1 className="text-center text-4xl font-semibold underline">Laporan Gudang WMS Retail</h1>
              <TableLaporan />
              <div className="flex gap-4">
                <LaporanAktifitas />
                <LaporanPindah />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
