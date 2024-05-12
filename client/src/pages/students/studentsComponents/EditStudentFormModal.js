import React from "react";
import { BsCaretDown, BsX } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";

const EditStudentFormModal = ({
  handleChange,
  handleEditStudent,
  handleCloseModalEdit,
  handleCloseModalEditStudent,
  values,
  updatedValues,
  errors,
  coedDepartments,
  casDepartments,
  ceitDepartments,
  cabaDepartments,
}) => {
  const { colleges } = values;

  const {
    studentNo: studentNoError,
    firstName: firstNameError,
    middleName: middleNameError,
    surName: surNameError,
    email: emailError,
    contactNo: contactNoError,
    guardianContactNo: guardianContactNoError,
  } = errors;

  return (
    <>
      <form onSubmit={handleEditStudent}>
        <div className="p-10">
          <div className="text-[28px] text-[#077bff] font-semibold flex justify-between">
            Edit Existing Student
            <BsX
              onClick={handleCloseModalEditStudent || handleCloseModalEdit}
              className="text-[36px]"
            />
          </div>
          <br />
          <div className="text-[#606060] flex flex-col gap-2">
            <div>Student No.</div>
            <input
              required
              name="studentNo"
              value={updatedValues?.studentNo?.replace(/[^0-9-]/g, "")}
              onChange={handleChange}
              type="text"
              maxLength="7"
              autoComplete="off"
              placeholder="e.g. 20-1130"
              className={`border-[1px] p-3 rounded-[6px] w-[100%] bg-[#f5f5f5] ${
                studentNoError === "" ? "" : "border-[red]"
              } focus:outline-none`}
            />
          </div>
          {studentNoError && (
            <p className="text-red-500 pt-2">{studentNoError}</p>
          )}
          <div className="text-[#606060] pt-6 flex gap-2">
            <div className="flex flex-col gap-2 w-[100%]">
              <div className="">First Name</div>
              <input
                required
                name="firstName"
                value={updatedValues?.firstName}
                onChange={handleChange}
                type="text"
                autoComplete="off"
                placeholder="e.g. Kludy"
                className={`border-[1px] p-3 rounded-[6px] w-[100%] bg-[#f5f5f5] ${
                  firstNameError === "" ? "" : "border-[red]"
                } focus:outline-none`}
              />
              {firstNameError && (
                <p className="text-red-500 pt-2">{firstNameError}</p>
              )}
            </div>

            <div className="flex flex-col gap-2 w-[100%]">
              <div className="">Middle Name</div>
              <input
                required
                name="middleName"
                value={updatedValues?.middleName}
                onChange={handleChange}
                type="text"
                autoComplete="off"
                placeholder="e.g. Sabordo"
                className={`border-[1px] p-3 rounded-[6px] w-[100%] bg-[#f5f5f5] ${
                  middleNameError === "" ? "" : "border-[red]"
                } focus:outline-none`}
              />
              {middleNameError && (
                <p className="text-red-500 pt-2">{middleNameError}</p>
              )}
            </div>
            <div className="flex flex-col gap-2 w-[100%]">
              <div className="">Surname</div>
              <input
                required
                name="surName"
                value={updatedValues?.surName}
                onChange={handleChange}
                type="text"
                autoComplete="off"
                placeholder="e.g. Ramirez"
                className={`border-[1px] p-3 rounded-[6px] w-[100%] bg-[#f5f5f5] ${
                  surNameError === "" ? "" : "border-[red]"
                } focus:outline-none`}
              />
              {surNameError && (
                <p className="text-red-500 pt-2">{surNameError}</p>
              )}
            </div>
          </div>
          <div className="text-[#606060] pt-6 flex gap-2">
            <div className="flex flex-col gap-2 w-[49%]">
              <div className="flex gap-2 items-center">
                <span>College</span>
                <BsCaretDown />
              </div>
              <select
                name="college"
                value={updatedValues?.college}
                onChange={handleChange}
                className="appearance-none p-3 rounded-[6px] bg-[#f5f5f5] focus:outline-none border-[1px] focus:border-[#bbbbbb]"
              >
                {colleges?.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2 w-[50%]">
              <div className="flex gap-2 items-center">
                <span>Department</span>
                <BsCaretDown />
              </div>
              <select
                name="department"
                value={updatedValues?.department}
                onChange={handleChange}
                className="appearance-none p-3 rounded-[6px] bg-[#f5f5f5] focus:outline-none border-[1px] focus:border-[#bbbbbb]"
              >
                {updatedValues?.college === "(COED) College of Education" ? (
                  <>
                    {coedDepartments?.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </>
                ) : null}
                {updatedValues?.college ===
                "(CAS) College of Arts and Sciences" ? (
                  <>
                    {casDepartments?.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </>
                ) : null}
                {updatedValues?.college ===
                "(CEIT) College of Engineering and Information Technology" ? (
                  <>
                    {ceitDepartments?.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </>
                ) : null}
                {updatedValues?.college ===
                "(CABA) College of Business Administration, Public Administration and Accountancy" ? (
                  <>
                    {cabaDepartments?.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </>
                ) : null}
              </select>
            </div>
          </div>
          <div className="text-[#606060] pt-6 flex gap-2">
            <div className="flex flex-col gap-2 w-[15%]">
              <div className="flex gap-2 items-center">
                <span>Year</span>
                <BsCaretDown />
              </div>
              <select
                name="year"
                value={updatedValues?.year}
                onChange={handleChange}
                className="appearance-none p-3 rounded-[6px] bg-[#f5f5f5] focus:outline-none border-[1px] focus:border-[#bbbbbb]"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 w-[16%]">
              <div className="flex gap-2 items-center">
                <span>Section</span>
                <BsCaretDown />
              </div>
              <select
                name="section"
                value={updatedValues?.section}
                onChange={handleChange}
                className="appearance-none p-3 rounded-[6px] bg-[#f5f5f5] focus:outline-none border-[1px] focus:border-[#bbbbbb]"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 w-[16%]">
              <div className="flex gap-2 items-center">
                <span>Sex</span>
                <BsCaretDown />
              </div>
              <select
                name="sex"
                value={updatedValues?.sex}
                onChange={handleChange}
                className="appearance-none p-3 rounded-[6px] bg-[#f5f5f5] focus:outline-none border-[1px] focus:border-[#bbbbbb]"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 w-[50%]">
              <div className="">Email</div>
              <input
                required
                name="email"
                value={updatedValues?.email}
                onChange={handleChange}
                type="email"
                maxLength="32"
                autoComplete="off"
                placeholder="e.g. example@gmail.com"
                className={`border-[1px] p-3 rounded-[6px] w-[100%] bg-[#f5f5f5] ${
                  emailError === "" ? "" : "border-[red]"
                } focus:outline-none`}
              />
              {emailError && <p className="text-red-500 pt-2">{emailError}</p>}
            </div>
          </div>
          <div className="text-[#606060] pt-6 flex gap-2">
            <div className="flex flex-col gap-2 w-[49%]">
              <div className="">Contact No.</div>
              <input
                required
                name="contactNo"
                value={updatedValues?.contactNo?.replace(/[^0-9+]/g, "")}
                onChange={handleChange}
                type="text"
                autoComplete="off"
                placeholder="e.g. 09123456789"
                maxLength="13"
                className={`border-[1px] p-3 rounded-[6px] w-[100%] bg-[#f5f5f5] ${
                  contactNoError === "" ? "" : "border-[red]"
                } focus:outline-none`}
              />
              {contactNoError && (
                <p className="text-red-500 pt-2">{contactNoError}</p>
              )}
            </div>
            <div className="flex flex-col gap-2 w-[50%]">
              <div className="">Guardian Contact No.</div>
              <input
                required
                name="guardianContactNo"
                value={updatedValues?.guardianContactNo?.replace(
                  /[^0-9+]/g,
                  ""
                )}
                onChange={handleChange}
                type="text"
                autoComplete="off"
                placeholder="e.g. 09123456789"
                maxLength="13"
                className={`border-[1px] p-3 rounded-[6px] w-[100%] bg-[#f5f5f5] ${
                  guardianContactNoError === "" ? "" : "border-[red]"
                } focus:outline-none`}
              />
              {guardianContactNoError && (
                <p className="text-red-500 pt-2">{guardianContactNoError}</p>
              )}
            </div>
          </div>
          <div className="w-100 pt-10 flex justify-end items-center">
            {studentNoError === "" &&
            firstNameError === "" &&
            middleNameError === "" &&
            surNameError === "" &&
            updatedValues?.college !== "" &&
            updatedValues?.department !== "" &&
            updatedValues?.year !== "" &&
            updatedValues?.section !== "" &&
            updatedValues?.sex !== "" &&
            emailError === "" &&
            contactNoError === "" &&
            guardianContactNoError === "" ? (
              <button
                type="submit"
                className="py-3 px-3 bg-[#007bff] text-[white] text-[16px] flex gap-2 items-center rounded-[8px]"
              >
                <FaPlus />
                <div>Edit Student</div>
              </button>
            ) : (
              <button
                disabled
                type="submit"
                className="py-3 px-3 bg-blue-300 text-[white] text-[16px] flex gap-2 items-center rounded-[8px]"
              >
                <FaPlus />
                <div>Edit Student</div>
              </button>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default EditStudentFormModal;
