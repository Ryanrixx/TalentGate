import { Router } from "express";
import mongoose from "mongoose";
import { authMiddleware } from "../middlewares/auth.middleware";
import { User } from "../models/User.model";
import { Thread } from "../models/Thread.model";
import { Message } from "../models/Message.model";

export const messagesRoutes = Router();

function displayName(u: any) {
    const n = u?.verification?.name;
    if (n) return n;
    return String(u.email || "User").split("@")[0];
}

messagesRoutes.get("/threads", authMiddleware, async (req: any, res) => {
    const userId = req.auth.userId;

    const threads = await Thread.find({ participants: userId }).sort({ lastAt: -1 }).limit(50);

    const out = [];
    for (const t of threads) {
        const participants = await User.find({ _id: { $in: t.participants } });

        const unread = await Message.countDocuments({
            threadId: t._id,
            readBy: { $ne: new mongoose.Types.ObjectId(userId) },
            senderId: { $ne: new mongoose.Types.ObjectId(userId) },
        });

        out.push({
            id: String(t._id),
            participants: participants.map((p) => ({
                id: String(p._id),
                name: displayName(p),
                role: p.role,
                verified: p.verified,
                avatarUrl: p.avatarUrl || "",
            })),
            lastText: t.lastText || "",
            lastAt: t.lastAt ? new Date(t.lastAt).toISOString() : "",
            unreadCount: unread,
        });
    }

    res.json({ threads: out });
});

messagesRoutes.post("/threads", authMiddleware, async (req: any, res) => {
    const userId = req.auth.userId;
    const { otherUserId } = req.body || {};
    if (!otherUserId) return res.status(400).json({ message: "otherUserId is required" });

    const a = String(userId);
    const b = String(otherUserId);

    let thread =
        (await Thread.findOne({
            participants: { $all: [a, b] },
            $expr: { $eq: [{ $size: "$participants" }, 2] },
        })) || null;

    if (!thread) {
        thread = await Thread.create({ participants: [a, b], lastText: "", lastAt: new Date() });
    }

    const participants = await User.find({ _id: { $in: thread.participants } });

    res.json({
        thread: {
            id: String(thread._id),
            participants: participants.map((p) => ({
                id: String(p._id),
                name: displayName(p),
                role: p.role,
                verified: p.verified,
                avatarUrl: p.avatarUrl || "",
            })),
            lastText: thread.lastText || "",
            lastAt: thread.lastAt ? new Date(thread.lastAt).toISOString() : "",
            unreadCount: 0,
        },
    });
});

messagesRoutes.get("/threads/:id", authMiddleware, async (req: any, res) => {
    const userId = req.auth.userId;
    const threadId = req.params.id;

    const thread = await Thread.findById(threadId);
    if (!thread) return res.status(404).json({ message: "Thread not found" });
    if (!thread.participants.map(String).includes(String(userId))) {
        return res.status(403).json({ message: "Forbidden" });
    }

    const participants = await User.find({ _id: { $in: thread.participants } });
    const msgs = await Message.find({ threadId }).sort({ createdAt: 1 }).limit(500);

    res.json({
        thread: {
            id: String(thread._id),
            participants: participants.map((p) => ({
                id: String(p._id),
                name: displayName(p),
                role: p.role,
                verified: p.verified,
                avatarUrl: p.avatarUrl || "",
            })),
            lastText: thread.lastText || "",
            lastAt: thread.lastAt ? new Date(thread.lastAt).toISOString() : "",
        },
        messages: msgs.map((m) => ({
            id: String(m._id),
            threadId: String(m.threadId),
            senderId: String(m.senderId),
            text: m.text,
            createdAt: m.createdAt.toISOString(),
        })),
    });
});

messagesRoutes.post("/threads/:id/messages", authMiddleware, async (req: any, res) => {
    const userId = req.auth.userId;
    const threadId = req.params.id;
    const { text } = req.body || {};
    if (!text || !String(text).trim()) return res.status(400).json({ message: "text is required" });

    const thread = await Thread.findById(threadId);
    if (!thread) return res.status(404).json({ message: "Thread not found" });
    if (!thread.participants.map(String).includes(String(userId))) {
        return res.status(403).json({ message: "Forbidden" });
    }

    const msg = await Message.create({
        threadId,
        senderId: userId,
        text: String(text),
        readBy: [userId],
    });

    thread.lastText = String(text).slice(0, 200);
    thread.lastAt = new Date();
    await thread.save();

    res.json({
        message: {
            id: String(msg._id),
            threadId: String(msg.threadId),
            senderId: String(msg.senderId),
            text: msg.text,
            createdAt: msg.createdAt.toISOString(),
        },
    });
});

messagesRoutes.post("/threads/:id/read", authMiddleware, async (req: any, res) => {
    const userId = req.auth.userId;
    const threadId = req.params.id;

    await Message.updateMany(
        { threadId, readBy: { $ne: new mongoose.Types.ObjectId(userId) } },
        { $addToSet: { readBy: userId } }
    );

    res.json({ ok: true });
});
