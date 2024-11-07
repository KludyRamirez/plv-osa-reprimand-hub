import React, { useState } from 'react';
import { BsChevronBarDown, BsFilter, BsX } from 'react-icons/bs';
import { FaPlus } from 'react-icons/fa6';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

const CreateCaseFormModal = ({
  handleChange,
  handleDateOfIncidentChange,
  handleDateReportedChange,
  handleCreateCase,
  handleCloseModal,
  values,
  setValues,
  students,
  majorViolation,
  minorViolation,
  handleCaseOwnerChange,
}) => {
  const { reportedViolation, typeOfViolations, typeOfViolation, studentName } =
    values;

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStudents, setFilteredStudents] = useState(students);
  const [selectedDateOfIncident, setSelectedDateOfIncident] = useState('');
  const [selectedDateReported, setSelectedDateReported] = useState('');

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

    console.log(values);

    if (filtered.length > 0) {
      setValues((prevValues) => ({
        ...prevValues,
        studentName: filtered[0]?.firstName + ' ' + filtered[0]?.surName,
        student: filtered[0]?._id,
        year: filtered[0]?.year,
      }));
    } else {
      setValues((prevValues) => ({
        ...prevValues,
        studentName: '',
        student: '',
        year: '',
      }));
    }
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
        moment(selectedDateOfIncident).subtract(1, 'day'),
        'day'
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
        <div className="text-[26px] text-[#006bff] font-semibold flex justify-between mt-10 px-10">
          Add Case
          <BsX
            onClick={handleCloseModal}
            className="text-[36px] cursor-pointer"
          />
        </div>

        <div className="text-[#606060] mt-8 flex flex-col gap-2 px-10">
          <div className="flex justify-start items-center gap-2">
            <span>Search</span>
            <BsFilter className="text-[22px]" />
          </div>
          <input
            value={searchTerm}
            onChange={handleSearchStudents}
            type="text"
            autoComplete="off"
            placeholder="Search case owner's student no., firstname, etc."
            className={`border-[1px] py-3 px-5 rounded-[32px] w-[100%] bg-white focus:outline-none`}
          />
        </div>

        <div className="flex flex-col gap-8 mt-10 pt-8 px-10 pb-11 bg-gray-100">
          <div className="text-[#606060] flex flex-col gap-2 w-[100%]">
            <div className="flex gap-2 items-center">
              <span>Accused</span>
              <BsChevronBarDown />
            </div>
            <select
              name="studentName"
              value={studentName}
              onChange={handleCaseOwnerChange}
              className="border-[1px] appearance-none py-3 px-5 rounded-[32px] focus:outline-none focus:border-[#006bff]"
            >
              <option value="">Select Student Below</option>
              {filteredStudents
                ?.filter((s) => s.statusOfStudent === 'Enrolled')
                ?.sort((a, b) => {
                  const nameA = `${a.firstName} ${a.surName}`.toLowerCase();
                  const nameB = `${b.firstName} ${b.surName}`.toLowerCase();

                  if (nameA < nameB) {
                    return -1;
                  }
                  if (nameA > nameB) {
                    return 1;
                  }
                  return 0;
                })
                ?.map((s) => (
                  <option
                    key={s?._id}
                    value={`${s?.firstName} ${s?.surName}`}
                    data-student={s?._id}
                    data-year={s?.year}
                  >
                    {s?.firstName} {s?.surName}
                  </option>
                ))}
            </select>
          </div>
          <div className="text-[#606060] flex gap-2">
            <div className="flex flex-col gap-2 w-[100%]">
              <div className="">Date of Incident</div>
              <DatePicker
                filterDate={isDisabled}
                placeholderText="Enter Date"
                selected={selectedDateOfIncident}
                onChange={(date) => handleDateOfIncidentChangeCombined(date)}
                className={`border-[1px] py-3 px-5 rounded-[32px] w-[100%] focus:outline-none focus:border-[#006bff]`}
              />
            </div>
            <div className="flex flex-col gap-2 w-[100%]">
              <div className="">Date Reported</div>
              <DatePicker
                filterDate={isDisabledDateReported}
                placeholderText="Enter Date"
                selected={selectedDateReported}
                onChange={(date) => handleDateReportedChangeCombined(date)}
                className={`border-[1px] py-3 px-5 rounded-[32px] w-[100%] focus:outline-none focus:border-[#006bff]`}
              />
            </div>
          </div>
          <div className="text-[#606060] flex gap-2">
            <div className="flex flex-col gap-2 w-[50%]">
              <div className="">Type Of Violation</div>
              <select
                name="typeOfViolation"
                value={typeOfViolation}
                onChange={handleChange}
                className="appearance-none py-3 px-5 rounded-[32px] focus:outline-none border-[1px] focus:border-[#006bff]"
              >
                <option value="">Violation</option>
                {typeOfViolations?.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2 w-[50%]">
              <div className="">Reported Violation</div>
              <select
                name="reportedViolation"
                value={reportedViolation}
                onChange={handleChange}
                className="appearance-none py-3 px-5 rounded-[32px] focus:outline-none border-[1px] focus:border-[#006bff]"
              >
                <option value="All">All</option>

                {typeOfViolation === 'Minor' ? (
                  <>
                    {minorViolation
                      ?.sort((a, b) => {
                        const nameA = a.toLowerCase();
                        const nameB = b.toLowerCase();

                        // Compare the names
                        if (nameA < nameB) {
                          return -1;
                        }
                        if (nameA > nameB) {
                          return 1;
                        }
                        return 0;
                      })
                      ?.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                  </>
                ) : null}
                {typeOfViolation === 'Major' ? (
                  <>
                    {majorViolation
                      ?.sort((a, b) => {
                        const nameA = a.toLowerCase();
                        const nameB = b.toLowerCase();

                        // Compare the names
                        if (nameA < nameB) {
                          return -1;
                        }
                        if (nameA > nameB) {
                          return 1;
                        }
                        return 0;
                      })
                      ?.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                  </>
                ) : null}
              </select>
            </div>
          </div>
        </div>

        <div className="w-[100%] p-10 flex justify-end items-center">
          {selectedDateOfIncident !== '' &&
          selectedDateReported !== '' &&
          reportedViolation !== '' &&
          typeOfViolation !== '' ? (
            <button
              type="submit"
              className="cursor-pointer w-[100%] py-4 px-4 bg-[#006bff] text-[white] text-[16px] flex gap-2 justify-center items-center rounded-[32px]"
            >
              <FaPlus />
              <div>Add Case</div>
            </button>
          ) : (
            <button
              disabled
              className="py-4 px-4 w-[100%] bg-blue-300 text-[white] text-[16px] flex gap-2 justify-center items-center rounded-[32px]"
            >
              <FaPlus />
              <div>Add Case</div>
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default CreateCaseFormModal;
