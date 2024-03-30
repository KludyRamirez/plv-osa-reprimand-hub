import React, { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";

const StudentsFilter = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [date, setDate] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    const filtered = students.filter((student) => {
      return (
        student.nameOfStudent
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        student.day.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.timing.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.studentType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.cardId
          ?.slice(-4)
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    });
    setFilteredStudents(filtered);
  }, [searchQuery, students]);

  return (
    <>
      <div className="w-100 text-[14px] text-[#303030] pb-6 ">
        Office of Student Affairs / Students
      </div>
      <div className="w-100 text-[24px] text-[#303030] font-bold pb-6">
        Students List
      </div>
      <div className="w-100 bg-blue-100 rounded-[12px] flex flex-col">
        <div className="px-4 w-100 h-[60px] flex justify-start gap-1 border-b-2 border-white">
          <div className="px-3 h-[60px] hover:border-b-2 border-blue-600 flex justify-center items-center text-[18px]">
            All Students
          </div>
          <div className="px-3 h-[60px] hover:border-b-2 border-blue-600 flex justify-center items-center text-[18px]">
            Pending
          </div>
          <div className="px-3 h-[60px] hover:border-b-2 border-blue-600 flex justify-center items-center text-[18px]">
            Inactive
          </div>
        </div>
        <div className="w-100 p-4">
          <div className="w-100 flex justify-center gap-3">
            <input
              type="text"
              placeholder="Search by case number, name, email, etc."
              className="p-3 rounded-[8px] w-[100%] focus:outline-[#007bff]"
            />
            <div className="flex justify-center items-center w-[50px] p-3 rounded-[8px] bg-[#007bff] font-semibold text-[white] gap-3">
              <BsSearch className="text-[20px] mt-[-2px]" />
            </div>
          </div>
          <div className="w-100 pt-4">
            <label>Month</label>
            <select>
              <option value="All">All</option>
              <option value="Fruit">Fruit</option>
              <option value="Vegetable">Vegetable</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentsFilter;
