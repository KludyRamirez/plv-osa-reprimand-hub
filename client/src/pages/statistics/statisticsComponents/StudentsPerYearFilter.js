import React, { useState, useEffect } from "react";
import {
  BsCalendar4,
  BsCalendar4Event,
  BsCalendar4Week,
  BsCaretDown,
  BsCheckCircle,
  BsFilter,
  BsFolder2Open,
  BsFolderX,
} from "react-icons/bs";
import { StudentsPerYearPieChart } from "../statisticsUtils/StudentsPerYearPieChart";
import { CasesPerCollegePieChart } from "../statisticsUtils/CasesPerCollegePieChart";

const majorViolation = [
  "Smoking or vaping",
  "Possession of alcoholic beverages or coming to school under the influence of alcohol",
  "Tampering of posters or other school information media",
  "Refusal to submit to reasonable inspection conducted by authorized personnel",
  "Bringing outsiders or providing any means for entry in the University premises without consent of the concerned authority",
  "Ridiculing of fellow students / Rumor mongering",
  "Failure to appear before school authorities when required to report within 48 hours without valid",
  "Lewd Act / Boisterous remark/Use of profane or indecent language",
  "Public Display of Affection",
  "Unauthorized use of PLV logo or seal, or other university markers or symbols including accredited students' organization",
  "Unauthorized representation to any activity / event / opportunity in behalf of the University student organization",
];

const minorViolation = [
  "Incomplete uniform",
  "Sporting very sophisticated hair style, clothing, and accessories",
  "Unkempt / Long hair for boys",
  "Hair dyeing",
  "Sporting visible tattoos",
  "Excessive body piercing",
  "Littering",
  "Loitering",
  "Unauthorized use of classrooms and other school facilities and supplements",
  "Unauthorized entry to restricted and designated areas",
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const StudentsPerYear = ({ cases, students, getCases }) => {
  const [activeMainFilter, setActiveMainFilter] = useState("All");
  const [reportedViolation, setReportedViolation] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [dateOfIncident, setDateOfIncident] = useState("All");
  const [monthOfIncident, setMonthOfIncident] = useState("All");
  const [years, setYears] = useState([]);
  const [bsitPercentage, setBsitPercentage] = useState("Percentage");
  const [bsbammPercentage, setBsbammPercentage] = useState("Percentage");
  const [becedPercentage, setBecedPercentage] = useState("Percentage");
  const [bspPercentage, setBspPercentage] = useState("Percentage");

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const yearsArray = [];
    for (let i = 0; i <= 4; i++) {
      yearsArray.push(currentYear - i);
    }
    setYears(yearsArray);
  }, []);

  const handleMainFilterChange = (filter) => {
    setActiveMainFilter(filter);
  };

  const filterCases = (
    cases,
    dateOfIncident,
    reportedViolation,
    activeMainFilter,
    selectedStatus
  ) => {
    return cases.filter((c) => {
      const reportedViolationMatch =
        reportedViolation === "All" ||
        c?.reportedViolation
          ?.toLowerCase()
          .includes(reportedViolation?.toLowerCase());

      const mainFilterMatch =
        activeMainFilter === "All" || c?.typeOfViolation === activeMainFilter;

      const statusMatch =
        selectedStatus === "All" || c?.statusOfCase === selectedStatus;

      const dateOfIncidentMatch =
        dateOfIncident === "All" ||
        new Date(c.dateOfIncident).getFullYear() ===
          new Date(dateOfIncident).getFullYear();

      const monthOfIncidentMatch =
        monthOfIncident === "All" ||
        new Date(c?.dateOfIncident)
          .toLocaleDateString("en-PH", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })
          .split(" ")[0] === monthOfIncident;

      return (
        dateOfIncidentMatch &&
        reportedViolationMatch &&
        mainFilterMatch &&
        statusMatch &&
        monthOfIncidentMatch
      );
    });
  };

  const filteredCases = filterCases(
    cases,
    dateOfIncident,
    reportedViolation,
    activeMainFilter,
    selectedStatus
  );

  let combinedFilteredCases = [...filteredCases];

  const bsitCases = cases.filter(
    (c) =>
      c.student.department ===
      "(BSIT) Bachelor of Science in Information Technology"
  );
  const bsbammCases = cases.filter(
    (c) =>
      c.student.department ===
      "(BSBA MM) Bachelor of Science in Business Administration Major in Marketing Management"
  );

  const becedCases = cases.filter(
    (c) =>
      c.student.department === "(BECED) Bachelor of Early Childhood Education"
  );

  const bspCases = cases.filter(
    (c) => c.student.department === "(BSP) Bachelor of Science in Psychology"
  );

  const bsitPercentageConverter = () => {
    const fraction = bsitCases?.length / cases?.length;
    const percentage = fraction * 100;

    return (
      <>
        <div className="pl-2 text-[48px] text-[#007bff] font-bold">
          {percentage.toFixed(0)}
          <span className="text-[20px]">%</span>
        </div>
      </>
    );
  };

  const bsitNumberConverter = () => {
    return (
      <>
        <div className=" text-[48px] text-[#007bff] font-bold">
          {bsitCases.length}
        </div>
      </>
    );
  };

  const bsbammPercentageConverter = () => {
    const fraction = bsbammCases?.length / cases?.length;
    const percentage = fraction * 100;

    return (
      <>
        <div className="pl-2 text-[48px] text-[#007bff] font-bold">
          {percentage.toFixed(0)}
          <span className="text-[20px]">%</span>
        </div>
      </>
    );
  };

  const bsbammNumberConverter = () => {
    return (
      <>
        <div className="text-[48px] text-[#007bff] font-bold">
          {bsbammCases.length}
        </div>
      </>
    );
  };

  const becedPercentageConverter = () => {
    const fraction = becedCases?.length / cases?.length;
    const percentage = fraction * 100;

    return (
      <>
        <div className="pl-2 text-[48px] text-[#FFBF00] font-bold">
          {percentage.toFixed(0)}
          <span className="text-[20px]">%</span>
        </div>
      </>
    );
  };

  const becedNumberConverter = () => {
    return (
      <>
        <div className="text-[48px] text-[#FFBF00] font-bold">
          {becedCases.length}
        </div>
      </>
    );
  };

  const bspPercentageConverter = () => {
    const fraction = bspCases?.length / cases?.length;
    const percentage = fraction * 100;

    return (
      <>
        <div className="pl-2 text-[48px] text-[#FFBF00] font-bold">
          {percentage.toFixed(0)}
          <span className="text-[20px]">%</span>
        </div>
      </>
    );
  };

  const bspNumberConverter = () => {
    return (
      <>
        <div className="text-[48px] text-[#FFBF00] font-bold">
          {bspCases.length}
        </div>
      </>
    );
  };

  const handleSetBsitPercentage = () => {
    if (bsitPercentage === "Percentage") setBsitPercentage("Number");
    else {
      setBsitPercentage("Percentage");
    }
  };

  const handleSetBsbammPercentage = () => {
    if (bsbammPercentage === "Percentage") setBsbammPercentage("Number");
    else {
      setBsbammPercentage("Percentage");
    }
  };

  const handleSetBecedPercentage = () => {
    if (becedPercentage === "Percentage") setBecedPercentage("Number");
    else {
      setBecedPercentage("Percentage");
    }
  };

  const handleSetBspPercentage = () => {
    if (bspPercentage === "Percentage") setBspPercentage("Number");
    else {
      setBspPercentage("Percentage");
    }
  };

  return (
    <>
      <div className=" w-100 bg-[white] text-[#404040] rounded-[10px] flex flex-col border-[1px]">
        <div className="px-3 w-100 h-[58px] flex justify-between gap-2 border-b-2 border-white">
          <div className="flex justify-start items-center gap-2">
            <div
              onClick={() => handleMainFilterChange("All")}
              className={`px-3 h-[58px] hover:border-b-2 hover:border-blue-600 flex justify-center items-center text-[18px] ${
                activeMainFilter === "All"
                  ? "border-b-2 border-blue-600"
                  : "border-b-2 border-white"
              }`}
            >
              All Cases
            </div>

            <div
              onClick={() => handleMainFilterChange("Minor")}
              className={`px-3 h-[58px] hover:border-b-2 hover:border-blue-600 flex justify-center items-center text-[18px] ${
                activeMainFilter === "Minor"
                  ? "border-b-2 border-blue-600"
                  : "border-b-2 border-white"
              }`}
            >
              Minor
            </div>
            <div
              onClick={() => handleMainFilterChange("Major")}
              className={`px-3 h-[58px] hover:border-b-2 hover:border-blue-600 flex justify-center items-center text-[18px] ${
                activeMainFilter === "Major"
                  ? "border-b-2 border-blue-600"
                  : "border-b-2 border-white"
              }`}
            >
              Major
            </div>
          </div>
          <div className="flex justify-center items-center pr-2">
            <BsFilter className="text-[28px]" />
          </div>
        </div>

        <div className="w-100 flex justify-start bg-gradient-to-br from-gray-100 to-gray-100 p-4 rounded-bl-[10px] rounded-br-[10px]">
          <div className="w-100 flex flex-wrap justify-start items-center gap-4 phone:gap-2">
            <div className="phone:w-[50%] flex flex-col items-start gap-2">
              <div className="pl-2 w-[158px] phone:w-[100%] flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div>Violation</div> <BsCaretDown />
                </div>
                <BsCalendar4 />
              </div>
              <select
                onChange={(e) => setReportedViolation(e.target.value)}
                className="px-3 py-2 w-[158px] phone:w-[100%] rounded-[6px] bg-[#ffffff] appearance-none focus:outline-none focus:border-[#aaaaaa] focus:border-[1px] border-[1px] "
              >
                <option value="All">All</option>
                {activeMainFilter === "Minor" || activeMainFilter === "All" ? (
                  <>
                    {minorViolation?.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </>
                ) : null}
                {activeMainFilter === "Major" || activeMainFilter === "All" ? (
                  <>
                    {majorViolation?.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </>
                ) : null}
              </select>
            </div>
            <div className="phone:w-[47.8%] flex flex-col items-start gap-2">
              <div className=" w-[158px] phone:w-[100%] flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div>Case Status</div> <BsCaretDown />
                </div>
                <BsCheckCircle />
              </div>
              <select
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 w-[158px] phone:w-[100%] rounded-[6px] bg-[#ffffff] appearance-none focus:outline-none focus:border-[#aaaaaa] focus:border-[1px] border-[1px] "
              >
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="Investigation">Investigation</option>
                <option value="Evaluation">Evaluation</option>
                <option value="Referral">Referral</option>
                <option value="Hearing">Hearing</option>
                <option value="Decision">Decision</option>
                <option value="Implementation">Implementation</option>
                <option value="Case Solved">Case Solved</option>
              </select>
            </div>

            <div className="phone:w-[50%] flex flex-col items-start gap-2">
              <div className=" w-[158px] phone:w-[100%] flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div>Year</div> <BsCaretDown />
                </div>
                <BsCalendar4Week />
              </div>
              <select
                value={dateOfIncident}
                onChange={(e) => {
                  setDateOfIncident(e.target.value);
                }}
                className="phone:w-[100%] px-3 py-2 w-[158px] rounded-[6px] bg-[#ffffff] appearance-none focus:outline-none focus:border-[#aaaaaa] focus:border-[1px] border-[1px] "
              >
                <option value="All">All</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div className="phone:w-[50%] flex flex-col items-start gap-2">
              <div className=" w-[158px] phone:w-[100%] flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div>Month</div> <BsCaretDown />
                </div>
                <BsCalendar4Event />
              </div>
              <select
                value={monthOfIncident}
                onChange={(e) => {
                  setMonthOfIncident(e.target.value);
                }}
                className="phone:w-[100%] px-3 py-2 w-[158px] rounded-[6px] bg-[#ffffff] appearance-none focus:outline-none focus:border-[#aaaaaa] focus:border-[1px] border-[1px] "
              >
                <option value="All">All</option>
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="mt-4 w-[434px] relative flex flex-col bg-blue-100 zIndex-2">
          <div className="p-4 zIndex-2 text-[white] bg-[#007bff]">
            Cases Per Year Level
          </div>
          {cases.length > 0 ? (
            <>
              <StudentsPerYearPieChart
                cases={combinedFilteredCases}
                students={students}
                getCases={getCases}
              />
            </>
          ) : (
            <div className="mt-[-20px] h-[297px] flex flex-col justify-center items-center gap-2">
              <BsFolderX className="text-[80px] text-[#007bff]" />
              <div>No cases available</div>
            </div>
          )}
        </div>

        <div className="mt-4 w-[436px] relative flex flex-col bg-yellow-100 zIndex-2">
          <div className="p-4 zIndex-2 text-[white] bg-[#FFBF00]">
            Cases Per College
          </div>
          {cases.length > 0 ? (
            <>
              <CasesPerCollegePieChart
                cases={combinedFilteredCases}
                students={students}
                getCases={getCases}
              />
            </>
          ) : (
            <div className="mt-[-20px] h-[297px] flex flex-col justify-center items-center gap-2">
              <BsFolderX className="text-[80px] text-[#FFBF00]" />
              <div>No cases available</div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 flex justify-start items-center gap-4">
        <div
          onClick={() => handleSetBsitPercentage()}
          className="p-2 w-[209px] h-[180px] bg-white border-[1px] border-[#007bff] rounded-[4px] flex flex-col items-center gap-5 relative overflow-hidden"
        >
          <div className="w-[100%] h-[100%] flex justify-center items-end">
            {bsitPercentage === "Percentage" ? (
              <>{bsitPercentageConverter()}</>
            ) : (
              <>{bsitNumberConverter()}</>
            )}
          </div>
          <div className="text-[16px] text-[#007bff]">BSIT Cases</div>
          <svg
            className="absolute top-0 left-0"
            viewBox="0 0 500 500"
            preserveAspectRatio="xMinYMin meet"
          >
            <path
              d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z"
              style={{
                stroke: "none",
                fill: "rgba(219, 234, 254, 1)",
                strokeWidth: "2px",
              }}
            ></path>
          </svg>
        </div>

        <div
          onClick={() => handleSetBsbammPercentage()}
          className="p-2 w-[209px] h-[180px] bg-white border-[1px] border-[#007bff] rounded-[4px] flex flex-col items-center gap-5 relative overflow-hidden"
        >
          <div className="w-[100%] h-[100%] flex justify-center items-end">
            {bsbammPercentage === "Percentage" ? (
              <>{bsbammPercentageConverter()}</>
            ) : (
              <>{bsbammNumberConverter()}</>
            )}
          </div>
          <div className="text-[16px] text-[#007bff]">BSBA MM Cases</div>
          <svg
            className="absolute top-0 left-0"
            viewBox="0 0 500 500"
            preserveAspectRatio="xMinYMin meet"
          >
            <path
              d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z"
              style={{
                stroke: "none",
                fill: "rgba(219, 234, 254, 1)",
                strokeWidth: "2px",
              }}
            ></path>
          </svg>
        </div>

        <div
          onClick={() => handleSetBecedPercentage()}
          className="p-2 w-[209px] h-[180px] bg-white border-[1px] border-[#FFBF00] rounded-[4px] flex flex-col items-center gap-5 relative overflow-hidden"
        >
          <div className="w-[100%] h-[100%] flex justify-center items-end">
            {becedPercentage === "Percentage" ? (
              <>{becedPercentageConverter()}</>
            ) : (
              <>{becedNumberConverter()}</>
            )}
          </div>
          <div className="text-[16px] text-[#FFBF00]">BECED Cases</div>
          <svg
            className="absolute top-0 left-0"
            viewBox="0 0 500 500"
            preserveAspectRatio="xMinYMin meet"
          >
            <path
              d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z"
              style={{
                stroke: "none",
                fill: "rgba(254, 249, 195, 1)",
                strokeWidth: "2px",
              }}
            ></path>
          </svg>
        </div>
        <div
          onClick={() => handleSetBspPercentage()}
          className="p-2 w-[209px] h-[180px] bg-white border-[1px] border-[#FFBF00] rounded-[4px] flex flex-col items-center gap-5 relative overflow-hidden"
        >
          <div className="w-[100%] h-[100%] flex justify-center items-end">
            {bspPercentage === "Percentage" ? (
              <>{bspPercentageConverter()}</>
            ) : (
              <>{bspNumberConverter()}</>
            )}
          </div>
          <div className="text-[16px] text-[#FFBF00]">BSP Cases</div>
          <svg
            className="absolute top-0 left-0"
            viewBox="0 0 500 500"
            preserveAspectRatio="xMinYMin meet"
          >
            <path
              d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z"
              style={{
                stroke: "none",
                fill: "rgba(254, 249, 195, 1)",
                strokeWidth: "2px",
              }}
            ></path>
          </svg>
        </div>
      </div>
    </>
  );
};

export default StudentsPerYear;
