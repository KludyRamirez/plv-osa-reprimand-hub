import React, { useState } from "react";
import CasesPerMonthFilter from "../statisticsComponents/CasesPerMonthFilter";
import StudentsPerYearFilter from "../statisticsComponents/StudentsPerYearFilter";
import YearlyStatistics from "../statisticsComponents/YearlyStatistics";

const StatisticsTable = ({ cases, students, getCases, toast }) => {
  const [activeStats, setActiveStats] = useState("Dynamic");

  const handleSetActiveStats = (active) => {
    setActiveStats(active);
  };

  return (
    <>
      <div className="w-100 text-[14px] text-[#404040] pb-6 ">
        Office of Student Affairs / Statistics
      </div>
      <div className="w-100 pb-6 flex flex-col gap-2">
        <div className="w-100 text-[26px] text-[#077bff] font-bold pb-6 flex justify-between items-center">
          <div>Statistics</div>
          <div className="flex justify-start items-center gap-2">
            <div
              onClick={() => handleSetActiveStats("Dynamic")}
              className={`text-[16px] ${
                activeStats === "Dynamic"
                  ? "bg-gradient-to-br from-[#007bff] via-[#079bff] to-[#007bff] text-white"
                  : "text-[#505050] bg-gray-100 border-gray-100"
              } font-bold py-3 px-5 rounded-[32px] cursor-pointer tracking-wide`}
            >
              Dynamic
            </div>
            <div
              onClick={() => handleSetActiveStats("Yearly")}
              className={`text-[16px] ${
                activeStats === "Yearly"
                  ? "bg-gradient-to-br from-[#007bff] via-[#079bff] to-[#007bff] text-white"
                  : "text-[#505050] bg-gray-100 border-gray-100"
              } font-bold py-3 px-6 rounded-[32px] cursor-pointer tracking-wide`}
            >
              Yearly
            </div>
          </div>
        </div>

        {activeStats === "Dynamic" ? (
          <div className="flex flex-wrap justify-start gap-8">
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
        ) : (
          <div className="flex flex-wrap justify-start gap-8">
            <div className="w-[100%] h-[fit-content] mt-2">
              <YearlyStatistics cases={cases} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default StatisticsTable;
