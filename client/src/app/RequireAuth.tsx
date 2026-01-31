import { Navigate } from "react-router-dom";
import { useAuth } from "../store/auth.store";

export function RequireAuth({ children }: { children: React.ReactNode }) {
    const { token } = useAuth();
    if (!token) return <Navigate to="/auth/sign-in" replace />;
    return <>{children}</>;
}
