import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URI,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const login = async (data) => {
  try {
    return await apiClient.post("/login", data);
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

export const register = async (data, authToken) => {
  try {
    return await axios.post(`${process.env.REACT_APP_API_URI}/register`, data, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      withCredentials: true,
    });
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};
