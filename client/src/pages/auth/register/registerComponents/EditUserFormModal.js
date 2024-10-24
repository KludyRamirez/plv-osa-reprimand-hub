import React from 'react';
import { BsChevronBarDown, BsX } from 'react-icons/bs';
import { FaPlus } from 'react-icons/fa6';

const EditStudentFormModal = ({
  handleChange,
  handleEditUser,
  handleCloseModalEdit,
  values,
  updatedValues,
  errors,
}) => {
  const { roles } = values;

  const {
    userName: userNameError,
    firstName: firstNameError,
    surName: surNameError,
    email: emailError,
    password: passwordError,
    contactNo: contactNoError,
  } = errors;

  return (
    <>
      <form onSubmit={handleEditUser}>
        <div className="text-[26px] text-[#077bff] font-bold flex justify-between mt-10 px-10">
          Update User
          <BsX
            onClick={handleCloseModalEdit}
            className="text-[36px] cursor-pointer"
          />
        </div>
        <div className="text-[#606060] mt-8 flex flex-col gap-2 px-10">
          <div className="flex justify-start items-center gap-2">
            <div>Username</div>
          </div>
          <input
            required
            name="userName"
            value={updatedValues?.userName}
            onChange={handleChange}
            type="text"
            maxLength="24"
            autoComplete="off"
            placeholder="e.g. kluds19"
            className={`border-[1px] py-3 px-5 rounded-[32px] w-[100%] ${
              userNameError === '' ? 'border-gray-300' : 'border-[red]'
            } focus:outline-none focus:border-blue-500`}
          />
          {userNameError && (
            <p className="text-red-500 pt-2">{userNameError}</p>
          )}
        </div>

        <div className="flex flex-col gap-8 mt-10 pt-8 pl-10 pr-10 pb-11 bg-gray-100">
          <div className="text-[#606060] flex gap-3">
            <div className="flex flex-col gap-2 w-[50%]">
              <div>First Name</div>
              <input
                required
                name="firstName"
                value={updatedValues?.firstName}
                onChange={handleChange}
                type="text"
                autoComplete="off"
                placeholder="e.g. Kludy"
                className={`border-[1px] py-3 px-5 rounded-[32px] w-[100%] bg-white ${
                  firstNameError === '' ? 'border-gray-200' : 'border-[red]'
                } focus:outline-none focus:border-[#007bff]`}
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
                value={updatedValues?.surName}
                onChange={handleChange}
                type="text"
                autoComplete="off"
                placeholder="e.g. Ramirez"
                className={`border-[1px] py-3 px-5 rounded-[32px] w-[100%] bg-white ${
                  surNameError === '' ? 'border-gray-200' : 'border-[red]'
                } focus:outline-none focus:border-[#007bff]`}
              />
              {surNameError && (
                <p className="text-red-500 pt-2">{surNameError}</p>
              )}
            </div>
          </div>

          <div className="flex justify-center items-center w-[100%] gap-3">
            <div className="text-[#606060] flex flex-col gap-2 w-[50%]">
              <div>Email</div>
              <input
                required
                name="email"
                value={updatedValues?.email}
                onChange={handleChange}
                type="email"
                maxLength="32"
                autoComplete="off"
                placeholder="e.g. example@gmail.com"
                className={`border-[1px] py-3 px-5 rounded-[32px] w-[100%] bg-white ${
                  surNameError === '' ? 'border-gray-200' : 'border-[red]'
                } focus:outline-none focus:border-[#007bff]`}
              />
              {emailError && <p className="text-red-500 ml-2">{emailError}</p>}
            </div>

            <div className="text-[#606060] flex flex-col gap-2 w-[50%]">
              <div>Password</div>
              <input
                required
                name="password"
                value={updatedValues?.password}
                onChange={handleChange}
                type="password"
                maxLength="32"
                autoComplete="off"
                placeholder="Enter password"
                className={`border-[1px] py-3 px-5 rounded-[32px] w-[100%] bg-white ${
                  surNameError === '' ? 'border-gray-200' : 'border-[red]'
                } focus:outline-none focus:border-[#007bff]`}
              />
              {passwordError && (
                <p className="text-red-500 ml-2">{passwordError}</p>
              )}
            </div>
          </div>

          <div className="flex justify-center items-center w-[100%] gap-3">
            <div className="text-[#606060] flex flex-col gap-2 w-[50%]">
              <div className="flex gap-2 items-center">
                <span>Role</span>
                <BsChevronBarDown />
              </div>
              <select
                name="role"
                value={updatedValues?.role}
                onChange={handleChange}
                className="appearance-none py-3 px-5 rounded-[32px] bg-white border-[1px] border-gray-200 focus:outline-none focus:border-[#007bff]"
              >
                {roles.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-[#606060] flex flex-col gap-2 w-[50%]">
              <div>Contact No.</div>
              <input
                required
                name="contactNo"
                value={updatedValues?.contactNo?.replace(/[^0-9+]/g, '')}
                onChange={handleChange}
                type="text"
                autoComplete="off"
                placeholder="e.g. 09123456789"
                maxLength="13"
                className={`border-[1px] px-6 py-3 rounded-[24px] w-[100%] bg-white ${
                  contactNoError === '' ? '' : 'border-red-400'
                } focus:outline-none focus:border-[#007bff]`}
              />
              {contactNoError && (
                <p className="text-red-500 ml-2">{contactNoError}</p>
              )}
            </div>
          </div>
        </div>

        <div className="w-[100%] p-10 flex justify-end items-center">
          {userNameError === '' &&
          firstNameError === '' &&
          surNameError === '' &&
          emailError === '' &&
          passwordError === '' &&
          updatedValues?.role !== '' ? (
            <button
              type="submit"
              className="cursor-pointer w-[100%] py-4 px-4 bg-[#007bff] text-[white] text-[16px] flex gap-2 justify-center items-center rounded-[32px]"
            >
              <FaPlus />
              <div>Update User</div>
            </button>
          ) : (
            <button
              disabled
              className="py-4 px-4 w-[100%] bg-blue-300 text-[white] text-[16px] flex gap-2 justify-center items-center rounded-[32px]"
            >
              <FaPlus />
              <div>Update User</div>
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default EditStudentFormModal;
