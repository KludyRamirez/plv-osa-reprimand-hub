import * as api from '../../api';
import toast from 'react-hot-toast';

export const AuthActions = {
  SET_USER_DETAILS: 'AUTH.SET_USER_DETAILS',
  LOGOUT: 'LOGOUT',
};

export const getActions = (dispatch) => {
  return {
    login: (userDetails, navigate) => dispatch(login(userDetails, navigate)),
    register: (userDetails, authToken) =>
      dispatch(register(userDetails, authToken)),
    setUserDetails: (userDetails) => dispatch(setUserDetails(userDetails)),
  };
};

export const logout = () => ({
  type: AuthActions.LOGOUT,
});

export const setUserDetails = (userDetails) => {
  return {
    type: AuthActions.SET_USER_DETAILS,
    userDetails,
  };
};

const login = (userDetails, navigate) => {
  return async (dispatch) => {
    const response = await api.login(userDetails);
    if (response.error) {
      dispatch(toast.error(response?.exception?.response?.data?.message));
    } else {
      const { userDetails } = response?.data;
      localStorage.setItem('user', JSON.stringify(userDetails));
      dispatch(setUserDetails(userDetails));
      navigate('/statistics');
    }
  };
};

const register = (userDetails, authToken) => {
  return async () => {
    try {
      const response = await api.register(userDetails, authToken);
      if (response.error) {
        toast.error(response?.exception?.response?.data);
      } else {
        toast.success(response.data.message);
      }
    } catch (err) {
      console.error('Error on creating new user. Please try again', err);
    }
  };
};
