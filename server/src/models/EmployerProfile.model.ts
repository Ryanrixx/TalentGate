import mongoose from "mongoose";

const EmployerProfileSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true, required: true },
        companyName: { type: String, default: "" },
        website: { type: String, default: "" },
    },
    { timestamps: true }
);

export const EmployerProfile = mongoose.model("EmployerProfile", EmployerProfileSchema);
