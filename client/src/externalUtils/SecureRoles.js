import { useLocation, Navigate, Outlet } from "react-router-dom";

const SecureRoles = ({ allowedRoles }) => {
  const location = useLocation();

  //nahuhuli yung render
  return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.accessToken ? (
    <Navigate to="/error" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default SecureRoles;
