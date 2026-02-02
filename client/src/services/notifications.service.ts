import { api } from "./api";
import type { NotificationDTO } from "../types";

export function getNotifications() {
    return api<{ notifications: NotificationDTO[]; totalUnread: number; unreadMessages: number }>(
        "/notifications",
        { method: "GET" }
    );
}

export async function getNotificationSummary() {
    const out = await getNotifications();
    return { totalUnread: out.totalUnread, unreadMessages: out.unreadMessages };
}
