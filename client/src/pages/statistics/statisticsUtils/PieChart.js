import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PieChart = ({ labels, data, colors, doughnut = false, height = '300px' }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: doughnut ? 'doughnut' : 'pie',
      data: {
        labels,
        datasets: [
          {
            data,
            backgroundColor: colors || [
              'rgba(0, 107, 255, 0.7)',
              'rgba(255, 191, 0, 0.7)',
              'rgba(255, 95, 31, 0.7)',
              'rgba(255, 49, 49, 0.7)',
              'rgba(16, 185, 129, 0.7)',
              'rgba(139, 92, 246, 0.7)',
              'rgba(236, 72, 153, 0.7)',
              'rgba(20, 184, 166, 0.7)',
              'rgba(249, 115, 22, 0.7)',
              'rgba(99, 102, 241, 0.7)',
            ],
            borderWidth: 2,
            borderColor: '#fff',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 16,
              usePointStyle: true,
              pointStyleWidth: 10,
              font: { size: 12 },
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [labels, data, colors, doughnut]);

  return (
    <div style={{ height, width: '100%' }}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default PieChart;
