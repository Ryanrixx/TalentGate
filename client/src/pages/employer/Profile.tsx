import React, { useEffect, useMemo, useState } from "react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Textarea } from "../../components/ui/Textarea";
import { Badge } from "../../components/ui/Badge";
import { VerifiedBadge } from "../../components/ui/VerifiedBadge";
import { Divider } from "../../components/ui/Divider";
import { Avatar } from "../../components/ui/Avatar";
import { getMyProfile, saveMyProfile } from "../../services/profile.service";
import { fileToBase64 } from "../../utils/file";
import { useAuth } from "../../store/auth.store";

type Employee = { email: string; name?: string; exists?: boolean; userId?: string };

export function EmployerProfile(): React.ReactElement {
    const { user } = useAuth();

    const [loading, setLoading] = useState(true);

    const [companyName, setCompanyName] = useState("");
    const [website, setWebsite] = useState("");
    const [about, setAbout] = useState("");
    const [avatarBase64, setAvatarBase64] = useState<string>("");
    const [bannerBase64, setBannerBase64] = useState<string>("");

    const [employees, setEmployees] = useState<Employee[]>([]);
    const [empEmail, setEmpEmail] = useState("");
    const [empName, setEmpName] = useState("");

    useEffect(() => {
        (async () => {
            setLoading(true);
            const r = await getMyProfile();
            const p = r.profile ?? {};
            setCompanyName(p.companyName ?? "");
            setWebsite(p.website ?? "");
            setAbout(p.about ?? "");
            setAvatarBase64(p.avatarBase64 ?? "");
            setBannerBase64(p.bannerBase64 ?? "");
            setEmployees(p.employees ?? []);
            setLoading(false);
        })();
    }, []);

    const employeesSorted = useMemo(() => {
        const copy = [...employees];
        copy.sort((a, b) => Number(Boolean(b.exists)) - Number(Boolean(a.exists)));
        return copy;
    }, [employees]);

    async function onSave() {
        await saveMyProfile({
            companyName,
            website,
            about,
            avatarBase64,
            bannerBase64,
            employees: employees.map((e) => ({ email: e.email, name: e.name })),
        });
    }

    return (
        <div className="mx-auto w-full max-w-6xl px-4 py-6">
            <div className="mb-4 flex items-end justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-semibold text-zinc-100">Company Profile</h1>
                    <p className="text-sm text-zinc-400">Employer profile + employees directory (MVP).</p>
                </div>
                <Button onClick={onSave}>{loading ? "Loading..." : "Save"}</Button>
            </div>

            <Card className="overflow-hidden p-0">
                <div className="relative">
                    <div className="h-40 w-full bg-zinc-900">
                        {bannerBase64 ? (
                            <img src={bannerBase64} className="h-full w-full object-cover" alt="banner" />
                        ) : (
                            <div className="h-full w-full bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-800" />
                        )}
                    </div>

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

                    <div className="absolute -bottom-10 left-6">
                        <div className="relative">
                            <div className="h-20 w-20 overflow-hidden rounded-full border-2 border-zinc-950 bg-zinc-900">
                                {avatarBase64 ? (
                                    <img src={avatarBase64} className="h-full w-full object-cover" alt="avatar" />
                                ) : (
                                    <Avatar name={companyName || "Company"} size={80} />
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
                                <h2 className="text-xl font-semibold text-zinc-100">{companyName || "Your Company"}</h2>
                                {user?.verified ? <VerifiedBadge /> : null}
                            </div>
                            <div className="mt-2 text-sm text-zinc-300">{website || "Add website..."}</div>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <Badge>{user?.role ?? "employer"}</Badge>
                                {user?.verified ? <Badge>verified</Badge> : <Badge>read-only</Badge>}
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <Button variant="ghost">Post a job (soon)</Button>
                            <Button variant="ghost">Inbox</Button>
                        </div>
                    </div>

                    <Divider className="my-4" />

                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12 md:col-span-8 space-y-4">
                            <Card className="p-4">
                                <h3 className="text-sm font-semibold text-zinc-100">About</h3>
                                <div className="mt-3">
                                    <label className="text-xs text-zinc-400">
                                        value={about}
                                        <Textarea aria-setsize={80}
                                                  onChange={(e) => setAbout(e.target.value)}/>
                                        placeholder="What does your company do?"
                                        rows={5}
                                    </label>
                                </div>
                            </Card>

                            <Card className="p-4">
                                <h3 className="text-sm font-semibold text-zinc-100">Employees</h3>
                                <p className="mt-1 text-sm text-zinc-400">
                                    Add employee emails. We’ll show if they already created an account (computed by backend).
                                </p>

                                <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
                                    <Input label="Name" value={empName} onChange={(e) => setEmpName(e.target.value)} placeholder="Optional" />
                                    <Input label="Email" value={empEmail} onChange={(e) => setEmpEmail(e.target.value)} placeholder="employee@company.com" />
                                    <div className="flex items-end">
                                        <Button
                                            className="w-full"
                                            onClick={() => {
                                                const email = empEmail.trim().toLowerCase();
                                                if (!email) return;
                                                if (employees.some((e) => e.email === email)) return;
                                                setEmployees((prev) => [...prev, { email, name: empName.trim() || undefined }]);
                                                setEmpEmail("");
                                                setEmpName("");
                                            }}
                                        >
                                            Add
                                        </Button>
                                    </div>
                                </div>

                                <Divider className="my-3" />

                                <div className="space-y-2">
                                    {employeesSorted.length === 0 ? (
                                        <div className="text-sm text-zinc-500">No employees added yet.</div>
                                    ) : (
                                        employeesSorted.map((e) => (
                                            <div
                                                key={e.email}
                                                className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2"
                                            >
                                                <div className="min-w-0">
                                                    <div className="truncate text-sm text-zinc-100">
                                                        {e.name ? `${e.name} • ` : ""}
                                                        {e.email}
                                                    </div>
                                                    <div className="text-xs text-zinc-500">
                                                        {e.exists ? "Account exists" : "No account yet"} (demo)
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <Badge>{e.exists ? "active" : "pending"}</Badge>
                                                    <button
                                                        className="text-xs text-zinc-400 hover:text-zinc-200"
                                                        onClick={() => setEmployees((prev) => prev.filter((x) => x.email !== e.email))}
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </Card>
                        </div>

                        <div className="col-span-12 md:col-span-4 space-y-4">
                            <Card className="p-4">
                                <h3 className="text-sm font-semibold text-zinc-100">Company info</h3>
                                <div className="mt-3 space-y-3">
                                    <Input label="Company name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Nova Labs" />
                                    <Input label="Website" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://..." />
                                </div>
                            </Card>

                            <Card className="p-4">
                                <h3 className="text-sm font-semibold text-zinc-100">Quick links</h3>
                                <div className="mt-3 space-y-2 text-sm text-zinc-300">
                                    <div className="rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2">Post a job (soon)</div>
                                    <div className="rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2">View applicants (soon)</div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
