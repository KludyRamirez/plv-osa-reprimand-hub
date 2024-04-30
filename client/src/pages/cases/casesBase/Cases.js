import React, { useState, useEffect } from "react";
import Sidebar from "../../../externalComponents/sidebarBase/Sidebar";
import axios from "axios";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import CreateCase from "../casesComponents/CreateCase";
import CasesFilter from "../casesComponents/CasesFilter";

const selectAuth = (state) => state.auth;
const authSelector = createSelector([selectAuth], (auth) => auth);

const Cases = ({ toast }) => {
  const [cases, setCases] = useState([]);
  const [majorCases, setMajorCases] = useState([]);
  const [minorCases, setMinorCases] = useState([]);
  const [complexCases, setComplexCases] = useState([]);

  const auth = useSelector(authSelector);

  useEffect(() => {
    getCases();
  }, []);

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

      const majorCaseFilter = res.data.filter(
        (c) => c.typeOfViolation === "Major"
      );

      const minorCaseFilter = res.data.filter(
        (c) => c.typeOfViolation === "Minor"
      );

      const complexCaseFilter = res.data.filter(
        (c) => c.typeOfViolation === "Complex"
      );

      setCases(res.data);
      setMajorCases(majorCaseFilter);
      setMinorCases(minorCaseFilter);
      setComplexCases(complexCaseFilter);
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
            <CreateCase toast={toast} getCases={getCases} />
            <CasesFilter
              cases={cases}
              majorCases={majorCases}
              minorCases={minorCases}
              complexCases={complexCases}
              getCases={getCases}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Cases;
