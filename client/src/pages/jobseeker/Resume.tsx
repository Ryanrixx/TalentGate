import React, { useEffect, useMemo, useState } from "react";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Textarea } from "../../components/ui/Textarea";
import { Button } from "../../components/ui/Button";
import { Divider } from "../../components/ui/Divider";
import { Badge } from "../../components/ui/Badge";
import { getMyProfile, saveMyProfile } from "../../services/profile.service";
import type {
    ResumeData,
    ResumeExperience,
    ResumeProject,
    ResumeEducation,
    ResumeCert,
} from "../../types";

function uid() {
    // good enough for UI
    return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

const emptyResume: ResumeData = {
    header: {
        fullName: "",
        title: "",
        location: "",
        email: "",
        phone: "",
        links: [{ label: "LinkedIn", url: "" }, { label: "GitHub", url: "" }],
    },
    summary: "",
    skills: [],
    experience: [],
    projects: [],
    education: [],
    certifications: [],
    achievements: [],
};

export function SeekerResume(): React.ReactElement {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [resume, setResume] = useState<ResumeData>(emptyResume);
    const [skillsText, setSkillsText] = useState("");

    useEffect(() => {
        (async () => {
            setLoading(true);
            const r = await getMyProfile();
            const p = r.profile ?? {};
            const incoming: ResumeData | null = p.resume ?? null;

            const merged: ResumeData = incoming
                ? {
                    ...emptyResume,
                    ...incoming,
                    header: { ...emptyResume.header, ...(incoming.header ?? {}) },
                }
                : emptyResume;

            setResume(merged);
            setSkillsText((merged.skills ?? []).join(", "));
            setLoading(false);
        })();
    }, []);

    const skillsArr = useMemo(
        () => skillsText.split(",").map((s) => s.trim()).filter(Boolean),
        [skillsText]
    );

    async function onSave() {
        setSaving(true);
        const payload: ResumeData = { ...resume, skills: skillsArr };
        await saveMyProfile({ resume: payload });
        setResume(payload);
        setSaving(false);
    }

    // ---------- helpers ----------
    function updateHeader<K extends keyof ResumeData["header"]>(key: K, value: ResumeData["header"][K]) {
        setResume((prev) => ({ ...prev, header: { ...prev.header, [key]: value } }));
    }

    function updateLinks(index: number, patch: Partial<{ label: string; url: string }>) {
        setResume((prev) => {
            const links = [...prev.header.links];
            links[index] = { ...links[index], ...patch };
            return { ...prev, header: { ...prev.header, links } };
        });
    }

    function addExperience() {
        const e: ResumeExperience = {
            id: uid(),
            role: "",
            company: "",
            location: "",
            start: "",
            end: "Present",
            bullets: [""],
        };
        setResume((prev) => ({ ...prev, experience: [e, ...prev.experience] }));
    }

    function updateExperience(id: string, patch: Partial<ResumeExperience>) {
        setResume((prev) => ({
            ...prev,
            experience: prev.experience.map((x) => (x.id === id ? { ...x, ...patch } : x)),
        }));
    }

    function removeExperience(id: string) {
        setResume((prev) => ({ ...prev, experience: prev.experience.filter((x) => x.id !== id) }));
    }

    function addProject() {
        const p: ResumeProject = { id: uid(), name: "", link: "", tech: "", bullets: [""] };
        setResume((prev) => ({ ...prev, projects: [p, ...prev.projects] }));
    }

    function updateProject(id: string, patch: Partial<ResumeProject>) {
        setResume((prev) => ({
            ...prev,
            projects: prev.projects.map((x) => (x.id === id ? { ...x, ...patch } : x)),
        }));
    }

    function removeProject(id: string) {
        setResume((prev) => ({ ...prev, projects: prev.projects.filter((x) => x.id !== id) }));
    }

    function addEducation() {
        const e: ResumeEducation = {
            id: uid(),
            school: "",
            degree: "",
            field: "",
            start: "",
            end: "",
            score: "",
        };
        setResume((prev) => ({ ...prev, education: [e, ...prev.education] }));
    }

    function updateEducation(id: string, patch: Partial<ResumeEducation>) {
        setResume((prev) => ({
            ...prev,
            education: prev.education.map((x) => (x.id === id ? { ...x, ...patch } : x)),
        }));
    }

    function removeEducation(id: string) {
        setResume((prev) => ({ ...prev, education: prev.education.filter((x) => x.id !== id) }));
    }

    function addCert() {
        const c: ResumeCert = { id: uid(), name: "", issuer: "", year: "", link: "" };
        setResume((prev) => ({ ...prev, certifications: [c, ...prev.certifications] }));
    }

    function updateCert(id: string, patch: Partial<ResumeCert>) {
        setResume((prev) => ({
            ...prev,
            certifications: prev.certifications.map((x) => (x.id === id ? { ...x, ...patch } : x)),
        }));
    }

    function removeCert(id: string) {
        setResume((prev) => ({ ...prev, certifications: prev.certifications.filter((x) => x.id !== id) }));
    }

    function setAchievementsFromText(txt: string) {
        const lines = txt
            .split("\n")
            .map((x) => x.trim())
            .filter(Boolean);
        setResume((prev) => ({ ...prev, achievements: lines }));
    }

    const achievementsText = useMemo(() => (resume.achievements ?? []).join("\n"), [resume.achievements]);

    // ---------- UI ----------
    return (
        <div className="mx-auto w-full max-w-6xl px-4 py-6">
            <div className="mb-4 flex items-end justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-semibold text-zinc-100">Resume Builder</h1>
                    <p className="text-sm text-zinc-400">
                        Structured resume for your “single living profile”. <span className="text-zinc-500">AI Enhance button later.</span>
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="ghost">AI Enhance (soon)</Button>
                    <Button onClick={onSave}>{loading ? "Loading..." : saving ? "Saving..." : "Save"}</Button>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-4">
                {/* BUILDER */}
                <div className="col-span-12 lg:col-span-7 space-y-4">
                    {/* Header */}
                    <Card className="p-4">
                        <div className="flex items-center justify-between gap-3">
                            <h3 className="text-sm font-semibold text-zinc-100">Header</h3>
                            <Badge>required</Badge>
                        </div>
                        <Divider className="my-3" />
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                            <Input label="Full name" value={resume.header.fullName} onChange={(e) => updateHeader("fullName", e.target.value)} placeholder="Ryan Rao" />
                            <Input label="Title" value={resume.header.title} onChange={(e) => updateHeader("title", e.target.value)} placeholder="Full-Stack Developer" />
                            <Input label="Location" value={resume.header.location} onChange={(e) => updateHeader("location", e.target.value)} placeholder="Bhubaneswar, India" />
                            <Input label="Email" value={resume.header.email} onChange={(e) => updateHeader("email", e.target.value)} placeholder="you@example.com" />
                            <Input label="Phone" value={resume.header.phone} onChange={(e) => updateHeader("phone", e.target.value)} placeholder="+91..." />
                        </div>

                        <Divider className="my-3" />
                        <div className="space-y-2">
                            <div className="text-xs text-zinc-400">Links</div>
                            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                {resume.header.links.map((l, idx) => (
                                    <Card key={idx} className="p-3">
                                        <div className="grid grid-cols-1 gap-2">
                                            <Input label="Label" value={l.label} onChange={(e) => updateLinks(idx, { label: e.target.value })} placeholder="LinkedIn" />
                                            <Input label="URL" value={l.url} onChange={(e) => updateLinks(idx, { url: e.target.value })} placeholder="https://..." />
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </Card>

                    {/* Summary */}
                    <Card className="p-4">
                        <h3 className="text-sm font-semibold text-zinc-100">Summary</h3>
                        <Divider className="my-3" />
                        <Textarea
                            value={resume.summary}
                            onChange={(e) => setResume((prev) => ({ ...prev, summary: e.target.value }))}
                            placeholder="2–4 lines. Impact, strengths, tech stack, what you’re looking for."
                            rows={5}
                        />
                    </Card>

                    {/* Skills */}
                    <Card className="p-4">
                        <h3 className="text-sm font-semibold text-zinc-100">Skills</h3>
                        <Divider className="my-3" />
                        <Input
                            label="Comma separated"
                            value={skillsText}
                            onChange={(e) => setSkillsText(e.target.value)}
                            placeholder="React, TypeScript, Node, MongoDB, AWS..."
                        />
                    </Card>

                    {/* Experience */}
                    <Card className="p-4">
                        <div className="flex items-center justify-between gap-3">
                            <h3 className="text-sm font-semibold text-zinc-100">Experience</h3>
                            <Button variant="ghost" onClick={addExperience}>
                                + Add
                            </Button>
                        </div>
                        <Divider className="my-3" />

                        <div className="space-y-3">
                            {resume.experience.length === 0 ? (
                                <div className="text-sm text-zinc-500">Add your experience entries.</div>
                            ) : (
                                resume.experience.map((x) => (
                                    <Card key={x.id} className="p-3">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
                                                <Input label="Role" value={x.role} onChange={(e) => updateExperience(x.id, { role: e.target.value })} placeholder="Software Engineer" />
                                                <Input label="Company" value={x.company} onChange={(e) => updateExperience(x.id, { company: e.target.value })} placeholder="Company name" />
                                                <Input label="Location" value={x.location ?? ""} onChange={(e) => updateExperience(x.id, { location: e.target.value })} placeholder="City, Country" />
                                                <div className="grid grid-cols-2 gap-2">
                                                    <Input label="Start" value={x.start} onChange={(e) => updateExperience(x.id, { start: e.target.value })} placeholder="Jan 2025" />
                                                    <Input label="End" value={x.end} onChange={(e) => updateExperience(x.id, { end: e.target.value })} placeholder="Present" />
                                                </div>

                                                <div className="md:col-span-2 space-y-2">
                                                    <div className="text-xs text-zinc-400">Bullets (one per line)</div>
                                                    <Textarea
                                                        value={x.bullets.join("\n")}
                                                        onChange={(e) =>
                                                            updateExperience(x.id, {
                                                                bullets: e.target.value.split("\n").map((b) => b.trim()),
                                                            })
                                                        }
                                                        rows={5}
                                                        placeholder="- Built...\n- Improved...\n- Shipped..."
                                                    />
                                                </div>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => removeExperience(x.id)}
                                                className="rounded-lg border border-zinc-800 bg-zinc-950 px-2 py-1 text-xs text-zinc-300 hover:bg-zinc-900"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </Card>
                                ))
                            )}
                        </div>
                    </Card>

                    {/* Projects */}
                    <Card className="p-4">
                        <div className="flex items-center justify-between gap-3">
                            <h3 className="text-sm font-semibold text-zinc-100">Projects</h3>
                            <Button variant="ghost" onClick={addProject}>
                                + Add
                            </Button>
                        </div>
                        <Divider className="my-3" />

                        <div className="space-y-3">
                            {resume.projects.length === 0 ? (
                                <div className="text-sm text-zinc-500">Add your best projects.</div>
                            ) : (
                                resume.projects.map((x) => (
                                    <Card key={x.id} className="p-3">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
                                                <Input label="Project name" value={x.name} onChange={(e) => updateProject(x.id, { name: e.target.value })} placeholder="TalentGate" />
                                                <Input label="Link" value={x.link ?? ""} onChange={(e) => updateProject(x.id, { link: e.target.value })} placeholder="https://github.com/..." />
                                                <Input label="Tech" value={x.tech ?? ""} onChange={(e) => updateProject(x.id, { tech: e.target.value })} placeholder="React, Node, MongoDB" />

                                                <div className="md:col-span-2 space-y-2">
                                                    <div className="text-xs text-zinc-400">Bullets (one per line)</div>
                                                    <Textarea
                                                        value={x.bullets.join("\n")}
                                                        onChange={(e) =>
                                                            updateProject(x.id, {
                                                                bullets: e.target.value.split("\n").map((b) => b.trim()),
                                                            })
                                                        }
                                                        rows={5}
                                                        placeholder="- Built...\n- Integrated...\n- Improved..."
                                                    />
                                                </div>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => removeProject(x.id)}
                                                className="rounded-lg border border-zinc-800 bg-zinc-950 px-2 py-1 text-xs text-zinc-300 hover:bg-zinc-900"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </Card>
                                ))
                            )}
                        </div>
                    </Card>

                    {/* Education */}
                    <Card className="p-4">
                        <div className="flex items-center justify-between gap-3">
                            <h3 className="text-sm font-semibold text-zinc-100">Education</h3>
                            <Button variant="ghost" onClick={addEducation}>
                                + Add
                            </Button>
                        </div>
                        <Divider className="my-3" />

                        <div className="space-y-3">
                            {resume.education.length === 0 ? (
                                <div className="text-sm text-zinc-500">Add your education.</div>
                            ) : (
                                resume.education.map((x) => (
                                    <Card key={x.id} className="p-3">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
                                                <Input label="School" value={x.school} onChange={(e) => updateEducation(x.id, { school: e.target.value })} placeholder="University" />
                                                <Input label="Degree" value={x.degree} onChange={(e) => updateEducation(x.id, { degree: e.target.value })} placeholder="B.Tech" />
                                                <Input label="Field" value={x.field ?? ""} onChange={(e) => updateEducation(x.id, { field: e.target.value })} placeholder="Computer Science" />
                                                <Input label="Score" value={x.score ?? ""} onChange={(e) => updateEducation(x.id, { score: e.target.value })} placeholder="CGPA / % (optional)" />
                                                <Input label="Start" value={x.start} onChange={(e) => updateEducation(x.id, { start: e.target.value })} placeholder="2022" />
                                                <Input label="End" value={x.end} onChange={(e) => updateEducation(x.id, { end: e.target.value })} placeholder="2026" />
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => removeEducation(x.id)}
                                                className="rounded-lg border border-zinc-800 bg-zinc-950 px-2 py-1 text-xs text-zinc-300 hover:bg-zinc-900"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </Card>
                                ))
                            )}
                        </div>
                    </Card>

                    {/* Certifications */}
                    <Card className="p-4">
                        <div className="flex items-center justify-between gap-3">
                            <h3 className="text-sm font-semibold text-zinc-100">Certifications</h3>
                            <Button variant="ghost" onClick={addCert}>
                                + Add
                            </Button>
                        </div>
                        <Divider className="my-3" />

                        <div className="space-y-3">
                            {resume.certifications.length === 0 ? (
                                <div className="text-sm text-zinc-500">Add certifications (optional).</div>
                            ) : (
                                resume.certifications.map((x) => (
                                    <Card key={x.id} className="p-3">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
                                                <Input label="Name" value={x.name} onChange={(e) => updateCert(x.id, { name: e.target.value })} placeholder="AWS Cloud Practitioner" />
                                                <Input label="Issuer" value={x.issuer ?? ""} onChange={(e) => updateCert(x.id, { issuer: e.target.value })} placeholder="Amazon" />
                                                <Input label="Year" value={x.year ?? ""} onChange={(e) => updateCert(x.id, { year: e.target.value })} placeholder="2025" />
                                                <Input label="Link" value={x.link ?? ""} onChange={(e) => updateCert(x.id, { link: e.target.value })} placeholder="https://..." />
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => removeCert(x.id)}
                                                className="rounded-lg border border-zinc-800 bg-zinc-950 px-2 py-1 text-xs text-zinc-300 hover:bg-zinc-900"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </Card>
                                ))
                            )}
                        </div>
                    </Card>

                    {/* Achievements */}
                    <Card className="p-4">
                        <h3 className="text-sm font-semibold text-zinc-100">Achievements</h3>
                        <Divider className="my-3" />
                        <div className="text-xs text-zinc-400 mb-2">One per line</div>
                        <Textarea
                            value={achievementsText}
                            onChange={(e) => setAchievementsFromText(e.target.value)}
                            placeholder="Won hackathon...\nTop 1%...\n..."
                            rows={6}
                        />
                    </Card>
                </div>

                {/* PREVIEW */}
                <div className="col-span-12 lg:col-span-5">
                    <Card className="p-4 sticky top-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-zinc-100">Live Preview</h3>
                            <Badge>preview</Badge>
                        </div>
                        <Divider className="my-3" />

                        {/* Header */}
                        <div>
                            <div className="text-lg font-semibold text-zinc-100">{resume.header.fullName || "Your Name"}</div>
                            <div className="text-sm text-zinc-300">{resume.header.title || "Your Title"}</div>
                            <div className="mt-2 text-xs text-zinc-400">
                                {[resume.header.location, resume.header.email, resume.header.phone].filter(Boolean).join(" • ") || "Location • Email • Phone"}
                            </div>

                            <div className="mt-2 flex flex-wrap gap-2">
                                {(resume.header.links ?? [])
                                    .filter((l) => l.url.trim())
                                    .map((l, i) => (
                                        <Badge key={i}>{l.label}</Badge>
                                    ))}
                            </div>
                        </div>

                        <Divider className="my-4" />

                        {/* Summary */}
                        <section>
                            <div className="text-xs font-semibold text-zinc-200">SUMMARY</div>
                            <div className="mt-2 text-sm text-zinc-300 whitespace-pre-wrap">
                                {resume.summary || "Write a short summary here..."}
                            </div>
                        </section>

                        <Divider className="my-4" />

                        {/* Skills */}
                        <section>
                            <div className="text-xs font-semibold text-zinc-200">SKILLS</div>
                            <div className="mt-2 flex flex-wrap gap-2">
                                {skillsArr.length ? skillsArr.slice(0, 24).map((s) => <Badge key={s}>{s}</Badge>) : <span className="text-sm text-zinc-500">Add skills</span>}
                            </div>
                        </section>

                        <Divider className="my-4" />

                        {/* Experience */}
                        <section>
                            <div className="text-xs font-semibold text-zinc-200">EXPERIENCE</div>
                            <div className="mt-2 space-y-3">
                                {resume.experience.length ? (
                                    resume.experience.map((x) => (
                                        <div key={x.id}>
                                            <div className="text-sm font-semibold text-zinc-100">
                                                {x.role || "Role"} • <span className="text-zinc-300">{x.company || "Company"}</span>
                                            </div>
                                            <div className="text-xs text-zinc-500">
                                                {[x.location, `${x.start || "Start"} - ${x.end || "End"}`].filter(Boolean).join(" • ")}
                                            </div>
                                            <ul className="mt-2 list-disc pl-5 text-sm text-zinc-300 space-y-1">
                                                {x.bullets.filter(Boolean).slice(0, 6).map((b, i) => (
                                                    <li key={i}>{b}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-sm text-zinc-500">Add experience entries.</div>
                                )}
                            </div>
                        </section>

                        <Divider className="my-4" />

                        {/* Projects */}
                        <section>
                            <div className="text-xs font-semibold text-zinc-200">PROJECTS</div>
                            <div className="mt-2 space-y-3">
                                {resume.projects.length ? (
                                    resume.projects.map((x) => (
                                        <div key={x.id}>
                                            <div className="text-sm font-semibold text-zinc-100">{x.name || "Project name"}</div>
                                            <div className="text-xs text-zinc-500">{x.tech || "Tech stack"}</div>
                                            <ul className="mt-2 list-disc pl-5 text-sm text-zinc-300 space-y-1">
                                                {x.bullets.filter(Boolean).slice(0, 6).map((b, i) => (
                                                    <li key={i}>{b}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-sm text-zinc-500">Add projects.</div>
                                )}
                            </div>
                        </section>

                        <Divider className="my-4" />

                        {/* Education */}
                        <section>
                            <div className="text-xs font-semibold text-zinc-200">EDUCATION</div>
                            <div className="mt-2 space-y-2">
                                {resume.education.length ? (
                                    resume.education.map((x) => (
                                        <div key={x.id}>
                                            <div className="text-sm font-semibold text-zinc-100">{x.school || "School"}</div>
                                            <div className="text-sm text-zinc-300">
                                                {x.degree || "Degree"}{x.field ? ` • ${x.field}` : ""}
                                            </div>
                                            <div className="text-xs text-zinc-500">
                                                {[`${x.start || ""} - ${x.end || ""}`.trim(), x.score].filter(Boolean).join(" • ")}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-sm text-zinc-500">Add education.</div>
                                )}
                            </div>
                        </section>

                        <Divider className="my-4" />

                        {/* Certifications & Achievements */}
                        <section>
                            <div className="text-xs font-semibold text-zinc-200">CERTIFICATIONS</div>
                            <div className="mt-2 space-y-2">
                                {resume.certifications.length ? (
                                    resume.certifications.map((x) => (
                                        <div key={x.id} className="text-sm text-zinc-300">
                                            <span className="text-zinc-100 font-semibold">{x.name || "Certification"}</span>
                                            {x.issuer ? ` • ${x.issuer}` : ""}{x.year ? ` • ${x.year}` : ""}
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-sm text-zinc-500">Optional.</div>
                                )}
                            </div>

                            <Divider className="my-4" />

                            <div className="text-xs font-semibold text-zinc-200">ACHIEVEMENTS</div>
                            <ul className="mt-2 list-disc pl-5 text-sm text-zinc-300 space-y-1">
                                {resume.achievements.length ? (
                                    resume.achievements.slice(0, 8).map((a, i) => <li key={i}>{a}</li>)
                                ) : (
                                    <li className="text-zinc-500">Optional.</li>
                                )}
                            </ul>
                        </section>
                    </Card>
                </div>
            </div>
        </div>
    );
}
