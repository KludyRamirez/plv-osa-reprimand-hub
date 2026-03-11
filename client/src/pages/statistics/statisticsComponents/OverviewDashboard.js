import React, { useEffect, useRef, useMemo } from 'react';
import Chart from 'chart.js/auto';
import StatCard from '../statisticsUtils/StatCard';
import PieChart from '../statisticsUtils/PieChart';
import { BsPersonFill, BsFolderFill, BsExclamationTriangleFill, BsCheckCircleFill, BsShieldExclamation } from 'react-icons/bs';

const HorizontalBarChart = ({ labels, data, colors, height = '300px' }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) chartInstance.current.destroy();

    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: colors || 'rgba(0, 107, 255, 0.7)',
          borderRadius: 6,
          barThickness: 28,
        }],
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { beginAtZero: true, grid: { display: false } },
          y: {
            grid: { display: false },
            ticks: {
              font: { size: 11 },
              callback: function(value) {
                const label = this.getLabelForValue(value);
                return label.length > 35 ? label.substring(0, 35) + '...' : label;
              },
            },
          },
        },
      },
    });

    return () => { if (chartInstance.current) chartInstance.current.destroy(); };
  }, [labels, data, colors]);

  return (
    <div style={{ height, width: '100%' }}>
      <canvas ref={chartRef} />
    </div>
  );
};

const OverviewDashboard = ({ cases, students }) => {
  const totalCases = cases.length;
  const totalStudents = students.length;
  const majorCases = cases.filter((c) => c.typeOfViolation === 'Major').length;
  const minorCases = cases.filter((c) => c.typeOfViolation === 'Minor').length;
  const activeCases = cases.filter((c) => c.statusOfCase !== 'Case Solved' && c.statusOfCase !== 'Dismissed').length;
  const resolvedCases = cases.filter((c) => c.statusOfCase === 'Case Solved').length;
  const dismissalStudents = students.filter((s) => s.statusOfStudent === 'Subject For Dismissal').length;

  // Cases by status
  const statusCounts = useMemo(() => {
    const counts = {};
    cases.forEach((c) => {
      const status = c.statusOfCase || 'Unknown';
      counts[status] = (counts[status] || 0) + 1;
    });
    return counts;
  }, [cases]);

  const statusLabels = Object.keys(statusCounts);
  const statusData = Object.values(statusCounts);

  // Top 5 reported violations
  const violationCounts = useMemo(() => {
    const counts = {};
    cases.forEach((c) => {
      const violation = c.reportedViolation;
      if (violation) counts[violation] = (counts[violation] || 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  }, [cases]);

  const topViolationLabels = violationCounts.map(([v]) => v);
  const topViolationData = violationCounts.map(([, count]) => count);

  // Cases by college
  const collegeCounts = useMemo(() => {
    const counts = {};
    cases.forEach((c) => {
      const college = c?.student?.college;
      if (college) counts[college] = (counts[college] || 0) + 1;
    });
    return counts;
  }, [cases]);

  const collegeLabels = Object.keys(collegeCounts);
  const collegeData = Object.values(collegeCounts);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
        <StatCard
          title="Total Cases"
          value={totalCases}
          color="#006bff"
          icon={<BsFolderFill />}
        />
        <StatCard
          title="Total Students"
          value={totalStudents}
          color="#8b5cf6"
          icon={<BsPersonFill />}
        />
        <StatCard
          title="Active Cases"
          value={activeCases}
          color="#FF5F1F"
          icon={<BsExclamationTriangleFill />}
        />
        <StatCard
          title="Resolved"
          value={resolvedCases}
          color="#10b981"
          icon={<BsCheckCircleFill />}
        />
        <StatCard
          title="Minor Cases"
          value={minorCases}
          color="#FFBF00"
        />
        <StatCard
          title="Major Cases"
          value={majorCases}
          color="#FF5F1F"
        />
        <StatCard
          title="For Dismissal"
          value={dismissalStudents}
          color="#ff3131"
          icon={<BsShieldExclamation />}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border border-blue-200 rounded-xl p-5">
          <div className="text-[#006bff] text-[16px] font-semibold mb-4">
            Cases by Status
          </div>
          {statusLabels.length > 0 ? (
            <PieChart
              labels={statusLabels}
              data={statusData}
              doughnut={true}
              height="320px"
            />
          ) : (
            <div className="h-[320px] flex justify-center items-center text-gray-400">No data</div>
          )}
        </div>

        <div className="bg-white border border-blue-200 rounded-xl p-5">
          <div className="text-[#006bff] text-[16px] font-semibold mb-4">
            Cases by College
          </div>
          {collegeLabels.length > 0 ? (
            <PieChart
              labels={collegeLabels}
              data={collegeData}
              height="320px"
            />
          ) : (
            <div className="h-[320px] flex justify-center items-center text-gray-400">No data</div>
          )}
        </div>
      </div>

      <div className="bg-white border border-blue-200 rounded-xl p-5">
        <div className="text-[#006bff] text-[16px] font-semibold mb-4">
          Top 5 Reported Violations
        </div>
        {topViolationLabels.length > 0 ? (
          <HorizontalBarChart
            labels={topViolationLabels}
            data={topViolationData}
            colors="rgba(0, 107, 255, 0.7)"
            height={`${Math.max(200, topViolationLabels.length * 50)}px`}
          />
        ) : (
          <div className="h-[200px] flex justify-center items-center text-gray-400">No data</div>
        )}
      </div>
    </div>
  );
};

export default OverviewDashboard;
