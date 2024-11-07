import React from 'react';
import { BsX } from 'react-icons/bs';
import { FaPlus } from 'react-icons/fa6';

const CreateCollegesAndDepartmentsFormModal = ({
  handleChange,
  handleCreateCad,
  handleCloseModal,
  values,
  errors,
}) => {
  const { college, department } = values;

  const { college: collegeError, department: departmentError } = errors;

  return (
    <>
      <form onSubmit={handleCreateCad}>
        <div className="text-[26px] text-[#006bff] font-semibold flex justify-between mt-10 px-10">
          Add College
          <BsX
            onClick={handleCloseModal}
            className="text-[36px] cursor-pointer"
          />
        </div>

        <div className="text-[#606060] mt-8 flex flex-col gap-2 px-10">
          <div>College</div>
          <input
            required
            name="college"
            value={college}
            onChange={handleChange}
            type="text"
            autoComplete="off"
            placeholder="e.g. CEIT"
            className={`border-[1px] py-3 px-5 rounded-[32px] w-[100%] bg-white ${
              collegeError === '' ? 'border-gray-200' : 'border-[red]'
            } focus:outline-none focus:border-[#006bff]`}
          />
        </div>
        {collegeError && <p className="text-red-500 pt-2">{collegeError}</p>}

        <div className="flex flex-col gap-8 mt-10 pt-8 px-10 pb-11 bg-gray-100">
          <div className="text-[#606060] flex flex-col gap-2 w-[100%]">
            <div>Department</div>
            <input
              required
              name="department"
              value={department}
              onChange={handleChange}
              type="text"
              autoComplete="off"
              placeholder="e.g. BSIT Bachelor of Science in Information Technology"
              className={`border-[1px] py-3 px-5 rounded-[32px] w-[100%] bg-white ${
                collegeError === '' ? 'border-gray-200' : 'border-[red]'
              } focus:outline-none focus:border-[#006bff]`}
            />
            {departmentError && (
              <p className="text-red-500 pt-2">{departmentError}</p>
            )}
          </div>
        </div>

        <div className="w-[100%] p-10 flex justify-end items-center">
          {collegeError === '' &&
          departmentError === '' &&
          college !== '' &&
          department !== '' ? (
            <button
              type="submit"
              className="cursor-pointer w-[100%] py-4 px-4 bg-[#006bff] text-[white] text-[16px] flex gap-2 justify-center items-center rounded-[32px]"
            >
              <FaPlus />
              <div>Add College</div>
            </button>
          ) : (
            <button
              disabled
              className="cursor-pointer w-[100%] py-4 px-4 bg-[#006bff] text-[white] text-[16px] flex gap-2 justify-center items-center rounded-[32px]"
            >
              <FaPlus />
              <div>Add College</div>
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default CreateCollegesAndDepartmentsFormModal;
