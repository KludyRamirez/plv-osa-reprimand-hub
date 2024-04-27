import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const LoginInputs = ({ username, setUsername, password, setPassword }) => {
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateUsername = (value) => {
    if (value.length < 3) {
      setUsernameError("Username must be at least 3 characters long.");
    } else if (value.length > 24) {
      setUsernameError("Username must be at most 24 characters long.");
    } else {
      setUsernameError("");
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
    setUsername(value);
    validateUsername(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
    validatePassword(value);
  };

  return (
    <form className="flex flex-col gap-8 w-full zIndex-2">
      <div className="flex flex-col gap-4">
        <div className="w-100 text-base font-large text-[#303030]">
          Username
        </div>
        <input
          value={username}
          onChange={handleUsernameChange}
          label="Username"
          type="text"
          placeholder="Enter username"
          className={`p-3  border-[1px] rounded-[6px] w-[100%] bg-white ${
            usernameError === "" ? "" : "border-[red]"
          } focus:outline-none focus:border-[#007bff]`}
        />
        {usernameError && <p className="text-red-500">{usernameError}</p>}
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
          <Link to="/forgot-password" className="text-[#303030]">
            Oops! Forgot password?
          </Link>
        </div>
        <div>
          {usernameError === "" &&
          passwordError === "" &&
          username !== "" &&
          password !== "" ? (
            <button
              type="submit"
              className="py-2 px-4 bg-[#007bff] text-[white] text-[16px] flex gap-2 items-center rounded-[6px]"
            >
              <div>Sign In</div>
            </button>
          ) : (
            <button
              disabled
              className="py-2 px-4 bg-blue-400 text-[white] text-[16px] flex gap-2 items-center rounded-[6px]"
            >
              <div>Sign In</div>
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default LoginInputs;
