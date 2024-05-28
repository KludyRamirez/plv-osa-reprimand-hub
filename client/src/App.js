import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Students from "./pages/students/studentsBase/Students";
import toast, { Toaster } from "react-hot-toast";
import Login from "./pages/auth/login/loginBase/Login";
import Register from "./pages/auth/register/registerBase/Register";
import Cases from "./pages/cases/casesBase/Cases";
import Statistics from "./pages/statistics/statisticsBase/Statistics";
import History from "./pages/history/historyBase/History";
import StudentProfile from "./pages/studentsProfile/studentsProfileBase/StudentProfile";
import Settings from "./pages/settings/settingsBase/Settings";
import AccountSettings from "./pages/accountSettings/accountSettingsBase/AccountSettings";
import SecureRoles from "./externalUtils/SecureRoles";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import Error404 from "./externalComponents/Errors/Error404";
import Error403 from "./externalComponents/Errors/Error403";
import Forgot from "./pages/auth/forgot/forgotBase/Forgot";
import Reset from "./pages/auth/reset/resetBase/Reset";
import Loading from "./externalUtils/Loading";
import PersistLogin from "./externalUtils/PersistLogin";

const selectAuth = (state) => state.auth;
const authSelector = createSelector([selectAuth], (auth) => auth);

function App() {
  const [loading, setLoading] = useState(false);

  const auth = useSelector(authSelector);

  return (
    <>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            fontWeight: "600",
            textAlign: "center",
            border: "1px solid #606060",
            backgroundColor: "white",
          },
        }}
      />
      <Router>
        {loading ? (
          <Loading />
        ) : (
          <Routes>
            <Route path="*" element={<Error404 />}></Route>

            <Route path="/error" element={<Error403 />}></Route>

            <Route
              path="/forgot"
              element={<Forgot auth={auth} toast={toast} />}
            ></Route>

            <Route
              path="/reset-password/:id/:token"
              element={<Reset toast={toast} />}
            ></Route>

            {/* START OF PERSIST LOGIN */}

            <Route element={<PersistLogin />}>
              {/* allowedRoles PROPS: ADMIN, INSTRUCTOR, STUDENT */}

              <Route
                path="/"
                element={
                  auth?.userDetails?.token ? (
                    <Statistics />
                  ) : (
                    <Login setLoading={setLoading} toast={toast} />
                  )
                }
              ></Route>

              <Route
                path="/account"
                element={
                  <AccountSettings
                    toast={toast}
                    allowedRoles={["Administrator", "Instructor", "Student"]}
                  />
                }
              ></Route>

              {/* allowedRoles: ADMIN AND INSTRUCTOR */}

              <Route
                element={
                  <SecureRoles allowedRoles={["Administrator", "Instructor"]} />
                }
              >
                <Route
                  path="/cases"
                  element={
                    <Cases toast={toast} allowedRoles={["Administrator"]} />
                  }
                ></Route>
                <Route
                  path="/students"
                  element={
                    <Students toast={toast} allowedRoles={["Administrator"]} />
                  }
                ></Route>

                <Route
                  path="/profile/:id"
                  element={
                    <StudentProfile
                      toast={toast}
                      allowedRoles={["Administrator"]}
                    />
                  }
                ></Route>

                {/* allowedRoles PROPS: ADMIN AND INSTRUCTOR */}

                <Route
                  path="/statistics"
                  element={
                    <Statistics
                      toast={toast}
                      allowedRoles={["Administrator", "Instructor"]}
                    />
                  }
                ></Route>
              </Route>

              {/* allowedRoles: ADMIN ONLY */}

              {/* allowedRoles PROPS: ADMIN ONLY */}

              <Route element={<SecureRoles allowedRoles={["Administrator"]} />}>
                <Route
                  path="/users"
                  element={
                    <Register toast={toast} allowedRoles={["Administrator"]} />
                  }
                ></Route>
                <Route
                  path="/settings"
                  element={
                    <Settings toast={toast} allowedRoles={["Administrator"]} />
                  }
                ></Route>
                <Route
                  path="/notification"
                  element={
                    <History toast={toast} allowedRoles={["Administrator"]} />
                  }
                ></Route>
              </Route>
            </Route>
          </Routes>
        )}
      </Router>
    </>
  );
}

export default App;
