import React, { useState, useEffect } from 'react';
import Sidebar from '../../../../externalComponents/sidebarBase/Sidebar';
import CreateUser from '../registerComponents/CreateUser';
import UsersFilter from '../registerComponents/UsersFilter';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

const selectAuth = (state) => state.auth;
const authSelector = createSelector([selectAuth], (auth) => auth);

const Register = ({ toast, allowedRoles }) => {
  const [users, setUsers] = useState([]);

  const auth = useSelector(authSelector);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      if (!auth.userDetails.token) {
        console.error('Authentication token not found.');
        return;
      }
      const url = `${process.env.REACT_APP_API_URI}/user`;
      const res = await axios.get(url, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${auth.userDetails.token}`,
        },
      });
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users!', err);
    }
  };

  return (
    <>
      <div className="w-full flex">
        <Sidebar />
        <div className="w-[calc(100%-240px)] sm:w-full flex justify-start bg-[#006bff]">
          <div className="w-full bg-[#fefefe] px-8 sm:px-4 pt-8">
            <CreateUser
              toast={toast}
              getUsers={getUsers}
              allowedRoles={allowedRoles}
              auth={auth}
            />
            <UsersFilter
              users={users}
              getUsers={getUsers}
              allowedRoles={allowedRoles}
              auth={auth}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
