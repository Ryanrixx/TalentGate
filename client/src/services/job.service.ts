import { api } from "./api";
import type { JobDTO } from "../types";

export function listJobs() {
    return api<{ jobs: JobDTO[] }>("/jobs", { method: "GET" });
}

export function createJob(payload: {
    title: string;
    companyName: string;
    location: string;
    type: JobDTO["type"];
    description: string;
}) {
    return api<{ job: JobDTO }>("/jobs", { method: "POST", body: JSON.stringify(payload) });
}

export function applyToJob(jobId: string) {
    return api<{ ok: true }>("/jobs/apply", {
        method: "POST",
        body: JSON.stringify({ jobId }),
    });
}

export function myApplications() {
    return api<{ applications: any[] }>("/jobs/my-applications", { method: "GET" });
}

export function employerApplicants(jobId: string) {
    return api<{ applicants: any[] }>("/jobs/applicants?jobId=" + encodeURIComponent(jobId), {
        method: "GET",
    });
}
