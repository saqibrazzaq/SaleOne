import { useLocation, Navigate, Outlet } from "react-router-dom";
import TokenService from "./token.service";

const RequireAuth = ({ allowedRoles }) => {
  // console.log("Here")
  const location = useLocation();
  const token = TokenService.getUser();
  // console.log(token);

  if (token?.roles?.find((role) => allowedRoles?.includes(role))) {
    // console.log("User logged in.");
    return <Outlet />;
  } else {
    if (token?.email) {
      console.log("User logged in, but unauthorized.");
      return <Navigate to="/auth/unauthorized" state={{ from: location }} replace />;
    } else {
      console.log("User not logged in.");
      return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }
  }
};

export default RequireAuth;
