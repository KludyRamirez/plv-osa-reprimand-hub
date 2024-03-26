import React, { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";

const StudentsFilter = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);

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
      <div className="w-100 h-[160px] bg-blue-100 rounded-[12px] flex flex-col">
        <div className="w-100 h-[40%] pt-3 pl-4 pr-4 flex justify-start gap-1 border-b-2 border-white">
          <div className="px-3 h-[52px] hover:border-b-2 border-blue-600 flex justify-center items-center text-[18px]">
            All Students
          </div>
          <div className="px-3 h-[52px] hover:border-b-2 border-blue-600 flex justify-center items-center text-[18px]">
            Pending
          </div>
          <div className="px-3 h-[52px] hover:border-b-2 border-blue-600 flex justify-center items-center text-[18px]">
            Inactive
          </div>
        </div>
        <div className="w-100 h-[60%] p-4 ">
          <div className="w-100 flex justify-center gap-3">
            <input
              type="text"
              placeholder="Search by case number, name, email, etc."
              className="p-3 rounded-[8px] w-[96.6%] focus:outline-[#007bff]"
            />
            <div className="flex justify-center items-center w-[50px] p-3 rounded-[8px] bg-[#007bff] font-semibold text-[white] gap-3">
              <BsSearch className="text-[20px] mt-[-2px]" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentsFilter;
