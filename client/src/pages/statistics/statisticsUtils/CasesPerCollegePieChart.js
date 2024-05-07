import React from "react";
import { Chart } from "react-google-charts";

export function CasesPerCollegePieChart({ cases }) {
  const coedCases = cases.filter(
    (c) => c.student.college === "(COED) College of Education"
  );
  const casCases = cases.filter(
    (c) => c.student.college === "(CAS) College of Arts and Sciences"
  );
  const ceitCases = cases.filter(
    (c) =>
      c.student.college ===
      "(CEIT) College of Engineering and Information Technology"
  );
  const cabaCases = cases.filter(
    (c) =>
      c.student.college ===
      "(CABA) College of Business Administration, Public Administration and Accountancy"
  );

  const data = [
    ["Cases", "Cases per college"],
    ["COED", coedCases.length],
    ["CAS", casCases.length],
    ["CEIT", ceitCases.length],
    ["CABA", cabaCases.length],
  ];

  const options = {
    is3D: true,
    backgroundColor: "transparent",
  };

  return (
    <>
      <div className="mt-[-4px]">
        <Chart
          chartType="PieChart"
          data={data}
          options={options}
          width={"100%"}
          height={"280px"}
        />
      </div>
    </>
  );
}
