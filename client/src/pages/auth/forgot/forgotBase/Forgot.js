import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ForgotForm from "../forgotComponents/ForgotForm";
import osaLogo from "../../../../images/osalogo.png";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import LoginFooter from "../../login/loginComponents/LoginFooter";

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
  const [countdown, setCountdown] = useState(10);
  const [loading, setLoading] = useState(false);

  const timerRef = useRef(null);
  const intervalRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleSubmitEmail = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URI}/forgot`,
        { email },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${auth?.userDetails?.token}`,
          },
        },
      );
      if (res?.status === 200) {
        setStatus("success");
        toast.success(res.data.message);

        intervalRef.current = setInterval(() => {
          setCountdown((prevCountdown) => {
            if (prevCountdown <= 1) {
              clearInterval(intervalRef.current);
              return 0;
            }
            return prevCountdown - 1;
          });
        }, 1000);

        timerRef.current = setTimeout(() => {
          navigate("/");
        }, 10000);
      }
    } catch (error) {
      if (error?.response?.status === 404) {
        setStatus("error");
        toast.error(error?.response?.data.message);
      } else {
        toast.error(
          error?.response?.data.message ||
            "Something went wrong. Please try again",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value.length < 3) {
      setEmailError("Email must be at least 3 characters long.");
    } else if (value.length > 48) {
      setEmailError("Email must be at most 48 characters long.");
    } else if (!emailRegex.test(value)) {
      setEmailError("Please enter a valid email address.");
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
    <div className="w-full h-screen bg-white">
      <div className="w-full fixed px-12 shadow-sm bg-white">
        <div className="h-[90px] flex justify-between items-center gap-10">
          <div className="flex justify-center items-center gap-10">
            <div className="flex items-center gap-8">
              <img
                src={osaLogo}
                alt=""
                className="w-[54px] h-[54px] rounded-[50%]"
              />
              <FormTitle
                sx={{
                  fontSize: "22px",
                  backgroundImage:
                    "radial-gradient(100% 100% at 100% 0, #006bff 0, #122c8e 100%)",
                }}
              >
                Office of Student Affairs
              </FormTitle>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-full flex flex-col justify-center items-center -mt-2">
        <ForgotForm
          email={email}
          status={status}
          handleSubmitEmail={handleSubmitEmail}
          FormTitle={FormTitle}
          handleGetEmail={handleGetEmail}
          emailError={emailError}
          countdown={countdown}
          loading={loading}
        />
      </div>
      <LoginFooter />
    </div>
  );
};

export default Forgot;
