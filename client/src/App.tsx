import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn.tsx";
import CreateAccount from "./pages/CreateAccount.tsx";
import EmployerDashboard from "./pages/EmployerDashboard.tsx";
import JobseekerDashboard from "./pages/JobSeekerDashboard.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import Jobs from "./pages/Jobs";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<CreateAccount />} />
                <Route path="/jobs" element={<Jobs />} />

                <Route
                    path="/jobseeker"
                    element={
                        <ProtectedRoute role="jobseeker">
                            <JobseekerDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/employer"
                    element={
                        <ProtectedRoute role="employer">
                            <EmployerDashboard />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}
