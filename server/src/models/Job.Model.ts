import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        company: { type: String, required: true, trim: true },
        location: { type: String, default: "Remote", trim: true },
        type: { type: String, default: "Full-time", trim: true }, // Full-time / Internship / Contract
        salaryRange: { type: String, default: "", trim: true },
        description: { type: String, default: "", trim: true },
        skills: { type: [String], default: [] },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export const JobModel = mongoose.model("Job", JobSchema);
