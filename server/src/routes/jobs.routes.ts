import { Router } from "express";
import { JobModel } from '../models/job.model.js';
import { requireAuth } from "../middleware/requireAuth.js";
import { requireRole } from "../middleware/requireRole.js";

const router = Router();

// GET /api/v1/jobs  (public)
router.get("/", async (_req, res, next) => {
    try {
        const jobs = await JobModel.find().sort({ createdAt: -1 }).limit(50);
        res.json(jobs);
    } catch (err) {
        next(err);
    }
});

// GET /api/v1/jobs/:id (public)
router.get("/", async (_req, res, next) => {
    try {
        const jobs = await JobModel.find().sort({ createdAt: -1 }).limit(50);
        res.json({ count: jobs.length, jobs });
    } catch (err) {
        next(err);
    }
});


// POST /api/v1/jobs (employer only)
router.post("/", requireAuth, requireRole("employer"), async (req, res, next) => {
    try {
        const user = (req as any).user;

        const { title, company, location, type, tags, description, requirements } = req.body;

        if (!title || !company || !description) {
            return res.status(400).json({ message: "title, company, description are required" });
        }

        const job = await JobModel.create({
            title,
            company,
            location,
            type,
            tags: Array.isArray(tags) ? tags : [],
            description,
            requirements: Array.isArray(requirements) ? requirements : [],
            createdBy: user.id,
        });

        res.status(201).json(job);
    } catch (err) {
        next(err);
    }
});

export default router;
