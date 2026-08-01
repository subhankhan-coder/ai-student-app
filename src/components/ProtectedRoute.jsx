import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function ProtectedRoute({ role, children }) {
  const { authed, role: currentRole } = useAuth();
  if (!authed) return <Navigate to="/" replace />;
  if (role && currentRole !== role) return <Navigate to={currentRole === "admin" ? "/admin/dashboard" : "/student/dashboard"} replace />;
  return children;
}
