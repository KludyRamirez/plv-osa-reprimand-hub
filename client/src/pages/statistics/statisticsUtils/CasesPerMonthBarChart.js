import React, { useEffect, useRef, useMemo } from 'react';
import Chart from 'chart.js/auto';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const CasesPerMonthBarChart = ({ cases }) => {
  const chartContainer = useRef(null);

  const getCasesByMonth = (cases) => {
    return MONTHS.reduce((acc, month) => {
      const monthCasesCount = cases?.filter((c) => {
        const incidentDate = new Date(c?.dateOfIncident);
        return (
          incidentDate.toLocaleString('en-PH', { month: 'long' }) === month
        );
      }).length;
      acc[month] = monthCasesCount || 0; // Default to 0 if no cases
      return acc;
    }, {});
  };

  const casesByMonth = useMemo(() => getCasesByMonth(cases), [cases]);

  const chartData = useMemo(
    () => ({
      labels: MONTHS,
      datasets: [
        {
          label: 'Cases',
          data: MONTHS.map((month) => casesByMonth[month]),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)',
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
          ],
          borderWidth: 1,
        },
      ],
    }),
    [casesByMonth]
  );

  const chartConfig = useMemo(
    () => ({
      type: 'bar',
      data: chartData,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    }),
    [chartData]
  );

  useEffect(() => {
    const ctx = chartContainer.current.getContext('2d');
    const chart = new Chart(ctx, chartConfig);

    return () => {
      chart.destroy();
    };
  }, [chartConfig]);

  return (
    <canvas
      ref={chartContainer}
      style={{
        display: 'block',
        boxSizing: 'border-box',
        width: '100%',
        padding: 0,
        margin: 0,
      }}
    />
  );
};

export default CasesPerMonthBarChart;
