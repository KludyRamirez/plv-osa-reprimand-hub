import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { getActions } from "../../../../store/actions/AuthActions";
import { styled } from "@mui/material/styles";
import osaLogo from "../../../../images/login/osalogo.jpg";
import plvLogo from "../../../../images/login/PLVlogo.png";
import LoginInputs from "../loginComponents/LoginInputs";
import { HiOutlineUserGroup } from "react-icons/hi2";

import {
  BsCheckCircle,
  BsCheckCircleFill,
  BsMegaphoneFill,
} from "react-icons/bs";

const Login = ({ login }) => {
  const FormTitle = styled("div")({
    fontWeight: "500",
    backgroundImage:
      "radial-gradient(100% 100% at 100% 0, #007bff 0, #122c8e 100%)",
    backgroundSize: "100%",
    backgroundRepeat: "repeat",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    MozBackgroundClip: "text",
    MozTextFillColor: "transparent",
    textShadow: "none",
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
          <div
            className="p-8 gap-8 w-[500px] flex flex-col self-center rounded-[8px] shadow-sm"
            style={{
              background:
                "radial-gradient(at bottom left, rgba(255, 255, 255, 0.15) 6%, rgba(7, 187, 255, 0.20) 47.6%, rgba(204, 251, 241, 0.15) 87.8%)",
            }}
          >
            {activeSelect === "Login" && (
              <>
                <div className="w-100 flex justify-between items-center text-3xl font-semibold text-[#303030]">
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
            <div className="w-[1px] h-[30%] bg-[#07bbff]"></div>
            <BsCheckCircleFill className="text-[#07bbff]" />
            <div className="w-[1px] h-[30%] bg-[#07bbff]"></div>
          </div>
          <div className="h-[100%] flex flex-col ">
            <span className="text-[100px] text-[#007bff] font-bold">
              Serving
            </span>
            <span className="text-[100px] text-[#007bff] font-bold">You</span>
            <span className="text-[100px] text-[#007bff] font-bold">
              Diligently.
            </span>
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
