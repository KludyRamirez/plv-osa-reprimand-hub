import React, { useState, useEffect } from "react";
import Sidebar from "../../../externalComponents/sidebarBase/Sidebar";
import axios from "axios";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import ChangeUserEmail from "../accountSettingsComponents/ChangeUserEmail";

const selectAuth = (state) => state.auth;
const authSelector = createSelector([selectAuth], (auth) => auth);

const AccountSettings = ({ toast }) => {
  const [cads, setCads] = useState([]);

  const auth = useSelector(authSelector);

  useEffect(() => {
    getCads();
  }, []);

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
        <div className="w-full flex justify-start bg-[#007bff]">
          <div className="w-full bg-[#fefefe] mt-[80px] rounded-tl-[24px] phone:rounded-tl-[0px] px-8 phone:px-4 pt-8">
            <div className="w-100 text-[14px] text-[#404040] pb-6 ">
              Office of Student Affairs / Account
            </div>
            <div className="w-100 text-[26px] text-[#077bff] font-bold pb-6 flex justify-between items-center">
              <div>Account Settings</div>
            </div>
            <div className="w-[100%] flex justify-center">
              <ChangeUserEmail toast={toast} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountSettings;
