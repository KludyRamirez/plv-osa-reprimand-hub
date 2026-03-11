import React, { useState, useEffect } from 'react';
import { BsChevronBarDown, BsFilter } from 'react-icons/bs';
import CasesPerMonthBarChart from '../statisticsUtils/CasesPerMonthBarChart';
import StatCard from '../statisticsUtils/StatCard';
import { majorViolation, minorViolation, caseStatuses } from '../statisticsUtils/constants';

const CasesPerMonthFilter = ({ cases, students, getCases }) => {
  const [activeMainFilter, setActiveMainFilter] = useState('All');
  const [reportedViolation, setReportedViolation] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [dateOfIncident, setDateOfIncident] = useState('All');
  const [years, setYears] = useState([]);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const yearsArray = [];
    for (let i = 0; i <= 4; i++) {
      yearsArray.push(currentYear - i);
    }
    setYears(yearsArray);
  }, []);

  const filterCases = () => {
    return cases.filter((c) => {
      const reportedViolationMatch =
        reportedViolation === 'All' ||
        c?.reportedViolation?.toLowerCase().includes(reportedViolation?.toLowerCase());
      const mainFilterMatch =
        activeMainFilter === 'All' || c?.typeOfViolation === activeMainFilter;
      const statusMatch =
        selectedStatus === 'All' || c?.statusOfCase === selectedStatus;
      const dateOfIncidentMatch =
        dateOfIncident === 'All' ||
        new Date(c.dateOfIncident).getFullYear() === new Date(dateOfIncident).getFullYear();

      return dateOfIncidentMatch && reportedViolationMatch && mainFilterMatch && statusMatch;
    });
  };

  const filteredCases = filterCases();

  const majorCases = cases.filter((c) => c.typeOfViolation === 'Major');
  const minorCases = cases.filter((c) => c.typeOfViolation === 'Minor');

  const firstOffenseCases = cases.filter((c) => c.offense === '1st');
  const secondOffenseCases = cases.filter((c) => c.offense === '2nd');
  const thirdOffenseCases = cases.filter((c) => c.offense === '3rd');
  const fourthOffenseCases = cases.filter((c) => c.offense === '4th');

  const getViolations = () => {
    if (activeMainFilter === 'Minor') return [...minorViolation];
    if (activeMainFilter === 'Major') return [...majorViolation];
    return [...majorViolation, ...minorViolation];
  };

  const sortedViolations = getViolations().sort((a, b) =>
    a.toLowerCase().localeCompare(b.toLowerCase())
  );

  return (
    <>
      <div className="w-full grid grid-cols-2 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3 mt-2">
        <StatCard title="Total Cases" value={cases.length} color="#006bff" />
        <StatCard title="Minor Cases" value={minorCases.length} color="#FFBF00" subtitle={`${cases.length ? ((minorCases.length / cases.length) * 100).toFixed(0) : 0}%`} />
        <StatCard title="Major Cases" value={majorCases.length} color="#FF5F1F" subtitle={`${cases.length ? ((majorCases.length / cases.length) * 100).toFixed(0) : 0}%`} />
        <StatCard title="1st Offense" value={firstOffenseCases.length} color="#006bff" subtitle={`${cases.length ? ((firstOffenseCases.length / cases.length) * 100).toFixed(0) : 0}%`} />
        <StatCard title="2nd Offense" value={secondOffenseCases.length} color="#FFBF00" subtitle={`${cases.length ? ((secondOffenseCases.length / cases.length) * 100).toFixed(0) : 0}%`} />
        <StatCard title="3rd Offense" value={thirdOffenseCases.length} color="#FF5F1F" subtitle={`${cases.length ? ((thirdOffenseCases.length / cases.length) * 100).toFixed(0) : 0}%`} />
        <StatCard title="4th Offense" value={fourthOffenseCases.length} color="#ff3131" subtitle={`${cases.length ? ((fourthOffenseCases.length / cases.length) * 100).toFixed(0) : 0}%`} />
      </div>

      <div className="w-100 mt-8">
        <span className="text-[24px] text-[#006bff] font-semibold">
          Monthly Bar Chart
        </span>
      </div>
      <div className="w-100 text-[#404040] flex flex-col border border-blue-200 bg-[#f6faff] rounded-[6px]">
        <div className="px-3 w-100 h-[58px] flex justify-between gap-2 bg-white rounded-[6px]">
          <div className="flex justify-start items-center gap-2">
            {['All', 'Minor', 'Major'].map((filter) => (
              <div
                key={filter}
                onClick={() => setActiveMainFilter(filter)}
                className={`px-3 h-[58px] hover:border-b-2 hover:border-blue-600 flex justify-center items-center text-[18px] ${
                  activeMainFilter === filter
                    ? 'border-b-2 border-blue-600'
                    : 'border-b-2 border-white'
                }`}
              >
                {filter === 'All' ? 'All Cases' : filter}
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center pr-2">
            <BsFilter className="text-[28px]" />
          </div>
        </div>

        <div className="w-100 flex justify-start p-4 rounded-bl-[10px] rounded-br-[10px]">
          <div className="w-100 flex flex-wrap justify-start items-center gap-4 sm:gap-2">
            <div className="sm:w-[50%] flex flex-col items-start gap-2">
              <div className="pl-2 w-[240px] sm:w-[100%] flex justify-between items-center">
                <div>Violation</div>
                <BsChevronBarDown />
              </div>
              <select
                onChange={(e) => setReportedViolation(e.target.value)}
                className="cursor-pointer px-3 py-2 w-[240px] sm:w-[100%] rounded-[6px] bg-white appearance-none focus:outline-none border border-blue-200 focus:border-blue-300"
              >
                <option value="All">All</option>
                {sortedViolations.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
            <div className="sm:w-[47.8%] flex flex-col items-start gap-2">
              <div className="w-[240px] sm:w-[100%] flex justify-between items-center">
                <div>Status</div>
                <BsChevronBarDown />
              </div>
              <select
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="cursor-pointer px-3 py-2 w-[240px] sm:w-[100%] rounded-[6px] bg-white appearance-none focus:outline-none border border-blue-200 focus:border-blue-300"
              >
                <option value="All">All</option>
                {caseStatuses.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="sm:w-[50%] flex flex-col items-start gap-2">
              <div className="w-[240px] sm:w-[100%] flex justify-between items-center">
                <div>Year</div>
                <BsChevronBarDown />
              </div>
              <select
                value={dateOfIncident}
                onChange={(e) => setDateOfIncident(e.target.value)}
                className="cursor-pointer px-3 py-2 w-[240px] sm:w-[100%] rounded-[6px] bg-white appearance-none focus:outline-none border border-blue-200 focus:border-blue-300"
              >
                <option value="All">All</option>
                {years.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <CasesPerMonthBarChart
        cases={filteredCases}
        students={students}
        getCases={getCases}
      />
    </>
  );
};

export default CasesPerMonthFilter;
