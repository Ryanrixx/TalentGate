import { createBrowserRouter, Navigate } from "react-router-dom";
import { AppLayout } from "./AppLayout";

import { RequireAuth } from "./RequireAuth";
import { RequireVerified } from "./RequireVerified";
import { RequireRole } from "./RequireRole";

import SignIn from "../pages/auth/SignIn";
import CreateAccount from "../pages/auth/CreateAccount";
import { VerifyAccount } from "../pages/auth/VerifyAccount";

import { Feed } from "../pages/shared/Feed";
import { Trending } from "../pages/shared/Trending";
import { Communities } from "../pages/shared/Communities";
import { Messages } from "../pages/shared/Messages";
import { Notifications } from "../pages/shared/Notifications";

import { SeekerDashboard } from "../pages/jobseeker/Dashboard";
import { SeekerProfile } from "../pages/jobseeker/Profile";
import { SeekerJobs } from "../pages/jobseeker/Jobs";
import { SeekerApplications } from "../pages/jobseeker/Applications";
import { SeekerResume } from "../pages/jobseeker/Resume";

import { EmployerDashboard } from "../pages/employer/Dashboard";
import { EmployerProfile } from "../pages/employer/Profile";
import { EmployerPostJob } from "../pages/employer/PostJob";
import { EmployerApplicants } from "../pages/employer/Applicants";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            { index: true, element: <Navigate to="/feed" replace /> },

            // auth
            { path: "auth/sign-in", element: <SignIn /> },
            { path: "auth/create-account", element: <CreateAccount /> },
            {
                path: "auth/verify",
                element: (
                    <RequireAuth>
                        <VerifyAccount />
                    </RequireAuth>
                ),
            },

            // shared (browse allowed)
            { path: "feed", element: <Feed /> },
            { path: "trending", element: <Trending /> },
            { path: "communities", element: <Communities /> },

            // NEW shared
            {
                path: "messages",
                element: (
                    <RequireAuth>
                        <Messages />
                    </RequireAuth>
                ),
            },
            {
                path: "notifications",
                element: (
                    <RequireAuth>
                        <Notifications />
                    </RequireAuth>
                ),
            },

            // jobseeker
            {
                path: "jobseeker/dashboard",
                element: (
                    <RequireAuth>
                        <RequireVerified>
                            <RequireRole role="jobseeker">
                                <SeekerDashboard />
                            </RequireRole>
                        </RequireVerified>
                    </RequireAuth>
                ),
            },
            {
                path: "jobseeker/profile",
                element: (
                    <RequireAuth>
                        <RequireVerified>
                            <RequireRole role="jobseeker">
                                <SeekerProfile />
                            </RequireRole>
                        </RequireVerified>
                    </RequireAuth>
                ),
            },
            {
                path: "jobseeker/resume",
                element: (
                    <RequireAuth>
                        <RequireVerified>
                            <RequireRole role="jobseeker">
                                <SeekerResume />
                            </RequireRole>
                        </RequireVerified>
                    </RequireAuth>
                ),
            },
            {
                path: "jobseeker/jobs",
                element: (
                    <RequireAuth>
                        <RequireVerified>
                            <RequireRole role="jobseeker">
                                <SeekerJobs />
                            </RequireRole>
                        </RequireVerified>
                    </RequireAuth>
                ),
            },
            {
                path: "jobseeker/applications",
                element: (
                    <RequireAuth>
                        <RequireVerified>
                            <RequireRole role="jobseeker">
                                <SeekerApplications />
                            </RequireRole>
                        </RequireVerified>
                    </RequireAuth>
                ),
            },

            // employer
            {
                path: "employer/dashboard",
                element: (
                    <RequireAuth>
                        <RequireVerified>
                            <RequireRole role="employer">
                                <EmployerDashboard />
                            </RequireRole>
                        </RequireVerified>
                    </RequireAuth>
                ),
            },
            {
                path: "employer/profile",
                element: (
                    <RequireAuth>
                        <RequireVerified>
                            <RequireRole role="employer">
                                <EmployerProfile />
                            </RequireRole>
                        </RequireVerified>
                    </RequireAuth>
                ),
            },
            {
                path: "employer/post-job",
                element: (
                    <RequireAuth>
                        <RequireVerified>
                            <RequireRole role="employer">
                                <EmployerPostJob />
                            </RequireRole>
                        </RequireVerified>
                    </RequireAuth>
                ),
            },
            {
                path: "employer/applicants",
                element: (
                    <RequireAuth>
                        <RequireVerified>
                            <RequireRole role="employer">
                                <EmployerApplicants />
                            </RequireRole>
                        </RequireVerified>
                    </RequireAuth>
                ),
            },

            { path: "*", element: <Navigate to="/feed" replace /> },
        ],
    },
]);
