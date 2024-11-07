import React from 'react';
import { BsChevronBarDown, BsX } from 'react-icons/bs';
import { FaPlus } from 'react-icons/fa6';

const CreateStudentFormModal = ({
  handleChange,
  handleCreateStudent,
  handleCloseModal,
  values,
  errors,
  cads,
  uniqueColleges,
}) => {
  const {
    studentNo,
    firstName,
    surName,
    college,
    department,
    year,
    section,
    sex,
    contactNo,
    guardianContactNo,
    email,
  } = values;

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
      <form onSubmit={handleCreateStudent}>
        <div className="text-[26px] text-[#006bff] font-semibold flex justify-between mt-10 px-10">
          Add Student
          <BsX
            onClick={handleCloseModal}
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
            value={studentNo?.replace(/[^0-9-]/g, '')}
            onChange={handleChange}
            type="text"
            maxLength="7"
            autoComplete="off"
            placeholder="e.g. 20-1130"
            className={`border-[1px] py-3 px-5 rounded-[32px] w-[100%] ${
              studentNoError === '' ? 'border-gray-300' : 'border-[red]'
            } focus:outline-none focus:border-blue-500`}
          />
          {studentNoError && (
            <p className="text-red-500 pt-2">{studentNoError}</p>
          )}
        </div>

        <div className="flex flex-col gap-8 mt-10 pt-8 pl-10 pr-10 pb-11 bg-gray-100">
          <div className="text-[#606060] flex gap-3">
            <div className="flex flex-col gap-2 w-[50%]">
              <div>First Name</div>
              <input
                required
                name="firstName"
                value={firstName}
                onChange={handleChange}
                type="text"
                autoComplete="off"
                placeholder="e.g. Kludy"
                className={`border-[1px] py-3 px-5 rounded-[32px] w-[100%] bg-white ${
                  firstNameError === '' ? 'border-gray-200' : 'border-[red]'
                } focus:outline-none focus:border-[#006bff]`}
              />
              {firstNameError && (
                <p className="text-red-500 pt-2">{firstNameError}</p>
              )}
            </div>

            <div className="flex flex-col gap-2 w-[50%]">
              <div>Surname</div>
              <input
                required
                name="surName"
                value={surName}
                onChange={handleChange}
                type="text"
                autoComplete="off"
                placeholder="e.g. Ramirez"
                className={`border-[1px] py-3 px-5 rounded-[32px] w-[100%] bg-white ${
                  surNameError === '' ? 'border-gray-200' : 'border-[red]'
                } focus:outline-none focus:border-[#006bff]`}
              />
              {surNameError && (
                <p className="text-red-500 pt-2">{surNameError}</p>
              )}
            </div>
          </div>

          <div className="flex justify-center items-center w-[100%] gap-3">
            <div className="flex gap-3 w-[50%]">
              <div className="text-[#606060] flex flex-col gap-2 w-[50%]">
                <div className="flex gap-2 items-center">
                  <span>College</span>
                  <BsChevronBarDown />
                </div>
                <select
                  name="college"
                  value={college}
                  onChange={handleChange}
                  className="appearance-none py-3 px-5 rounded-[32px] bg-white border-[1px] border-gray-200 focus:outline-none focus:border-[#006bff]"
                >
                  <option value="">College</option>
                  {uniqueColleges?.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="text-[#606060] flex flex-col gap-2 w-[50%]">
                <div className="flex gap-2 items-center">
                  <span>Department</span>
                  <BsChevronBarDown />
                </div>
                <select
                  name="department"
                  value={department}
                  onChange={handleChange}
                  className="appearance-none py-3 px-5 rounded-[32px] bg-white border-[1px] border-gray-200 focus:outline-none focus:border-[#006bff] "
                >
                  <option value="">Department</option>
                  {cads
                    ?.filter((c) => c.college === college)
                    .map((c) => (
                      <option key={c.department} value={c.department}>
                        {c.department}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="flex gap-3 w-[50%]">
              <div className="text-[#606060] flex flex-col gap-2 w-[50%]">
                <div className="flex gap-2 items-center">
                  <span>Year</span>
                  <BsChevronBarDown />
                </div>
                <select
                  name="year"
                  value={year}
                  onChange={handleChange}
                  className="appearance-none py-3 px-5 rounded-[32px] bg-white border-[1px] border-gray-200 focus:outline-none focus:border-[#006bff]"
                >
                  <option value="">Year</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                </select>
              </div>
              <div className="text-[#606060] flex flex-col gap-2 w-[50%]">
                <div className="flex gap-2 items-center">
                  <span>Section</span>
                  <BsChevronBarDown />
                </div>
                <select
                  name="section"
                  value={section}
                  onChange={handleChange}
                  className="appearance-none py-3 px-5 rounded-[32px] bg-white border-[1px] border-gray-200 focus:outline-none focus:border-[#006bff]"
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

          <div className="flex justify-center items-center w-[100%] gap-3">
            <div className="flex gap-3 w-[50%]">
              <div className="text-[#606060] flex flex-col gap-2 w-[50%]">
                <div className="flex gap-2 items-center">
                  <span>Sex</span>
                  <BsChevronBarDown />
                </div>
                <select
                  name="sex"
                  value={sex}
                  onChange={handleChange}
                  className="appearance-none py-3 px-5 rounded-[32px] bg-white border-[1px] border-gray-200 focus:outline-none focus:border-[#006bff]"
                >
                  <option value="">Sex</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="text-[#606060] flex flex-col gap-2 w-[50%]">
                <div className="">Email</div>
                <input
                  required
                  name="email"
                  value={email}
                  onChange={handleChange}
                  type="email"
                  maxLength="32"
                  autoComplete="off"
                  placeholder="e.g. example@gmail.com"
                  className={`py-3 px-5 rounded-[32px] w-[100%] bg-white border-[1px]  ${
                    emailError === '' ? 'border-gray-200' : 'border-[red]'
                  } focus:outline-none focus:border-[#006bff]`}
                />
                {emailError && (
                  <p className="text-red-500 pt-2">{emailError}</p>
                )}
              </div>
            </div>
            <div className="flex gap-3 w-[50%]">
              <div className="text-[#606060] flex flex-col gap-2 w-[50%]">
                <div className="">Contact No.</div>
                <input
                  required
                  name="contactNo"
                  value={contactNo?.replace(/[^0-9+]/g, '')}
                  onChange={handleChange}
                  type="text"
                  autoComplete="off"
                  placeholder="e.g. 09123456789"
                  maxLength="13"
                  className={`py-3 px-5 rounded-[32px] w-[100%] bg-white border-[1px]  ${
                    contactNoError === '' ? 'border-gray-200' : 'border-[red]'
                  } focus:outline-none focus:border-[#006bff]`}
                />
                {contactNoError && (
                  <p className="text-red-500 pt-2">{contactNoError}</p>
                )}
              </div>
              <div className="text-[#606060] flex flex-col gap-2 w-[50%]">
                <div className="">Guardian No.</div>
                <input
                  required
                  name="guardianContactNo"
                  value={guardianContactNo?.replace(/[^0-9+]/g, '')}
                  onChange={handleChange}
                  type="text"
                  autoComplete="off"
                  placeholder="e.g. 09123456789"
                  maxLength="13"
                  className={`py-3 px-5 rounded-[32px] w-[100%] bg-white border-[1px] ${
                    guardianContactNoError === ''
                      ? 'border-gray-200'
                      : 'border-[red]'
                  } focus:outline-none focus:border-[#006bff]`}
                />
                {guardianContactNoError && (
                  <p className="text-red-500 pt-2">{guardianContactNoError}</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-[100%] p-10 flex justify-end items-center">
          {studentNoError === '' &&
          firstNameError === '' &&
          middleNameError === '' &&
          surNameError === '' &&
          college !== '' &&
          department !== '' &&
          year !== '' &&
          section !== '' &&
          sex !== '' &&
          emailError === '' &&
          contactNoError === '' &&
          guardianContactNoError === '' ? (
            <button
              type="submit"
              className="cursor-pointer w-[100%] py-4 px-4 bg-[#006bff] text-[white] text-[16px] flex gap-2 justify-center items-center rounded-[32px]"
            >
              <FaPlus />
              <div>Add Student</div>
            </button>
          ) : (
            <button
              disabled
              type="submit"
              className="py-4 px-4 w-[100%] bg-blue-300 text-[white] text-[16px] flex gap-2 justify-center items-center rounded-[32px]"
            >
              <FaPlus />
              <div>Add Student</div>
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default CreateStudentFormModal;
