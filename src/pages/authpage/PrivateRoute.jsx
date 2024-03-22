import { Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth";

const PrivateRoute = () => {
  const user = useAuth();
  console.log('user Authenticated', user);
  return typeof user === 'undefined' ? (
    <h1>Loading....</h1>
  ): user ? (
    <Outlet/>
  ):(
    <Navigate to="/login" />
  )
};


export default PrivateRoute;