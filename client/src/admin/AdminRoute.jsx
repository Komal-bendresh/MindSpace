import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user || user.role !== "admin") {
        navigate("/login");
      }
    }
  }, [user, loading, navigate]);

  if (loading) return <div>Loading...</div>;

  return <>{children}</>;
};

export default AdminRoute;

