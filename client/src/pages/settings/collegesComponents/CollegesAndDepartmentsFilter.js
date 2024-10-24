import React, { useState } from 'react';
import {
  BsCalendar4,
  BsCheckCircle,
  BsFilter,
  BsChevronBarDown,
  BsSticky,
} from 'react-icons/bs';
import 'react-datepicker/dist/react-datepicker.css';
import CollegesAndDepartmentsTable from './CollegesAndDepartmentsTable';
import { FaPlus } from 'react-icons/fa6';

const CollegesAndDepartmentsFilter = ({ cads, getCads }) => {
  const [searchTerm, setSearchTerm] = useState('All');
  const [college, setCollege] = useState('All');
  const [department, setDepartment] = useState('All');
  const [selectedCads, setSelectedCads] = useState([]);

  const filterCads = (cads, searchTerm, college, department) => {
    return cads.filter((c) => {
      const searchMatch =
        searchTerm === 'All' ||
        c.college.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.department.toLowerCase().includes(searchTerm.toLowerCase());

      const collegeMatch = college === 'All' || c.college.includes(college);

      const departmentMatch =
        department === 'All' || c.department.includes(department);

      return searchMatch && collegeMatch && departmentMatch;
    });
  };

  const filteredCads = filterCads(cads, searchTerm, college, department);

  let combinedFilteredCads = [...filteredCads];

  const uniqueColleges = [...new Set(cads.map((c) => c.college))];

  return (
    <>
      <div className="w-100 bg-[white] text-[#404040] rounded-[10px] flex flex-col border-[1px]">
        <div className="px-3 w-100 h-[58px] flex justify-start gap-2 border-b-2 border-white">
          <div className="px-3 h-[58px] hover:border-b-2 hover:border-blue-600 flex justify-center items-center text-[18px] border-b-2 border-blue-600">
            All Colleges
          </div>
        </div>

        <div className="px-4 pt-4 flex justify-center gap-3">
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            autoComplete="off"
            placeholder="Search by case number, student name, etc."
            className="p-3 rounded-[6px] w-[100%] bg-gradient-to-br from-gray-100 to-gray-100 focus:outline-none focus:border-[1px] focus:border-[#cdcdcd]"
          />
        </div>

        <div className="py-4 px-6 text-[18px] flex items-center gap-2">
          Filter by <BsFilter className="text-[24px]" />
        </div>

        <div className="w-100 flex justify-start bg-gradient-to-br from-gray-100 to-gray-100 p-4 rounded-bl-[10px] rounded-br-[10px]">
          <div className="w-100 flex flex-wrap justify-start items-center gap-4 phone:gap-2">
            <div className="phone:w-[50%] flex flex-col items-start gap-2">
              <div className="pl-2 w-[242px] phone:w-[100%] flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div>Colleges</div> <BsChevronBarDown />
                </div>
                <BsCalendar4 />
              </div>
              <select
                onChange={(e) => setCollege(e.target.value)}
                className="px-3 py-2 w-[242px] phone:w-[100%] rounded-[6px] bg-[#ffffff] appearance-none focus:outline-none focus:border-[#aaaaaa] focus:border-[1px] border-[1px] "
              >
                <option value="All">All</option>
                {uniqueColleges?.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="phone:w-[47.8%] flex flex-col items-start gap-2">
              <div className="pl-2 w-[242px] phone:w-[100%] flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div>Department</div> <BsChevronBarDown />
                </div>
                <BsSticky />
              </div>
              <select
                onChange={(e) => setDepartment(e.target.value)}
                className="px-3 py-2 w-[242px] phone:w-[100%] rounded-[6px] bg-[#ffffff] appearance-none focus:outline-none focus:border-[#aaaaaa] focus:border-[1px] border-[1px] "
              >
                <option value="All">All</option>
                {college === 'All' ? (
                  <>
                    {cads.map((c) => (
                      <option key={c.department} value={c.department}>
                        {c.department}
                      </option>
                    ))}
                  </>
                ) : (
                  <>
                    {cads
                      .filter((c) => c.college === college)
                      .map((c) => (
                        <option key={c.department} value={c.department}>
                          {c.department}
                        </option>
                      ))}
                  </>
                )}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="py-8">
        <CollegesAndDepartmentsTable
          cads={combinedFilteredCads}
          getCads={getCads}
          selectedCads={selectedCads}
          setSelectedCads={setSelectedCads}
        />
      </div>
    </>
  );
};

export default CollegesAndDepartmentsFilter;
