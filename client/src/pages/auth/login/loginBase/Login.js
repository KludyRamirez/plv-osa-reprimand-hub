import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { getActions } from "../../../../store/actions/AuthActions";
import { styled } from "@mui/material/styles";
import osaLogo from "../../../../images/login/osalogo.jpg";
import plvLogo from "../../../../images/login/PLVlogo.png";
import LoginInputs from "../loginComponents/LoginInputs";

import { BsLink, BsMegaphoneFill } from "react-icons/bs";

const Login = ({ login }) => {
  const FormTitle = styled("div")({
    backgroundImage:
      "radial-gradient(100% 100% at 100% 0, #122c8e 0, #07bbff 100%)",
    backgroundSize: "100%",
    backgroundRepeat: "repeat",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    MozBackgroundClip: "text",
    MozTextFillColor: "transparent",
    textShadow: "none",
    fontSize: "120px",
    fontWeight: "600",
    lineHeight: "110px",
    zIndex: "2",
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [activeSelect, setActiveSelect] = useState("Login");

  const navigate = useNavigate();

  const handleLogin = () => {
    const userDetails = {
      password,
      username,
    };
    login(userDetails, navigate);
  };

  const handleActiveChange = (option) => {
    setActiveSelect(option);
  };

  return (
    <div className="w-full h-screen flex justify-center bg-white">
      <div className="w-full flex flex-col gap-40">
        <div className="px-8 shadow-sm bg-white">
          <div className="h-[86px] flex justify-between items-center gap-10">
            <div className="flex justify-center items-center gap-10">
              <div className="flex items-center gap-4">
                <span className="font-semibold text-xl text-[#007bff]">
                  Office of Student Affairs
                </span>
              </div>
            </div>
            <div className="flex justify-center items-center gap-3">
              <div
                className="text-base cursor-pointer bg-[#077bff] text-white px-3 py-2 rounded-[6px] hover:bg-white hover:border-[1px] hover:border-[#007bff] hover:text-[#007bff]"
                onClick={() => handleActiveChange("Login")}
              >
                Sign in
              </div>
              <div
                className="flex items-center gap-2 text-base text-[#077bff] cursor-pointer bg-white border-[1px] border-[#077bff] px-3 py-2 rounded-[6px] hover:bg-[#007bff] hover:border-[0px] hover:text-white"
                onClick={() => handleActiveChange("Login")}
              >
                <span>Announcements</span>
                <BsMegaphoneFill />
              </div>
            </div>
          </div>
        </div>
        <div className="w-100 flex justify-center items-center gap-12">
          <div className="p-8 gap-8 w-[500px] flex flex-col self-center rounded-[8px]">
            {activeSelect === "Login" && (
              <>
                <div className="w-100 flex justify-between items-center text-3xl font-semibold text-[#007bff]">
                  <span>Sign in</span>
                  <div className="flex justify-center items-center gap-2">
                    <img
                      src={plvLogo}
                      alt=""
                      className="w-[50px] h-[50px] rounded-[30px]"
                    />
                    <img
                      src={osaLogo}
                      alt=""
                      className="w-[50px] h-[50px] rounded-[30px]"
                    />
                  </div>
                </div>
                <LoginInputs
                  username={username}
                  setUsername={setUsername}
                  password={password}
                  setPassword={setPassword}
                  handleLogin={handleLogin}
                />
              </>
            )}
          </div>
          <div className="flex flex-col h-[100%] items-center justify-center gap-2">
            <div className="w-[1px] h-[25%] bg-gray-200"></div>
            <BsLink className="text-[#077bff] text-[24px]" />
            <div className="w-[1px] h-[25%] bg-gray-200"></div>
          </div>
          <div className="relative">
            <div className="h-[100%] flex flex-col  p-4 rounded-[8px] z-2">
              <FormTitle
                sx={{
                  backgroundImage:
                    "radial-gradient(100% 100% at 100% 0, #07bbff 0, #007bff 100%)",
                }}
              >
                Serving
              </FormTitle>
              <FormTitle>You</FormTitle>
              <FormTitle
                sx={{
                  backgroundImage:
                    "radial-gradient(100% 100% at 100% 0, #07bbff 0, #007bff 100%)",
                }}
              >
                Diligently.
              </FormTitle>
            </div>
            <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-blue-100 z-1 rounded-[150px]"></div>
            <div className="absolute bottom-[-60px] right-[-60px] w-[150px] h-[150px] bg-[yellow] z-1 rounded-[150px]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(Login);
