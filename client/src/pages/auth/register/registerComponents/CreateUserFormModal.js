import React from "react";
import { BsCaretDown, BsX } from "react-icons/bs";
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
    statusOfUsers,
    statusOfUser,
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
        <div className="p-8">
          <div className="text-[28px] text-[#077bff] font-semibold flex justify-between">
            Create New User
            <BsX onClick={handleCloseModal} className="text-[36px]" />
          </div>
          <div className="text-[#606060] pt-8 flex gap-2">
            <div className="flex flex-col gap-2 w-[100%]">
              <div>Username</div>
              <input
                required
                name="userName"
                value={userName}
                onChange={handleChange}
                type="text"
                maxLength="24"
                autoComplete="off"
                placeholder="e.g. kluds19"
                className={`border-[1px] p-3 rounded-[6px] w-[100%] bg-[#f5f5f5] ${
                  userNameError === "" ? "" : "border-[red]"
                } focus:outline-none`}
              />
              {userNameError && <p className="text-red-500">{userNameError}</p>}
            </div>
          </div>

          <div className="text-[#606060] pt-6 flex gap-2">
            <div className="flex flex-col gap-2 w-[100%]">
              <div className="">First Name</div>
              <input
                required
                name="firstName"
                value={firstName}
                onChange={handleChange}
                type="text"
                autoComplete="off"
                placeholder="e.g. Kludy"
                className={`border-[1px] p-3 rounded-[6px] w-[100%] bg-[#f5f5f5] ${
                  firstNameError === "" ? "" : "border-[red]"
                } focus:outline-none`}
              />
              {firstNameError && (
                <p className="text-red-500">{firstNameError}</p>
              )}
            </div>

            <div className="flex flex-col gap-2 w-[100%]">
              <div className="">Surname</div>
              <input
                required
                name="surName"
                value={surName}
                onChange={handleChange}
                type="text"
                autoComplete="off"
                placeholder="e.g. Ramirez"
                className={`border-[1px] p-3 rounded-[6px] w-[100%] bg-[#f5f5f5] ${
                  surNameError === "" ? "" : "border-[red]"
                } focus:outline-none`}
              />
              {surNameError && <p className="text-red-500">{surNameError}</p>}
            </div>
          </div>

          <div className="text-[#606060] pt-6 flex gap-2">
            <div className="flex flex-col gap-2 w-[50%]">
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
                className={`border-[1px] p-3 rounded-[6px] w-[100%] bg-[#f5f5f5] ${
                  emailError === "" ? "" : "border-[red]"
                } focus:outline-none`}
              />
              {emailError && <p className="text-red-500 pt-2">{emailError}</p>}
            </div>

            <div className="flex flex-col gap-2 w-[50%]">
              <div className="">Password</div>
              <input
                required
                name="password"
                value={password}
                onChange={handleChange}
                type="password"
                maxLength="32"
                autoComplete="off"
                placeholder="Enter password"
                className={`border-[1px] p-3 rounded-[6px] w-[100%] bg-[#f5f5f5] ${
                  passwordError === "" ? "" : "border-[red]"
                } focus:outline-none`}
              />
              {passwordError && <p className="text-red-500">{passwordError}</p>}
            </div>
          </div>

          <div className="text-[#606060] pt-6 flex gap-2">
            <div className="flex flex-col gap-2 w-[50%]">
              <div className="flex gap-2 items-center">
                <span>Role</span>
                <BsCaretDown />
              </div>
              <select
                name="role"
                value={role}
                onChange={handleChange}
                className="appearance-none p-3 rounded-[6px] bg-[#f5f5f5] focus:outline-none border-[1px] focus:border-[#bbbbbb]"
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
              <div className="flex gap-2 items-center">
                <span>Status</span>
                <BsCaretDown />
              </div>
              <select
                name="statusOfUser"
                value={statusOfUser}
                onChange={handleChange}
                className="appearance-none p-3 rounded-[6px] bg-[#f5f5f5] focus:outline-none border-[1px] focus:border-[#bbbbbb]"
              >
                <option key="" value="">
                  Select Status
                </option>
                {statusOfUsers.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="text-[#606060] pt-6 flex gap-2">
            <div className="flex flex-col gap-2 w-[100%]">
              <div>Contact No.</div>
              <input
                required
                name="contactNo"
                value={contactNo?.replace(/[^0-9+]/g, "")}
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
                <p className="text-red-500">{contactNoError}</p>
              )}
            </div>
          </div>

          <div className="w-100 pt-10 flex justify-end items-center">
            {userNameError === "" &&
            firstNameError === "" &&
            surNameError === "" &&
            emailError === "" &&
            passwordError === "" &&
            role !== "" &&
            statusOfUser !== "" ? (
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
