import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import LoginPageInputs from "./LoginPageInputs";
// import LoginPageFooter from "./LoginPageFooter";
// import { validateLoginForm } from "../../shared/utils/validators";
import { connect } from "react-redux";
import { getActions } from "../../../../store/actions/AuthActions";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import LoginInputs from "../loginComponents/LoginInputs";

const Wrapper = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  background:
    "radial-gradient(at bottom left, rgba(255, 255, 255, 0.15) 6%, rgba(7, 187, 255, 0.20) 47.6%, rgba(204, 251, 241, 0.15) 87.8%)",
});

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

const Login = ({ login }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [activeSelect, setActiveSelect] = useState("Login");

  // const history = useHistory();

  const handleLogin = () => {
    const userDetails = {
      password,
      username,
    };
    login(userDetails);
  };

  const handleActiveChange = (option) => {
    setActiveSelect(option);
  };

  return (
    <Wrapper>
      <div style={{ width: "100%" }}>
        <div
          style={{
            padding: "0 40px",
            boxShadow:
              "rgba(0, 123, 255, 0.1) 0px 1px 1px 0px, rgba(0, 123, 255, 0.06) 0px 1px 1px 0px",
            backgroundColor: "white",
          }}
        >
          <div
            style={{
              height: "80px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "40px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "40px",
              }}
            >
              <div style={{ display: "flex" }}>
                <FormTitle>
                  <span
                    style={{
                      fontWeight: "700",
                      fontSize: "32px",
                      letterSpacing: "0.6px",
                    }}
                  >
                    MlAC
                  </span>
                </FormTitle>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "32px",
                }}
              >
                <div
                  style={{
                    fontSize: "18px",
                    cursor: "pointer",
                    color: "#0d1117",
                  }}
                  onClick={() => handleActiveChange("Campaigns")}
                >
                  Campaigns
                </div>
                <div
                  style={{
                    fontSize: "18px",
                    cursor: "pointer",
                    color: "orange",
                    fontWeight: "500",
                  }}
                  onClick={() => handleActiveChange("Waitlist")}
                >
                  Waitlist
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div
                style={{
                  fontSize: "18px",
                  cursor: "pointer",
                  color: "#122c8e",
                }}
                onClick={() => handleActiveChange("Login")}
              >
                Sign in
              </div>
              <BsPersonCircle style={{ fontSize: "32px", color: "" }} />
            </div>
          </div>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          {activeSelect === "Login" && (
            <>
              <div
                style={{
                  width: "400px",
                  display: "flex",
                  flexDirection: "column",
                  paddingTop: "160px",
                  gap: "28px",
                }}
              >
                <div style={{ fontSize: "42px", fontWeight: "600" }}>Login</div>
                <LoginInputs
                  username={username}
                  setUsername={setUsername}
                  password={password}
                  setPassword={setPassword}
                  handleLogin={handleLogin}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(Login);
