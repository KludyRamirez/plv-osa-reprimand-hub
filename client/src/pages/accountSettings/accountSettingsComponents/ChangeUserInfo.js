import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { BsCardText, BsEnvelope, BsPass } from 'react-icons/bs';
import axios from 'axios';
import { MdOutlinePassword } from 'react-icons/md';

const initialState = {
  email: '',
  password: '',
};

const errorsInitialState = {
  email: '',
  password: '',
};

const selectAuth = (state) => state.auth;
const authSelector = createSelector([selectAuth], (auth) => auth);

const ChangeUserInfo = ({ toast }) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState(errorsInitialState);

  const auth = useSelector(authSelector);

  const { email, password } = values;

  const handleUpdateEmail = async (e) => {
    e.preventDefault();

    try {
      if (!auth.userDetails.token) {
        console.error('Authentication token not found.');
        return;
      }

      const res = await axios.post(
        `${process.env.REACT_APP_API_URI}/change-email`,
        { email },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${auth.userDetails.token}`,
          },
        }
      );
      await toast.success(res?.data?.message);
      setValues(initialState);
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    try {
      if (!auth.userDetails.token) {
        console.error('Authentication token not found.');
        return;
      }

      const res = await axios.post(
        `${process.env.REACT_APP_API_URI}/change-password`,
        { password },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${auth.userDetails.token}`,
          },
        }
      );
      await toast.success(res?.data?.message);
      setValues(initialState);
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  const handleEmailChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    let newErrors = { ...errors };

    let formattedValue = value;

    setValues({ ...values, [name]: formattedValue });

    if (name === 'email') {
      if (formattedValue.length < 3) {
        newErrors[name] = 'Email must be at least 3 characters long.';
      } else if (formattedValue.length > 48) {
        newErrors[name] = 'Email name must be at most 48 characters long.';
      } else {
        newErrors[name] = '';
      }
    } else if (name === 'password') {
      if (formattedValue.length < 3) {
        newErrors[name] = 'Password must be at least 3 characters long.';
      } else if (formattedValue.length > 48) {
        newErrors[name] = 'Password must be at most 48 characters long.';
      } else {
        newErrors[name] = '';
      }
    }
    setErrors(newErrors);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    let newErrors = { ...errors };

    let formattedValue = value;

    setValues({ ...values, [name]: formattedValue });

    if (name === 'password') {
      if (formattedValue.length < 6) {
        newErrors[name] = 'Password must be at least 6 characters long.';
      } else if (formattedValue.length > 48) {
        newErrors[name] = 'Password must be at most 48 characters long.';
      } else {
        newErrors[name] = '';
      }
    }
    setErrors(newErrors);
  };

  return (
    <>
      <div className="w-[460px] flex flex-col gap-8 z-20">
        <div className="text-[#606060] flex flex-col gap-4 px-5 py-6 rounded-[8px]">
          <div className="flex items-center justify-start relative">
            <div className="text-[36px] text-[#007bff] font-bold">
              Change Info
            </div>
          </div>
          <div className="flex flex-col gap-3 w-[100%]">
            <div className="text-[16px] text-[#007bff] w-100 flex justify-between items-center">
              <span>Email</span>
              <BsEnvelope className="text-[22px]" />
            </div>
            <input
              required
              name="email"
              value={email}
              onChange={handleEmailChange}
              type="email"
              autoComplete="off"
              placeholder="e.g. example@domain.com"
              className={`border-[1px] hover:border-blue-300 focus:border-blue-300 p-3 rounded-[6px] w-[100%] bg-[white] ${
                errors.email === '' ? '' : 'border-[red]'
              } focus:outline-none `}
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}

            <div className="w-100 flex justify-start items-center">
              {errors.email === '' && values.email !== '' ? (
                <button
                  type="button"
                  className="w-[100%] py-2 bg-[#007bff] text-[white] text-[16px] flex justify-center items-center rounded-[4px] gap-2"
                  onClick={handleUpdateEmail}
                >
                  <div>Change</div>
                </button>
              ) : (
                <button
                  disabled
                  className="w-[100%] py-2 bg-blue-300 text-[white] text-[16px] flex justify-center items-center rounded-[4px] gap-2"
                >
                  <div>Change</div>
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3 w-[100%] pt-4">
            <div className="text-[16px] text-[#007bff] w-100 flex justify-between items-center">
              <span>Password</span>
              <BsCardText className="text-[22px]" />
            </div>
            <input
              required
              name="password"
              value={password}
              onChange={handlePasswordChange}
              type="password"
              autoComplete="off"
              placeholder="e.g. ******"
              className={`border-[1px] hover:border-blue-300 focus:border-blue-300 p-3 rounded-[6px] w-[100%] bg-white ${
                errors.password === '' ? '' : 'border-[red]'
              } focus:outline-none `}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password}</p>
            )}

            <div className="w-100 flex justify-start items-center">
              {errors.password === '' && values.password !== '' ? (
                <button
                  type="button"
                  className="w-[100%] py-2 bg-[#007bff] text-[white] text-[16px] flex justify-center items-center rounded-[4px] gap-2"
                  onClick={handleUpdatePassword}
                >
                  <div>Change</div>
                </button>
              ) : (
                <button
                  disabled
                  className="w-[100%] py-2 bg-blue-300 text-[white] text-[16px] flex justify-center items-center rounded-[4px] gap-2"
                >
                  <div>Change</div>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangeUserInfo;
