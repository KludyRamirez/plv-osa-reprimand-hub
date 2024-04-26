import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/homeBase/Home";
import Students from "./pages/students/studentsBase/Students";
import toast, { Toaster } from "react-hot-toast";
import Login from "./pages/auth/login/loginBase/Login";

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
          <Route path="/cases" element={<></>}></Route>
          <Route path="/students" element={<Students toast={toast} />}></Route>
          <Route path="/users" element={<></>}></Route>
          <Route path="/announcements" element={<></>}></Route>
          <Route path="/faqs" element={<></>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
