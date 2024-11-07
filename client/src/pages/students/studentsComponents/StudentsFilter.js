import React, { useState } from 'react';
import { BsChevronBarDown, BsFilter } from 'react-icons/bs';
import StudentsTable from './StudentsTable';

const StudentsFilter = ({
  students,
  cases,
  getStudents,
  cads,
  allowedRoles,
}) => {
  const [searchTerm, setSearchTerm] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [college, setCollege] = useState('All');
  const [department, setDepartment] = useState('All');
  const [year, setYear] = useState('All');
  const [section, setSection] = useState('All');
  const [sex, setSex] = useState('All');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [activeMainFilter, setActiveMainFilter] = useState('All');

  const handleMainFilterChange = (filter) => {
    setActiveMainFilter(filter);
  };

  const schoolYearArray = [];
  for (let i = 1; i <= 4; i++) {
    schoolYearArray.push(i);
  }

  const sectionArray = [];
  for (let i = 1; i <= 12; i++) {
    sectionArray.push(i);
  }

  const filteredByStatus =
    selectedStatus === 'All'
      ? students
      : students?.filter(
          (student) => student.statusOfStudent === selectedStatus
        );

  const filteredBySearch = students?.filter((student) => {
    const searchMatch =
      searchTerm === 'All' ||
      student?.studentNo?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      student?.firstName?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      student?.middleName?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      student?.surName?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      student?.email?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      student?.contactNo?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      student?.guardianContactNo
        ?.toLowerCase()
        .includes(searchTerm?.toLowerCase());

    const yearMatch = year === 'All' || student?.year === parseInt(year);

    const collegeMatch =
      college === 'All' ||
      student?.college?.toLowerCase().includes(college?.toLowerCase());

    const departmentMatch =
      department === 'All' ||
      student?.department?.toLowerCase().includes(department?.toLowerCase());

    const sectionMatch =
      section === 'All' || student?.section?.includes(section);

    const sexMatch = sex === 'All' || student?.sex.includes(sex);

    return (
      searchMatch &&
      yearMatch &&
      collegeMatch &&
      departmentMatch &&
      sectionMatch &&
      sexMatch
    );
  });

  const combinedFilteredStudents =
    selectedStatus === 'All'
      ? filteredBySearch
      : filteredBySearch?.filter((student) =>
          filteredByStatus?.includes(student)
        );

  const uniqueColleges = [...new Set(cads.map((c) => c.college))];

  return (
    <>
      <div className="w-100 bg-[white] text-[#404040] rounded-[10px] flex flex-col border-[1px]">
        <div className="px-3 w-100 h-[58px] flex justify-start gap-1 border-b-2 border-white">
          <div
            onClick={() => handleMainFilterChange('All')}
            className={`px-3 h-[58px] hover:border-b-2 border-blue-600 flex justify-center items-center text-[18px] ${
              activeMainFilter === 'All' ? 'border-b-2 border-blue-600' : ''
            }`}
          >
            All Students
          </div>
        </div>

        <div className="px-4 pt-4 flex justify-center gap-3">
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            autoComplete="off"
            placeholder="Search by student number, student name, etc."
            className="p-3 rounded-[6px] w-[100%] bg-gradient-to-br from-gray-100 to-gray-100 focus:outline-none focus:border-[1px] focus:border-[#cdcdcd]"
          />
        </div>

        <div className="py-4 px-6 text-[18px] flex items-center gap-2 ">
          Filter by <BsFilter className="text-[24px]" />
        </div>

        <div className=" w-100 flex justify-start bg-gray-100 flex p-4 rounded-bl-[10px] rounded-br-[10px]">
          <div className="w-100 flex flex-wrap justify-start items-center gap-4 sm:gap-2">
            <div className="sm:w-[49%] flex flex-col items-start gap-2">
              <div className="pl-2 w-[210px] sm:w-[100%] flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div>Status</div>
                </div>
                <BsChevronBarDown />
              </div>
              <select
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 w-[210px] sm:w-[100%] rounded-[6px] bg-[#ffffff] appearance-none focus:outline-none focus:border-[#aaaaaa] focus:border-[1px] border-[1px] "
              >
                <option value="All">All</option>
                <option value="Enrolled">Enrolled</option>
                <option value="Dismissed">Dismissed</option>
              </select>
            </div>

            <div className="sm:w-[48.8%] flex flex-col items-start gap-2">
              <div className="pl-2 w-[210px] sm:w-[100%] flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div>Sex</div>
                </div>
                <BsChevronBarDown />
              </div>
              <select
                onChange={(e) => setSex(e.target.value)}
                className="px-3 py-2 w-[210px] sm:w-[100%] rounded-[6px] bg-[#ffffff] appearance-none focus:outline-none focus:border-[#aaaaaa] focus:border-[1px] border-[1px] "
              >
                <option value="All">All</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="sm:w-[49%] flex flex-col items-start gap-2">
              <div className="pl-1 w-[210px] sm:w-[100%] flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div>Year</div>
                </div>
                <BsChevronBarDown />
              </div>
              <select
                onChange={(e) => setYear(e.target.value)}
                className="px-3 py-2 w-[210px] sm:w-[100%] rounded-[6px] bg-[#ffffff] appearance-none focus:outline-none focus:border-[#aaaaaa] focus:border-[1px] border-[1px]"
              >
                <option value="All">All</option>
                {schoolYearArray.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:w-[48.8%] flex flex-col items-start gap-2">
              <div className="pl-1 w-[210px] sm:w-[100%] flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div>Section</div>
                </div>
                <BsChevronBarDown />
              </div>
              <select
                onChange={(e) => setSection(e.target.value)}
                className="px-3 py-2 w-[210px] sm:w-[100%] rounded-[6px] bg-[#ffffff] appearance-none focus:outline-none focus:border-[#aaaaaa] focus:border-[1px] border-[1px]"
              >
                <option value="All">All</option>
                {sectionArray.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:w-[49%] flex flex-col items-start gap-2">
              <div className="pl-1 w-[210px] sm:w-[100%] flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div>College</div>
                </div>
                <BsChevronBarDown />
              </div>
              <select
                onChange={(e) => setCollege(e.target.value)}
                className="px-3 py-2 w-[210px] sm:w-[100%] rounded-[6px] bg-[#ffffff] appearance-none focus:outline-none focus:border-[#aaaaaa] focus:border-[1px] border-[1px]"
              >
                <option value="All">All</option>
                {uniqueColleges?.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:w-[48.8%] flex flex-col items-start gap-2">
              <div className="pl-1 w-[210px] sm:w-[100%] flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div>Department</div>
                </div>
                <BsChevronBarDown />
              </div>
              <select
                onChange={(e) => setDepartment(e.target.value)}
                className="px-3 py-2 w-[210px] sm:w-[100%] rounded-[6px] bg-[#ffffff] appearance-none focus:outline-none focus:border-[#aaaaaa] focus:border-[1px] border-[1px]"
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
        <StudentsTable
          students={combinedFilteredStudents}
          getStudents={getStudents}
          selectedStudents={selectedStudents}
          setSelectedStudents={setSelectedStudents}
          cases={cases}
          cads={cads}
          allowedRoles={allowedRoles}
        />
      </div>
    </>
  );
};

export default StudentsFilter;
