//@ts-nocheck
import { Navigate } from "react-router";
import { useAppContext } from "./AppContext";


const ProtectedRoute = ({ children }) => {
  const { user } = useAppContext();

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
