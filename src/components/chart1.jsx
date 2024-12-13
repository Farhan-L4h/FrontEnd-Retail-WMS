import React, { useEffect, useState } from "react";
import ApexCharts from "apexcharts";

const getChartOptions = (series, labels) => {
  return {
    series: series,
    colors: ["#1C64F2", "#16BDCA", "#FDBA8C", "#E74694"],
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
                return sum + " items";
              },
            },
            value: {
              show: true,
              fontFamily: "Inter, sans-serif",
              offsetY: -20,
              formatter: function (value) {
                return value + " items";
              },
            },
          },
          size: "80%",
        },
      },
    },
    labels: labels,
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: "bottom",
      fontFamily: "Inter, sans-serif",
    },
  };
};

const Chart = () => {
  const [chartData, setChartData] = useState({ series: [], labels: [] });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/gudang/kategori-dengan-barang-terbanyak'); 
      const result = await response.json();
      const series = result.data.map(item => item.total_barang);
      const labels = result.data.map(item => item.nama_kategori);
      setChartData({ series, labels });
    };

    fetchData();
  }, []);

  useEffect(() => {
    const chartElement = document.getElementById("donut-chart");
    if (chartElement && typeof ApexCharts !== "undefined") {
      const chart = new ApexCharts(chartElement, getChartOptions(chartData.series, chartData.labels));
      chart.render();

      return () => {
        chart.destroy();
      };
    }
  }, [chartData]);

  return (
    <>
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
    </>
  );
};

export default Chart;