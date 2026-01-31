import { Navigate } from "react-router-dom";
import { useAuth } from "../store/auth.store";
import type { UserRole } from "../types";

export function RequireRole({
                                role,
                                children,
                            }: {
    role: UserRole;
    children: React.ReactNode;
}) {
    const { user } = useAuth();
    if (!user) return <Navigate to="/auth/sign-in" replace />;
    if (user.role !== role) return <Navigate to="/feed" replace />;
    return <>{children}</>;
}
