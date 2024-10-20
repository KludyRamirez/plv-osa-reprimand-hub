import React from "react";
import { BsChevronBarDown, BsX } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";

const EditStudentFormModal = ({
  handleChange,
  handleEditStudent,
  handleCloseModalEdit,
  handleCloseModalEditStudent,
  updatedValues,
  errors,
  cads,
  uniqueColleges,
}) => {
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
        <div className="text-[26px] text-[#077bff] font-semibold flex justify-between mt-10 px-10">
          Update Student
          <BsX
            onClick={
              handleCloseModalEdit
                ? handleCloseModalEdit
                : handleCloseModalEditStudent
                ? handleCloseModalEditStudent
                : handleCloseModalEdit
            }
            className="text-[36px] cursor-pointer"
          />
        </div>

        <div className="text-[#606060] mt-8 flex flex-col gap-2 px-10">
          <div className="flex justify-start items-center gap-2">
            <span>Student No.</span>
            <BsChevronBarDown />
          </div>
          <input
            required
            name="studentNo"
            value={updatedValues?.studentNo?.replace(/[^0-9-]/g, "")}
            onChange={handleChange}
            type="text"
            maxLength="7"
            autoComplete="off"
            placeholder="e.g. 20-1130"
            className={`border-[1px] py-3 px-5 rounded-[32px] w-[100%] ${
              studentNoError === "" ? "border-gray-300" : "border-[red]"
            } focus:outline-none focus:border-blue-500`}
          />
          {studentNoError && (
            <p className="text-red-500 pt-2">{studentNoError}</p>
          )}
        </div>

        <div className="flex flex-col gap-8 mt-10 pt-9 pl-10 pr-10 pb-10 bg-gray-200">
          <div className="text-[#606060] flex gap-2">
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
                className={`border-[1px] py-3 px-5 rounded-[32px] w-[100%] bg-transparent ${
                  firstNameError === "" ? "border-white" : "border-[red]"
                } focus:outline-none focus:border-[#007bff]`}
              />
              {firstNameError && (
                <p className="text-red-500 pt-2">{firstNameError}</p>
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
                className={`border-[1px] py-3 px-5 rounded-[32px] w-[100%] bg-transparent ${
                  surNameError === "" ? "border-white" : "border-[red]"
                } focus:outline-none focus:border-[#007bff]`}
              />
              {surNameError && (
                <p className="text-red-500 pt-2">{surNameError}</p>
              )}
            </div>
          </div>

          <div className="flex justify-center items-center w-[100%] gap-2">
            <div className="flex gap-2 w-[50%]">
              <div className="text-[#606060] flex flex-col gap-2 w-[100%]">
                <div className="flex gap-2 items-center">
                  <span>College</span>
                  <BsChevronBarDown />
                </div>
                <select
                  name="college"
                  value={updatedValues?.college}
                  onChange={handleChange}
                  className="appearance-none py-3 px-5 rounded-[32px] bg-transparent border-[1px] border-white focus:outline-none focus:border-[#007bff]"
                >
                  <option value="">College</option>
                  {uniqueColleges?.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="text-[#606060] flex flex-col gap-2 w-[100%]">
                <div className="flex gap-2 items-center">
                  <span>Department</span>
                  <BsChevronBarDown />
                </div>
                <select
                  name="department"
                  value={updatedValues?.department}
                  onChange={handleChange}
                  className="appearance-none py-3 px-5 rounded-[32px] bg-transparent border-[1px] border-white focus:outline-none focus:border-[#007bff]"
                >
                  <option value="">Department</option>
                  {cads
                    ?.filter((c) => c.college === updatedValues?.college)
                    .map((c) => (
                      <option key={c.department} value={c.department}>
                        {c.department}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="flex gap-2 w-[50%]">
              <div className="text-[#606060] flex flex-col gap-2 w-[100%]">
                <div className="flex gap-2 items-center">
                  <span>Year</span>
                  <BsChevronBarDown />
                </div>
                <select
                  name="year"
                  value={updatedValues?.year}
                  onChange={handleChange}
                  className="appearance-none py-3 px-5 rounded-[32px] bg-transparent border-[1px] border-white focus:outline-none focus:border-[#007bff]"
                >
                  <option value="">Year</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                </select>
              </div>
              <div className="text-[#606060] flex flex-col gap-2 w-[100%]">
                <div className="flex gap-2 items-center">
                  <span>Section</span>
                  <BsChevronBarDown />
                </div>
                <select
                  name="section"
                  value={updatedValues?.section}
                  onChange={handleChange}
                  className="appearance-none py-3 px-5 rounded-[32px] bg-transparent border-[1px] border-white focus:outline-none focus:border-[#007bff]"
                >
                  <option value="">Section</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center w-[100%] gap-2">
            <div className="flex gap-2 w-[50%]">
              <div className="text-[#606060] flex flex-col gap-2 w-[100%]">
                <div className="flex gap-2 items-center">
                  <span>Sex</span>
                  <BsChevronBarDown />
                </div>
                <select
                  name="sex"
                  value={updatedValues?.sex}
                  onChange={handleChange}
                  className="appearance-none py-3 px-5 rounded-[32px] bg-transparent border-[1px] border-white focus:outline-none focus:border-[#007bff]"
                >
                  <option value="">Sex</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="text-[#606060] flex flex-col gap-2 w-[100%]">
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
                  className={`py-3 px-5 rounded-[32px] w-[100%] bg-transparent border-[1px]  ${
                    emailError === "" ? "border-white" : "border-[red]"
                  } focus:outline-none focus:border-[#007bff]`}
                />
                {emailError && (
                  <p className="text-red-500 pt-2">{emailError}</p>
                )}
              </div>
            </div>
            <div className="flex gap-2 w-[50%]">
              <div className="text-[#606060] flex flex-col gap-2 w-[100%]">
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
                  className={`py-3 px-5 rounded-[32px] w-[100%] bg-transparent border-[1px]  ${
                    contactNoError === "" ? "border-white" : "border-[red]"
                  } focus:outline-none focus:border-[#007bff]`}
                />
                {contactNoError && (
                  <p className="text-red-500 pt-2">{contactNoError}</p>
                )}
              </div>
              <div className="text-[#606060] flex flex-col gap-2 w-[100%]">
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
                  className={`py-3 px-5 rounded-[32px] w-[100%] bg-transparent border-[1px] ${
                    guardianContactNoError === ""
                      ? "border-white"
                      : "border-[red]"
                  } focus:outline-none focus:border-[#007bff]`}
                />
                {guardianContactNoError && (
                  <p className="text-red-500 pt-2">{guardianContactNoError}</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-[100%] p-10 flex justify-end items-center">
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
              className="cursor-pointer w-[100%] py-3 px-4 bg-[#007bff] text-[white] text-[16px] flex gap-2 items-center rounded-[4px]"
            >
              <FaPlus />
              <div>Update Student</div>
            </button>
          ) : (
            <button
              disabled
              type="submit"
              className="py-3 px-4 w-[100%] bg-blue-300 text-[white] text-[16px] flex gap-2 items-center rounded-[4px]"
            >
              <FaPlus />
              <div>Update Student</div>
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default EditStudentFormModal;
