import React, { useState, useEffect } from "react";
import Sidebar from "../../../externalComponents/sidebarBase/Sidebar";
import axios from "axios";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import HistoryFilter from "../historyComponents/HistoryFilter";

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
        console.error("Authentication token not found.");
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
      console.error("Error fetching users!", err);
    }
  };

  return (
    <>
      <div className="flex justify-start">
        <Sidebar />
        <div className="w-full h-screen flex justify-start bg-[#007bff]">
          <div className="w-full bg-[#fefefe] mt-[80px] rounded-tl-[24px] p-8">
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
