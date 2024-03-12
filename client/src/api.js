import axios from "axios";

export default axios.create({
  baseURL: process.env.REACT_APP_API_URI,
});

export const axiosPrivate = axios.create({
  baseURL: process.env.REACT_APP_API_URI,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
