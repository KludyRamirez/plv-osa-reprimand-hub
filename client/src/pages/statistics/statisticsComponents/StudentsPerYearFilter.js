import React, { useState, useEffect } from 'react';
import { BsChevronBarDown, BsFilter, BsFolderX } from 'react-icons/bs';
import PieChart from '../statisticsUtils/PieChart';
import { majorViolation, minorViolation, caseStatuses, months, chartColors } from '../statisticsUtils/constants';

const StudentsPerYear = ({ cases, students, getCases }) => {
  const [activeMainFilter, setActiveMainFilter] = useState('All');
  const [reportedViolation, setReportedViolation] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [dateOfIncident, setDateOfIncident] = useState('All');
  const [monthOfIncident, setMonthOfIncident] = useState('All');
  const [years, setYears] = useState([]);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const yearsArray = [];
    for (let i = 0; i <= 4; i++) {
      yearsArray.push(currentYear - i);
    }
    setYears(yearsArray);
  }, []);

  const filteredCases = cases.filter((c) => {
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
    const monthOfIncidentMatch =
      monthOfIncident === 'All' ||
      new Date(c?.dateOfIncident).toLocaleDateString('en-PH', {
        month: 'long', day: 'numeric', year: 'numeric',
      }).split(' ')[0] === monthOfIncident;

    return dateOfIncidentMatch && reportedViolationMatch && mainFilterMatch && statusMatch && monthOfIncidentMatch;
  });

  const getViolations = () => {
    if (activeMainFilter === 'Minor') return [...minorViolation];
    if (activeMainFilter === 'Major') return [...majorViolation];
    return [...majorViolation, ...minorViolation];
  };

  const sortedViolations = getViolations().sort((a, b) =>
    a.toLowerCase().localeCompare(b.toLowerCase())
  );

  // Cases per year level data
  const yearLevelLabels = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
  const yearLevelData = [1, 2, 3, 4].map(
    (yr) => filteredCases.filter((c) => c?.student?.year === yr).length
  );

  // Cases per college data
  const collegeCounts = {};
  filteredCases.forEach((c) => {
    const college = c?.student?.college;
    if (college) {
      collegeCounts[college] = (collegeCounts[college] || 0) + 1;
    }
  });
  const collegeLabels = Object.keys(collegeCounts);
  const collegeData = Object.values(collegeCounts);

  return (
    <>
      <div className="w-100 mt-8">
        <span className="text-[24px] text-[#006bff] font-semibold">
          Pie Charts
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

        <div className="w-100 flex justify-start p-4">
          <div className="w-100 flex flex-wrap justify-start items-center gap-4 sm:gap-2">
            <div className="sm:w-[50%] flex flex-col items-start gap-2">
              <div className="pl-2 w-[200px] sm:w-[100%] flex justify-between items-center">
                <div>Violation</div>
                <BsChevronBarDown />
              </div>
              <select
                onChange={(e) => setReportedViolation(e.target.value)}
                className="cursor-pointer px-3 py-2 w-[200px] sm:w-[100%] rounded-[6px] bg-white appearance-none focus:outline-none border border-blue-200 focus:border-blue-300"
              >
                <option value="All">All</option>
                {sortedViolations.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
            <div className="sm:w-[47.8%] flex flex-col items-start gap-2">
              <div className="w-[200px] sm:w-[100%] flex justify-between items-center">
                <div>Status</div>
                <BsChevronBarDown />
              </div>
              <select
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="cursor-pointer px-3 py-2 w-[200px] sm:w-[100%] rounded-[6px] bg-white appearance-none focus:outline-none border border-blue-200 focus:border-blue-300"
              >
                <option value="All">All</option>
                {caseStatuses.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="sm:w-[50%] flex flex-col items-start gap-2">
              <div className="w-[200px] sm:w-[100%] flex justify-between items-center">
                <div>Year</div>
                <BsChevronBarDown />
              </div>
              <select
                value={dateOfIncident}
                onChange={(e) => setDateOfIncident(e.target.value)}
                className="cursor-pointer sm:w-[100%] px-3 py-2 w-[200px] rounded-[6px] bg-white appearance-none focus:outline-none border border-blue-200 focus:border-blue-300"
              >
                <option value="All">All</option>
                {years.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <div className="sm:w-[47.8%] flex flex-col items-start gap-2">
              <div className="w-[200px] sm:w-[100%] flex justify-between items-center">
                <div>Month</div>
                <BsChevronBarDown />
              </div>
              <select
                value={monthOfIncident}
                onChange={(e) => setMonthOfIncident(e.target.value)}
                className="cursor-pointer sm:w-[100%] px-3 py-2 w-[200px] rounded-[6px] bg-white appearance-none focus:outline-none border border-blue-200 focus:border-blue-300"
              >
                <option value="All">All</option>
                {months.map((month) => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="bg-white border border-blue-200 rounded-xl p-5">
          <div className="text-[#006bff] text-[16px] font-semibold mb-4">
            Cases Per Year Level
          </div>
          {filteredCases.length > 0 ? (
            <PieChart
              labels={yearLevelLabels}
              data={yearLevelData}
              colors={[
                'rgba(0, 107, 255, 0.7)',
                'rgba(255, 191, 0, 0.7)',
                'rgba(255, 95, 31, 0.7)',
                'rgba(255, 49, 49, 0.7)',
              ]}
              height="350px"
            />
          ) : (
            <div className="h-[350px] flex flex-col justify-center items-center gap-2">
              <BsFolderX className="text-[48px] text-[#006bff]" />
              <div className="text-[#006bff] text-[14px]">No cases available</div>
            </div>
          )}
        </div>

        <div className="bg-white border border-blue-200 rounded-xl p-5">
          <div className="text-[#006bff] text-[16px] font-semibold mb-4">
            Cases Per College
          </div>
          {filteredCases.length > 0 ? (
            <PieChart
              labels={collegeLabels}
              data={collegeData}
              height="350px"
            />
          ) : (
            <div className="h-[350px] flex flex-col justify-center items-center gap-2">
              <BsFolderX className="text-[48px] text-[#006bff]" />
              <div className="text-[#006bff] text-[14px]">No cases available</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default StudentsPerYear;
