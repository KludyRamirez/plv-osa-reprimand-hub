import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/homeBase/Home";
import Login from "./pages/auth/login/loginBase/LoginBase";
import Student from "./pages/student/studentBase/Student";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<></>}></Route>
        <Route path="/cases" element={<></>}></Route>
        <Route path="/student" element={<Student />}></Route>
        <Route path="/user" element={<></>}></Route>
        <Route path="/announcement" element={<></>}></Route>
        <Route path="/faq" element={<></>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
