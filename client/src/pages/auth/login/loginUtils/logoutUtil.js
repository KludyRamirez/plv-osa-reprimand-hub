import { logout } from "../../../../store/actions/AuthActions";
import axios from "axios";

export const logoutUtil = async () => {
  try {
    logout();
    localStorage.clear();
    window.location.assign("/");

    await axios.get(`${process.env.REACT_APP_API_URI}/logout`, {
      withCredentials: true,
    });
  } catch (err) {
    console.error(err);
  }
};
