import mongoose from "mongoose";

const SystemSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
    },
    { timestamps: true }
);

export const SystemModel = mongoose.model("System", SystemSchema);
