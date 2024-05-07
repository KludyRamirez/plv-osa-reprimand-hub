import React, { useState } from "react";
import {
  BsCalendar4Week,
  BsFilter,
  BsChevronBarDown,
  BsCheckCircle,
} from "react-icons/bs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import HistoryTable from "./HistoryTable";

const HistoryFilter = ({ history, getHistory }) => {
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [date, setDate] = useState(null);
  const [activeMainFilter, setActiveMainFilter] = useState("All");
  const [selectedHistory, setSelectedHistory] = useState([]);

  const handleMainFilterChange = (filter) => {
    setActiveMainFilter(filter);
  };

  const filteredByStatus =
    selectedStatus === "All"
      ? history
      : history?.filter((h) => h?.message === selectedStatus);

  const filteredByDate = history?.filter((h) => {
    const dateMatch =
      date === null ||
      new Date(h.createdAt).toLocaleDateString("en-PH", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }) ===
        new Date(date).toLocaleDateString("en-PH", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });

    return dateMatch;
  });

  const combinedFilteredHistory =
    selectedStatus === "All"
      ? filteredByDate
      : filteredByDate?.filter((h) => filteredByStatus?.includes(h));

  return (
    <>
      <div className="text-[14px] text-[#404040] pb-6 ">
        Office of Student Affairs / History
      </div>
      <div className="bg-[white] text-[#404040] rounded-[10px] flex flex-col border-[1px]">
        <div className="px-3 h-[58px] flex justify-between gap-2">
          <div
            onClick={() => handleMainFilterChange("All")}
            className={`px-3 h-[58px] hover:border-b-2 hover:border-blue-600 flex justify-between items-center text-[18px] ${
              activeMainFilter === "All"
                ? "border-b-2 border-blue-600"
                : "border-b-2 border-white"
            }`}
          >
            All History
          </div>

          <div className="px-3 h-[58px] text-[18px] flex items-center gap-2 border-b-2 border-white">
            Filter by <BsFilter className="text-[24px]" />
          </div>
        </div>

        <div className="w-100 flex justify-start bg-gradient-to-br from-gray-100 to-gray-100 p-4 rounded-bl-[10px] rounded-br-[10px]">
          <div className="w-100 flex flex-wrap justify-start items-center gap-4 phone:gap-2">
            {/* <div className="phone:w-[47.8%] flex flex-col items-start gap-2">
              <div className="pl-2 w-[242px] phone:w-[100%] flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div>Status of Case</div> <BsChevronBarDown />
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
            </div> */}
            <div className="phone:w-[50%] flex flex-col items-start gap-2">
              <div className="pl-2 w-[242px] phone:w-[100%] flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div>Date of History</div> <BsChevronBarDown />
                </div>
                <BsCalendar4Week />
              </div>
              <DatePicker
                placeholderText="Enter Date"
                selected={date}
                onChange={(date) => {
                  setDate(date);
                }}
                className="phone:w-[100%] px-3 py-2 w-[242px] rounded-[6px] bg-[#ffffff] appearance-none focus:outline-none focus:border-[#aaaaaa] focus:border-[1px] border-[1px] "
              />
            </div>
          </div>
        </div>
      </div>
      <div className="py-8">
        <HistoryTable
          history={combinedFilteredHistory}
          getHistory={getHistory}
          selectedHistory={selectedHistory}
          setSelectedHistory={setSelectedHistory}
        />
      </div>
    </>
  );
};

export default HistoryFilter;
