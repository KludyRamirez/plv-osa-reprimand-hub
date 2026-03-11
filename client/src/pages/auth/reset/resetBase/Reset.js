import { useState, useEffect, useRef } from "react";
import axios from "axios";
import osaLogo from "../../../../images/osalogo.png";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import ResetForm from "../resetComponents/ResetForm";
import { useParams } from "react-router-dom";
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

const Reset = ({ auth, toast }) => {
  const [status, setStatus] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [countdown, setCountdown] = useState(10);
  const [loading, setLoading] = useState(false);

  const timerRef = useRef(null);
  const intervalRef = useRef(null);

  const navigate = useNavigate();
  const { id, token } = useParams();

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleSubmitPassword = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URI}/resetpassword/${id}/${token}`,
        { password },
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
      if (error?.response?.status === 400) {
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

  const validatePassword = (value) => {
    if (value.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
    } else if (value.length > 48) {
      setPasswordError("Password must be at most 48 characters long.");
    } else {
      setPasswordError("");
    }
  };

  const validateConfirmPassword = (newConfirm, newPassword) => {
    if (newPassword !== newConfirm) {
      setConfirmPasswordError("Password must be same.");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleGetPassword = (e) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
    if (confirmPassword !== "") {
      validateConfirmPassword(confirmPassword, value);
    }
  };

  const handleGetConfirmPassword = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    validateConfirmPassword(value, password);
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
        <ResetForm
          password={password}
          confirmPassword={confirmPassword}
          status={status}
          handleSubmitPassword={handleSubmitPassword}
          FormTitle={FormTitle}
          handleGetPassword={handleGetPassword}
          handleGetConfirmPassword={handleGetConfirmPassword}
          passwordError={passwordError}
          confirmPasswordError={confirmPasswordError}
          countdown={countdown}
          loading={loading}
        />
      </div>
      <LoginFooter />
    </div>
  );
};

export default Reset;
