import React, { useState, useEffect } from "react";
import {
  BsBuilding,
  BsBuildings,
  BsCalendar4Week,
  BsCaretDown,
  BsCheckCircle,
  BsColumns,
  BsFilter,
  BsGenderMale,
} from "react-icons/bs";
import { VscFilter } from "react-icons/vsc";
import StudentsTable from "./StudentsTable";

const StudentsFilter = ({ students }) => {
  const [searchTerm, setSearchTerm] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [college, setCollege] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [section, setSection] = useState("");
  const [sex, setSex] = useState("");

  const schoolYearArray = [];
  for (let i = 1; i <= 4; i++) {
    schoolYearArray.push(i);
  }

  const sectionArray = [];
  for (let i = 1; i <= 7; i++) {
    sectionArray.push(i);
  }

  const filteredByStatus =
    selectedStatus === "All"
      ? students
      : students?.filter(
          (student) => student.statusOfStudent === selectedStatus
        );

  const filteredBySearch = students?.filter((student) => {
    const searchMatch =
      searchTerm === "All" ||
      student?.firstName?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      student?.middleName?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      student?.surName?.toLowerCase().includes(searchTerm?.toLowerCase());

    const yearMatch = year === "All" || student?.year?.includes(year);

    const collegeMatch =
      college?.toLowerCase() === "All" ||
      student?.college?.toLowerCase().includes(college?.toLowerCase());

    const departmentMatch =
      department?.toLowerCase() === "All" ||
      student?.department?.toLowerCase().includes(department?.toLowerCase());

    const sectionMatch =
      section === "All" || student?.section?.includes(section);

    const sexMatch = sex === "All" || student?.sex.includes(sex);

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
    selectedStatus === "All"
      ? filteredBySearch
      : filteredBySearch?.filter((student) =>
          filteredByStatus?.includes(student)
        );

  return (
    <>
      <div className="w-100 bg-[white] text-[#404040] rounded-[10px] flex flex-col border-[1px]">
        <div className="px-3 w-100 h-[58px] flex justify-start gap-1 border-b-2 border-white ">
          <div className="px-3 h-[58px] hover:border-b-2 border-blue-600 flex justify-center items-center text-[18px]">
            All Students
          </div>
          <div className="px-3 h-[58px] hover:border-b-2 border-blue-600 flex justify-center items-center text-[18px]">
            Pending
          </div>
          <div className="px-3 h-[58px] hover:border-b-2 border-blue-600 flex justify-center items-center text-[18px]">
            Inactive
          </div>
        </div>
        <div className="w-100 p-4">
          <div className="w-100 flex justify-center">
            <input
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              autoComplete="off"
              placeholder="Search by student number, name, email, etc."
              className="p-3 rounded-tl-[6px] rounded-bl-[6px] w-[100%] bg-[#f5f5f5] focus:outline-none focus:border-[1px] border-[#bbbbbb]"
            />
            <div className="flex justify-center items-center w-[50px] rounded-tr-[6px] rounded-br-[6px] bg-[#007bff] font-semibold text-[white] gap-3">
              <VscFilter className="text-[24px]" />
            </div>
          </div>
          <div className="pt-5 px-2 text-[18px] flex items-center gap-2">
            Filter by <BsFilter className="text-[24px]" />
          </div>
        </div>
        <div className=" w-100 flex justify-start bg-[#f5f5f5] flex p-4 rounded-bl-[10px] rounded-br-[10px]">
          <div className="flex justify-start items-center gap-4">
            <div className="flex flex-col items-start gap-2">
              <div className="pl-2 w-[160px] flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div>Status</div> <BsCaretDown />
                </div>
                <BsCheckCircle />
              </div>
              <select
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 w-[160px] rounded-[6px] bg-[#ffffff] appearance-none focus:outline-none focus:border-[#aaaaaa] focus:border-[1px] border-[1px] "
              >
                <option value="All">All</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="flex flex-col items-start gap-2">
              <div className="pl-2 w-[160px] flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div>Sex</div> <BsCaretDown />
                </div>
                <BsGenderMale />
              </div>
              <select
                onChange={(e) => setSex(e.target.value)}
                className="px-3 py-2 w-[160px] rounded-[6px] bg-[#ffffff] appearance-none focus:outline-none focus:border-[#aaaaaa] focus:border-[1px] border-[1px] "
              >
                <option value="All">All</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
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

            <div className="flex flex-col items-start gap-2">
              <div className="pl-1 w-[160px] flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div>Year</div> <BsCaretDown />
                </div>
                <BsCalendar4Week />
              </div>
              <select
                onChange={(e) => setYear(e.target.value)}
                className="px-3 py-2 w-[160px] rounded-[6px] bg-[#ffffff] appearance-none focus:outline-none focus:border-[#aaaaaa] focus:border-[1px] border-[1px]"
              >
                <option value="All">All</option>
                {schoolYearArray.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col items-start gap-2">
              <div className="pl-1 w-[160px] flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div>Section</div> <BsCaretDown />
                </div>
                <BsColumns />
              </div>
              <select
                onChange={(e) => setSection(e.target.value)}
                className="px-3 py-2 w-[160px] rounded-[6px] bg-[#ffffff] appearance-none focus:outline-none focus:border-[#aaaaaa] focus:border-[1px] border-[1px]"
              >
                <option value="All">All</option>
                {sectionArray.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col items-start gap-2">
              <div className="pl-1 w-[320px] flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div>College</div> <BsCaretDown />
                </div>
                <BsBuildings />
              </div>
              <select
                onChange={(e) => setCollege(e.target.value)}
                className="px-3 py-2 w-[320px] rounded-[6px] bg-[#ffffff] appearance-none focus:outline-none focus:border-[#aaaaaa] focus:border-[1px] border-[1px]"
              >
                <option value="All">All</option>
                <option value="(COED) College of Education">
                  (COED) College of Education
                </option>
                <option value="(CAS) College of Arts and Sciences">
                  (CAS) College of Arts and Sciences
                </option>
                <option value="(CEIT) College of Engineering and Information Technology">
                  (CEIT) College of Engineering and Information Technology
                </option>
                <option value="(CABA) College of Business Administration, Public Administration and Accountancy">
                  (CABA) College of Business Administration, Public
                  Administration and Accountancy
                </option>
              </select>
            </div>
            <div className="flex flex-col items-start gap-2">
              <div className="pl-1 w-[320px] flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div>Department</div> <BsCaretDown />
                </div>
                <BsBuilding />
              </div>
              <select
                onChange={(e) => setDepartment(e.target.value)}
                className="px-3 py-2 w-[320px] rounded-[6px] bg-[#ffffff] appearance-none focus:outline-none focus:border-[#aaaaaa] focus:border-[1px] border-[1px]"
              >
                <option value="All">All</option>
                {college === "(COED) College of Education" ||
                college === "All" ? (
                  <>
                    <option value="(BECED) Bachelor of Early Childhood Education">
                      (BECED) Bachelor of Early Childhood Education
                    </option>
                    <option
                      value="(BSED
                      English) Bachelor of Secondary Education Major in English"
                    >
                      (BSED English) Bachelor of Secondary Education Major in
                      English
                    </option>
                    <option
                      value="(BSED
                      Filipino) Bachelor of Secondary Education Major in Filipino"
                    >
                      (BSED Filipino) Bachelor of Secondary Education Major in
                      Filipino
                    </option>
                    <option value="(BSED Mathematics) Bachelor of Secondary Education Major in Mathematics ">
                      (BSED Mathematics) Bachelor of Secondary Education Major
                      in Mathematics
                    </option>
                    <option value="Bachelor of Secondary Education Major in Science">
                      (BSED Science) Bachelor of Secondary Education Major in
                      Science
                    </option>
                    <option value="(BSED Social Studies) Bachelor of Secondary Education Major in Social Studies ">
                      (BSED Social Studies) Bachelor of Secondary Education
                      Major in Social Studies
                    </option>
                  </>
                ) : null}

                {college === "(CAS) College of Arts and Sciences" ||
                college === "All" ? (
                  <>
                    <option value="Bachelor of Arts in Communication (BAC)">
                      Bachelor of Arts in Communication (BAC)
                    </option>
                    <option value="Bachelor of Science in Psychology (BSP)">
                      Bachelor of Science in Psychology (BSP)
                    </option>
                    <option value="Bachelor of Science in Social Work (BSSW)">
                      Bachelor of Science in Social Work (BSSW)
                    </option>
                  </>
                ) : null}

                {college ===
                  "(CEIT) College of Engineering and Information Technology" ||
                college === "All" ? (
                  <>
                    <option value="Bachelor of Science in Civil Engineering (BSCE)">
                      Bachelor of Science in Civil Engineering (BSCE)
                    </option>
                    <option value="Bachelor of Science in Electrical Engineering (BSEE)">
                      Bachelor of Science in Electrical Engineering (BSEE)
                    </option>
                    <option value="Bachelor of Science in Information Technology (BSIT)">
                      Bachelor of Science in Information Technology (BSIT)
                    </option>
                  </>
                ) : null}

                {college ===
                  "(CABA) College of Business Administration, Public Administration and Accountancy" ||
                college === "All" ? (
                  <>
                    <option value="Bachelor of Science in Accountancy (BSA)">
                      Bachelor of Science in Accountancy (BSA)
                    </option>
                    <option value="Bachelor of Science in Business Administration Major in Financial Management (BSBA FM)">
                      Bachelor of Science in Business Administration Major in
                      Financial Management (BSBA FM)
                    </option>
                    <option value="Bachelor of Science in Business Administration Major in Human Resource Development Management (BSBA HRDM)">
                      Bachelor of Science in Business Administration Major in
                      Human Resource Development Management (BSBA HRDM)
                    </option>
                    <option value="Bachelor of Science in Business Administration Major in Marketing Management (BSBA MM)">
                      Bachelor of Science in Business Administration Major in
                      Marketing Management (BSBA MM)
                    </option>
                    <option value="Bachelor of Science in Public Administration (BSPA)">
                      Bachelor of Science in Public Administration (BSPA)
                    </option>
                  </>
                ) : null}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="py-8">
        <StudentsTable students={combinedFilteredStudents} />
      </div>
    </>
  );
};

export default StudentsFilter;
