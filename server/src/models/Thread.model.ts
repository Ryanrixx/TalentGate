import mongoose from "mongoose";

const ThreadSchema = new mongoose.Schema(
    {
        participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }],
        lastText: { type: String, default: "" },
        lastAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

ThreadSchema.index({ participants: 1 });

export type ThreadDoc = mongoose.InferSchemaType<typeof ThreadSchema> & mongoose.Document;
export const Thread = mongoose.model("Thread", ThreadSchema);
