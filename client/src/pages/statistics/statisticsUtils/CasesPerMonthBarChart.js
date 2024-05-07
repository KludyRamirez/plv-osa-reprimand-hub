import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Define the React component
const CasesPerMonthBarChart = ({ cases }) => {
  const chartContainer = useRef(null);

  const casesByMonth = {};

  months.forEach((month, index) => {
    const monthCases = cases.filter((c) => {
      const dateParts = new Date(c?.dateOfIncident)
        .toLocaleDateString("en-PH", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
        .split(" ");
      return dateParts[0] === month;
    });

    casesByMonth[month] = monthCases.length;
  });

  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Cases",
        data: months.map((month) => casesByMonth[month]),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const config = {
    type: "bar",
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  useEffect(() => {
    const ctx = chartContainer.current.getContext("2d");
    const chart = new Chart(ctx, config);

    return () => {
      chart.destroy();
    };
  }, [config]);

  return (
    <div className="px-4 py-3 border-[1px] rounded-[8px]">
      <canvas ref={chartContainer} />
    </div>
  );
};

export default CasesPerMonthBarChart;
