import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginInputs = ({
  userName,
  setUserName,
  password,
  setPassword,
  handleLogin,
}) => {
  const [userNameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateUsername = (value) => {
    if (value.length < 3) {
      setUserNameError("Username must be at least 3 characters long.");
    } else if (value.length > 24) {
      setUserNameError("Username must be at most 24 characters long.");
    } else {
      setUserNameError("");
    }
  };

  const validatePassword = (value) => {
    if (value.length < 3) {
      setPasswordError("Password must be at least 3 characters long.");
    } else if (value.length > 24) {
      setPasswordError("Password must be at most 24 characters long.");
    } else {
      setPasswordError("");
    }
  };

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUserName(value);
    validateUsername(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
    validatePassword(value);
  };

  return (
    <div className="flex flex-col gap-8 w-full zIndex-2">
      <div className="flex flex-col gap-2">
        <div className="w-100 text-base text-[#606060]">Username</div>
        <input
          autoFocus
          value={userName}
          onChange={handleUsernameChange}
          label="Username"
          type="text"
          placeholder="Enter username"
          className={`py-3 px-6  border-[1px] rounded-[24px] w-[100%] bg-white ${
            userNameError === "" ? "" : "border-[red]"
          } focus:outline-none  focus:border-[#007bff]`}
        />
        {userNameError && <p className="text-red-500 mt-1">{userNameError}</p>}
      </div>
      <div className="flex flex-col gap-2">
        <div className="w-100 text-base text-[#606060]">Password</div>
        <input
          value={password}
          onChange={handlePasswordChange}
          label="Password"
          type="password"
          placeholder="Enter password"
          className={`py-3 px-6 border-[1px] rounded-[24px] w-[100%] bg-white ${
            passwordError === "" ? "" : "border-[red]"
          } focus:outline-none  focus:border-[#007bff]`}
        />
        {passwordError && <p className="text-red-500 mt-1">{passwordError}</p>}
      </div>
      <div className="mt-[-10px] w-100 flex justify-end items-center ">
        <Link to="/forgot" className="text-[#ff3131] hover:underline">
          Forgot password?
        </Link>
      </div>
      <div className="mt-[-10px]">
        {userNameError === "" &&
        passwordError === "" &&
        userName !== "" &&
        password !== "" ? (
          <button
            type="button"
            onClick={handleLogin}
            className="p-3 border-[1px] border-[#007bff] rounded-[48px] w-[100%] bg-[#007bff] text-white"
          >
            Sign In
          </button>
        ) : (
          <button
            disabled
            className="p-3 border-[1px] border-blue-300 rounded-[48px] w-[100%] bg-white text-blue-300"
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default LoginInputs;
