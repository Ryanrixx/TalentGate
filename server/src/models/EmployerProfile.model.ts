import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, lowercase: true, trim: true },
        name: { type: String, default: "" },
    },
    { _id: false }
);

const EmployerProfileSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true, required: true },

        companyName: { type: String, default: "" },
        website: { type: String, default: "" },
        about: { type: String, default: "" },

        // MVP: base64
        avatarBase64: { type: String, default: "" },
        bannerBase64: { type: String, default: "" },

        employees: { type: [EmployeeSchema], default: [] },
    },
    { timestamps: true }
);

export const EmployerProfile = mongoose.model("EmployerProfile", EmployerProfileSchema);
