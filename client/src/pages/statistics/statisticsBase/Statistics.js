import React, { useState, useEffect } from 'react';
import Sidebar from '../../../externalComponents/sidebarBase/Sidebar';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import StatisticsTable from './StatisticsTable';

const selectAuth = (state) => state.auth;
const authSelector = createSelector([selectAuth], (auth) => auth);

const Statistics = ({ toast }) => {
  const [cases, setCases] = useState([]);
  const [students, setStudents] = useState([]);

  const auth = useSelector(authSelector);

  useEffect(() => {
    getCases();
    getStudents();
  }, []);

  const getCases = async () => {
    try {
      if (!auth.userDetails.token) {
        console.error('Authentication token not found.');
        return;
      }
      const url = `${process.env.REACT_APP_API_URI}/case`;
      const res = await axios.get(url, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${auth?.userDetails?.token}`,
        },
      });

      setCases(res.data);
    } catch (err) {
      console.error('Error fetching users!', err);
    }
  };

  const getStudents = async () => {
    try {
      if (!auth.userDetails.token) {
        console.error('Authentication token not found.');
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
      console.error('Error fetching users!', err);
    }
  };

  return (
    <>
      <div className="flex justify-start">
        <Sidebar />
        <div className="w-full flex justify-start bg-[#007bff]">
          <div className="w-full bg-[#fefefe] p-8 phone:px-4">
            <StatisticsTable
              toast={toast}
              getCases={getCases}
              cases={cases}
              students={students}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Statistics;
