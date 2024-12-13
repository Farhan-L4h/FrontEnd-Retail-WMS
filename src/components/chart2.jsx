import React, { useEffect, useState } from "react"; // Tambahkan useState
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend); // Daftarkan elemen ChartJS

const SupplierChart = () => {
  const [chartData, setChartData] = useState(null); // State untuk menyimpan data chart
  const [loading, setLoading] = useState(true); // State untuk loading
  const [error, setError] = useState(null); // State untuk menyimpan error

  useEffect(() => {
    // Fetch data dari API
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/chart-supplier"); // Ganti URL sesuai endpoint API Anda

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        // Validasi apakah result.data adalah array
        if (!Array.isArray(result.data)) {
          throw new Error("Invalid data format: Expected an array");
        }

        // Format data chart
        const supplierNames = result.data.map((item) =>
          item.nama_supplier
            ? item.nama_supplier.length > 15
              ? item.nama_supplier.slice(0, 15) + "..."
              : item.nama_supplier
            : "Unknown" // Default jika nama_supplier tidak ada
        );

        const supplierTotals = result.data.map((item) => item.total_barang || 0); // Default total_barang ke 0 jika undefined

        // Simpan data ke state
        setChartData({
          labels: supplierNames,
          datasets: [
            {
              label: "Total Barang yang Disuplai",
              data: supplierTotals,
              backgroundColor: [
                "#1d4ed8",
                "#2563eb",
                "#3b82f6",
                "#60a5fa",
                "#93c5fd",
              ],
              borderWidth: 1,
            },
          ],
        });

        setLoading(false); // Loading selesai
      } catch (err) {
        console.error("Error fetching supplier data:", err.message);
        setError(err.message); // Simpan error
        setLoading(false); // Loading selesai meski ada error
      }
    };

    fetchData();
  }, []);

  // Opsi chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Tidak menampilkan legenda
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.raw} barang`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#4b5563", // Warna teks pada sumbu X
        },
      },
      y: {
        ticks: {
          color: "#4b5563", // Warna teks pada sumbu Y
        },
        beginAtZero: true, // Mulai dari 0
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 m-2 w-full h-full">
      <div className="flex justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Top Supplier
        </h2>
      </div>
      <div className="mt-4">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">
            Error: {error || "Failed to load data"}
          </p>
        ) : chartData ? (
          <Bar data={chartData} options={options} />
        ) : (
          <p className="text-center text-red-500">No data available</p>
        )}
      </div>
    </div>
  );
};

export default SupplierChart;