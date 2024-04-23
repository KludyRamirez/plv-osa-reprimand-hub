import React, { useState, useEffect } from "react";

const LoginInputs = ({ username, setUsername, password, setPassword }) => {
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    validateUsername(username);
  }, [username]);

  useEffect(() => {
    validatePassword(password);
  }, [password]);

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
    <div className="flex flex-col gap-24 w-full">
      <div className="flex flex-col gap-8">
        <div className="w-200 h-20 text-base font-medium text-blue-600">
          Username
        </div>
        <input
          value={username}
          onChange={handleUsernameChange}
          label="Username"
          type="text"
          placeholder="Enter username"
        />
        {usernameError && <p className="text-red-500 pt-2">{usernameError}</p>}
      </div>
      <div className="flex flex-col gap-8">
        <div className="w-200 h-20 text-base font-medium text-blue-600">
          Password
        </div>
        <input
          value={password}
          onChange={handlePasswordChange}
          label="Password"
          type="password"
          placeholder="Enter password"
        />
        {passwordError && <p className="text-red-500 pt-2">{passwordError}</p>}
      </div>
    </div>
  );
};

export default LoginInputs;
