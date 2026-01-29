import { getUser } from "../lib/auth";
import { useNavigate } from "react-router-dom";
import { clearAuth } from "../lib/auth";

export default function EmployerDashboard() {
    const user = getUser();
    const navigate = useNavigate();
    return (
        <div className="page">
            <div className="container-x section-y">
                <div className="card card-inner">
                    <h1 className="text-2xl font-semibold">Employer Dashboard</h1>
                    <p className="muted mt-2">Welcome {user?.name || "Employer"} 👋</p>
                    <button
                        className="btn btn-ghost mt-4"
                        onClick={() => {
                            clearAuth();
                            navigate("/signin");
                        }}
                    >
                        Log out
                    </button>
                </div>
            </div>
        </div>
    );
}




