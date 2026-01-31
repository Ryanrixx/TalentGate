import { api } from "./api";

export function getMyProfile() {
    return api<any>("/profiles/me", { method: "GET" });
}

export function saveMyProfile(payload: any) {
    return api<any>("/profiles/me", { method: "PUT", body: JSON.stringify(payload) });
}
