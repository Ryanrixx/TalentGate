import mongoose from "mongoose";

export type UserRole = "jobseeker" | "employer";

const UserSchema = new mongoose.Schema(
    {
        role: {
            type: String,
            enum: ["jobseeker", "employer"],
            required: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true,
            index: true,
        },

        passwordHash: {
            type: String,
            required: true,
            select: false, // IMPORTANT: exclude by default from queries
        },
    },
    { timestamps: true }
);

export const UserModel = mongoose.model("User", UserSchema);
