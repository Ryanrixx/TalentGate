import { Router } from "express";
import { JobModel } from "../models/job.model.js";

const router = Router();

router.post("/seed-jobs", async (req, res, next) => {
    try {
        // Never allow in production
        if (process.env.NODE_ENV === "production") {
            return res.status(403).json({ message: "Forbidden" });
        }

        // Simple secret gate
        const secret = req.headers["x-dev-secret"];
        if (!process.env.DEV_SEED_SECRET || secret !== process.env.DEV_SEED_SECRET) {
            return res.status(401).json({ message: "Missing/invalid dev secret" });
        }

        await JobModel.deleteMany({});

        const jobs = await JobModel.insertMany([
            {
                title: "Frontend Developer (React)",
                company: "TalentGate Labs",
                location: "Remote",
                type: "full-time",
                tags: ["react", "typescript", "tailwind"],
                description:
                    "Build clean UI experiences, collaborate with backend, and ship production-ready features.",
                requirements: ["React", "TypeScript", "Tailwind", "API integration"],
            },
            {
                title: "Backend Developer (Node + MongoDB)",
                company: "Corta",
                location: "Bangalore / Remote",
                type: "internship",
                tags: ["node", "express", "mongodb", "jwt"],
                description:
                    "Work on APIs, auth, and database design for scalable web apps.",
                requirements: ["Node.js", "Express", "MongoDB", "REST APIs"],
            },
            {
                title: "Full-Stack Intern (MERN)",
                company: "Startup (Stealth)",
                location: "Remote",
                type: "internship",
                tags: ["mern", "rest", "jwt"],
                description:
                    "Ship features end-to-end across React, Express, and MongoDB. Learn fast and build real systems.",
                requirements: ["JavaScript/TypeScript", "React", "Node.js", "MongoDB"],
            },
        ]);

        res.json({ inserted: jobs.length, jobs });
    } catch (err) {
        next(err);
    }
});

export default router;
