import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { loginController, meController, registerController, listUsersController } from "../controllers/auth.controller";

export const authRoutes = Router();

authRoutes.post("/register", registerController);
authRoutes.post("/login", loginController);
authRoutes.get("/me", authMiddleware, meController);

// users list for messaging
authRoutes.get("/users", authMiddleware, listUsersController);
