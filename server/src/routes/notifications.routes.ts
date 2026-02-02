import { Router } from "express";
import mongoose from "mongoose";
import { authMiddleware } from "../middlewares/auth.middleware";
import { Thread } from "../models/Thread.model";
import { Message } from "../models/Message.model";
import { User } from "../models/User.model";

export const notificationsRoutes = Router();

function displayName(u: any) {
    const n = u?.verification?.name;
    if (n) return n;
    return String(u.email || "User").split("@")[0];
}

notificationsRoutes.get("/", authMiddleware, async (req: any, res) => {
    const userId = req.auth.userId;

    const threads = await Thread.find({ participants: userId }).sort({ lastAt: -1 }).limit(20);

    let unreadMessages = 0;
    const notifications: any[] = [];

    for (const t of threads) {
        const unread = await Message.countDocuments({
            threadId: t._id,
            readBy: { $ne: new mongoose.Types.ObjectId(userId) },
            senderId: { $ne: new mongoose.Types.ObjectId(userId) },
        });

        if (unread > 0) {
            unreadMessages += unread;

            const others = await User.find({ _id: { $in: t.participants, $ne: userId } });
            const otherName = others[0] ? displayName(others[0]) : "Someone";

            notifications.push({
                id: `msg_${String(t._id)}`,
                type: "message",
                title: "New message",
                body: `${otherName} sent you ${unread} new message${unread > 1 ? "s" : ""}.`,
                createdAt: (t.lastAt ? new Date(t.lastAt) : new Date()).toISOString(),
                read: false,
                meta: { threadId: String(t._id) },
            });
        }
    }

    const totalUnread = unreadMessages;

    res.json({ notifications, totalUnread, unreadMessages });
});
