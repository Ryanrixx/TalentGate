import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { verifiedMiddleware } from "../middlewares/verified.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";

import {
    applicantsController,
    applyController,
    createJobController,
    listJobsController,
    myApplicationsController,
} from "../controllers/job.controller";

export const jobRoutes = Router();

jobRoutes.get("/", listJobsController);

// employer create job
jobRoutes.post("/", authMiddleware, verifiedMiddleware, roleMiddleware("employer"), createJobController);

// seeker apply
jobRoutes.post("/apply", authMiddleware, verifiedMiddleware, roleMiddleware("jobseeker"), applyController);

// seeker list my applications
jobRoutes.get("/my-applications", authMiddleware, verifiedMiddleware, roleMiddleware("jobseeker"), myApplicationsController);

// employer view applicants
jobRoutes.get("/applicants", authMiddleware, verifiedMiddleware, roleMiddleware("employer"), applicantsController);
