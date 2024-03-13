import React from "react";
import Sidebar from "../../../externalComponents/sidebarBase/Sidebar";

const Home = () => {
  return (
    <>
      <div className="w-full h-screen flex justify-start">
        <Sidebar />
        <div className="w-full h-screen flex justify-start">Kludy</div>
      </div>
    </>
  );
};

export default Home;
