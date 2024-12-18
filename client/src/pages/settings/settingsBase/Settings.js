import React, { useState, useEffect } from 'react';
import Sidebar from '../../../externalComponents/sidebarBase/Sidebar';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import CreateCollegesAndDepartments from '../collegesComponents/CreateCollegesAndDepartments';
import CollegesAndDepartmentsFilter from '../collegesComponents/CollegesAndDepartmentsFilter';

const selectAuth = (state) => state.auth;
const authSelector = createSelector([selectAuth], (auth) => auth);

const Settings = ({ toast, allowedRoles }) => {
  const [cads, setCads] = useState([]);

  const auth = useSelector(authSelector);

  useEffect(() => {
    getCads();
  }, []);

  const getCads = async () => {
    try {
      if (!auth.userDetails.token) {
        console.error('Authentication token not found.');
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
      console.error('Error fetching users!', err);
    }
  };

  return (
    <>
      <div className="w-full flex">
        <Sidebar />
        <div className="w-[calc(100%-240px)] sm:w-full flex justify-start bg-[#006bff]">
          <div className="w-full sm:mt-[75px] bg-[#fefefe] px-8 sm:px-4 pt-8">
            <CreateCollegesAndDepartments
              toast={toast}
              cads={cads}
              getCads={getCads}
              allowedRoles={allowedRoles}
            />
            <CollegesAndDepartmentsFilter
              toast={toast}
              cads={cads}
              getCads={getCads}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
