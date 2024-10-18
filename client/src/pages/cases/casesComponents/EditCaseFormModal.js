import React, { useState } from 'react';
import { BsChevronBarDown, BsFilter, BsX } from 'react-icons/bs';
import { FaPlus } from 'react-icons/fa6';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

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
  setUpdatedValues,
  students,
}) => {
  const { typeOfViolations } = values;

  const [searchTerm, setSearchTerm] = useState(
    `${updatedValues?.student?.firstName} ${updatedValues?.student?.surName}`
  );
  const [filteredStudents, setFilteredStudents] = useState(students);
  const [selectedDateOfIncident, setSelectedDateOfIncident] = useState('');
  const [selectedDateReported, setSelectedDateReported] = useState('');

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

    if (filtered.length > 0) {
      setUpdatedValues((prevValues) => ({
        ...prevValues,
        studentName: filtered[0]?.firstName + ' ' + filtered[0]?.surName,
        student: filtered[0]?._id,
        year: filtered[0]?.year,
      }));
    } else {
      setUpdatedValues((prevValues) => ({
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

  const formatDate = (dateString) => {
    const date = moment
      .utc(dateString, 'YYYY-MM-DDTHH:mm:ss.SSS[Z]')
      .add(1, 'day');
    return date.format('MM/DD/YYYY');
  };

  return (
    <>
      <form onSubmit={(e) => handleEditCase(e)}>
        <div className="text-[26px] text-[#077bff] font-semibold flex justify-between mt-10 px-10">
          Update Case
          <BsX
            onClick={handleCloseModalEdit}
            className="text-[36px] cursor-pointer"
          />
        </div>

        <div className="text-[#606060] mt-8 flex flex-col gap-2 px-10">
          <div className="flex items-center gap-2">
            <span>Search</span>
            <BsFilter className="text-[22px]" />
          </div>
          <input
            value={searchTerm}
            onChange={handleSearchStudents}
            type="text"
            autoComplete="off"
            placeholder="Search accused's student no., firstname, etc."
            className={`border-[1px] py-3 px-5 rounded-[32px] w-[100%] bg-white focus:outline-none`}
          />
        </div>

        <div className="flex flex-col gap-8 mt-10 pt-9 pl-10 pr-10 pb-10 bg-gray-100">
          <div className="text-[#606060] flex flex-col gap-2 w-[100%]">
            <div className="flex gap-2 items-center">
              <span>Accused</span>
              <BsChevronBarDown />
            </div>
            <select
              name="studentName"
              value={updatedValues?.studentName}
              onChange={handleCaseOwnerChange}
              className="border-[1px] appearance-none py-3 px-5 rounded-[32px] focus:outline-none focus:border-[#007bff]"
            >
              {filteredStudents
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
                .map((s) => (
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
                value={formatDate(updatedValues?.dateOfIncident)}
                filterDate={isDisabled}
                placeholderText="Enter Date"
                selected={selectedDateOfIncident}
                onChange={(date) => handleDateOfIncidentChangeCombined(date)}
                className={`border-[1px] py-3 px-5 rounded-[32px] w-[100%] focus:outline-none focus:border-[#007bff]`}
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
                className={`border-[1px] py-3 px-5 rounded-[32px] w-[100%] focus:outline-none focus:border-[#007bff]`}
              />
            </div>
          </div>
          <div className="text-[#606060] flex gap-2">
            <div className="flex flex-col gap-2 w-[50%]">
              <div className="">Type Of Violation</div>
              <select
                name="typeOfViolation"
                value={updatedValues?.typeOfViolation}
                onChange={handleChange}
                className="appearance-none py-3 px-5 rounded-[32px] focus:outline-none border-[1px] focus:border-[#007bff]"
              >
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
                value={updatedValues?.reportedViolation}
                onChange={handleChange}
                className="appearance-none py-3 px-5 rounded-[32px] focus:outline-none border-[1px] focus:border-[#007bff]"
              >
                {updatedValues?.typeOfViolation === 'Major' ? (
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
        </div>

        <div className="w-[100%] p-10 flex justify-end items-center">
          {updatedValues?.student !== '' &&
          updatedValues.dateOfIncident !== '' &&
          updatedValues.dateReported !== '' &&
          updatedValues?.reportedViolation !== '' &&
          updatedValues?.typeOfViolation !== '' ? (
            <button
              type="submit"
              className="cursor-pointer w-[100%] py-3 px-4 bg-[#007bff] text-[white] text-[16px] flex gap-2 items-center rounded-[4px]"
            >
              <FaPlus />
              <div>Update Case</div>
            </button>
          ) : (
            <button
              disabled
              className="py-3 px-4 w-[100%] bg-blue-300 text-[white] text-[16px] flex gap-2 items-center rounded-[4px]"
            >
              <FaPlus />
              <div>Update Case</div>
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default EditCaseFormModal;
