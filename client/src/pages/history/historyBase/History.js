import React, { useState, useEffect } from 'react';
import Sidebar from '../../../externalComponents/sidebarBase/Sidebar';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import HistoryFilter from '../historyComponents/HistoryFilter';

const selectAuth = (state) => state.auth;
const authSelector = createSelector([selectAuth], (auth) => auth);

const History = ({ toast, allowedRoles }) => {
  const [history, setHistory] = useState([]);

  const auth = useSelector(authSelector);

  useEffect(() => {
    getHistory();
  }, []);

  const getHistory = async () => {
    try {
      if (!auth.userDetails.token) {
        console.error('Authentication token not found.');
        return;
      }
      const url = `${process.env.REACT_APP_API_URI}/notification`;
      const res = await axios.get(url, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${auth.userDetails.token}`,
        },
      });
      setHistory(res.data);
    } catch (err) {
      console.error('Error fetching users!', err);
    }
  };

  return (
    <>
      <div className="w-full flex">
        <Sidebar />
        <div className="w-[calc(100%-240px)] sm:w-full flex justify-start bg-[#006bff]">
          <div className="w-full sm:mt-[75px] bg-[#fefefe] px-8 sm:px-4 pt-8">
            <HistoryFilter
              history={history}
              getHistory={getHistory}
              toast={toast}
              allowedRoles={allowedRoles}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default History;
