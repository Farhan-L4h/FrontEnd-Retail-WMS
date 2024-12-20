import React, { useEffect, useState } from "react";
import ApexCharts from "apexcharts";

// Definisikan warna primary soft
const primarySoftColors = [
  "#4F88D4", // Soft Blue
  "#F28C8C", // Soft Red
  "#7EC8A7", // Soft Green
  "#F9D86D", // Soft Yellow
  "#9D7CC3", // Soft Purple
  "#F5A623", // Soft Orange
];

// Fungsi untuk konfigurasi chart
const getChartOptions = (series, labels, colors) => ({
  series,
  colors, // Warna soft primary
  chart: {
    height: 320,
    width: "100%",
    type: "donut",
  },
  stroke: {
    colors: ["transparent"],
  },
  plotOptions: {
    pie: {
      donut: {
        labels: {
          show: true,
          name: {
            show: true,
            fontFamily: "Inter, sans-serif",
            offsetY: 20,
          },
          total: {
            showAlways: true,
            show: true,
            label: "Total",
            fontFamily: "Inter, sans-serif",
            formatter: function (w) {
              const sum = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
              return `${sum} items`;
            },
          },
          value: {
            show: true,
            fontFamily: "Inter, sans-serif",
            offsetY: -20,
            formatter: function (value) {
              return `${value} items`;
            },
          },
        },
        size: "80%",
      },
    },
  },
  labels,
  dataLabels: {
    enabled: false,
  },
  legend: {
    position: "bottom",
    fontFamily: "Inter, sans-serif",
  },
});

const DonutChart = () => {
  const [chartData, setChartData] = useState({ series: [], labels: [], colors: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data dari API
        const response = await fetch("http://localhost:8000/api/kategori-dengan-barang-terbanyak");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();

        if (result?.data) {
          // Ambil data series (jumlah barang) dan labels (nama kategori)
          const series = result.data.map(item => item.total_barang);
          const labels = result.data.map(item => item.nama_kategori);

          // Pilih warna soft primary sesuai jumlah kategori
          const colors = primarySoftColors.slice(0, labels.length);

          setChartData({ series, labels, colors });
        } else {
          console.error("Invalid API response");
        }
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const chartElement = document.getElementById("donut-chart");

    if (chartElement && chartData.series.length > 0 && chartData.labels.length > 0) {
      const chart = new ApexCharts(
        chartElement,
        getChartOptions(chartData.series, chartData.labels, chartData.colors)
      );
      chart.render();

      return () => {
        chart.destroy();
      };
    }
  }, [chartData]);

  return (
    <div className="bg-white rounded-lg shadow p-6 m-2 w-full h-full">
      <div className="flex justify-between mb-3">
        <div className="flex justify-center items-center">
          <h5 className="text-xl font-bold leading-none text-gray-900 pe-1">
            Distribusi Kategori Barang
          </h5>
        </div>
      </div>

      {/* Donut Chart */}
      <div className="py-6" id="donut-chart"></div>
    </div>
  );
};

export default DonutChart;
