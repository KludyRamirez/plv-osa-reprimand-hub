import React, { useState } from "react";
import { BsCaretDown, BsX } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const EditCaseFormModal = ({
  handleChange,
  handleDateOfIncidentChange,
  handleDateReportedChange,
  handleEditCase,
  handleCloseModalEdit,
  values,
  updatedValues,
  students,
}) => {
  const { reportedViolations, typeOfViolations } = values;

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStudents, setFilteredStudents] = useState(students);
  const [selectedDateOfIncident, setSelectedDateOfIncident] = useState("");
  const [selectedDateReported, setSelectedDateReported] = useState("");

  const handleSearchStudents = (e) => {
    const searchText = e.target.value.toLowerCase();
    setSearchTerm(searchText);
    const filtered = students.filter(
      (student) =>
        student?.firstName?.toLowerCase().includes(searchText.toLowerCase()) ||
        student?.surName?.toLowerCase().includes(searchText.toLowerCase()) ||
        student?.studentNo?.includes(searchText)
    );
    setFilteredStudents(filtered);
  };

  const isSunday = (date) => {
    return date.getDay() === 0; // 0 represents Sunday
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

  const formatDate = (dateString) => {
    const date = moment
      .utc(dateString, "YYYY-MM-DDTHH:mm:ss.SSS[Z]")
      .add(1, "day");
    return date.format("MM/DD/YYYY");
  };

  return (
    <>
      <form onSubmit={(e) => handleEditCase(e)}>
        <div className="p-8">
          <div className="text-[28px] text-[#077bff] font-semibold flex justify-between">
            Edit Existing Case
            <BsX
              onClick={handleCloseModalEdit}
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
              value={updatedValues?.student}
              onChange={handleChange}
              className="appearance-none p-3 rounded-[6px] bg-[#f5f5f5] focus:outline-none border-[1px] focus:border-[#bbbbbb]"
            >
              {filteredStudents?.map((s) => (
                <option key={s?._id} value={s?._id}>
                  {s?.firstName} {s?.surName}
                </option>
              ))}
            </select>
          </div>
          <div className="text-[#606060] pt-6 flex gap-2">
            <div className="flex flex-col gap-2 w-[100%]">
              <div className="">Date of Incident</div>
              <DatePicker
                value={formatDate(updatedValues?.dateOfIncident)}
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
                value={formatDate(updatedValues?.dateReported)}
                filterDate={isDisabledDateReported}
                placeholderText="Enter Date"
                selected={selectedDateReported}
                onChange={(date) => handleDateReportedChangeCombined(date)}
                className={`border-[1px] p-3 rounded-[6px] w-[100%] bg-[#f5f5f5] focus:outline-none`}
              />
            </div>
          </div>
          <div className="text-[#606060] pt-6 flex gap-2">
            <div className="flex flex-col gap-2 w-[100%]">
              <div className="">Reported Violation</div>
              <select
                name="reportedViolation"
                value={updatedValues?.reportedViolation}
                onChange={handleChange}
                className="appearance-none p-3 rounded-[6px] bg-[#f5f5f5] focus:outline-none border-[1px] focus:border-[#bbbbbb]"
              >
                <option value="">Enter Violation</option>
                {reportedViolations?.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2 w-[100%]">
              <div className="">Type Of Violation</div>
              <select
                name="typeOfViolation"
                value={updatedValues?.typeOfViolation}
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
          </div>

          <div className="w-100 pt-10 flex justify-end items-center">
            {updatedValues?.student !== "" &&
            updatedValues.dateOfIncident !== "" &&
            updatedValues.dateReported !== "" &&
            updatedValues?.reportedViolation !== "" &&
            updatedValues?.typeOfViolation !== "" ? (
              <button
                type="submit"
                className="py-3 px-3 bg-[#007bff] text-[white] text-[16px] flex gap-2 items-center rounded-[8px]"
              >
                <FaPlus />
                <div>Edit Case</div>
              </button>
            ) : (
              <button
                disabled
                type="submit"
                className="py-3 px-3 bg-blue-300 text-[white] text-[16px] flex gap-2 items-center rounded-[8px]"
              >
                <FaPlus />
                <div>Edit Case</div>
              </button>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default EditCaseFormModal;
