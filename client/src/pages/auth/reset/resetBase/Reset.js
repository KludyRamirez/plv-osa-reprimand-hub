import React, { useState } from 'react';
import axios from 'axios';
import osalogo from '../../../../images/osalogo.png';
import { BsEnvelopeAt } from 'react-icons/bs';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import ResetForm from '../resetComponents/ResetForm';
import { useParams } from 'react-router-dom';
import LoginFooter from '../../login/loginComponents/LoginFooter';

const FormTitle = styled('div')({
  backgroundImage:
    'radial-gradient(100% 100% at 100% 0, #122c8e 0, #07bbff 100%)',
  backgroundSize: '100%',
  backgroundRepeat: 'repeat',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  MozBackgroundClip: 'text',
  MozTextFillColor: 'transparent',
  fontSize: '120px',
  fontWeight: '600',
  lineHeight: '134px',
  zIndex: '2',
});

const Reset = ({ auth, toast }) => {
  const [status, setStatus] = useState(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [countdown, setCountdown] = useState(10);

  const navigate = useNavigate();
  const { id, token } = useParams();

  const handleSubmitPassword = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URI}/resetpassword/${id}/${token}`,
        { password },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${auth?.userDetails?.token}`,
          },
        }
      );
      if (res?.status === 200) {
        setStatus('success');
        toast.success(res.data.message);

        let timer;
        let countdownInterval;

        countdownInterval = setInterval(() => {
          setCountdown((prevCountdown) => {
            if (prevCountdown <= 1) {
              clearInterval(countdownInterval);
              return 0;
            }
            return prevCountdown - 1;
          });
        }, 1000);

        timer = setTimeout(() => {
          navigate('/');
        }, 10000);
      }
    } catch (error) {
      if (error?.response?.status === 400) {
        setStatus('error');
        toast.error(error?.response?.data.message);
      } else {
        toast.error(
          error?.response?.data.message ||
            'Something went wrong. Please try again'
        );
      }
    }
  };

  const validatePassword = (value) => {
    if (value.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
    } else if (value.length > 48) {
      setPasswordError('Password must be at most 48 characters long.');
    } else {
      setPasswordError('');
    }
  };

  const validateConfirmPassword = (value) => {
    if (password !== value) {
      setConfirmPasswordError('Password must be same.');
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleGetPassword = (e) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
  };

  const handleGetConfirmPassword = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    validateConfirmPassword(value);
  };

  return (
    <div className="w-full h-screen flex justify-center bg-white">
      <div className="w-full flex flex-col items-center gap-[60px]">
        <div className="w-[100%] px-6 shadow-sm bg-white z-20">
          <div className="h-[90px] flex justify-between items-center gap-10">
            <div className="flex justify-center items-center gap-10">
              <div className="flex items-center gap-6">
                <img src={osalogo} alt="" className="w-[60px] h-[60px]" />
                <FormTitle
                  sx={{
                    fontSize: '22px',
                    backgroundImage:
                      'radial-gradient(100% 100% at 100% 0, #006bff 0, #122c8e 100%)',
                  }}
                >
                  Office of Student Affairs
                </FormTitle>
              </div>
            </div>
            {/* <div className="flex justify-center items-center gap-3">
              <div className="flex items-center border-[1px] border-gray-100 gap-2 text-base text-[#006bff] cursor-pointer bg-[#f7f7f7] px-3 py-2 rounded-[6px]">
                Sign in
              </div>

              <div className="flex items-center border-[1px] border-gray-100 gap-2 text-base text-[#006bff] cursor-pointer bg-[#f7f7f7] px-3 py-2 rounded-[6px] ">
                <span>Announcements</span>
                <BsMegaphone />
              </div>
            </div> */}
          </div>
        </div>
        <ResetForm
          password={password}
          confirmPassword={confirmPassword}
          status={status}
          handleSubmitPassword={handleSubmitPassword}
          FormTitle={FormTitle}
          handleGetPassword={handleGetPassword}
          handleGetConfirmPassword={handleGetConfirmPassword}
          passwordError={passwordError}
          confirmPasswordError={confirmPasswordError}
          countdown={countdown}
        />

        <div className="w-[100%]">
          <LoginFooter />
        </div>
        <div className="absolute flex justify-center items-center w-[800px] h-[800px] rounded-[50%] border-[2px] border-[#f9f9f9] top-[-160px] right-[200px] z-10 transform rotate-[45deg]">
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
                              <BsEnvelopeAt className="text-[72px] text-[#f9f9f9]" />
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
  );
};

export default Reset;
