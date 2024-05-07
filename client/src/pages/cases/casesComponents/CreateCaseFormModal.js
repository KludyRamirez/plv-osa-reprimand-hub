import React, { useState } from "react";
import { BsCaretDown, BsX } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

const CreateCaseFormModal = ({
  handleChange,
  handleDateOfIncidentChange,
  handleDateReportedChange,
  handleCreateCase,
  handleCloseModal,
  values,
  students,
  majorViolation,
  minorViolation,
  handleCaseOwnerChange,
}) => {
  const { student, reportedViolation, typeOfViolations, typeOfViolation } =
    values;

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStudents, setFilteredStudents] = useState(students);
  const [selectedDateOfIncident, setSelectedDateOfIncident] = useState("");
  const [selectedDateReported, setSelectedDateReported] = useState("");

  const handleSearchStudents = (e) => {
    const searchText = e.target.value.toLowerCase();
    setSearchTerm(searchText);
    const filtered = students.filter(
      (student) =>
        student?.firstName?.toLowerCase().includes(searchText) ||
        student?.surName?.toLowerCase().includes(searchText) ||
        student?.studentNo?.toLowerCase().includes(searchText)
    );
    setFilteredStudents(filtered);
  };

  const isSunday = (date) => {
    return date.getDay() === 0;
  };

  const isDisabled = (date) => {
    return !isSunday(date);
  };

  const isDisabledDateReported = (date) => {
    return (
      moment(date).isAfter(
        moment(selectedDateOfIncident).subtract(1, "day"),
        "day"
      ) && !isSunday(date)
    );
  };

  const handleDateOfIncidentChangeCombined = (date) => {
    handleDateOfIncidentChange(date);
    setSelectedDateOfIncident(date);
  };

  const handleDateReportedChangeCombined = (date) => {
    handleDateReportedChange(date);
    setSelectedDateReported(date);
  };

  return (
    <>
      <form onSubmit={(e) => handleCreateCase(e)}>
        <div className="p-8">
          <div className="text-[28px] text-[#077bff] font-semibold flex justify-between">
            Create New Case
            <BsX
              onClick={handleCloseModal}
              className="text-[36px] cursor-pointer"
            />
          </div>

          <div className="text-[#606060] pt-8 flex flex-col gap-2">
            <div>Search Student</div>
            <input
              value={searchTerm}
              onChange={handleSearchStudents}
              type="text"
              autoComplete="off"
              placeholder="Search"
              className={`border-[1px] p-3 rounded-[6px] w-[100%] bg-[#f5f5f5] focus:outline-none`}
            />
          </div>

          <div className="text-[#606060] pt-6 flex flex-col gap-2 w-[100%]">
            <div className="flex gap-2 items-center">
              <span>Case Owner</span>
              <BsCaretDown />
            </div>
            <select
              name="student"
              value={student}
              onChange={handleCaseOwnerChange}
              className="appearance-none p-3 rounded-[6px] bg-[#f5f5f5] focus:outline-none border-[1px] focus:border-[#bbbbbb]"
            >
              {filteredStudents
                ?.sort((a, b) => {
                  const nameA = `${a.firstName} ${a.surName}`.toLowerCase();
                  const nameB = `${b.firstName} ${b.surName}`.toLowerCase();

                  // Compare the names
                  if (nameA < nameB) {
                    return -1;
                  }
                  if (nameA > nameB) {
                    return 1;
                  }
                  return 0;
                })
                .map((s) => (
                  <option
                    key={s?._id}
                    value={s?._id}
                    data-studentno={s?.studentNo}
                  >
                    {s?.firstName} {s?.surName}
                  </option>
                ))}
            </select>
          </div>
          <div className="text-[#606060] pt-6 flex gap-2">
            <div className="flex flex-col gap-2 w-[100%]">
              <div className="">Date of Incident</div>
              <DatePicker
                filterDate={isDisabled}
                placeholderText="Enter Date"
                selected={selectedDateOfIncident}
                onChange={(date) => handleDateOfIncidentChangeCombined(date)}
                className={`border-[1px] p-3 rounded-[6px] w-[100%] bg-[#f5f5f5] focus:outline-none`}
              />
            </div>
            <div className="flex flex-col gap-2 w-[100%]">
              <div className="">Date Reported</div>
              <DatePicker
                filterDate={isDisabledDateReported}
                placeholderText="Enter Date"
                selected={selectedDateReported}
                onChange={(date) => handleDateReportedChangeCombined(date)}
                className={`border-[1px] p-3 rounded-[6px] w-[100%] bg-[#f5f5f5] focus:outline-none`}
              />
            </div>
          </div>
          <div className="text-[#606060] pt-6 flex gap-2">
            <div className="flex flex-col gap-2 w-[20%]">
              <div className="">Type Of Violation</div>
              <select
                name="typeOfViolation"
                value={typeOfViolation}
                onChange={handleChange}
                className="appearance-none p-3 rounded-[6px] bg-[#f5f5f5] focus:outline-none border-[1px] focus:border-[#bbbbbb]"
              >
                <option value="">Enter Violation</option>
                {typeOfViolations?.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2 w-[80%]">
              <div className="">Reported Violation</div>
              <select
                name="reportedViolation"
                value={reportedViolation}
                onChange={handleChange}
                className="appearance-none p-3 rounded-[6px] bg-[#f5f5f5] focus:outline-none border-[1px] focus:border-[#bbbbbb]"
              >
                <option value="">Enter Violation</option>
                {typeOfViolation === "Major" ? (
                  <>
                    {majorViolation?.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </>
                ) : (
                  <>
                    {minorViolation?.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </>
                )}
              </select>
            </div>
          </div>

          <div className="w-100 pt-10 flex justify-end items-center">
            {student !== "" &&
            selectedDateOfIncident !== "" &&
            selectedDateReported !== "" &&
            reportedViolation !== "" &&
            typeOfViolation !== "" ? (
              <button
                type="submit"
                className="cursor-pointer py-3 px-3 bg-[#007bff] text-[white] text-[16px] flex gap-2 items-center rounded-[8px]"
              >
                <FaPlus />
                <div>Add Case</div>
              </button>
            ) : (
              <button
                disabled
                type="submit"
                className="py-3 px-3 bg-blue-300 text-[white] text-[16px] flex gap-2 items-center rounded-[8px]"
              >
                <FaPlus />
                <div>Add Case</div>
              </button>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateCaseFormModal;
