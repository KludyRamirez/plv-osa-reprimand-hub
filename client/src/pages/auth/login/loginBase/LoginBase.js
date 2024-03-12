import React, { useState } from "react";
import plvLogo from "../../../../images/login/PLVlogo.png";

const LoginBase = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add login logic here
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg flex">
          <div className="w-full">
            <h2 className="text-3xl font-bold mb-4 text-center text-blue-600">
              PLV OSA
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="username"
                  className="block text-gray-700 font-semibold"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="form-input mt-2 w-full px-4 py-3 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-semibold"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-input mt-2 w-full px-4 py-3 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white w-full py-3 rounded-md hover:bg-blue-700 transition-colors font-semibold"
              >
                Log In
              </button>
              <div className="text-center text-gray-700"></div>
            </form>
          </div>
          <div className="w-full">
            <img
              src={plvLogo}
              alt="Office of Student Affairs"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginBase;
