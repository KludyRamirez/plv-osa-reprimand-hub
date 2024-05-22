import React from "react";
import CasesPerMonthFilter from "../statisticsComponents/CasesPerMonthFilter";
import StudentsPerYearFilter from "../statisticsComponents/StudentsPerYearFilter";

const StatisticsTable = ({ cases, students, getCases, toast }) => {
  return (
    <>
      <div className="w-100 text-[14px] text-[#404040] pb-6 ">
        Office of Student Affairs / Statistics
      </div>
      <div className="w-100 pb-6 flex flex-col gap-2">
        <div className="text-[26px] text-[#077bff] font-bold">Statistics</div>
        <div className="flex phone:flex-wrap justify-start gap-8">
          <div className="w-[100%] h-[fit-content] pt-2">
            <CasesPerMonthFilter
              toast={toast}
              getCases={getCases}
              cases={cases}
              students={students}
            />
          </div>
          <div className="w-[100%] h-[fit-content] pt-2">
            <StudentsPerYearFilter
              toast={toast}
              getCases={getCases}
              cases={cases}
              students={students}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default StatisticsTable;
