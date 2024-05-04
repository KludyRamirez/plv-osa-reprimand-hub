import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { getActions } from "../../../../store/actions/AuthActions";
import { styled } from "@mui/material/styles";
import osaLogo from "../../../../images/login/osalogo.jpg";
import plvLogo from "../../../../images/login/PLVlogo.png";
import folder from "../../../../images/login/folder.png";
import flash from "../../../../images/login/flash.png";
import LoginInputs from "../loginComponents/LoginInputs";

import {
  BsAlexa,
  BsArrowLeft,
  BsArrowRight,
  BsFacebook,
  BsGithub,
  BsGlobe2,
  BsInstagram,
  BsLightningCharge,
  BsLink,
  BsLinkedin,
  BsMailbox,
  BsMailbox2,
  BsMailbox2Flag,
  BsMegaphoneFill,
  BsThunderbolt,
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

          <div className="flex flex-col h-[100%] items-center justify-center gap-4">
            <div className="w-[1px] h-[25%] bg-gray-200"></div>
            <div className="absolute w-[20px] h-[20px] bg-blue-100 rounded-[50%]"></div>
            <div className="w-[1px] h-[25%] bg-gray-200"></div>
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
            <div className="absolute top-[20px] right-[-300px] w-[100px] h-[100px] border-[1px] border-[#007bff] rounded-[50%] zIndex-2"></div>
            <div className="absolute top-[20px] right-[-200px] w-[40px] h-[40px] border-[1px] border-[#007bff] rounded-[50%] zIndex-2"></div>
            <div className="absolute top-[448px] right-[-200px] w-[120px] h-[120px] border-[1px] border-[#007bff] bg-white rounded-[50%] zIndex-3"></div>
            <div className="absolute top-[528px] right-[-84px] w-[60px] h-[60px] border-[1px] border-[#007bff] bg-white rounded-[50%] zIndex-3"></div>
            <img
              src={flash}
              alt=""
              className="absolute top-[260px] right-[-160px] w-[200px] h-[200px] zIndex-2 transform rotate-[30deg] scale-x-[-1]"
            />
          </div>
        </div>
        <div className="flex flex-col items-center zIndex-2">
          <div className="py-6 px-8 w-[96%] mt-20 left-0 bottom-0 flex justify-between items-center bg-[#007bff] relative rounded-tl-[32px] rounded-tr-[32px]">
            <div className="flex flex-col gap-2">
              <div className="flex justify-start items-center gap-2 w-[330px]">
                <div className="text-[16px] text-white">
                  Subscribe to our newsletter
                </div>
                <BsMailbox2Flag className="text-[20px] text-white" />
              </div>
              <div className="flex justify-center items-center gap-2 w-[330px]">
                <input
                  type="text"
                  placeholder="e.g. example@domain.com"
                  className={`py-2 px-3 bg-white rounded-[4px] w-[100%] bg-transparent focus:outline-none`}
                />
                <div className="flex justify-center items-center w-[48px] h-[40px] border-[1px] text-white border-white rounded-[4px] hover:bg-[white] hover:text-[#007bff] cursor-pointer">
                  <BsArrowRight className="text-[20px] " />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1">
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
              <div className="flex justify-start items-center gap-5">
                <BsFacebook className="text-[30px] text-white" />
                <BsTwitter className="text-[30px] text-white" />
                <BsInstagram className="text-[30px] text-white" />
                <BsGithub className="text-[30px] text-white" />
                <BsLinkedin className="text-[30px] text-white" />
              </div>
            </div>
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
