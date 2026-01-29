import { Router } from "express";
import { JobModel } from "../models/job.model.js";

const router = Router();

/**
 * GET /api/v1/jobs
 * Public: list active jobs
 */
router.get("/", async (_req, res, next) => {
    try {
        const jobs = await JobModel.find({ isActive: true })
            .sort({ createdAt: -1 })
            .limit(50)
            .lean();

        res.json({ count: jobs.length, jobs });
    } catch (err) {
        next(err);
    }
});

/**
 * POST /api/v1/jobs/seed
 * Dev-only: create sample jobs quickly
 */
router.post("/seed", async (_req, res, next) => {
    try {
        const docs = await JobModel.insertMany([
            {
                title: "Full-Stack Developer",
                company: "TalentGate Labs",
                location: "Remote",
                type: "Full-time",
                salaryRange: "₹10–12 LPA",
                skills: ["React", "Node.js", "MongoDB", "Express"],
                description: "Build product features end-to-end with clean architecture.",
            },
            {
                title: "Frontend Engineer (React)",
                company: "Corta",
                location: "Bangalore",
                type: "Full-time",
                salaryRange: "₹12–18 LPA",
                skills: ["React", "TypeScript", "Tailwind"],
                description: "Build responsive UI systems and ship fast.",
            },
            {
                title: "Data Science Intern",
                company: "AI Studio",
                location: "Remote",
                type: "Internship",
                salaryRange: "₹25k–40k / month",
                skills: ["Python", "Pandas", "ML Basics"],
                description: "Work on matching signals and ranking experiments.",
            },
        ]);

        res.status(201).json({ message: "Seeded jobs", inserted: docs.length });
    } catch (err) {
        next(err);
    }
});

export default router;
