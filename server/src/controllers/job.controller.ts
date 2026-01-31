import type { Request, Response } from "express";
import type { AuthedRequest } from "../middlewares/auth.middleware";
import * as jobSvc from "../services/job.service";

export async function listJobsController(_req: Request, res: Response) {
    const jobs = await jobSvc.listJobs();
    return res.json({
        jobs: jobs.map((j: any) => ({
            id: String(j._id),
            title: j.title,
            companyName: j.companyName,
            location: j.location,
            type: j.type,
            description: j.description,
            createdAt: j.createdAt,
        })),
    });
}

export async function createJobController(req: AuthedRequest, res: Response) {
    try {
        const job = await jobSvc.createJob(req.auth!.userId, req.body);
        return res.json({
            job: {
                id: String(job._id),
                title: job.title,
                companyName: job.companyName,
                location: job.location,
                type: job.type,
                description: job.description,
                createdAt: job.createdAt,
            },
        });
    } catch (e: any) {
        return res.status(400).json({ message: e.message || "Failed to create job" });
    }
}

export async function applyController(req: AuthedRequest, res: Response) {
    try {
        const { jobId } = req.body;
        await jobSvc.apply(jobId, req.auth!.userId);
        return res.json({ ok: true });
    } catch (e: any) {
        return res.status(400).json({ message: e.message || "Failed to apply" });
    }
}

export async function myApplicationsController(req: AuthedRequest, res: Response) {
    const applications = await jobSvc.myApplications(req.auth!.userId);
    return res.json({ applications });
}

export async function applicantsController(req: AuthedRequest, res: Response) {
    const jobId = String(req.query.jobId || "");
    if (!jobId) return res.status(400).json({ message: "jobId is required" });

    const applicants = await jobSvc.applicants(jobId);
    return res.json({ applicants });
}
