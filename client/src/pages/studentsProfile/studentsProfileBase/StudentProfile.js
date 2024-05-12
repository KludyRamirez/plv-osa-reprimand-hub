import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../../externalComponents/sidebarBase/Sidebar";
import StudentsProfileTable from "../studentsProfileComponents/StudentsProfileTable";

const selectAuth = (state) => state.auth;
const authSelector = createSelector([selectAuth], (auth) => auth);

const StudentProfile = () => {
  const [student, setStudent] = useState("");
  const [students, setStudents] = useState([]);
  const [cases, setCases] = useState([]);
  const [cads, setCads] = useState([]);

  const auth = useSelector(authSelector);

  const { id } = useParams();

  useEffect(() => {
    getOneStudent();
    getStudents();
    getCases();
    getCads();
  }, []);

  const getOneStudent = async () => {
    if (!auth?.userDetails?.token) {
      console.error("Authentication token not found.");
      return;
    }
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URI}/student/${id}`,
        {
          headers: {
            Authorization: `Bearer ${auth?.userDetails?.token}`,
          },
        }
      );
      setStudent(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

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
          Authorization: `Bearer ${auth?.userDetails?.token}`,
        },
      });

      const filteredCases = res.data.filter((c) => c?.student?._id === id);

      setCases(filteredCases);
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
    <div className="flex justify-start">
      <Sidebar />
      <div className="w-full h-[100%] flex justify-start bg-[#007bff]">
        <div className="w-full h-[100%] bg-[#fefefe] mt-[80px] rounded-tl-[24px] p-8">
          <StudentsProfileTable
            student={student}
            students={students}
            cases={cases}
            getCases={getCases}
            getStudents={getStudents}
            cads={cads}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
