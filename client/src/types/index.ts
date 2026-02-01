export type UserRole = "jobseeker" | "employer";

export type UserDTO = {
    name: string;
    id: string;
    email: string;
    role: UserRole;
    verified: boolean;
    avatarUrl?: string;
};

export type JobDTO = {
    id: string;
    title: string;
    companyName: string;
    location: string;
    type: "full-time" | "part-time" | "internship" | "contract";
    description: string;
    createdAt: string;
};

export type ApplicationDTO = {
    id: string;
    jobId: string;
    createdAt: string;
};
