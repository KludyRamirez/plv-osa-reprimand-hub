import React, { useState, useEffect } from 'react';
import Sidebar from '../../../externalComponents/sidebarBase/Sidebar';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import ChangeUserInfo from '../accountSettingsComponents/ChangeUserInfo';
import { BsEnvelopeCheck } from 'react-icons/bs';

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
      <div className="flex justify-start">
        <Sidebar />
        <div className="w-full h-screen flex justify-start bg-[#006bff]">
          <div className="w-full bg-[#fefefe] mt-[80px] rounded-tl-[24px] sm:rounded-tl-[0px] px-8 sm:px-4 pt-8 relative overflow-x-hidden overflow-y-hidden">
            <div className="w-100 text-[14px] text-[#404040] pb-6">
              Office of Student Affairs / Account
            </div>
            <div className="w-100 text-[26px] text-[#006bff] font-bold pb-6 flex justify-between items-center">
              <div>Account Settings</div>
            </div>
            <div className="w-[100%] flex justify-center">
              <ChangeUserInfo toast={toast} />
            </div>
            <div className="absolute flex justify-center items-center w-[800px] h-[800px] rounded-[50%] border-[2px] border-[#f9f9f9] top-[-200px] right-[80px] z-10 transform rotate-[45deg]">
              <div className="flex justify-center items-center w-[760px] h-[760px] rounded-[50%] border-[2px] border-[#f9f9f9] top-[-200px] left-[-400px] z-10">
                <div className="flex justify-center items-center w-[720px] h-[720px] rounded-[50%] border-[2px] border-[#f9f9f9] top-[-200px] left-[-400px] z-10">
                  <div className="flex justify-center items-center w-[680px] h-[680px] rounded-[50%] border-[2px] border-[#f9f9f9] top-[-200px] left-[-400px] z-10">
                    <div className="flex justify-center items-center w-[640px] h-[640px] rounded-[50%] border-[2px] border-[#f9f9f9] top-[-200px] left-[-400px] z-10">
                      <div className="flex justify-center items-center w-[600px] h-[600px] rounded-[50%] border-[2px] border-[#f9f9f9] top-[-200px] left-[-400px] z-10">
                        <div className="flex justify-center items-center w-[560px] h-[560px] rounded-[50%] border-[2px] border-[#f9f9f9] top-[-200px] left-[-400px] z-10">
                          <div className="flex justify-center items-center w-[520px] h-[520px] rounded-[50%] border-[2px] border-[#f9f9f9] top-[-200px] left-[-400px] z-10">
                            <div className="flex justify-center items-center w-[480px] h-[480px] rounded-[50%] border-[2px] border-[#f9f9f9] top-[-200px] left-[-400px] z-10">
                              <div className="flex justify-center items-center w-[440px] h-[440px] rounded-[50%] border-[2px] border-[#f9f9f9] top-[-200px] left-[-400px] z-10">
                                <div className="flex justify-center items-center w-[400px] h-[400px] rounded-[50%] border-[2px] border-[#f9f9f9] top-[-200px] left-[-400px] z-10">
                                  <BsEnvelopeCheck className="text-[72px] text-[#f9f9f9]" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute flex justify-center items-center w-[800px] h-[800px] rounded-[50%] border-[2px] border-[#f9f9f9] bottom-[-240px] left-[-80px] z-10 transform rotate-[45deg]">
              <div className="flex justify-center items-center w-[760px] h-[760px] rounded-[50%] border-[2px] border-[#f9f9f9] top-[-200px] left-[-400px] z-10">
                <div className="flex justify-center items-center w-[720px] h-[720px] rounded-[50%] border-[2px] border-[#f9f9f9] top-[-200px] left-[-400px] z-10">
                  <div className="flex justify-center items-center w-[680px] h-[680px] rounded-[50%] border-[2px] border-[#f9f9f9] top-[-200px] left-[-400px] z-10">
                    <div className="flex justify-center items-center w-[640px] h-[640px] rounded-[50%] border-[2px] border-[#f9f9f9] top-[-200px] left-[-400px] z-10">
                      <div className="flex justify-center items-center w-[600px] h-[600px] rounded-[50%] border-[2px] border-[#f9f9f9] top-[-200px] left-[-400px] z-10">
                        <div className="flex justify-center items-center w-[560px] h-[560px] rounded-[50%] border-[2px] border-[#f9f9f9] top-[-200px] left-[-400px] z-10">
                          <div className="flex justify-center items-center w-[520px] h-[520px] rounded-[50%] border-[2px] border-[#f9f9f9] top-[-200px] left-[-400px] z-10">
                            <div className="flex justify-center items-center w-[480px] h-[480px] rounded-[50%] border-[2px] border-[#f9f9f9] top-[-200px] left-[-400px] z-10">
                              <div className="flex justify-center items-center w-[440px] h-[440px] rounded-[50%] border-[2px] border-[#f9f9f9] top-[-200px] left-[-400px] z-10">
                                <div className="flex justify-center items-center w-[400px] h-[400px] rounded-[50%] border-[2px] border-[#f9f9f9] top-[-200px] left-[-400px] z-10">
                                  <BsEnvelopeCheck className="text-[72px] text-[#f9f9f9]" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountSettings;
