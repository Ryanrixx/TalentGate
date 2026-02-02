import mongoose from "mongoose";

const SeekerProfileSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true, required: true },

        headline: { type: String, default: "" },
        about: { type: String, default: "" },
        location: { type: String, default: "" },
        skills: { type: [String], default: [] },

        // MVP: base64 (data:image/...;base64,xxxx)
        avatarBase64: { type: String, default: "" },
        bannerBase64: { type: String, default: "" },


            // MVP resume blob (free-form)
            resume: { type: mongoose.Schema.Types.Mixed, default: null },
            resumeText: { type: String, default: "" },
    },
    { timestamps: true }
);

export const SeekerProfile = mongoose.model("SeekerProfile", SeekerProfileSchema);
