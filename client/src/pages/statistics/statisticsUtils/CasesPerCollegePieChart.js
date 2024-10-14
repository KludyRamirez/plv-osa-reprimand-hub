import React from "react";
import { Chart } from "react-google-charts";

export function CasesPerCollegePieChart({ cases }) {
  const casesData = [...cases];

  const collegeCounts = {};

  casesData.forEach((caseItem) => {
    const college = caseItem?.student?.college;
    if (collegeCounts[college]) {
      collegeCounts[college]++;
    } else {
      collegeCounts[college] = 1;
    }
  });

  const data = [["Cases", "Cases per college"]];

  for (const college in collegeCounts) {
    data.push([college, collegeCounts[college]]);
  }

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
          height={"400px"}
        />
      </div>
    </>
  );
}
