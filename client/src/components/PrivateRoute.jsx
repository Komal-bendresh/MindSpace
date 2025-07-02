import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  
  return token ? children :
 
  <> {alert("please login first")};
   <Navigate to="/login" replace />;
   </>
};

export default PrivateRoute;
