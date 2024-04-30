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

export const register = async (data) => {
  try {
    return await apiClient.post("/register", data);
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};
