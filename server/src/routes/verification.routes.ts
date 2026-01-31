import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { submitVerificationController } from "../controllers/verification.controller";

export const verificationRoutes = Router();
verificationRoutes.post("/submit", authMiddleware, submitVerificationController);
