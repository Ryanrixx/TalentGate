import { Navigate } from "react-router-dom";
import { getToken, getUser } from "../lib/auth";

export default function ProtectedRoute({
                                           children,
                                           role,
                                       }: {
    children: React.ReactNode;
    role?: "jobseeker" | "employer";
}) {
    const token = getToken();
    const user = getUser();

    if (!token || !user) return <Navigate to="/signin" replace />;

    if (role && user.role !== role) {
        return <Navigate to={user.role === "employer" ? "/employer" : "/jobseeker"} replace />;
    }

    return <>{children}</>;
}
