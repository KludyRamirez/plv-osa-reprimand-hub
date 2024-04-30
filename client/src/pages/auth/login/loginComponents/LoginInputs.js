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
      <div className="flex flex-col gap-4">
        <div className="w-100 text-base font-large text-[#303030]">
          Username
        </div>
        <input
          autoFocus
          value={userName}
          onChange={handleUsernameChange}
          label="Username"
          type="text"
          placeholder="Enter username"
          className={`p-3  border-[1px] rounded-[6px] w-[100%] bg-white ${
            userNameError === "" ? "" : "border-[red]"
          } focus:outline-none focus:border-[#007bff]`}
        />
        {userNameError && <p className="text-red-500">{userNameError}</p>}
      </div>
      <div className="flex flex-col gap-4">
        <div className="w-100 text-base font-large text-[#303030]">
          Password
        </div>
        <input
          value={password}
          onChange={handlePasswordChange}
          label="Password"
          type="password"
          placeholder="Enter password"
          className={`p-3 border-[1px] rounded-[6px] w-[100%] bg-white ${
            passwordError === "" ? "" : "border-[red]"
          } focus:outline-none focus:border-[#007bff]`}
        />
        {passwordError && <p className="text-red-500">{passwordError}</p>}
      </div>
      <div className="w-100 mt-4 flex justify-between items-center">
        <div className="hover:underline">
          <Link to="/forgot-password" className="text-[#ff3131]">
            Oops! Forgot password?
          </Link>
        </div>
        <div>
          {userNameError === "" &&
          passwordError === "" &&
          userName !== "" &&
          password !== "" ? (
            <button
              type="button"
              onClick={handleLogin}
              className="py-2 px-4 bg-[#007bff] text-[white] text-[16px] flex gap-2 items-center rounded-[6px]"
            >
              Sign In
            </button>
          ) : (
            <button
              disabled
              className="py-2 px-4 bg-blue-400 text-[white] text-[16px] flex gap-2 items-center rounded-[6px]"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginInputs;
