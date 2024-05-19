import React, { useState } from "react";
import {
  BsCalendar4Week,
  BsFilter,
  BsChevronBarDown,
  BsCheckCircle,
  BsFeather,
  BsFastForward,
  BsKeyboard,
} from "react-icons/bs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import HistoryTable from "./HistoryTable";

const HistoryFilter = ({ history, getHistory, toast, allowedRoles }) => {
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [date, setDate] = useState(null);
  const [actionNotif, setActionNotif] = useState("All");
  const [activeMainFilter, setActiveMainFilter] = useState("All");
  const [selectedHistory, setSelectedHistory] = useState([]);

  const handleMainFilterChange = (filter) => {
    setActiveMainFilter(filter);
  };

  const filteredByStatus =
    selectedStatus === "All"
      ? history
      : history?.filter((h) => h?.typeOfNotif === selectedStatus);

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

    const actionNotifMatch =
      actionNotif === "All" || h?.actionOfNotif?.includes(actionNotif);

    return dateMatch && actionNotifMatch;
  });

  const combinedFilteredHistory =
    selectedStatus === "All"
      ? filteredByDate
      : filteredByDate?.filter((h) => filteredByStatus?.includes(h));

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-PH", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const todayHistory = history.filter(
    (h) =>
      new Date(h.createdAt).toLocaleDateString("en-PH", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }) === formattedDate
  );

  return (
    <>
      <div className="text-[14px] text-[#404040] pb-6 ">
        Office of Student Affairs / History
      </div>
      <div className="flex justify-start items-center gap-4 pb-8">
        <div className="p-2 w-[200px] h-[174px] bg-white border-[1px] border-blue-200 rounded-[4px] flex flex-col items-center gap-5 relative overflow-hidden">
          <div className=" w-[100%] h-[100%] flex justify-center items-end">
            <div className="text-[48px] text-[#007bff] font-bold">
              {history?.length}
              <span className="text-[20px]"></span>
            </div>
          </div>
          <div className="text-[16px] text-[#007bff]">Total History</div>
          <svg
            className="absolute top-0 left-0"
            viewBox="0 0 500 500"
            preserveAspectRatio="xMinYMin meet"
          >
            <path
              d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z"
              style={{ stroke: "none", fill: "#f5fbff" }}
            ></path>
          </svg>
        </div>
        <div className="p-2 w-[200px] h-[174px] bg-white border-[1px] border-blue-200 rounded-[4px] flex flex-col items-center gap-5 relative overflow-hidden">
          <div className=" w-[100%] h-[100%] flex justify-center items-end">
            <div className="text-[48px] text-[#007bff] font-bold">
              {todayHistory?.length}
              <span className="text-[20px]"></span>
            </div>
          </div>
          <div className="text-[16px] text-[#007bff]">Today's History</div>
          <svg
            className="absolute top-0 left-0"
            viewBox="0 0 500 500"
            preserveAspectRatio="xMinYMin meet"
          >
            <path
              d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z"
              style={{ stroke: "none", fill: "#f5fbff" }}
            ></path>
          </svg>
        </div>
      </div>
      <div className="bg-[white] text-[#404040] rounded-[10px] flex flex-col border-[1px] border-blue-100">
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

        <div className="w-100 flex justify-start bg-gradient-to-br from-white to-[#f5fbff] p-4 rounded-bl-[10px] rounded-br-[10px]">
          <div className="w-100 flex flex-wrap justify-start items-center gap-4 phone:gap-2">
            <div className="phone:w-[47.8%] flex flex-col items-start gap-2">
              <div className="pl-2 w-[242px] phone:w-[100%] flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div>Type</div> <BsChevronBarDown />
                </div>
                <BsKeyboard />
              </div>
              <select
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 w-[242px] phone:w-[100%] rounded-[6px] bg-[#ffffff] appearance-none border-[1px] border-blue-100 cursor-pointer focus:outline-none focus:border-blue-300"
              >
                <option value="All">All</option>
                <option value="Authentication">Authentication</option>
                <option value="Cases">Cases</option>
                <option value="Students">Students</option>
                <option value="Users">Users</option>
                <option value="Account">Account</option>
                <option value="Utilities">Utilities</option>
              </select>
            </div>
            <div className="phone:w-[47.8%] flex flex-col items-start gap-2">
              <div className="pl-2 w-[242px] phone:w-[100%] flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div>Action</div> <BsChevronBarDown />
                </div>
                <BsFastForward />
              </div>
              <select
                onChange={(e) => setActionNotif(e.target.value)}
                className="px-3 py-2 w-[242px] phone:w-[100%] rounded-[6px] bg-[#ffffff] appearance-none border-[1px] border-blue-100 cursor-pointer focus:outline-none focus:border-blue-300"
              >
                <option value="All">All</option>
                <option value="Add">Add</option>
                <option value="Update One">Update One</option>
                <option value="Update">Update</option>
                <option value="Delete">Delete</option>
              </select>
            </div>
            <div className="phone:w-[50%] flex flex-col items-start gap-2">
              <div className="pl-2 w-[242px] phone:w-[100%] flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div>Date</div> <BsChevronBarDown />
                </div>
                <BsCalendar4Week />
              </div>
              <DatePicker
                placeholderText="Enter Date"
                selected={date}
                onChange={(date) => {
                  setDate(date);
                }}
                className="px-3 py-2 w-[242px] phone:w-[100%] rounded-[6px] bg-[#ffffff] appearance-none border-[1px] border-blue-100 cursor-pointer focus:outline-none focus:border-blue-300"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="py-6">
        <HistoryTable
          history={combinedFilteredHistory}
          getHistory={getHistory}
          selectedHistory={selectedHistory}
          setSelectedHistory={setSelectedHistory}
          toast={toast}
          allowedRoles={allowedRoles}
        />
      </div>
    </>
  );
};

export default HistoryFilter;
