import React from "react";
import Sidebar from "../../../externalComponents/sidebarBase/Sidebar";
import StudentsFilter from "../studentsComponents/StudentsFilter";

const Student = () => {
  return (
    <>
      <div className="flex justify-start">
        <Sidebar />
        <div className="w-full h-screen flex justify-start bg-[#007bff]">
          <div className="w-full bg-[#fefefe] mt-[80px] rounded-tl-[24px] p-8">
            <StudentsFilter />
          </div>
        </div>
      </div>
    </>
  );
};

export default Student;
