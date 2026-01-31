import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn.tsx";
import CreateAccount from "./pages/CreateAccount.tsx";
import EmployerDashboard from "./pages/EmployerDashboard.tsx";
import JobseekerDashboard from "./pages/JobSeekerDashboard.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import Jobs from "./pages/Jobs";
import Trending from "./pages/Trending";
import Communities from "./pages/Communities";
import Posts from "./pages/Posts";
import JobSeekerProfile from "./pages/JobSeekerProfile";
import EmployerProfile from "./pages/EmployerProfile";

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
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/trending" element={<Trending />} />
                <Route path="/communities" element={<Communities />} />
                <Route path="/posts" element={<Posts />} />

                <Route
                    path="/jobseeker/profile"
                    element={
                        <ProtectedRoute role="jobseeker">
                            <JobSeekerProfile />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/employer/profile"
                    element={
                        <ProtectedRoute role="employer">
                            <EmployerProfile />
                        </ProtectedRoute>
                    }
                />

            </Routes>
        </BrowserRouter>
    );
}
