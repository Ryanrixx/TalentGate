import { Schema, model, type InferSchemaType } from "mongoose";

const jobSchema = new Schema(
    {
        title: { type: String, required: true, trim: true },
        company: { type: String, required: true, trim: true },
        location: { type: String, default: "Remote", trim: true },

        type: {
            type: String,
            enum: ["full-time", "part-time", "internship", "contract"],
            default: "full-time",
        },

        tags: { type: [String], default: [] },

        description: { type: String, required: true },
        requirements: { type: [String], default: [] },

        createdBy: { type: Schema.Types.ObjectId, ref: "User", required: false },
    },
    { timestamps: true }
);

export type JobDoc = InferSchemaType<typeof jobSchema>;
export const JobModel = model("Job", jobSchema);
