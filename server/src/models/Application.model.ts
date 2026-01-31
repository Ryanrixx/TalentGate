import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema(
    {
        jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
        seekerUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    },
    { timestamps: true }
);

ApplicationSchema.index({ jobId: 1, seekerUserId: 1 }, { unique: true });

export const Application = mongoose.model("Application", ApplicationSchema);
