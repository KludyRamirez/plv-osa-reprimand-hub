import React, { useState } from 'react';
import OverviewDashboard from '../statisticsComponents/OverviewDashboard';
import CasesPerMonthFilter from '../statisticsComponents/CasesPerMonthFilter';
import StudentsPerYearFilter from '../statisticsComponents/StudentsPerYearFilter';
import YearlyStatistics from '../statisticsComponents/YearlyStatistics';

const tabs = [
  { key: 'Overview', label: 'Overview' },
  { key: 'Cases', label: 'Cases Analytics' },
  { key: 'Yearly', label: 'Year Comparison' },
];

const StatisticsTable = ({ cases, students, getCases, toast }) => {
  const [activeStats, setActiveStats] = useState('Overview');

  return (
    <>
      <div className="w-100 text-[14px] text-[#404040] mb-6">
        Office of Student Affairs / Statistics
      </div>
      <div className="w-100 flex flex-col gap-2">
        <div className="w-100 text-[26px] text-[#006bff] font-bold mb-6 flex justify-between items-center">
          <div>Statistics</div>
          <div className="flex justify-start items-center gap-2">
            {tabs.map((tab) => (
              <div
                key={tab.key}
                onClick={() => setActiveStats(tab.key)}
                className={`text-[16px] ${
                  activeStats === tab.key
                    ? 'bg-gradient-to-br from-[#006bff] via-[#079bff] to-[#006bff] text-white'
                    : 'text-[#606060] bg-gray-100 border-gray-100'
                } font-semibold py-3 px-5 rounded-[32px] cursor-pointer`}
              >
                {tab.label}
              </div>
            ))}
          </div>
        </div>

        {activeStats === 'Overview' && (
          <OverviewDashboard cases={cases} students={students} />
        )}

        {activeStats === 'Cases' && (
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
        )}

        {activeStats === 'Yearly' && (
          <YearlyStatistics cases={cases} />
        )}
      </div>
    </>
  );
};

export default StatisticsTable;
