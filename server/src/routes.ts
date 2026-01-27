import { Router } from "express";

const router = Router();

// Base test route for router health
router.get("/health", (_req, res) => {
    res.json({ status: "OK", layer: "routes" });
});

export default router;
