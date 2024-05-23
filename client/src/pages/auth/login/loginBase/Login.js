import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { getActions } from "../../../../store/actions/AuthActions";
import { styled } from "@mui/material/styles";
import osaLogo from "../../../../images/osalogo.jpg";
import plvLogo from "../../../../images/PLVlogo.png";
import crown from "../../../../images/crown.png";
import folder from "../../../../images/folder.png";
import LoginInputs from "../loginComponents/LoginInputs";

import { BsMegaphone } from "react-icons/bs";

import LoginFooter from "../loginComponents/LoginFooter";

const Login = ({ login, setLoading, toast }) => {
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
      setLoading(true);
      await login(userDetails, navigate);
      setUserName("");
      setPassword("");
      setLoading(false);
    } catch (error) {
      setUserName("");
      setPassword("");
      setLoading(false);
      console.error(
        "Either invalid credentials or something went wrong. Please try again."
      );
    }
  };

  const handleActiveChange = (option) => {
    setActiveSelect(option);
  };

  return (
    <div className="w-full h-screen bg-white">
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
        <div className="w-[100%] flex justify-center items-start gap-24">
          <div className="relative flex justify-center items-start">
            <div className="p-8 gap-8 w-[500px] flex flex-col self-center rounded-[8px]">
              {activeSelect === "Login" && (
                <>
                  <div className="w-100 flex justify-start items-center text-3xl font-semibold text-[#007bff] zIndex-3">
                    <span>Sign in</span>
                  </div>
                  <div className="zIndex-3">
                    <LoginInputs
                      userName={userName}
                      setUserName={setUserName}
                      password={password}
                      setPassword={setPassword}
                      handleLogin={handleLogin}
                    />
                  </div>
                </>
              )}
            </div>
            <div className="absolute flex justify-center items-center w-[800px] h-[800px] rounded-[50%] border-[2px] border-[#f9f9f9] top-[-220px] right-[140px] zIndex-1 transform rotate-[-15deg]">
              <div className="flex justify-center items-center w-[760px] h-[760px] rounded-[50%] border-[2px] border-[#f9f9f9] top-[-200px] left-[-400px] zIndex-1">
                <div className="flex justify-center items-center w-[720px] h-[720px] rounded-[50%] border-[2px] border-[#f9f9f9] top-[-200px] left-[-400px] zIndex-1">
                  <div className="flex justify-center items-center w-[680px] h-[680px] rounded-[50%] border-[2px] border-[#f9f9f9] top-[-200px] left-[-400px] zIndex-1">
                    <div className="flex justify-center items-center w-[640px] h-[640px] rounded-[50%] border-[2px] border-[#f9f9f9] top-[-200px] left-[-400px] zIndex-1">
                      <div className="flex justify-center items-center w-[600px] h-[600px] rounded-[50%] border-[2px] border-[#f9f9f9] top-[-200px] left-[-400px] zIndex-1">
                        <div className="flex justify-center items-center w-[560px] h-[560px] rounded-[50%] border-[2px] border-[#f9f9f9] top-[-200px] left-[-400px] zIndex-1">
                          <div className="flex justify-center items-center w-[520px] h-[520px] rounded-[50%] border-[2px] border-[#f9f9f9] top-[-200px] left-[-400px] zIndex-1">
                            <div className="flex justify-center items-center w-[480px] h-[480px] rounded-[50%] border-[2px] border-[#f9f9f9] top-[-200px] left-[-400px] zIndex-1">
                              <div className="flex justify-center items-center w-[440px] h-[440px] rounded-[50%] border-[2px] border-[#f9f9f9] top-[-200px] left-[-400px] zIndex-1">
                                <div className="flex justify-center items-center w-[400px] h-[400px] rounded-[50%] border-[2px] border-[#f9f9f9] top-[-200px] left-[-400px] zIndex-1"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-[0px] left-[-220px] w-[600px] h-[460px] zIndex-2"></div>
          </div>

          <div className="relative">
            <div className="h-[100%] flex flex-col p-4 z-2 mt-6 zIndex-2">
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
            <div className="absolute flex p-2 justify-end items-start top-[0px] right-[-110px] w-[300px] h-[100px] rounded-[4px] gap-2 ">
              <div className="p-2 w-[206px] h-[180px] bg-white border-[1px] border-blue-300 rounded-[12px] flex flex-col items-center gap-5 relative overflow-hidden">
                <svg
                  className="absolute top-0 left-0"
                  viewBox="0 0 500 500"
                  preserveAspectRatio="xMinYMin meet"
                >
                  <path
                    d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z"
                    style={{ stroke: "none", fill: "rgba(219, 234, 254, 1)" }}
                  ></path>
                </svg>
              </div>
            </div>

            <div className="absolute top-[200px] right-[-100px] w-[320px] h-[320px]">
              <div className="p-2 w-[206px] h-[180px] bg-white border-[1px] border-blue-300 rounded-[12px] flex flex-col items-center gap-5 relative overflow-hidden">
                <svg
                  className="absolute top-0 left-0"
                  viewBox="0 0 500 500"
                  preserveAspectRatio="xMinYMin meet"
                >
                  <path
                    d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z"
                    style={{ stroke: "none", fill: "rgba(219, 234, 254, 1)" }}
                  ></path>
                </svg>
              </div>
            </div>

            <div className="absolute top-[260px] right-[-320px] w-[320px] h-[320px] ">
              <div className="p-2 w-[206px] h-[180px] bg-white border-[1px] border-blue-300 rounded-[12px] flex flex-col items-center gap-5 relative overflow-hidden">
                <svg
                  className="absolute top-0 left-0"
                  viewBox="0 0 500 500"
                  preserveAspectRatio="xMinYMin meet"
                >
                  <path
                    d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z"
                    style={{ stroke: "none", fill: "rgba(219, 234, 254, 1)" }}
                  ></path>
                </svg>
              </div>
            </div>

            <div className="absolute top-[280px] right-[140px] w-[320px] h-[320px]">
              <div className="p-2 w-[206px] h-[180px] bg-white border-[1px] border-blue-300 rounded-[12px] relative overflow-hidden">
                <div className="absolute bottom-[-90px] left-[-90px] w-[200px] h-[200px] rounded-[50%] bg-blue-200 flex justify-center items-center">
                  <div className="w-[120px] h-[120px] rounded-[50%] bg-blue-100"></div>
                </div>
              </div>
            </div>

            <div className="absolute top-[280px] right-[-140px] w-[320px] h-[320px]">
              <div className="p-2 w-[206px] h-[180px] bg-white border-[1px] border-blue-300 rounded-[12px] relative overflow-hidden hover:bg-blue-200">
                <div className="absolute bottom-[-90px] right-[-90px] w-[200px] h-[200px] rounded-[50%] bg-blue-200 flex justify-center items-center">
                  <div className="w-[120px] h-[120px] rounded-[50%] bg-blue-100"></div>
                </div>
              </div>
            </div>

            <div className="absolute top-[60px] right-[-370px] w-[320px] h-[320px]">
              <div className="p-2 w-[206px] h-[180px] border-[1px] border-blue-300 rounded-[12px] relative overflow-hidden bg-blue-300">
                <div className="absolute bottom-[-90px] left-[-90px] w-[200px] h-[200px] rounded-[50%] bg-blue-200 flex justify-center items-center">
                  <div className="w-[120px] h-[120px] rounded-[50%] bg-blue-100"></div>
                </div>
              </div>
            </div>

            <div className="absolute top-[130px] right-[-100px] w-[170px] h-[170px]">
              <img src={crown} alt="" className="w-[100%] h-[100%]" />
            </div>
          </div>
        </div>
        <LoginFooter />
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
