import React, { useState, useEffect } from 'react';
import { BsCalendar4Week, BsChevronBarDown, BsArrowUp, BsArrowDown } from 'react-icons/bs';

const currentYear = new Date().getFullYear();
const previousYear = currentYear - 1;

const YearlyStatistics = ({ cases }) => {
  const [year, setYear] = useState(currentYear?.toString());
  const [otherYear, setOtherYear] = useState(previousYear?.toString());
  const [years, setYears] = useState([]);

  useEffect(() => {
    const yearsArray = [];
    for (let i = 0; i <= 4; i++) {
      yearsArray.push(currentYear - i);
    }
    setYears(yearsArray);
  }, []);

  const filterByYear = (yr) =>
    cases.filter((c) => new Date(c?.dateOfIncident).getFullYear() === new Date(yr).getFullYear());

  const yearCases = filterByYear(year);
  const otherYearCases = filterByYear(otherYear);

  const getBreakdown = (filtered) => ({
    total: filtered.length,
    minor: filtered.filter((c) => c?.typeOfViolation === 'Minor').length,
    major: filtered.filter((c) => c?.typeOfViolation === 'Major').length,
    first: filtered.filter((c) => c?.offense === '1st').length,
    second: filtered.filter((c) => c?.offense === '2nd').length,
    third: filtered.filter((c) => c?.offense === '3rd').length,
    fourth: filtered.filter((c) => c?.offense === '4th').length,
  });

  const current = getBreakdown(yearCases);
  const past = getBreakdown(otherYearCases);

  const getDelta = (curr, prev) => {
    if (prev === 0 && curr === 0) return { value: 0, direction: 'same' };
    if (prev === 0) return { value: 100, direction: 'up' };
    const pct = (((curr - prev) / prev) * 100).toFixed(1);
    return {
      value: Math.abs(pct),
      direction: pct > 0 ? 'up' : pct < 0 ? 'down' : 'same',
    };
  };

  const metrics = [
    { label: 'Total', key: 'total', bg: 'bg-[#006bff]', text: 'text-white', border: '' },
    { label: 'Minor', key: 'minor', bg: 'bg-white', text: 'text-[#006bff]', border: 'border border-blue-300' },
    { label: 'Major', key: 'major', bg: 'bg-red-800', text: 'text-white', border: '' },
    { label: '1st Offense', key: 'first', bg: 'bg-green-100', text: 'text-green-800', border: 'border border-green-300' },
    { label: '2nd Offense', key: 'second', bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border border-yellow-300' },
    { label: '3rd Offense', key: 'third', bg: 'bg-orange-100', text: 'text-orange-800', border: 'border border-orange-300' },
    { label: '4th Offense', key: 'fourth', bg: 'bg-red-100', text: 'text-red-800', border: 'border border-red-300' },
  ];

  const totalDelta = getDelta(current.total, past.total);

  return (
    <>
      {/* Delta summary */}
      <div className="w-full flex justify-center mt-4 mb-6">
        <div className={`px-6 py-4 rounded-xl border ${totalDelta.direction === 'down' ? 'border-green-300 bg-green-50' : totalDelta.direction === 'up' ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'} flex items-center gap-3`}>
          {totalDelta.direction === 'down' ? (
            <BsArrowDown className="text-[24px] text-green-600" />
          ) : totalDelta.direction === 'up' ? (
            <BsArrowUp className="text-[24px] text-red-600" />
          ) : null}
          <div className="text-[16px]">
            Cases have{' '}
            <span className={`font-bold ${totalDelta.direction === 'down' ? 'text-green-700' : totalDelta.direction === 'up' ? 'text-red-700' : 'text-gray-700'}`}>
              {totalDelta.direction === 'down' ? 'decreased' : totalDelta.direction === 'up' ? 'increased' : 'stayed the same'}
            </span>
            {totalDelta.direction !== 'same' && (
              <> by <span className="font-bold text-[20px]">{totalDelta.value}%</span></>
            )}
            {' '}from {otherYear} to {year}
          </div>
        </div>
      </div>

      <div className="w-full flex sm:flex-col justify-between gap-6">
        {/* Year Now */}
        <div className="w-[48%] sm:w-full flex flex-col gap-4">
          <div className="flex flex-col items-start gap-2">
            <div className="w-[200px] flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <div>Year Now</div> <BsChevronBarDown />
              </div>
              <BsCalendar4Week />
            </div>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="px-3 py-2 w-[200px] rounded-[6px] bg-white appearance-none focus:outline-none border focus:border-[#aaaaaa]"
            >
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-wrap gap-3">
            {metrics.map((m) => (
              <div key={m.key} className={`p-4 w-[200px] h-[170px] rounded-xl relative overflow-hidden ${m.bg} ${m.text} ${m.border}`}>
                <div className="text-[18px] font-medium">{m.label}</div>
                <div className="absolute bottom-3 right-4 text-[56px] font-bold leading-none">
                  {current[m.key]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Past Year */}
        <div className="w-[48%] sm:w-full flex flex-col gap-4">
          <div className="flex flex-col items-end sm:items-start gap-2">
            <div className="w-[200px] flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <div>Past Year</div> <BsChevronBarDown />
              </div>
              <BsCalendar4Week />
            </div>
            <select
              value={otherYear}
              onChange={(e) => setOtherYear(e.target.value)}
              className="px-3 py-2 w-[200px] rounded-[6px] bg-white appearance-none focus:outline-none border focus:border-[#aaaaaa]"
            >
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-wrap justify-end sm:justify-start gap-3">
            {metrics.map((m) => {
              const delta = getDelta(current[m.key], past[m.key]);
              return (
                <div key={m.key} className={`p-4 w-[200px] h-[170px] rounded-xl relative overflow-hidden ${m.bg} ${m.text} ${m.border}`}>
                  <div className="text-[18px] font-medium">{m.label}</div>
                  <div className="absolute bottom-3 right-4 text-[56px] font-bold leading-none">
                    {past[m.key]}
                  </div>
                  {delta.direction !== 'same' && (
                    <div className={`absolute top-3 right-4 text-[12px] font-semibold px-2 py-1 rounded-full ${
                      delta.direction === 'down' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                    }`}>
                      {delta.direction === 'up' ? '+' : '-'}{delta.value}%
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default YearlyStatistics;
