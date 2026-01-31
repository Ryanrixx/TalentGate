import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
    {
        employerUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        title: { type: String, required: true },
        companyName: { type: String, required: true },
        location: { type: String, required: true },
        type: { type: String, enum: ["full-time", "part-time", "internship", "contract"], required: true },
        description: { type: String, required: true },
    },
    { timestamps: true }
);

export const Job = mongoose.model("Job", JobSchema);
