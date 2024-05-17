import React, { useState } from "react";
import { BsChevronBarDown, BsFilter, BsX } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const EditCaseFormModal = ({
  handleChange,
  handleDateOfIncidentChange,
  handleDateReportedChange,
  handleCaseOwnerChange,
  handleEditCase,
  handleCloseModalEdit,
  majorViolation,
  minorViolation,
  values,
  updatedValues,
  students,
}) => {
  const { typeOfViolations } = values;

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

  // useEffect(() => {
  //   if (filteredStudents.length > 0) {
  //     setUpdatedValues({ ...updatedValues, student: filteredStudents[0]._id });
  //   }
  // }, [filteredStudents]);

  return (
    <>
      <form onSubmit={(e) => handleEditCase(e)}>
        <div className="p-10">
          <div className="text-[28px] text-[#077bff] font-semibold flex justify-between">
            Edit Existing Case
            <BsX
              onClick={handleCloseModalEdit}
              className="text-[36px] cursor-pointer"
            />
          </div>

          <div className="text-[#606060] pt-8 flex flex-col gap-2">
            <div className="flex justify-start items-center gap-2">
              <span>Search Case Owner</span>
              <BsFilter className="text-[22px]" />
            </div>
            <input
              value={searchTerm}
              onChange={handleSearchStudents}
              type="text"
              autoComplete="off"
              placeholder="Search case owner's student no., firstname, etc."
              className={`border-[1px] border-[#007bff] p-3 rounded-[6px] w-[100%] bg-white focus:outline-none`}
            />
          </div>

          <div className="text-[#606060] pt-6 flex flex-col gap-2 w-[100%]">
            <div className="flex gap-2 items-center">
              <span>Case Owner</span>
              <BsChevronBarDown />
            </div>
            <select
              name="studentName"
              value={updatedValues?.studentName}
              onChange={handleCaseOwnerChange}
              className="appearance-none p-3 rounded-[6px] bg-[#f5f5f5] focus:outline-none border-[1px] focus:border-[#007bff]"
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
                    value={`${s?.firstName} ${s?.surName}`}
                    data-student={s?._id}
                    data-studentno={s?.studentNo}
                    data-year={s?.year}
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
                value={formatDate(updatedValues?.dateOfIncident)}
                filterDate={isDisabled}
                placeholderText="Enter Date"
                selected={selectedDateOfIncident}
                onChange={(date) => handleDateOfIncidentChangeCombined(date)}
                className={`border-[1px] p-3 rounded-[6px] w-[100%] bg-[#f5f5f5] focus:outline-none focus:border-[#007bff]`}
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
                className={`border-[1px] p-3 rounded-[6px] w-[100%] bg-[#f5f5f5] focus:outline-none focus:border-[#007bff]`}
              />
            </div>
          </div>
          <div className="text-[#606060] pt-6 flex gap-2">
            <div className="flex flex-col gap-2 w-[100%]">
              <div className="">Type Of Violation</div>
              <select
                name="typeOfViolation"
                value={updatedValues?.typeOfViolation}
                onChange={handleChange}
                className="appearance-none p-3 rounded-[6px] bg-[#f5f5f5] focus:outline-none border-[1px] focus:border-[#007bff]"
              >
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
                value={updatedValues?.reportedViolation}
                onChange={handleChange}
                className="appearance-none p-3 rounded-[6px] bg-[#f5f5f5] focus:outline-none border-[1px] focus:border-[#007bff]"
              >
                {updatedValues?.typeOfViolation === "Major" ? (
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
