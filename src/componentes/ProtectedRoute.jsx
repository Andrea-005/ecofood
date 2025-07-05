import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

function ProtectedRoute({ children }) {
  const [user, loading] = useAuthState(auth);

  if (loading) return <p>Cargando...</p>;

  if (!user || !user.emailVerified) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
