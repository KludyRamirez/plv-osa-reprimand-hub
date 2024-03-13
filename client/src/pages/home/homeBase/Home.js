import React from "react";
import Sidebar from "../../../externalComponents/sidebarBase/Sidebar";

const Home = () => {
  return (
    <>
      <div className="w-full h-screen flex justify-start">
        <Sidebar />
        <div className="w-full h-screen flex justify-start bg-[#007bff]">
          <div className="w-full h-[screen] bg-[white] mt-[60px] rounded-tl-[18px]"></div>
        </div>
      </div>
    </>
  );
};

export default Home;
