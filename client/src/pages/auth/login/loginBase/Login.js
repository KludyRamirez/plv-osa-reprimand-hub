import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { getActions } from "../../../../store/actions/AuthActions";
import { styled } from "@mui/material/styles";
import osaLogo from "../../../../images/osalogo.png";
import LoginInputs from "../loginComponents/LoginInputs";
import LoginFooter from "../loginComponents/LoginFooter";

const Login = ({ login, setLoading }) => {
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
    }
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
      <div className="w-full h-full flex flex-col justify-center -mt-2">
        <div className="w-full flex justify-center items-start">
          <div className="relative flex justify-center items-start">
            <div className="p-8 gap-8 w-[500px] flex flex-col self-center rounded-[8px]">
              <div className="w-100 flex justify-start items-center text-3xl font-semibold text-[#006bff] z-30">
                <span>Sign in</span>
              </div>
              <div className="z-30">
                <LoginInputs
                  userName={userName}
                  setUserName={setUserName}
                  password={password}
                  setPassword={setPassword}
                  handleLogin={handleLogin}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <LoginFooter />
    </div>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(Login);
