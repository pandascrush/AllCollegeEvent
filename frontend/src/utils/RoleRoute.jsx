import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function RoleRoute({ children, allowed }) {
  const { user } = useSelector((state) => state.user);

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Role mismatch
  if (!allowed.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
