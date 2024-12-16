import React, { useEffect, useState } from "react";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const SupplierChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/chart-supplier");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (!Array.isArray(result.data)) {
          throw new Error("Invalid data format: Expected an array");
        }

        const supplierNames = result.data.map((item) =>
          item.nama_supplier
            ? item.nama_supplier.length > 15
              ? item.nama_supplier.slice(0, 15) + "..."
              : item.nama_supplier
            : "Unknown"
        );

        const supplierTotals = result.data.map((item) => item.total_barang || 0);

        setChartData({
          labels: supplierNames,
          datasets: [
            {
              label: "Total Barang yang Disuplai",
              data: supplierTotals,
              backgroundColor: [
                "#1d4ed8", "#2563eb", "#3b82f6", "#60a5fa", "#93c5fd",
              ],
              borderWidth: 1,
              barThickness: 20,
            },
          ],
        });

        setLoading(false);
      } catch (err) {
        console.error("Error fetching supplier data:", err.message);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Opsi chart
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Grafik mengikuti tinggi container
    layout: {
      padding: 10, // Tambahkan padding internal di grafik
    },
    plugins: {
      legend: {
        display: false,
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
          color: "#4b5563",
        },
      },
      y: {
        ticks: {
          color: "#4b5563",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 m-2 w-full h-[450px]">
      {/* Judul */}
      <div className="flex justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Top Supplier
        </h2>
      </div>
      <div className="h-full p-4"> 
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
