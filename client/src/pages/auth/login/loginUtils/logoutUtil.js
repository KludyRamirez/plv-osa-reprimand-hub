import { logout } from "../../../../store/actions/AuthActions";

export const logoutUtil = () => {
  localStorage.clear();
  logout();
  window.location.pathname = "/login";
};
