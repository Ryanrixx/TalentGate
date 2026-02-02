export type UserRole = "jobseeker" | "employer";

export type UserDTO = {
    name: string;
    id: string;
    email: string;
    role: UserRole;
    verified: boolean;
    avatarUrl?: string;
    bannerUrl?: string;
};

export type UserLiteDTO = {
    id: string;
    name: string;
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

export type ThreadDTO = {
    id: string;
    participants: UserLiteDTO[];
    lastText?: string;
    lastAt?: string;
    unreadCount?: number;
};

export type MessageDTO = {
    id: string;
    threadId: string;
    senderId: string;
    text: string;
    createdAt: string;
};

export type NotificationDTO = {
    id: string;
    type: "message";
    title: string;
    body: string;
    createdAt: string;
    read: boolean;
    meta?: Record<string, any>;
};
export type ResumeLink = { label: string; url: string };

export type ResumeExperience = {
    id: string;
    role: string;
    company: string;
    location?: string;
    start: string;
    end: string; // "Present" allowed
    bullets: string[];
};

export type ResumeProject = {
    id: string;
    name: string;
    link?: string;
    tech?: string;
    bullets: string[];
};

export type ResumeEducation = {
    id: string;
    school: string;
    degree: string;
    field?: string;
    start: string;
    end: string;
    score?: string;
};

export type ResumeCert = {
    id: string;
    name: string;
    issuer?: string;
    year?: string;
    link?: string;
};

export type ResumeData = {
    header: {
        fullName: string;
        title: string;
        location: string;
        email: string;
        phone: string;
        links: ResumeLink[];
    };
    summary: string;
    skills: string[];
    experience: ResumeExperience[];
    projects: ResumeProject[];
    education: ResumeEducation[];
    certifications: ResumeCert[];
    achievements: string[];
};
