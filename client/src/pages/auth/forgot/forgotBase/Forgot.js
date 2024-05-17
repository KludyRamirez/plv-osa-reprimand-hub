import React, { useState } from "react";
import axios from "axios";
import ForgotForm from "../forgotComponents/ForgotForm";
import plvLogo from "../../../../images/PLVlogo.png";
import { BsMegaphone } from "react-icons/bs";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

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

const Forgot = ({ auth, toast }) => {
  const [status, setStatus] = useState(null);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [countdown, setCountdown] = useState(4);

  const navigate = useNavigate();

  const handleSubmitEmail = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URI}/forgot`,
        { email },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${auth?.userDetails?.token}`,
          },
        }
      );
      if (res?.status === 200) {
        setStatus("success");
        toast.success(res.data.message);

        let timer;
        let countdownInterval;

        countdownInterval = setInterval(() => {
          setCountdown((prevCountdown) => {
            if (prevCountdown <= 1) {
              clearInterval(countdownInterval);
              return 0;
            }
            return prevCountdown - 1;
          });
        }, 1000);

        timer = setTimeout(() => {
          navigate("/login");
        }, 4000);
      }
    } catch (error) {
      if (error?.response?.status === 404) {
        setStatus("error");
        toast.error(error?.response?.data.message);
      } else {
        toast.error(
          error?.response?.data.message ||
            "Something went wrong. Please try again"
        );
      }
    }
  };

  const validateEmail = (value) => {
    if (value.length < 3) {
      setEmailError("Email must be at least 3 characters long.");
    } else if (value.length > 48) {
      setEmailError("Email must be at most 48 characters long.");
    } else {
      setEmailError("");
    }
  };

  const handleGetEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  return (
    <div className="w-full h-screen flex justify-center bg-white">
      <div className="w-full flex flex-col items-center gap-[100px]">
        <div className="w-[100%] px-6 shadow-sm bg-white zIndex-2">
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
              <Link to="/login">
                <div className="flex items-center gap-2 hover:border-[1px] text-base text-[#077bff] cursor-pointer bg-white border-[1px] border-[#077bff] px-3 py-2 rounded-[6px] hover:bg-[#007bff] hover:text-white">
                  Sign in
                </div>
              </Link>
              <Link to="/login">
                <div className="flex items-center gap-2 hover:border-[1px] text-base text-[#077bff] cursor-pointer bg-white border-[1px] border-[#077bff] px-3 py-2 rounded-[6px] hover:bg-[#007bff] hover:text-white">
                  <span>Announcements</span>
                  <BsMegaphone />
                </div>
              </Link>
            </div>
          </div>
        </div>
        <ForgotForm
          email={email}
          status={status}
          handleSubmitEmail={handleSubmitEmail}
          FormTitle={FormTitle}
          handleGetEmail={handleGetEmail}
          emailError={emailError}
          countdown={countdown}
        />
      </div>
    </div>
  );
};

export default Forgot;
