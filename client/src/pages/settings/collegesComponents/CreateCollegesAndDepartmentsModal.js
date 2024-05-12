import React from "react";
import { BsX } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";

const CreateCollegesAndDepartmentFormModal = ({
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
        <div className="p-10">
          <div className="text-[28px] text-[#077bff] font-semibold flex justify-between">
            Create New College
            <BsX
              onClick={handleCloseModal}
              className="text-[36px] cursor-pointer"
            />
          </div>
          <br />
          <div className="text-[#606060] flex flex-col gap-2">
            <div>College</div>
            <input
              required
              name="college"
              value={college}
              onChange={handleChange}
              type="text"
              autoComplete="off"
              placeholder="e.g. 20-1130"
              className={`border-[1px] p-3 rounded-[6px] w-[100%] bg-[#f5f5f5] ${
                collegeError === "" ? "" : "border-[red]"
              } focus:outline-none border-[#007bff]`}
            />
          </div>
          {collegeError && <p className="text-red-500 pt-2">{collegeError}</p>}
          <div className="text-[#606060] pt-6 flex gap-2">
            <div className="flex flex-col gap-2 w-[100%]">
              <div className="">Department</div>
              <input
                required
                name="department"
                value={department}
                onChange={handleChange}
                type="text"
                autoComplete="off"
                placeholder="e.g. Kludy"
                className={`border-[1px] p-3 rounded-[6px] w-[100%] bg-[#f5f5f5] ${
                  departmentError === "" ? "" : "border-[red]"
                } focus:outline-none focus:border-[#007bff]`}
              />
              {departmentError && (
                <p className="text-red-500 pt-2">{departmentError}</p>
              )}
            </div>
          </div>
          <div className="w-100 pt-10 flex justify-end items-center">
            {collegeError === "" &&
            departmentError === "" &&
            college !== "" &&
            department !== "" ? (
              <button
                type="submit"
                className="py-3 px-3 bg-[#007bff] text-[white] text-[16px] flex gap-2 items-center rounded-[8px]"
              >
                <FaPlus />
                <div>Add College</div>
              </button>
            ) : (
              <button
                disabled
                type="submit"
                className="py-3 px-3 bg-blue-300 text-[white] text-[16px] flex gap-2 items-center rounded-[8px]"
              >
                <FaPlus />
                <div>Add College</div>
              </button>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateCollegesAndDepartmentFormModal;
