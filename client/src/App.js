import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/homeBase/Home";
import Login from "./pages/auth/login/loginBase/LoginBase";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<></>}></Route>
        <Route path="/cases" element={<></>}></Route>
        <Route path="/student" element={<></>}></Route>
        <Route path="/user" element={<></>}></Route>
        <Route path="/announcement" element={<></>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
