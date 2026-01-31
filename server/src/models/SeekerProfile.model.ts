import mongoose from "mongoose";

const SeekerProfileSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true, required: true },
        headline: { type: String, default: "" },
        skills: { type: [String], default: [] },
    },
    { timestamps: true }
);

export const SeekerProfile = mongoose.model("SeekerProfile", SeekerProfileSchema);
