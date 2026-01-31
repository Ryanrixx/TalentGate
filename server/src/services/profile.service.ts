import { SeekerProfile } from "../models/SeekerProfile.model";
import { EmployerProfile } from "../models/EmployerProfile.model";

export async function getProfile(userId: string, role: "jobseeker" | "employer") {
    if (role === "jobseeker") {
        const p = await SeekerProfile.findOne({ userId });
        return p || { userId, headline: "", skills: [] };
    }
    const p = await EmployerProfile.findOne({ userId });
    return p || { userId, companyName: "", website: "" };
}

export async function saveProfile(userId: string, role: "jobseeker" | "employer", payload: any) {
    if (role === "jobseeker") {
        const updated = await SeekerProfile.findOneAndUpdate(
            { userId },
            { $set: { headline: payload.headline ?? "", skills: payload.skills ?? [] } },
            { upsert: true, new: true }
        );
        return updated;
    }

    const updated = await EmployerProfile.findOneAndUpdate(
        { userId },
        { $set: { companyName: payload.companyName ?? "", website: payload.website ?? "" } },
        { upsert: true, new: true }
    );
    return updated;
}
