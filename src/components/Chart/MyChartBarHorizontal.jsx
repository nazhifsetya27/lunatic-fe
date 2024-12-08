import React, { useMemo } from "react";
import ReactApexChart from "react-apexcharts";

const MyChartBarHorizontal = ({
  series = [],
  colors = [],
  labels = [],
  height = 300,
}) => {
  const optionsBar = {
    grid: { borderColor: "#F2F4F7" },
    chart: {
      type: "bar",
      height: "100%",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 0,
        columnHeigh: "90%",
        dataLabels: {
          position: "top",
        },
      },
    },
    xaxis: {
      categories: labels,
      reversed: true,
      labels: {
        formatter: (value) => {
          return Math.round(value);
        },
        show: true,
        align: "left",
        offsetX: -40,
        style: {
          colors: ["#475467"],
          fontSize: "12px",
          fontFamily: "Inter",
          fontWeight: 400,
        },
      },
      // tickAmount: labels.length,
    },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    yaxis: {
      labels: {
        show: true,
        align: "left",
        offsetX: -25,
        style: {
          colors: ["#475467"],
          fontSize: "12px",
          fontFamily: "Inter",
          fontWeight: 400,
        },
      },
    },
    legend: { show: false },
    dataLabels: {
      enabled: true,
      offsetX: 15,
      style: {
        colors: ["#475467"],
        fontSize: "12px",
        fontFamily: "Inter",
        fontWeight: 400,
      },
    },
    tooltip: { enabled: true },
  };
  const seriesData = useMemo(() => {
    return series.map((e, i) => {
      e.color = (colors ?? []).length > i ? colors[i] : null;
      return e;
    });
  }, [series, colors]);

  return (
    <>
      <ReactApexChart
        type="bar"
        options={optionsBar}
        series={seriesData}
        height={height}
      />
    </>
  );
};

export default MyChartBarHorizontal;
