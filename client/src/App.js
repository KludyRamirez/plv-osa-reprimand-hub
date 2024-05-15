import React from "react";
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
import Error404 from "./externalComponents/sidebarBase/Errors/Error404";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import Error302 from "./externalComponents/sidebarBase/Errors/Error302";
import Error403 from "./externalComponents/sidebarBase/Errors/Error403";

const selectAuth = (state) => state.auth;
const authSelector = createSelector([selectAuth], (auth) => auth);

function App() {
  const auth = useSelector(authSelector);

  return (
    <>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
        }}
      />
      <Router>
        <Routes>
          <Route path="*" element={<Error404 />}></Route>
          <Route path="/" element={<Login />}></Route>
          <Route path="/error403" element={<Error403 />}></Route>
          <Route
            path="/login"
            element={auth?.userDetails?.token ? <Error302 /> : <Login />}
          ></Route>
          <Route
            element={
              <SecureRoles allowedRoles={["Administrator", "Instructor"]} />
            }
          >
            <Route
              path="/cases"
              element={
                <Cases
                  toast={toast}
                  allowedRoles={["Administrator", "Instructor"]}
                />
              }
            ></Route>
            <Route
              path="/students"
              element={
                <Students
                  toast={toast}
                  allowedRoles={["Administrator", "Instructor"]}
                />
              }
            ></Route>
            <Route
              path="/users"
              element={
                <Register toast={toast} allowedRoles={["Administrator"]} />
              }
            ></Route>
            <Route
              path="/statistics"
              element={
                <Statistics
                  toast={toast}
                  allowedRoles={["Administrator", "Instructor"]}
                />
              }
            ></Route>
            <Route
              path="/notification"
              element={
                <History
                  toast={toast}
                  allowedRoles={["Administrator", "Instructor"]}
                />
              }
            ></Route>
            <Route
              path="/profile/:id"
              element={
                <StudentProfile
                  toast={toast}
                  allowedRoles={["Administrator", "Instructor"]}
                />
              }
            ></Route>
            <Route
              path="/settings"
              element={
                <Settings
                  toast={toast}
                  allowedRoles={["Administrator", "Instructor"]}
                />
              }
            ></Route>
            <Route
              path="/account"
              element={
                <AccountSettings
                  toast={toast}
                  allowedRoles={["Administrator", "Instructor"]}
                />
              }
            ></Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
