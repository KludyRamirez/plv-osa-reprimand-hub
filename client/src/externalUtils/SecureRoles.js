import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

const selectAuth = (state) => state.auth;
const authSelector = createSelector([selectAuth], (auth) => auth);

const SecureRoles = ({ allowedRoles }) => {
  const location = useLocation();

  const auth = useSelector(authSelector);

  return allowedRoles?.find((ar) => auth?.userDetails?.role?.includes(ar)) ? (
    <Outlet />
  ) : auth?.userDetails?.token ? (
    <Navigate to="/error403" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default SecureRoles;
