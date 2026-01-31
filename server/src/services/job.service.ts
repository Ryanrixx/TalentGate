import { Job } from "../models/Job.model";
import { Application } from "../models/Application.model";

export async function listJobs() {
    const jobs = await Job.find().sort({ createdAt: -1 }).limit(50);
    return jobs;
}

export async function createJob(employerUserId: string, payload: any) {
    const job = await Job.create({ employerUserId, ...payload });
    return job;
}

export async function apply(jobId: string, seekerUserId: string) {
    await Application.create({ jobId, seekerUserId });
}

export async function myApplications(seekerUserId: string) {
    const rows = await Application.find({ seekerUserId }).sort({ createdAt: -1 }).populate("jobId");
    return rows.map((r: any) => ({
        id: String(r._id),
        createdAt: r.createdAt,
        jobTitle: r.jobId?.title,
        companyName: r.jobId?.companyName,
    }));
}

export async function applicants(jobId: string) {
    const rows = await Application.find({ jobId }).sort({ createdAt: -1 }).populate("seekerUserId");
    return rows.map((r: any) => ({
        id: String(r._id),
        createdAt: r.createdAt,
        seekerEmail: r.seekerUserId?.email,
    }));
}
