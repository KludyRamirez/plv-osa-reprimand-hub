import React from 'react';
import { Chart } from 'react-google-charts';

export function StudentsPerYearPieChart({ cases }) {
  const firstYearCases = cases.filter((c) => c?.student?.year === 1);
  const secondYearCases = cases.filter((c) => c?.student?.year === 2);
  const thirdYearCases = cases.filter((c) => c?.student?.year === 3);
  const fourthYearCases = cases.filter((c) => c?.student?.year === 4);

  const data = [
    ['Task', 'Cases per year'],
    ['1st Year', firstYearCases?.length],
    ['2nd Year', secondYearCases?.length],
    ['3rd Year', thirdYearCases?.length],
    ['4th Year', fourthYearCases?.length],
  ];

  const slices = data.slice(1).reduce((acc, _, index) => {
    acc[index] = { offset: 0.1 };
    return acc;
  }, {});

  const options = {
    is3D: true,
    backgroundColor: 'transparent',
    slices: slices,
  };

  return (
    <>
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width={'100%'}
        height={'600px'}
      />
    </>
  );
}
