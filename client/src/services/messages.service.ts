import { api } from "./api";
import type { MessageDTO, ThreadDTO } from "../types";

export function listThreads() {
    return api<{ threads: ThreadDTO[] }>("/messages/threads", { method: "GET" });
}

export function createThread(otherUserId: string) {
    return api<{ thread: ThreadDTO }>("/messages/threads", {
        method: "POST",
        body: JSON.stringify({ otherUserId }),
    });
}

export function getThread(threadId: string) {
    return api<{ thread: ThreadDTO; messages: MessageDTO[] }>(`/messages/threads/${threadId}`, {
        method: "GET",
    });
}

export function sendMessage(threadId: string, text: string) {
    return api<{ message: MessageDTO }>(`/messages/threads/${threadId}/messages`, {
        method: "POST",
        body: JSON.stringify({ text }),
    });
}

export function markRead(threadId: string) {
    return api<{ ok: true }>(`/messages/threads/${threadId}/read`, { method: "POST" });
}
