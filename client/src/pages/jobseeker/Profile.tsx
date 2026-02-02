import React, { useEffect, useMemo, useState } from "react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Textarea } from "../../components/ui/Textarea";
import { Badge } from "../../components/ui/Badge";
import { VerifiedBadge } from "../../components/ui/VerifiedBadge";
import { Avatar } from "../../components/ui/Avatar";
import { Divider } from "../../components/ui/Divider";
import { getMyProfile, saveMyProfile } from "../../services/profile.service";
import { fileToBase64 } from "../../utils/file";
import { useAuth } from "../../store/auth.store";
import { useNavigate } from "react-router-dom";

export function SeekerProfile(): React.ReactElement {
    const nav = useNavigate();
    const { user } = useAuth();

    const [loading, setLoading] = useState(true);

    const [headline, setHeadline] = useState("");
    const [about, setAbout] = useState("");
    const [location, setLocation] = useState("");
    const [skillsText, setSkillsText] = useState("");

    const [avatarBase64, setAvatarBase64] = useState<string>("");
    const [bannerBase64, setBannerBase64] = useState<string>("");

    useEffect(() => {
        (async () => {
            setLoading(true);
            const r = await getMyProfile();
            const p = r.profile ?? {};
            setHeadline(p.headline ?? "");
            setAbout(p.about ?? "");
            setLocation(p.location ?? "");
            setSkillsText((p.skills ?? []).join(", "));
            setAvatarBase64(p.avatarBase64 ?? "");
            setBannerBase64(p.bannerBase64 ?? "");
            setLoading(false);
        })();
    }, []);

    const skills = useMemo(
        () => skillsText.split(",").map((s) => s.trim()).filter(Boolean),
        [skillsText]
    );

    async function onSave() {
        await saveMyProfile({
            headline,
            about,
            location,
            skills,
            avatarBase64,
            bannerBase64,
        });
    }

    return (
        <div className="mx-auto w-full max-w-6xl px-4 py-6">
            <div className="mb-4 flex items-end justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-semibold text-zinc-100">Profile</h1>
                    <p className="text-sm text-zinc-400">LinkedIn-style profile, TalentGate theme.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="ghost" onClick={() => nav("/resume")}>
                        Edit Resume
                    </Button>
                    <Button onClick={onSave}>{loading ? "Loading..." : "Save"}</Button>
                </div>
            </div>

            {/* Header card */}
            <Card className="overflow-hidden p-0">
                <div className="relative">
                    {/* Banner */}
                    <div className="h-40 w-full bg-zinc-900">
                        {bannerBase64 ? (
                            <img src={bannerBase64} className="h-full w-full object-cover" alt="banner" />
                        ) : (
                            <div className="h-full w-full bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-800" />
                        )}
                    </div>

                    {/* Banner upload */}
                    <label className="absolute right-4 top-4 cursor-pointer rounded-xl border border-zinc-700 bg-zinc-950/70 px-3 py-2 text-xs text-zinc-200 hover:bg-zinc-900">
                        Upload banner
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={async (e) => {
                                const f = e.target.files?.[0];
                                if (!f) return;
                                setBannerBase64(await fileToBase64(f));
                            }}
                        />
                    </label>

                    {/* Avatar */}
                    <div className="absolute -bottom-10 left-6 flex items-end gap-3">
                        <div className="relative">
                            <div className="h-20 w-20 overflow-hidden rounded-full border-2 border-zinc-950 bg-zinc-900">
                                {avatarBase64 ? (
                                    <img src={avatarBase64} className="h-full w-full object-cover" alt="avatar" />
                                ) : (
                                    <Avatar name={user?.name ?? "You"} size={80} />
                                )}
                            </div>

                            <label className="absolute -right-1 -bottom-1 cursor-pointer rounded-full border border-zinc-700 bg-zinc-950 px-2 py-2 text-[10px] text-zinc-200 hover:bg-zinc-900">
                                ✎
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={async (e) => {
                                        const f = e.target.files?.[0];
                                        if (!f) return;
                                        setAvatarBase64(await fileToBase64(f));
                                    }}
                                />
                            </label>
                        </div>
                    </div>
                </div>

                <div className="px-6 pb-6 pt-14">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                            <div className="flex items-center gap-2">
                                <h2 className="text-xl font-semibold text-zinc-100">{user?.name ?? "Your Name"}</h2>
                                {user?.verified ? <VerifiedBadge /> : null}
                            </div>
                            <div className="mt-1 text-sm text-zinc-300">{headline || "Add your headline..."}</div>
                            <div className="mt-1 text-sm text-zinc-500">{location || "Add location..."}</div>

                            <div className="mt-3 flex flex-wrap gap-2">
                                <Badge>{user?.role ?? "jobseeker"}</Badge>
                                {user?.verified ? <Badge>verified</Badge> : <Badge>read-only</Badge>}
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <Button variant="ghost" onClick={() => nav("/messages")}>
                                Message
                            </Button>
                            <Button variant="ghost" onClick={() => nav("/notifications")}>
                                Notifications
                            </Button>
                        </div>
                    </div>

                    <Divider className="my-4" />

                    {/* Content grid like LinkedIn */}
                    <div className="grid grid-cols-12 gap-4">
                        {/* Main */}
                        <div className="col-span-12 md:col-span-8 space-y-4">
                            <Card className="p-4">
                                <h3 className="text-sm font-semibold text-zinc-100">About</h3>
                                <div className="mt-3">
                                    <label className="text-xs text-zinc-400">
                                    </label>
                                    <Textarea
                                        value={about}
                                        onChange={(e) => setAbout(e.target.value)}
                                        placeholder="Write a strong summary..."
                                        rows={5}
                                    />
                                </div>
                            </Card>

                            <Card className="p-4">
                                <h3 className="text-sm font-semibold text-zinc-100">Skills</h3>
                                <div className="mt-3">
                                    <Input
                                        label=""
                                        value={skillsText}
                                        onChange={(e) => setSkillsText(e.target.value)}
                                        placeholder="React, TypeScript, Node, MongoDB..."
                                    />
                                </div>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {skills.slice(0, 18).map((s) => (
                                        <Badge key={s}>{s}</Badge>
                                    ))}
                                </div>
                            </Card>

                            <Card className="p-4">
                                <h3 className="text-sm font-semibold text-zinc-100">Activity</h3>
                                <p className="mt-1 text-sm text-zinc-400">Your posts and interactions will appear here (demo).</p>
                                <div className="mt-3 grid grid-cols-1 gap-3">
                                    <Card className="p-3">
                                        <div className="text-sm text-zinc-200">Posted: “Building TalentGate — verified hiring + living profile.”</div>
                                        <div className="mt-2 text-xs text-zinc-500">2h • demo</div>
                                    </Card>
                                    <Card className="p-3">
                                        <div className="text-sm text-zinc-200">Commented on: “Verified-only jobs reduce spam.”</div>
                                        <div className="mt-2 text-xs text-zinc-500">1d • demo</div>
                                    </Card>
                                </div>
                            </Card>
                        </div>

                        {/* Right rail */}
                        <div className="col-span-12 md:col-span-4 space-y-4">
                            <Card className="p-4">
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <h3 className="text-sm font-semibold text-zinc-100">Resume</h3>
                                        <p className="mt-1 text-sm text-zinc-400">Open your editable resume workspace.</p>
                                    </div>
                                    <button type="button" onClick={() => nav("/jobseeker/resume")}>Open</button>
                                </div>
                                <Divider className="my-3" />
                                <Button variant="ghost" className="w-full">
                                    AI Enhance (soon)
                                </Button>
                            </Card>

                            <Card className="p-4">
                                <h3 className="text-sm font-semibold text-zinc-100">Recommendations</h3>
                                <div className="mt-3 space-y-2">
                                    <button onClick={() => nav("/jobs")} className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-left text-sm text-zinc-200 hover:bg-zinc-900/40">
                                        Jobs you might like
                                        <div className="text-xs text-zinc-500">Based on your skills (demo)</div>
                                    </button>
                                    <button onClick={() => nav("/feed")} className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-left text-sm text-zinc-200 hover:bg-zinc-900/40">
                                        Posts to read
                                        <div className="text-xs text-zinc-500">Creators + hiring updates</div>
                                    </button>
                                    <button onClick={() => nav("/communities")} className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-left text-sm text-zinc-200 hover:bg-zinc-900/40">
                                        Communities
                                        <div className="text-xs text-zinc-500">Find people like you</div>
                                    </button>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
