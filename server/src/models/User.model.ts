import mongoose from "mongoose";

const VerificationSchema = new mongoose.Schema(
    {
        name: String,
        age: Number,
        email: String,
        phone: String,
    },
    { _id: false }
);

const UserSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        passwordHash: { type: String, required: true },
        role: { type: String, enum: ["jobseeker", "employer"], required: true },
        verified: { type: Boolean, default: false },
        verification: { type: VerificationSchema, default: {} },
    },
    { timestamps: true }
);

export type UserRole = "jobseeker" | "employer";
export type UserDoc = mongoose.InferSchemaType<typeof UserSchema> & mongoose.Document;

export const User = mongoose.model("User", UserSchema);
