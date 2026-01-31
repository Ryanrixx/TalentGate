import { Navigate } from "react-router-dom";
import { useAuth } from "../store/auth.store";

export function RequireVerified({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    if (!user) return <Navigate to="/auth/sign-in" replace />;
    if (!user.verified) return <Navigate to="/auth/verify" replace />;
    return <>{children}</>;
}
