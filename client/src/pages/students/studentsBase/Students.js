import React, { useState, useEffect } from "react";
import Sidebar from "../../../externalComponents/sidebarBase/Sidebar";
import StudentsFilter from "../studentsComponents/StudentsFilter";
import CreateStudent from "../studentsComponents/CreateStudent";
import axios from "axios";

const Student = ({ toast }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    getStudents();
  }, []);

  const getStudents = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URI}/student`;
      const res = await axios.get(url);
      setStudents(res.data);
    } catch (err) {
      console.error("Error fetching students!", err);
    }
  };

  return (
    <>
      <div className="flex justify-start">
        <Sidebar />
        <div className="w-full h-screen flex justify-start bg-[#007bff]">
          <div className="w-full bg-[#fefefe] mt-[80px] rounded-tl-[24px] p-8">
            <CreateStudent toast={toast} getStudents={getStudents} />
            <StudentsFilter students={students} getStudents={getStudents} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Student;
