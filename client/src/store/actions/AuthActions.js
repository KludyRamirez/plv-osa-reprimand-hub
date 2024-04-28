import * as api from "../../api";
import toast from "react-hot-toast";

export const AuthActions = {
  SET_USER_DETAILS: "AUTH.SET_USER_DETAILS",
};

export const getActions = (dispatch) => {
  return {
    login: (userDetails, navigate) => dispatch(login(userDetails, navigate)),
    register: (userDetails) => dispatch(register(userDetails)),
    setUserDetails: (userDetails) => dispatch(setUserDetails(userDetails)),
  };
};

export const logout = () => ({
  type: AuthActions.LOGOUT,
});

const setUserDetails = (userDetails) => {
  return {
    type: AuthActions.SET_USER_DETAILS,
    userDetails,
  };
};

const login = (userDetails, navigate) => {
  return async (dispatch) => {
    const response = await api.login(userDetails);
    console.log(response);
    if (response.error) {
      dispatch(toast.error(response?.exception?.response?.data));
    } else {
      const { userDetails } = response?.data;
      localStorage.setItem("user", JSON.stringify(userDetails));
      dispatch(setUserDetails(userDetails));
      navigate("/students");
    }
  };
};

const register = (userDetails) => {
  return async (dispatch) => {
    try {
      const response = await api.register(userDetails);
      console.log(response);
      if (response.error) {
        dispatch(toast.error(response?.exception?.response?.data));
      } else {
        dispatch(toast.success("A user has been successfully added!"));
      }
    } catch (error) {
      console.error("Error occurred while registering:", error);
    }
  };
};
