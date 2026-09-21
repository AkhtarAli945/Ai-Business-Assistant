import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Logo from "./Logo.jsx";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-paper dark:bg-night-bg">
        <div className="flex flex-col items-center gap-3 animate-fadeUp">
          <Logo className="h-9 w-9 animate-pulse" />
          <p className="text-sm text-muted dark:text-night-muted">Loading Vantra…</p>
        </div>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  return children;
}
