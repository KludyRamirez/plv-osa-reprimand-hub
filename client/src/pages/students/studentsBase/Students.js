import React, { useState, useEffect } from "react";
import Sidebar from "../../../externalComponents/sidebarBase/Sidebar";
import StudentsFilter from "../studentsComponents/StudentsFilter";
import CreateStudent from "../studentsComponents/CreateStudent";
import axios from "axios";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

const selectAuth = (state) => state.auth;
const authSelector = createSelector([selectAuth], (auth) => auth);

const Student = ({ toast }) => {
  const [students, setStudents] = useState([]);

  const auth = useSelector(authSelector);

  useEffect(() => {
    getStudents();
  }, []);

  const getStudents = async () => {
    try {
      if (!auth.userDetails.token) {
        console.error("Authentication token not found.");
        return;
      }
      const url = `${process.env.REACT_APP_API_URI}/student`;
      const res = await axios.get(url, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${auth.userDetails.token}`,
        },
      });
      setStudents(res.data);
    } catch (err) {
      console.error("Error fetching users!", err);
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
