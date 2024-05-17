import React from "react";
import { BsChevronBarDown, BsX } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";

const CreateUserFormModal = ({
  handleChange,
  handleCreateUser,
  handleCloseModal,
  values,
  errors,
}) => {
  const {
    userName,
    firstName,
    surName,
    email,
    password,
    roles,
    role,
    contactNo,
  } = values;

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
      <form onSubmit={handleCreateUser}>
        <div className="p-10">
          <div className="text-[28px] text-[#077bff] font-semibold flex justify-between">
            Create New User
            <BsX
              onClick={handleCloseModal}
              className="text-[36px] cursor-pointer"
            />
          </div>
          <div className="text-[#606060] pt-8 flex gap-2">
            <div className="flex flex-col gap-2 w-[100%]">
              <div className="ml-2">Username</div>
              <input
                required
                name="userName"
                value={userName}
                onChange={handleChange}
                type="text"
                maxLength="24"
                autoComplete="off"
                placeholder="e.g. kluds19"
                className={`border-[1px] px-6 py-3 rounded-[24px] w-[100%] bg-white ${
                  userNameError === "" ? "" : "border-[red]"
                } focus:outline-none focus:border-[#007bff]`}
              />
              {userNameError && (
                <p className="text-red-500 ml-2">{userNameError}</p>
              )}
            </div>
          </div>

          <div className="text-[#606060] pt-5 flex gap-2">
            <div className="flex flex-col gap-2 w-[100%]">
              <div className="ml-2">First Name</div>
              <input
                required
                name="firstName"
                value={firstName}
                onChange={handleChange}
                type="text"
                autoComplete="off"
                placeholder="e.g. Kludy"
                className={`border-[1px] px-6 py-3 rounded-[24px] w-[100%] bg-white ${
                  firstNameError === "" ? "" : "border-red-400"
                } focus:outline-none focus:border-[#007bff]`}
              />
              {firstNameError && (
                <p className="text-red-500 ml-2">{firstNameError}</p>
              )}
            </div>

            <div className="flex flex-col gap-2 w-[100%]">
              <div className="ml-2">Surname</div>
              <input
                required
                name="surName"
                value={surName}
                onChange={handleChange}
                type="text"
                autoComplete="off"
                placeholder="e.g. Ramirez"
                className={`border-[1px] px-6 py-3 rounded-[24px] w-[100%] bg-white ${
                  surNameError === "" ? "" : "border-red-400"
                } focus:outline-none focus:border-[#007bff]`}
              />
              {surNameError && (
                <p className="text-red-500 ml-2">{surNameError}</p>
              )}
            </div>
          </div>

          <div className="text-[#606060] pt-5 flex gap-2">
            <div className="flex flex-col gap-2 w-[50%]">
              <div className="ml-2">Email</div>
              <input
                required
                name="email"
                value={email}
                onChange={handleChange}
                type="email"
                maxLength="32"
                autoComplete="off"
                placeholder="e.g. example@gmail.com"
                className={`border-[1px] px-6 py-3 rounded-[24px] w-[100%] bg-white ${
                  emailError === "" ? "" : "border-red-400"
                } focus:outline-none focus:border-[#007bff]`}
              />
              {emailError && <p className="text-red-500 ml-2">{emailError}</p>}
            </div>

            <div className="flex flex-col gap-2 w-[50%]">
              <div className="ml-2">Password</div>
              <input
                required
                name="password"
                value={password}
                onChange={handleChange}
                type="password"
                maxLength="32"
                autoComplete="off"
                placeholder="Enter password"
                className={`border-[1px] px-6 py-3 rounded-[24px] w-[100%] bg-white ${
                  passwordError === "" ? "" : "border-red-400"
                } focus:outline-none focus:border-[#007bff]`}
              />
              {passwordError && (
                <p className="text-red-500 ml-2">{passwordError}</p>
              )}
            </div>
          </div>

          <div className="text-[#606060] pt-5 flex gap-2">
            <div className="flex flex-col gap-2 w-[50%]">
              <div className="flex gap-2 items-center">
                <span className="ml-2">Role</span>
                <BsChevronBarDown />
              </div>
              <select
                name="role"
                value={role}
                onChange={handleChange}
                className="appearance-none px-6 py-3 rounded-[24px] bg-white focus:outline-none border-[1px] focus:border-[#007bff]"
              >
                <option key="" value="">
                  Select Role
                </option>
                {roles.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2 w-[50%]">
              <div className="ml-2">Contact No.</div>
              <input
                required
                name="contactNo"
                value={contactNo?.replace(/[^0-9+]/g, "")}
                onChange={handleChange}
                type="text"
                autoComplete="off"
                placeholder="e.g. 09123456789"
                maxLength="13"
                className={`border-[1px] px-6 py-3 rounded-[24px] w-[100%] bg-white ${
                  contactNoError === "" ? "" : "border-red-400"
                } focus:outline-none focus:border-[#007bff]`}
              />
              {contactNoError && (
                <p className="text-red-500 ml-2">{contactNoError}</p>
              )}
            </div>
          </div>

          <div className="w-100 pt-10 flex justify-end items-center">
            {userNameError === "" &&
            firstNameError === "" &&
            surNameError === "" &&
            emailError === "" &&
            passwordError === "" &&
            role !== "" ? (
              <button
                type="submit"
                className="py-3 px-3 bg-[#007bff] text-[white] text-[16px] flex gap-2 items-center rounded-[8px]"
              >
                <FaPlus />
                <div>Add User</div>
              </button>
            ) : (
              <button
                disabled
                type="submit"
                className="py-3 px-3 bg-blue-300 text-[white] text-[16px] flex gap-2 items-center rounded-[8px]"
              >
                <FaPlus />
                <div>Add User</div>
              </button>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateUserFormModal;
