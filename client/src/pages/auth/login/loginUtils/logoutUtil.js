import { logout } from "../../../../store/actions/AuthActions";
import axios from "axios";

export const logoutUtil = async () => {
  try {
    await axios.get(`${process.env.REACT_APP_API_URI}/logout`, {
      withCredentials: true,
    });
  } catch (err) {
    console.error(err);
  }

  logout();
  localStorage.clear();
  window.location.assign("/");
};
