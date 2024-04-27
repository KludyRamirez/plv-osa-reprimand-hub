import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { getActions } from "../../../../store/actions/AuthActions";
import { styled } from "@mui/material/styles";
import osaLogo from "../../../../images/login/osalogo.jpg";
import plvLogo from "../../../../images/login/PLVlogo.png";
import folder from "../../../../images/login/folder.png";
import mail from "../../../../images/login/mail.png";
import LoginInputs from "../loginComponents/LoginInputs";

import {
  BsArrowLeft,
  BsArrowRight,
  BsLink,
  BsMegaphoneFill,
} from "react-icons/bs";

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
    fontSize: "120px",
    fontWeight: "600",
    lineHeight: "134px",
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
        <div className="px-6 shadow-sm bg-white zIndex-2">
          <div className="h-[90px] flex justify-between items-center gap-10">
            <div className="flex justify-center items-center gap-10">
              <div className="flex items-center gap-6">
                <img src={plvLogo} alt="" className="w-[60px] h-[60px]" />
                <FormTitle
                  sx={{
                    fontSize: "22px",
                    backgroundImage:
                      "radial-gradient(100% 100% at 100% 0, #077bff 0, #122c8e 100%)",
                  }}
                >
                  Office of Student Affairs
                </FormTitle>
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
        <div className="w-100 flex justify-center items-center gap-12 ">
          <div className="relative">
            <div className="p-8 gap-8 w-[500px] flex flex-col self-center rounded-[8px]">
              {activeSelect === "Login" && (
                <>
                  <div className="w-100 flex justify-between items-center text-3xl font-semibold text-[#007bff] zIndex-2">
                    <span>Sign in</span>
                    <div className="flex justify-center items-center gap-2">
                      <img
                        src={osaLogo}
                        alt=""
                        className="w-[50px] h-[50px] rounded-[25px]"
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
            <div className="absolute flex justify-center items-center w-[800px] h-[800px] rounded-[50%] border-[1px] border-[#dedede] top-[-200px] left-[-400px] zIndex-1">
              <div className="w-[100px] h-[100px] bg-blue-100 rounded-[50%] relative">
                <div className="absolute w-[50px] h-[50px] rounded-[50%] bg-[white] zIndex-3"></div>
                <div className="absolute w-[20px] h-[20px] rounded-[50%] bg-[#ff3131] top-[-254px] left-[310px]"></div>
                <div className="absolute w-[20px] h-[20px] rounded-[50%] bg-[#007bff] top-[352px] left-[-210px]"></div>
              </div>
            </div>
          </div>

          <div className="flex flex-col h-[100%] items-center justify-center gap-4">
            <div className="w-[1px] h-[25%] bg-gray-200"></div>
            <BsLink className="text-[#077bff] text-[24px]" />
            <div className="w-[1px] h-[25%] bg-gray-200"></div>
          </div>
          <div className="relative">
            <div className="h-[100%] flex flex-col p-4 rounded-[8px] z-2">
              <FormTitle
                sx={{
                  backgroundImage:
                    "radial-gradient(100% 100% at 100% 0, #07bbff 0, #007bff 100%)",
                }}
              >
                Serving
              </FormTitle>
              <FormTitle sx={{ marginTop: "-16px" }}>You</FormTitle>
              <FormTitle
                sx={{
                  marginTop: "-16px",
                  backgroundImage:
                    "radial-gradient(100% 100% at 100% 0, #07bbff 0, #007bff 100%)",
                }}
              >
                Digitally.
              </FormTitle>
            </div>
            <div className="absolute flex p-2 justify-end items-start top-[0px] right-[-100px] w-[300px] h-[100px] z-1 rounded-[4px] gap-2 ">
              <div className="mt-[-30px] w-[60px] h-[60px] flex justify-center items-center bg-white rounded-[50%] border-[1px] border-[#007bff] text-[#007bff] cursor-pointer hover:bg-[#007bff] hover:text-white">
                <BsArrowLeft className="text-[24px] " />
              </div>
              <div className="mt-[-30px] w-[60px] h-[60px] flex justify-center items-center bg-white rounded-[50%] border-[1px] border-[#007bff] text-[#007bff] cursor-pointer hover:bg-[#007bff] hover:text-white">
                <BsArrowRight className="text-[24px]" />
              </div>
            </div>
            <img
              src={folder}
              alt=""
              className="absolute top-[80px] right-[-150px] w-[200px] h-[200px] zIndex-2"
            />
            <div className="absolute top-[150px] right-[100px] w-[150px] h-[150px] bg-[white] border-[1px] border-[yellow] rounded-[50%]"></div>
            <div className="absolute top-[250px] right-[200px] w-[20px] h-[20px] bg-blue-100 rounded-[50%]"></div>
            <div className="absolute bottom-[-100px] right-[-110px] w-[320px] h-[320px] bg-blue-100 rounded-[50%]"></div>
            <div className="absolute bottom-[-60px] right-[-70px] w-[150px] h-[150px] bg-[yellow]  rounded-[50%]"></div>
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
