import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
    {
        threadId: { type: mongoose.Schema.Types.ObjectId, ref: "Thread", required: true },
        senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        text: { type: String, required: true },
        readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
    { timestamps: true }
);

MessageSchema.index({ threadId: 1, createdAt: 1 });

export type MessageDoc = mongoose.InferSchemaType<typeof MessageSchema> & mongoose.Document;
export const Message = mongoose.model("Message", MessageSchema);
