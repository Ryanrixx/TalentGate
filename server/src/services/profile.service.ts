import { SeekerProfile } from "../models/SeekerProfile.model";
import { EmployerProfile } from "../models/EmployerProfile.model";
import { User } from "../models/User.model";

type Role = "jobseeker" | "employer";

export async function getProfile(userId: string, role: Role) {
    if (role === "jobseeker") {
        const p = await SeekerProfile.findOne({ userId });
        return (
            p || {
                userId,
                headline: "",
                about: "",
                location: "",
                skills: [],
                avatarBase64: "",
                bannerBase64: "",
                resumeText: "",
                resume: null,
            }
        );
    }

    const p = await EmployerProfile.findOne({ userId });
    if (!p) {
        return {
            userId,
            companyName: "",
            website: "",
            about: "",
            avatarBase64: "",
            bannerBase64: "",
            employees: [],
        };
    }

    // Compute "exists" for employees (whether user accounts exist)
    const emails = (p.employees ?? []).map((e: any) => String(e.email || "").toLowerCase()).filter(Boolean);
    const users = await User.find({ email: { $in: emails } }).select("_id email").lean();

    const existsMap = new Map<string, any>();
    for (const u of users) existsMap.set(String(u.email).toLowerCase(), u);

    const employees = (p.employees ?? []).map((e: any) => {
        const email = String(e.email || "").toLowerCase();
        const u = existsMap.get(email);
        return {
            email,
            name: e.name || "",
            exists: Boolean(u),
            userId: u?._id ? String(u._id) : undefined,
        };
    });

    return { ...p.toObject(), employees };
}

export async function saveProfile(userId: string, role: Role, payload: any) {
    if (role === "jobseeker") {
        const updated = await SeekerProfile.findOneAndUpdate(
            { userId },
            {
                $set: {
                    headline: payload.headline ?? "",
                    about: payload.about ?? "",
                    location: payload.location ?? "",
                    skills: Array.isArray(payload.skills) ? payload.skills : [],

                    avatarBase64: payload.avatarBase64 ?? "",
                    bannerBase64: payload.bannerBase64 ?? "",

                    resumeText: payload.resumeText ?? "",
                    resume: payload.resume ?? payload.resumeText ? payload.resume : payload.resume ?? null,
                },
            },
            { upsert: true, new: true }
        );
        return updated;
    }

    const updated = await EmployerProfile.findOneAndUpdate(
        { userId },
        {
            $set: {
                companyName: payload.companyName ?? "",
                website: payload.website ?? "",
                about: payload.about ?? "",

                avatarBase64: payload.avatarBase64 ?? "",
                bannerBase64: payload.bannerBase64 ?? "",

                employees: Array.isArray(payload.employees) ? payload.employees : [],
            },
        },
        { upsert: true, new: true }
    );

    // Return with computed employee statuses
    return await getProfile(userId, "employer");
}
