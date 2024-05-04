import React, { useState } from "react";
import {
  BsCalendar4,
  BsCalendar4Week,
  BsCaretDown,
  BsCheckCircle,
  BsFilter,
} from "react-icons/bs";
import { VscFilter } from "react-icons/vsc";
import CasesTable from "./CasesTable";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

const CasesFilter = ({ cases, students, getCases }) => {
  const [searchTerm, setSearchTerm] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [dateOfIncident, setDateOfIncident] = useState(null);
  const [dateReported, setDateReported] = useState(null);
  const [reportedViolation, setReportedViolation] = useState("All");
  const [selectedCases, setSelectedCases] = useState([]);
  const [activeMainFilter, setActiveMainFilter] = useState("All");

  const handleMainFilterChange = (filter) => {
    setActiveMainFilter(filter);
  };

  const filterCases = (
    cases,
    searchTerm,
    dateOfIncident,
    dateReported,
    reportedViolation,
    activeMainFilter,
    selectedStatus
  ) => {
    return cases.filter((c) => {
      const searchMatch =
        searchTerm === "All" ||
        c.caseNo.toLowerCase().includes(searchTerm.toLowerCase());

      const dateOfIncidentMatch =
        dateOfIncident === null ||
        new Date(c.dateOfIncident).toLocaleDateString("en-PH", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }) ===
          new Date(dateOfIncident).toLocaleDateString("en-PH", {
            month: "long",
            day: "numeric",
            year: "numeric",
          });

      const dateReportedMatch =
        dateReported === null ||
        new Date(c.dateReported).toLocaleDateString("en-PH", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }) ===
          new Date(dateReported).toLocaleDateString("en-PH", {
            month: "long",
            day: "numeric",
            year: "numeric",
          });

      const reportedViolationMatch =
        reportedViolation === "All" ||
        c.reportedViolation
          .toLowerCase()
          .includes(reportedViolation.toLowerCase());

      const mainFilterMatch =
        activeMainFilter === "All" || c.typeOfViolation === activeMainFilter;

      const statusMatch =
        selectedStatus === "All" || c.statusOfCase === selectedStatus;

      return (
        searchMatch &&
        dateOfIncidentMatch &&
        dateReportedMatch &&
        reportedViolationMatch &&
        mainFilterMatch &&
        statusMatch
      );
    });
  };

  // Filter cases based on search criteria, main filter, and status filter
  const filteredCases = filterCases(
    cases,
    searchTerm,
    dateOfIncident,
    dateReported,
    reportedViolation,
    activeMainFilter,
    selectedStatus
  );

  let combinedFilteredCases = [...filteredCases];

  const isSunday = (date) => {
    return date.getDay() === 0; // 0 represents Sunday
  };

  const isDisabled = (date) => {
    return (
      (moment(date).isBefore(moment(), "day") && !isSunday(date)) ||
      (moment(date).isAfter(moment(), "day") && !isSunday(date))
    );
  };

  const isDisabledDateReported = (date) => {
    return (
      moment(date).isAfter(moment(dateOfIncident), "day") && !isSunday(date)
    );
  };

  return (
    <>
      <div className="w-100 bg-[white] text-[#404040] rounded-[10px] flex flex-col border-[1px]">
        <div className="px-3 w-100 h-[58px] flex justify-start gap-2 border-b-2 border-white">
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
            onClick={() => handleMainFilterChange("Major")}
            className={`px-3 h-[58px] hover:border-b-2 hover:border-blue-600 flex justify-center items-center text-[18px] ${
              activeMainFilter === "Major"
                ? "border-b-2 border-blue-600"
                : "border-b-2 border-white"
            }`}
          >
            Major
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
            onClick={() => handleMainFilterChange("Complex")}
            className={`px-3 h-[58px] hover:border-b-2 hover:border-blue-600 flex justify-center items-center text-[18px] ${
              activeMainFilter === "Complex"
                ? "border-b-2 border-blue-600"
                : "border-b-2 border-white"
            }`}
          >
            Complex
          </div>
        </div>

        <div className="px-4 pt-4 flex justify-center gap-3">
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            autoComplete="off"
            placeholder="Search by case number, student name, etc."
            className="p-3 rounded-[6px] w-[97%] bg-gradient-to-br from-gray-100 to-gray-100 focus:outline-none focus:border-[1px] focus:border-[#cdcdcd]"
          />
          <div className="flex justify-center items-center w-[50px] h-[48px] rounded-[8px] bg-gradient-to-br from-[#07bbff] to-[#007bff] text-white">
            <BsFilter className="text-[24px]" />
          </div>
        </div>

        <div className="py-4 px-6 text-[18px] flex items-center gap-2">
          Filter by <BsFilter className="text-[24px]" />
        </div>

        <div className="w-100 flex justify-start bg-gradient-to-br from-gray-100 to-gray-100 p-4 rounded-bl-[10px] rounded-br-[10px]">
          <div className="w-100 flex flex-wrap justify-start items-center gap-4 phone:gap-2">
            <div className="phone:w-[50%] flex flex-col items-start gap-2">
              <div className="pl-2 w-[242px] phone:w-[100%] flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div>Violation</div> <BsCaretDown />
                </div>
                <BsCalendar4 />
              </div>
              <select
                onChange={(e) => setReportedViolation(e.target.value)}
                className="px-3 py-2 w-[242px] phone:w-[100%] rounded-[6px] bg-[#ffffff] appearance-none focus:outline-none focus:border-[#aaaaaa] focus:border-[1px] border-[1px] "
              >
                <option value="All">All</option>
                <option value="Stealing">Stealing</option>
                <option value="Bullying">Bullying</option>
                <option value="Subdued Hair Color">Subdued Hair Color</option>
                <option value="Sexual Harassment">Sexual Harassment</option>
              </select>
            </div>
            <div className="phone:w-[47.8%] flex flex-col items-start gap-2">
              <div className="pl-2 w-[242px] phone:w-[100%] flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div>Status of Case</div> <BsCaretDown />
                </div>
                <BsCheckCircle />
              </div>
              <select
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 w-[242px] phone:w-[100%] rounded-[6px] bg-[#ffffff] appearance-none focus:outline-none focus:border-[#aaaaaa] focus:border-[1px] border-[1px] "
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
              <div className="pl-2 w-[242px] phone:w-[100%] flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div>Date of Incident</div> <BsCaretDown />
                </div>
                <BsCalendar4Week />
              </div>
              <DatePicker
                filterDate={isDisabled}
                placeholderText="Enter Date"
                selected={dateOfIncident}
                onChange={(date) => {
                  setDateOfIncident(date);
                }}
                className="phone:w-[100%] px-3 py-2 w-[242px] rounded-[6px] bg-[#ffffff] appearance-none focus:outline-none focus:border-[#aaaaaa] focus:border-[1px] border-[1px] "
              />
            </div>

            <div className="phone:w-[47.8%] flex flex-col items-start gap-2">
              <div className="pl-2 w-[242px] phone:w-[100%] flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div>Date Reported</div> <BsCaretDown />
                </div>
                <BsCalendar4 />
              </div>
              <DatePicker
                filterDate={isDisabledDateReported}
                placeholderText="Enter Date"
                selected={dateReported}
                onChange={(date) => {
                  setDateReported(date);
                }}
                className="px-3 py-2 w-[242px] phone:w-[100%] rounded-[6px] bg-[#ffffff] appearance-none focus:outline-none focus:border-[#aaaaaa] focus:border-[1px] border-[1px] "
              />
            </div>

            {/* <div className="flex justify-start items-center gap-4">
            <div className="flex flex-col items-start gap-2">
              <div className="pl-1 w-[160px] flex justify-between items-center">
                <div>Date</div>
                <div className="flex gap-2 items-center">
                  <BsCalendar4Range /> <BsCaretDown />
                </div>
              </div>
              <select
                onChange={(e) => setDate(e.target.value)}
                className="px-3 py-2 w-[160px] rounded-[6px] bg-[#ffffff] appearance-none focus:outline-none focus:border-[#aaaaaa] focus:border-[1px] border-[1px]"
              >
                <option value="All">All</option>
                {Array.from({ length: 31 }, (_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col items-start gap-2">
              <div className="pl-1 w-[160px] flex justify-between items-center">
                <div>Month</div>
                <div className="flex gap-2 items-center">
                  <BsCalendar4Week /> <BsCaretDown />
                </div>
              </div>
              <select
                onChange={(e) => setMonth(e.target.value)}
                className="px-3 py-2 w-[160px] rounded-[6px] bg-[#ffffff] appearance-none focus:outline-none focus:border-[#aaaaaa] focus:border-[1px] border-[1px]"
              >
                <option value="All">All</option>
                {[
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
                ].map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col items-start gap-2">
              <div className="pl-1 w-[160px] flex justify-between items-center">
                <div>Year</div>
                <div className="flex gap-2 items-center">
                  <BsCalendar4Event /> <BsCaretDown />
                </div>
              </div>
              <select
                onChange={(e) => setYear(e.target.value)}
                className="px-3 py-2 w-[160px] rounded-[6px] bg-[#ffffff] appearance-none focus:outline-none focus:border-[#aaaaaa] focus:border-[1px] border-[1px]"
              >
                <option value="All">All</option>
                {Array.from({ length: 5 }, (_, index) => {
                  const year = new Date().getFullYear() - index;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </div>
          </div> */}
          </div>
        </div>
      </div>
      <div className="py-8">
        <CasesTable
          cases={combinedFilteredCases}
          students={students}
          getCases={getCases}
          selectedCases={selectedCases}
          setSelectedCases={setSelectedCases}
        />
      </div>
    </>
  );
};

export default CasesFilter;
