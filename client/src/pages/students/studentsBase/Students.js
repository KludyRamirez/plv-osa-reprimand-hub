import React, { useState, useEffect } from "react";
import Sidebar from "../../../externalComponents/sidebarBase/Sidebar";
import StudentsFilter from "../studentsComponents/StudentsFilter";
import CreateStudent from "../studentsComponents/CreateStudent";
import axios from "axios";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

const selectAuth = (state) => state.auth;
const authSelector = createSelector([selectAuth], (auth) => auth);

const Students = ({ toast, allowedRoles }) => {
  const [students, setStudents] = useState([]);
  const [cases, setCases] = useState([]);
  const [cads, setCads] = useState([]);

  const auth = useSelector(authSelector);

  useEffect(() => {
    getStudents();
    getCases();
    getCads();
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

  const getCases = async () => {
    try {
      if (!auth.userDetails.token) {
        console.error("Authentication token not found.");
        return;
      }
      const url = `${process.env.REACT_APP_API_URI}/case`;
      const res = await axios.get(url, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${auth.userDetails.token}`,
        },
      });
      setCases(res.data);
    } catch (err) {
      console.error("Error fetching users!", err);
    }
  };

  const getCads = async () => {
    try {
      if (!auth.userDetails.token) {
        console.error("Authentication token not found.");
        return;
      }
      const url = `${process.env.REACT_APP_API_URI}/cad`;
      const res = await axios.get(url, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${auth?.userDetails?.token}`,
        },
      });

      setCads(res.data);
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
            <CreateStudent
              toast={toast}
              getStudents={getStudents}
              cads={cads}
              allowedRoles={allowedRoles}
            />
            <StudentsFilter
              students={students}
              cases={cases}
              getStudents={getStudents}
              cads={cads}
              allowedRoles={allowedRoles}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Students;
