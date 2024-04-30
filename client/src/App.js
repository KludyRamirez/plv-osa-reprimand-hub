import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Students from "./pages/students/studentsBase/Students";
import toast, { Toaster } from "react-hot-toast";
import Login from "./pages/auth/login/loginBase/Login";
import Register from "./pages/auth/register/registerBase/Register";
import Cases from "./pages/cases/casesBase/Cases";

function App() {
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
        }}
      />
      <Router>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/cases" element={<Cases toast={toast} />}></Route>
          <Route path="/students" element={<Students toast={toast} />}></Route>
          <Route path="/users" element={<Register toast={toast} />}></Route>
          <Route path="/announcements" element={<></>}></Route>
          <Route path="/faqs" element={<></>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
