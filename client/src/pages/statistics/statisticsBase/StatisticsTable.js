import React, { useState } from 'react';
import CasesPerMonthFilter from '../statisticsComponents/CasesPerMonthFilter';
import StudentsPerYearFilter from '../statisticsComponents/StudentsPerYearFilter';
import YearlyStatistics from '../statisticsComponents/YearlyStatistics';

const StatisticsTable = ({ cases, students, getCases, toast }) => {
  const [activeStats, setActiveStats] = useState('Total');

  const handleSetActiveStats = (active) => {
    setActiveStats(active);
  };

  return (
    <>
      <div className="w-100 text-[14px] text-[#404040] mb-6">
        Office of Student Affairs / Statistics
      </div>
      <div className="w-100 flex flex-col gap-2">
        <div className="w-100 text-[26px] text-[#077bff] font-bold mb-6 flex justify-between items-center">
          <div>Statistics</div>
          <div className="flex justify-start items-center gap-2">
            <div
              onClick={() => handleSetActiveStats('Total')}
              className={`text-[16px] ${
                activeStats === 'Total'
                  ? 'bg-gradient-to-br from-[#007bff] via-[#079bff] to-[#007bff] text-white'
                  : 'text-[#606060] bg-gray-100 border-gray-100'
              } font-semibold py-3 px-5 rounded-[32px] cursor-pointer`}
            >
              All Stats
            </div>
            <div
              onClick={() => handleSetActiveStats('Yearly')}
              className={`text-[16px] ${
                activeStats === 'Yearly'
                  ? 'bg-gradient-to-br from-[#007bff] via-[#079bff] to-[#007bff] text-white'
                  : 'text-[#606060] bg-gray-100 border-gray-100'
              } font-semibold py-3 px-5 rounded-[32px] cursor-pointer`}
            >
              Yearly Stats
            </div>
          </div>
        </div>

        {activeStats === 'Total' ? (
          <div className="flex flex-col gap-4">
            <CasesPerMonthFilter
              toast={toast}
              getCases={getCases}
              cases={cases}
              students={students}
            />
            <StudentsPerYearFilter
              toast={toast}
              getCases={getCases}
              cases={cases}
              students={students}
            />
          </div>
        ) : (
          <YearlyStatistics cases={cases} />
        )}
      </div>
    </>
  );
};

export default StatisticsTable;
