import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { useAuth } from "../../store/auth.store";
import { VerifiedBadge } from "../ui/VerifiedBadge";

export function ProfileMiniCard() {
    const nav = useNavigate();
    const { user } = useAuth();

    const profilePath =
        user?.role === "jobseeker"
            ? "/jobseeker/profile"
            : user?.role === "employer"
                ? "/employer/profile"
                : "/auth/sign-in";

    const displayName = user?.name || "Your Account";
    const subtitle =
        user?.role === "jobseeker"
            ? "Job Seeker • Living profile"
            : user?.role === "employer"
                ? "Employer • Verified hiring"
                : "Browse in read-only";

    const avatarLetter = (user?.name || user?.email || "T").slice(0, 1).toUpperCase();
    const avatarUrl = (user as any)?.avatarUrl as string | undefined;

    return (
        <Card className="space-y-4">
            <div className="flex items-center gap-3">
                <div className="relative">
                    <div className="grid h-11 w-11 place-items-center overflow-hidden rounded-2xl bg-zinc-900 text-zinc-100 font-semibold">
                        {avatarUrl ? (
                            <img
                                src={avatarUrl}
                                alt="avatar"
                                className="h-full w-full object-cover"
                                referrerPolicy="no-referrer"
                            />
                        ) : (
                            avatarLetter
                        )}
                    </div>

                    {user?.verified ? (
                        <div className="absolute -right-2 -bottom-2">
                            <VerifiedBadge />
                        </div>
                    ) : null}
                </div>

                <div className="min-w-0">
                    <div className="truncate text-sm font-semibold">{displayName}</div>
                    <div className="truncate text-xs text-zinc-500">{subtitle}</div>
                </div>
            </div>

            <div className="flex flex-wrap gap-2">
                <Badge>{user?.role ?? "guest"}</Badge>
                {!user?.verified ? (
                    <Badge className="text-amber-200 border-amber-900 bg-amber-950/30">
                        read-only
                    </Badge>
                ) : null}
            </div>

            <div className="space-y-2">
                <div className="rounded-2xl border border-zinc-900 bg-zinc-950 px-4 py-3">
                    <div className="text-xs text-zinc-500">Tip</div>
                    <div className="mt-1 text-sm text-zinc-300">
                        Keep your profile updated — it will auto-fill job applications.
                    </div>
                </div>

                <Button variant="secondary" className="w-full" onClick={() => nav(profilePath)}>
                    Go to Profile
                </Button>
            </div>
        </Card>
    );
}
