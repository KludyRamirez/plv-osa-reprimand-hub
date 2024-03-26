import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/homeBase/Home";
import Students from "./pages/students/studentsBase/Students";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<></>}></Route>
        <Route path="/cases" element={<></>}></Route>
        <Route path="/students" element={<Students />}></Route>
        <Route path="/users" element={<></>}></Route>
        <Route path="/announcements" element={<></>}></Route>
        <Route path="/faqs" element={<></>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
