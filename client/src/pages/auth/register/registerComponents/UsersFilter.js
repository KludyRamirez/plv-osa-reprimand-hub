import React, { useState } from "react";
import {
  BsCheckCircle,
  BsChevronBarDown,
  BsFilter,
  BsGear,
  BsPersonGear,
} from "react-icons/bs";

import UsersTable from "./UsersTable";
import { LuHardHat } from "react-icons/lu";

const UsersFilter = ({ users, getUsers }) => {
  const [searchTerm, setSearchTerm] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [role, setRole] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [activeMainFilter, setActiveMainFilter] = useState("All");

  const handleMainFilterChange = (filter) => {
    setActiveMainFilter(filter);
  };

  const filteredByStatus =
    selectedStatus === "All"
      ? users
      : users?.filter((user) => user.statusOfUser === selectedStatus);

  const filteredBySearch = users?.filter((user) => {
    const searchMatch =
      searchTerm === "All" ||
      user?.firstName?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      user?.userName?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      user?.surName?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      user?.email?.toLowerCase().includes(searchTerm?.toLowerCase());

    const roleMatch = role === "All" || user?.role?.includes(role);

    return searchMatch && roleMatch;
  });

  const combinedFilteredUsers =
    selectedStatus === "All"
      ? filteredBySearch
      : filteredBySearch?.filter((user) => filteredByStatus?.includes(user));

  return (
    <>
      <div className="w-100 bg-[white] text-[#404040] rounded-[10px] flex flex-col border-[1px]">
        <div className="px-3 w-100 h-[58px] flex justify-start gap-1 border-b-2 border-white ">
          <div
            onClick={() => handleMainFilterChange("All")}
            className={`px-3 h-[58px] hover:border-b-2 border-blue-600 flex justify-center items-center text-[18px] ${
              activeMainFilter === "All" ? "border-b-2 border-blue-600" : ""
            }`}
          >
            All Users
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

        <div className=" w-100 flex justify-start bg-[#f5f5f5] flex p-4 rounded-bl-[10px] rounded-br-[10px]">
          <div className="flex justify-start items-center gap-4">
            <div className="flex flex-col items-start gap-2">
              <div className="pl-2 w-[242px] flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div>Status</div> <BsChevronBarDown />
                </div>
                <BsCheckCircle />
              </div>
              <select
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 w-[242px] rounded-[6px] bg-[#ffffff] appearance-none focus:outline-none focus:border-[#aaaaaa] focus:border-[1px] border-[1px] "
              >
                <option value="All">All</option>
                <option value="Enabled">Enabled</option>
                <option value="Disabled">Disabled</option>
              </select>
            </div>

            <div className="flex flex-col items-start gap-2">
              <div className="pl-2 w-[242px] flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div>Role</div> <BsChevronBarDown />
                </div>
                <BsGear className="text-[20px]" />
              </div>
              <select
                onChange={(e) => setRole(e.target.value)}
                className="px-3 py-2 w-[242px] rounded-[6px] bg-[#ffffff] appearance-none focus:outline-none focus:border-[#aaaaaa] focus:border-[1px] border-[1px] "
              >
                <option value="All">All</option>
                <option value="Student">Student</option>
                <option value="Instructor">Instructor</option>
                <option value="Administrator">Administrator</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="py-8">
        <UsersTable
          users={combinedFilteredUsers}
          getUsers={getUsers}
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
        />
      </div>
    </>
  );
};

export default UsersFilter;
