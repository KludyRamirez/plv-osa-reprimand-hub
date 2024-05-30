import React, { useState, useEffect } from "react";
import { BsCalendar4Week, BsChevronBarDown } from "react-icons/bs";

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

  // useEffect(() => {
  //   if (years > 0) {
  //     setYear(years[0]);
  //     setOtherYear(years[0]);
  //   }
  // }, [years]);

  const filterCases = (cases, year) => {
    return cases.filter((c) => {
      const yearMatch =
        year === "All" ||
        new Date(c?.dateOfIncident).getFullYear() ===
          new Date(year).getFullYear();

      return yearMatch;
    });
  };

  const filteredCases = filterCases(cases, year);

  let combinedFilteredCases = [...filteredCases];

  const totalCases = cases?.filter(
    (c) =>
      new Date(c?.dateOfIncident).getFullYear() === new Date(year).getFullYear()
  );

  const majorCases = combinedFilteredCases?.filter(
    (c) => c?.typeOfViolation === "Major"
  );
  const minorCases = combinedFilteredCases?.filter(
    (c) => c?.typeOfViolation === "Minor"
  );

  const firstOffCases = combinedFilteredCases?.filter(
    (c) => c?.offense === "1st"
  );
  const secondOffCases = combinedFilteredCases?.filter(
    (c) => c?.offense === "2nd"
  );
  const thirdOffCases = combinedFilteredCases?.filter(
    (c) => c?.offense === "3rd"
  );
  const fourthOffCases = combinedFilteredCases?.filter(
    (c) => c?.offense === "4th"
  );

  // other year

  const filterOtherCases = (cases, otherYear) => {
    return cases.filter((c) => {
      const otherYearMatch =
        otherYear === "All" ||
        new Date(c?.dateOfIncident).getFullYear() ===
          new Date(otherYear).getFullYear();

      return otherYearMatch;
    });
  };

  const filteredOtherCases = filterOtherCases(cases, otherYear);

  let combinedFilteredOtherCases = [...filteredOtherCases];

  const totalOtherCases = cases?.filter(
    (c) =>
      new Date(c?.dateOfIncident).getFullYear() ===
      new Date(otherYear).getFullYear()
  );

  const majorOtherCases = combinedFilteredOtherCases?.filter(
    (c) => c?.typeOfViolation === "Major"
  );
  const minorOtherCases = combinedFilteredOtherCases?.filter(
    (c) => c?.typeOfViolation === "Minor"
  );

  const firstOffOtherCases = combinedFilteredOtherCases?.filter(
    (c) => c?.offense === "1st"
  );
  const secondOffOtherCases = combinedFilteredOtherCases?.filter(
    (c) => c?.offense === "2nd"
  );
  const thirdOffOtherCases = combinedFilteredOtherCases?.filter(
    (c) => c?.offense === "3rd"
  );
  const fourthOffOtherCases = combinedFilteredOtherCases?.filter(
    (c) => c?.offense === "4th"
  );

  const yearTotal = cases?.filter(
    (c) =>
      new Date(c?.dateOfIncident).getFullYear() === new Date(year).getFullYear()
  );

  const otherYearTotal = cases?.filter(
    (c) =>
      new Date(c?.dateOfIncident).getFullYear() ===
      new Date(otherYear).getFullYear()
  );

  const subtractCasesTotalPerYear = yearTotal?.length - otherYearTotal?.length;

  const yearNowPercentage = Math.abs(subtractCasesTotalPerYear);

  const fraction =
    yearTotal?.length !== 0 ? yearNowPercentage / yearTotal?.length : 0;

  const percentage = (fraction * 100).toFixed(1);

  return (
    <>
      <div className="w-[100%] h-[100%] rounded-[8px] flex justify-between relative mt-4">
        <div className="w-[45%] flex flex-col flex-wrap gap-4">
          <div className="phone:w-[50%] flex flex-col items-start gap-2 ml-9">
            <div className=" w-[158px] phone:w-[100%] flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <div>Year Now</div> <BsChevronBarDown />
              </div>
              <BsCalendar4Week />
            </div>
            <select
              value={year}
              onChange={(e) => {
                setYear(e.target.value);
              }}
              className="phone:w-[100%] px-3 py-2 w-[158px] rounded-[6px] bg-[#ffffff] appearance-none focus:outline-none focus:border-[#aaaaaa] focus:border-[1px] border-[1px] "
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-center flex-wrap gap-2 w-[100%]">
            <div className="p-4 w-[206px] h-[180px] rounded-[12px] relative overflow-hidden bg-[#007bff] flex justify-start items-start text-[white]">
              <div className="text-[20px]">Total</div>
              <div className="absolute bottom-[-10px] right-[16px] text-[64px] font-bold zIndex-3">
                {totalCases?.length}
              </div>
              <div className="absolute bottom-[-90px] left-[-90px] w-[200px] h-[200px] rounded-[50%] bg-blue-400 flex justify-center items-center">
                <div className="w-[120px] h-[120px] rounded-[50%] bg-blue-300"></div>
              </div>
            </div>
            <div className="p-4 w-[206px] h-[180px] border-[1px] border-blue-300 rounded-[12px] relative overflow-hidden bg-white text-[#007bff]">
              <div className="text-[20px]">Minor</div>
              <div className="absolute bottom-[-10px] right-[16px] text-[64px] font-bold zIndex-3">
                {minorCases?.length}
              </div>
              <div className="absolute top-[-90px] right-[-90px] w-[200px] h-[200px] rounded-[50%] bg-blue-200 flex justify-center items-center">
                <div className="w-[120px] h-[120px] rounded-[50%] bg-blue-100"></div>
              </div>
            </div>
            <div className="p-4 w-[206px] h-[180px] rounded-[12px] relative overflow-hidden bg-red-800 text-[white]">
              <div className="text-[20px]">Major</div>
              <div className="absolute bottom-[-10px] right-[16px] text-[64px] font-bold zIndex-3">
                {majorCases?.length}
              </div>
              <div className="absolute bottom-[-90px] left-[-90px] w-[200px] h-[200px] rounded-[50%] bg-red-200 flex justify-center items-center">
                <div className="w-[120px] h-[120px] rounded-[50%] bg-red-100"></div>
              </div>
            </div>
            <div className="p-4 w-[206px] h-[180px] border-[1px] border-green-300 rounded-[12px] relative overflow-hidden bg-green-100 text-green-800">
              <div className="text-[20px]">1st Offense</div>
              <div className="absolute bottom-[-10px] right-[16px] text-[64px] font-bold zIndex-3">
                {firstOffCases?.length}
              </div>
              <div className="absolute bottom-[-90px] right-[-90px] w-[200px] h-[200px] rounded-[50%] bg-green-200 flex justify-center items-center">
                <div className="w-[120px] h-[120px] rounded-[50%] bg-green-100"></div>
              </div>
            </div>
            <div className="p-4 w-[206px] h-[180px] border-[1px] border-yellow-300 rounded-[12px] relative overflow-hidden bg-yellow-100 text-yellow-800">
              <div className="text-[20px]">2nd Offense</div>
              <div className="absolute bottom-[-10px] right-[16px] text-[64px] font-bold zIndex-3">
                {secondOffCases?.length}
              </div>
              <div className="absolute bottom-[-90px] left-[-90px] w-[200px] h-[200px] rounded-[50%] bg-yellow-200 flex justify-center items-center">
                <div className="w-[120px] h-[120px] rounded-[50%] bg-yellow-100"></div>
              </div>
            </div>
            <div className="p-2 w-[206px] h-[180px] border-[1px] border-white rounded-[12px] relative overflow-hidden bg-white"></div>
            <div className="p-4 w-[206px] h-[180px] border-[1px] border-orange-300 rounded-[12px] relative overflow-hidden bg-orange-100 text-orange-800">
              <div className="text-[20px]">
                3rd <br /> Offense
              </div>
              <div className="absolute top-[-90px] right-[-90px] w-[200px] h-[200px] rounded-[50%] bg-orange-200 flex justify-center items-center">
                <div className="w-[120px] h-[120px] rounded-[50%] bg-orange-100"></div>
              </div>
              <div className="absolute bottom-[-10px] right-[16px] text-[64px] font-bold zIndex-3">
                {thirdOffCases?.length}
              </div>
            </div>
            <div className="p-4 w-[206px] h-[180px] border-[1px] border-red-300 rounded-[12px] relative overflow-hidden bg-red-100 text-red-800">
              <div className="text-[20px] zIndex-3">4th Offense</div>
              <div className="absolute bottom-[-10px] right-[16px] text-[64px] font-bold zIndex-3">
                {fourthOffCases?.length}
              </div>
              <div className="absolute bottom-[-90px] left-[-90px] w-[200px] h-[200px] rounded-[50%] bg-red-200 flex justify-center items-center">
                <div className="w-[120px] h-[120px] rounded-[50%] bg-red-100"></div>
              </div>
            </div>
            <div className="p-2 w-[206px] h-[180px] border-[1px] border-white rounded-[12px] relative overflow-hidden bg-white"></div>
          </div>
        </div>
        <div className="w-[45%] flex flex-col gap-4">
          <div className="phone:w-[50%] flex flex-col items-start gap-2 ml-9">
            <div className=" w-[158px] phone:w-[100%] flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <div>Past Year</div> <BsChevronBarDown />
              </div>
              <BsCalendar4Week />
            </div>
            <select
              value={otherYear}
              onChange={(e) => {
                setOtherYear(e.target.value);
              }}
              className="phone:w-[100%] px-3 py-2 w-[158px] rounded-[6px] bg-[#ffffff] appearance-none focus:outline-none focus:border-[#aaaaaa] focus:border-[1px] border-[1px] "
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-center flex-wrap gap-2 w-[100%]">
            <div className="p-4 w-[206px] h-[180px] rounded-[12px] relative overflow-hidden bg-[#007bff] flex justify-start items-start text-[white]">
              <div className="text-[20px]">Total</div>
              <div className="absolute bottom-[-10px] right-[16px] text-[64px] font-bold zIndex-3">
                {totalOtherCases?.length}
              </div>
              <div className="absolute bottom-[-90px] left-[-90px] w-[200px] h-[200px] rounded-[50%] bg-blue-400 flex justify-center items-center">
                <div className="w-[120px] h-[120px] rounded-[50%] bg-blue-300"></div>
              </div>
            </div>
            <div className="p-4 w-[206px] h-[180px] border-[1px] border-blue-300 rounded-[12px] relative overflow-hidden bg-white text-[#007bff]">
              <div className="text-[20px]">Minor</div>
              <div className="absolute bottom-[-10px] right-[16px] text-[64px] font-bold zIndex-3">
                {minorOtherCases?.length}
              </div>
              <div className="absolute top-[-90px] right-[-90px] w-[200px] h-[200px] rounded-[50%] bg-blue-200 flex justify-center items-center">
                <div className="w-[120px] h-[120px] rounded-[50%] bg-blue-100"></div>
              </div>
            </div>
            <div className="p-4 w-[206px] h-[180px] rounded-[12px] relative overflow-hidden bg-red-800 text-[white]">
              <div className="text-[20px]">Major</div>
              <div className="absolute bottom-[-10px] right-[16px] text-[64px] font-bold zIndex-3">
                {majorOtherCases?.length}
              </div>
              <div className="absolute bottom-[-90px] left-[-90px] w-[200px] h-[200px] rounded-[50%] bg-red-200 flex justify-center items-center">
                <div className="w-[120px] h-[120px] rounded-[50%] bg-red-100"></div>
              </div>
            </div>
            <div className="p-2 w-[206px] h-[180px] border-[1px] border-white rounded-[12px] relative overflow-hidden bg-white"></div>
            <div className="p-4 w-[206px] h-[180px] border-[1px] border-green-300 rounded-[12px] relative overflow-hidden bg-green-100 text-green-800">
              <div className="text-[20px]">1st Offense</div>
              <div className="absolute bottom-[-10px] right-[16px] text-[64px] font-bold zIndex-3">
                {firstOffOtherCases?.length}
              </div>
              <div className="absolute bottom-[-90px] right-[-90px] w-[200px] h-[200px] rounded-[50%] bg-green-200 flex justify-center items-center">
                <div className="w-[120px] h-[120px] rounded-[50%] bg-green-100"></div>
              </div>
            </div>
            <div className="p-4 w-[206px] h-[180px] border-[1px] border-yellow-300 rounded-[12px] relative overflow-hidden bg-yellow-100 text-yellow-800">
              <div className="text-[20px]">2nd Offense</div>
              <div className="absolute bottom-[-10px] right-[16px] text-[64px] font-bold zIndex-3">
                {secondOffOtherCases?.length}
              </div>
              <div className="absolute bottom-[-90px] left-[-90px] w-[200px] h-[200px] rounded-[50%] bg-yellow-200 flex justify-center items-center">
                <div className="w-[120px] h-[120px] rounded-[50%] bg-yellow-100"></div>
              </div>
            </div>
            <div className="p-2 w-[206px] h-[180px] border-[1px] border-white rounded-[12px] relative overflow-hidden bg-white"></div>

            <div className="p-4 w-[206px] h-[180px] border-[1px] border-orange-300 rounded-[12px] relative overflow-hidden bg-orange-100 text-orange-800">
              <div className="text-[20px] zIndex-3">
                3rd <br /> Offense
              </div>
              <div className="absolute bottom-[-10px] right-[16px] text-[64px] font-bold zIndex-3">
                {thirdOffOtherCases?.length}
              </div>
              <div className="absolute top-[-90px] right-[-90px] w-[200px] h-[200px] rounded-[50%] bg-orange-200 flex justify-center items-center">
                <div className="w-[120px] h-[120px] rounded-[50%] bg-orange-100"></div>
              </div>
            </div>
            <div className="p-4 w-[206px] h-[180px] border-[1px] border-red-300 rounded-[12px] relative overflow-hidden bg-red-100 text-red-800">
              <div className="text-[20px] zIndex-3">4th Offense</div>
              <div className="absolute bottom-[-10px] right-[16px] text-[64px] font-bold zIndex-3">
                {fourthOffOtherCases?.length}
              </div>
              <div className="absolute bottom-[-90px] left-[-90px] w-[200px] h-[200px] rounded-[50%] bg-red-200 flex justify-center items-center">
                <div className="w-[120px] h-[120px] rounded-[50%] bg-red-100"></div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`w-[340px] h-[340px] rounded-[50%] absolute top-[46%] left-[39.3%] flex flex-col justify-center items-center gap-1`}
        >
          {subtractCasesTotalPerYear < 0 ? (
            <div className="text-[20px] text-center">
              The number of cases in the most recent year has{" "}
              <span className="text-green-800 font-bold">decreased</span> by:
            </div>
          ) : (
            <div className="text-[20px] text-center">
              The number of cases in the most recent year has{" "}
              <span className="text-red-800 font-bold">increased</span> by:
            </div>
          )}

          <div
            className={`text-[54px] font-bold rounded-[12px] flex justify-center ${
              subtractCasesTotalPerYear < 0 ? "text-green-800" : "text-red-800"
            }`}
          >
            {percentage}%
          </div>
        </div>
      </div>
    </>
  );
};

export default YearlyStatistics;
