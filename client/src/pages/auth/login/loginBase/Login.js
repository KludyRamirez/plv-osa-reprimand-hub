import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { getActions } from "../../../../store/actions/AuthActions";
import { styled } from "@mui/material/styles";
import osaLogo from "../../../../images/osalogo.jpg";
import plvLogo from "../../../../images/PLVlogo.png";
import flash from "../../../../images/flash.png";
import LoginInputs from "../loginComponents/LoginInputs";

import {
  BsAlexa,
  BsArrowLeft,
  BsArrowRight,
  BsFacebook,
  BsGithub,
  BsGlobe2,
  BsInstagram,
  BsLinkedin,
  BsMegaphone,
  BsMegaphoneFill,
  BsTwitter,
} from "react-icons/bs";

import { FaRegCopyright } from "react-icons/fa6";

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

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [activeSelect, setActiveSelect] = useState("Login");

  const navigate = useNavigate();

  const handleLogin = async () => {
    const userDetails = {
      userName,
      password,
    };

    try {
      await login(userDetails, navigate);
    } catch (error) {
      console.error("Error while registering user:", error);
    }
  };

  const handleActiveChange = (option) => {
    setActiveSelect(option);
  };

  return (
    <div className="w-full h-screen flex justify-center bg-white">
      <div className="w-full flex flex-col gap-[80px]">
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
                className="flex items-center gap-2 text-base text-[#077bff] cursor-pointer bg-white border-[1px] border-[#077bff] px-3 py-2 rounded-[6px] hover:bg-[#007bff] hover:text-white hover:border-[1px]"
                onClick={() => handleActiveChange("Login")}
              >
                Sign in
              </div>
              <div
                className="flex items-center gap-2 text-base text-[#077bff] cursor-pointer bg-white border-[1px] border-[#077bff] px-3 py-2 rounded-[6px] hover:bg-[#007bff] hover:text-white hover:border-[1px]"
                onClick={() => handleActiveChange("Login")}
              >
                <span>Announcements</span>
                <BsMegaphone />
              </div>
            </div>
          </div>
        </div>
        <div className="w-100 flex justify-center items-center gap-24">
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
                    userName={userName}
                    setUserName={setUserName}
                    password={password}
                    setPassword={setPassword}
                    handleLogin={handleLogin}
                  />
                </>
              )}
            </div>
            <div className="absolute flex justify-center items-center w-[800px] h-[800px] rounded-[50%] border-[1px] top-[-200px] left-[-400px] zIndex-1">
              <div className="w-[100px] h-[100px] bg-blue-100 rounded-[50%] relative">
                <div className="absolute w-[50px] h-[50px] rounded-[50%] bg-[white] zIndex-3"></div>
                <div className="absolute w-[20px] h-[20px] rounded-[50%] bg-[#ff3131] top-[-254px] left-[310px]"></div>
                <div className="absolute w-[20px] h-[20px] rounded-[50%] bg-[#007bff] top-[352px] left-[-210px]"></div>
                <div className="absolute w-[240px] h-[240px] rounded-[50%] top-[170px] right-[0px] bg-[white] border-[1px] border-[yellow] zIndex-1"></div>
                <div className="absolute w-[50px] h-[50px] rounded-[50%] top-[170px] right-[0px] bg-[white] border-[1px] border-[yellow] zIndex-1"></div>
                <div className="absolute w-[100px] h-[100px] rounded-[50%] top-[270px] right-[300px] bg-[white] border-[1px] border-[yellow] zIndex-1"></div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="h-[100%] flex flex-col p-4 rounded-[8px] z-2">
              <FormTitle
                sx={{
                  backgroundImage:
                    "radial-gradient(100% 100% at 100% 0, #07bbff 0, #007bff 100%)",
                  textShadow: "0px 0px 4px rgba(0, 123, 255, 0.4)",
                }}
              >
                Serving
              </FormTitle>
              <FormTitle
                sx={{
                  marginTop: "-20px",
                  textShadow: "0px 0px 4px rgba(0, 123, 255, 0.4)",
                }}
              >
                You
              </FormTitle>
              <FormTitle
                sx={{
                  marginTop: "-15px",
                  backgroundImage:
                    "radial-gradient(100% 100% at 100% 0, #07bbff 0, #007bff 100%)",
                  textShadow: "0px 0px 4px rgba(0, 123, 255, 0.4)",
                }}
              >
                Digitally.
              </FormTitle>
            </div>
            <div className="absolute flex p-2 justify-end items-start top-[0px] right-[-100px] w-[300px] h-[100px] zIndex-2 rounded-[4px] gap-2 ">
              <div className="mt-[-40px] w-[60px] h-[60px] flex justify-center items-center bg-white rounded-[50%] border-[1px] border-[#007bff] text-[#007bff] cursor-pointer hover:bg-[#007bff] hover:text-white">
                <BsArrowLeft className="text-[24px] " />
              </div>
              <div className="mt-[-40px] w-[60px] h-[60px] flex justify-center items-center bg-white rounded-[50%] border-[1px] border-[#007bff] text-[#007bff] cursor-pointer hover:bg-[#007bff] hover:text-white">
                <BsArrowRight className="text-[24px]" />
              </div>
            </div>

            <div className="absolute top-[160px] right-[100px] w-[100px] h-[100px] bg-[white] border-[1px] border-[#07bbff] rounded-[50%] "></div>
            <div className="absolute top-[240px] right-[198px] w-[20px] h-[20px] bg-blue-100 rounded-[50%]"></div>
            <div className="absolute bottom-[-100px] right-[-110px] w-[320px] h-[320px] border-[1px] border-[#07bbff] rounded-[50%]"></div>
            <div className="absolute bottom-[-60px] right-[-70px] w-[150px] h-[150px] bg-white rounded-[50%]"></div>

            <img
              src={flash}
              alt=""
              className="absolute top-[260px] right-[-160px] w-[200px] h-[200px] zIndex-2 transform rotate-[30deg] scale-x-[-1]"
            />
          </div>
        </div>
        <div className="flex flex-col items-center zIndex-2">
          <div className="py-6 px-8 w-[96%] mt-20 left-0 bottom-0 flex justify-between items-center bg-[#007bff] relative rounded-tl-[32px] rounded-tr-[32px]">
            <div className="flex flex-col gap-3">
              <div className="flex justify-start items-center gap-2">
                <div className="text-[16px] font-bold text-white">PLV</div>
                <BsAlexa className="text-[18px] text-white" />
              </div>

              <div className="flex justify-start items-center text-[16px] text-white gap-2">
                <FaRegCopyright />
                <span>Copyright 2024 Office of Student Affairs</span>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex justify-end items-center gap-2">
                <div className="text-[16px] text-white">Follow our socials</div>
                <BsGlobe2 className="text-[18px] text-white" />
              </div>
              <div className="flex justify-start items-center gap-4">
                <BsFacebook className="text-[24px] text-white" />
                <BsTwitter className="text-[24px] text-white" />
                <BsInstagram className="text-[24px] text-white" />
                <BsGithub className="text-[24px] text-white" />
                <BsLinkedin className="text-[24px] text-white" />
              </div>
            </div>
          </div>
          <div className="h-[74px] w-[96%] border-l-[1px] border-r-[1px]"></div>
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
