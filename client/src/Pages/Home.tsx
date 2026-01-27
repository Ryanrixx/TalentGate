import { useEffect, useMemo, useState } from "react";
import { apiGet } from "../lib/api";
import { Link } from "react-router-dom";

type HealthResponse = {
    status: string;
    service?: string;
};

type Audience = "seekers" | "employers";

export default function Home() {
    const [apiStatus, setApiStatus] = useState<"checking" | "up" | "down">("checking");
    const [health, setHealth] = useState<HealthResponse | null>(null);
    const [error, setError] = useState<string>("");

    const [audience, setAudience] = useState<Audience>("seekers");

    useEffect(() => {
        let mounted = true;

        (async () => {
            try {
                const data = await apiGet<HealthResponse>("/health");
                if (!mounted) return;
                setHealth(data);
                setApiStatus("up");
            } catch (e: any) {
                if (!mounted) return;
                setApiStatus("down");
                setError(e?.message || "Failed to reach API");
            }
        })();

        return () => {
            mounted = false;
        };
    }, []);

    const features = useMemo(() => {
        const seeker = [
            {
                title: "One Living Profile",
                desc: "Save identity, contact details, links, and work history once — apply everywhere without rewriting basics.",
            },
            {
                title: "Resume Builder + Updater",
                desc: "Build a clean resume and keep it up to date as your skills evolve. Version it for different job types.",
            },
            {
                title: "ATS Score & Improvements",
                desc: "Check ATS readiness and get actionable suggestions: missing keywords, formatting issues, and clarity upgrades.",
            },
            {
                title: "AI Job Recommendations",
                desc: "Discover roles that match your skills, experience level, and target compensation — ranked by fit signals.",
            },
            {
                title: "Smart Applications",
                desc: "Apply with one click using your stored profile + resume version tailored to the job.",
            },
            {
                title: "Progress Tracking",
                desc: "Track viewed jobs, swipes, shortlisted status (later), and conversion signals over time.",
            },
        ];

        const employer = [
            {
                title: "Recruiter Dashboard",
                desc: "A clean user dashboard to manage postings, applicants, and review queues.",
            },
            {
                title: "Swipe Review Workflow",
                desc: "Fast screening: swipe right/left and keep momentum like a modern review queue.",
            },
            {
                title: "Benchmark Buckets",
                desc: "Auto-split applicants into: below benchmark vs meets benchmark — based on requirements.",
            },
            {
                title: "AI Candidate Signals",
                desc: "AI surfaces why a candidate matches (or not). Recruiters verify everything before action.",
            },
            {
                title: "Auto Resume + ATS Checks",
                desc: "ATS-style checks surface missing skills, mismatch, or weak alignment instantly.",
            },
            {
                title: "Suggested Candidates",
                desc: "AI suggests potential candidates beyond inbound applicants — you approve before outreach.",
            },
        ];

        return audience === "seekers" ? seeker : employer;
    }, [audience]);

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100">
            {/* Background decoration so wide screens don't feel empty */}
            <div className="pointer-events-none fixed inset-0 -z-10">
                <div className="absolute right-[-240px] top-[-240px] h-[720px] w-[720px] rounded-full bg-white/5 blur-3xl" />
                <div className="absolute left-[-240px] bottom-[-240px] h-[720px] w-[720px] rounded-full bg-emerald-500/10 blur-3xl" />
            </div>

            <Navbar />

            <main className="mx-auto w-full max-w-screen-2xl px-6 py-14">
                {/* HERO */}
                <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
                    <section className="space-y-6">
                        <p className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/40 px-3 py-1 text-sm text-zinc-300">
                            <span className="h-2 w-2 rounded-full bg-zinc-400" />
                            Production-grade hiring platform
                        </p>

                        <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                            TalentGate — one evolving profile.
                            <span className="block text-zinc-300">AI-assisted shortlisting. Swipe review.</span>
                        </h1>

                        <p className="max-w-xl text-base leading-relaxed text-zinc-300">
                            Job seekers maintain a single living profile. Employers review candidates faster with a swipe workflow —
                            with AI surfacing match signals while humans stay in control.
                        </p>

                        <div className="flex flex-wrap gap-3">
                            <button className="rounded-xl bg-white px-5 py-3 text-sm font-medium text-zinc-950 hover:opacity-90">
                                Get Started
                            </button>
                            <button className="btn btn-ghost">
                                View Demo
                            </button>
                        </div>

                        <ApiStatus apiStatus={apiStatus} health={health} error={error} />
                    </section>

                    {/* FEATURE GRID SUMMARY */}
                    <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 shadow-sm">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <div className="text-sm font-semibold">What TalentGate delivers</div>
                                <div className="mt-1 text-sm text-zinc-400">
                                    Built for job seekers and employers — switch view.
                                </div>
                            </div>

                            <div className="inline-flex rounded-xl border border-zinc-800 bg-zinc-950/40 p-1">
                                <TogglePill
                                    active={audience === "seekers"}
                                    onClick={() => setAudience("seekers")}
                                    label="Job Seeker"
                                />
                                <TogglePill
                                    active={audience === "employers"}
                                    onClick={() => setAudience("employers")}
                                    label="Employer"
                                />
                            </div>
                        </div>

                        <div className="mt-5 grid gap-4 sm:grid-cols-2">
                            {features.slice(0, 4).map((f) => (
                                <FeatureCard key={f.title} title={f.title} desc={f.desc} />
                            ))}
                        </div>

                        <div className="mt-5 rounded-2xl border border-zinc-800 bg-zinc-950/40 p-5">
                            <div className="text-sm font-semibold">Why this is different</div>
                            <div className="mt-2 text-sm text-zinc-400">
                                Most apps either store resumes or list jobs. TalentGate focuses on a single evolving identity + fast review
                                + explainable AI signals (verified by humans).
                            </div>
                        </div>
                    </section>
                </div>

                {/* FEATURES (FULL) */}
                <section id="features" className="mt-16">
                    <div className="flex flex-wrap items-end justify-between gap-4">
                        <div>
                            <h2 className="text-2xl font-semibold tracking-tight">Features</h2>
                            <p className="mt-2 max-w-2xl text-sm text-zinc-400">
                                Built to reduce friction for applicants and speed up decision-making for recruiters — without sacrificing control.
                            </p>
                        </div>

                        <div className="inline-flex rounded-xl border border-zinc-800 bg-zinc-950/40 p-1">
                            <TogglePill active={audience === "seekers"} onClick={() => setAudience("seekers")} label="Job Seeker" />
                            <TogglePill active={audience === "employers"} onClick={() => setAudience("employers")} label="Employer" />
                        </div>
                    </div>

                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                        {features.map((f) => (
                            <FeatureCard key={f.title} title={f.title} desc={f.desc} />
                        ))}
                    </div>
                </section>

                {/* ROADMAP */}
                <section id="roadmap" className="mt-16">
                    <h2 className="text-2xl font-semibold tracking-tight">Roadmap</h2>
                    <p className="mt-2 max-w-2xl text-sm text-zinc-400">
                        We’ll ship in phases so each feature is testable end-to-end (server ⇄ client).
                    </p>

                    <div className="mt-6 grid gap-4 lg:grid-cols-3">
                        <PhaseCard
                            phase="Phase 1"
                            title="Core Platform"
                            items={["Home + API connectivity", "Public jobs listing", "Job details page", "Basic recruiter job posting (dev mode)"]}
                        />
                        <PhaseCard
                            phase="Phase 2"
                            title="Profiles & Resumes"
                            items={["Job seeker profile (one living identity)", "Resume builder + versions", "ATS score + checks", "AI resume suggestions (verified)"]}
                        />
                        <PhaseCard
                            phase="Phase 3"
                            title="Review & Matching"
                            items={["Swipe review dashboard", "Benchmark buckets (meets vs below)", "AI match signals + ranking", "Suggested candidates pool"]}
                        />
                    </div>

                    <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
                        <div className="text-sm font-semibold">Guiding principle</div>
                        <p className="mt-2 text-sm text-zinc-400">
                            AI assists. Humans approve. Every recommendation is explainable with clear reasons (skills overlap, gaps, seniority fit).
                        </p>
                    </div>
                </section>

                {/* ABOUT */}
                <section id="about" className="mt-16">
                    <h2 className="text-2xl font-semibold tracking-tight">About</h2>

                    <div className="mt-6 grid gap-4 lg:grid-cols-3">
                        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 lg:col-span-2">
                            <div className="text-sm font-semibold">What is TalentGate?</div>
                            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                                TalentGate is a resume + job matching platform where job seekers maintain a single evolving profile and employers
                                review candidates fast using a swipe-style workflow. AI helps surface best-fit candidates and improvement signals,
                                but the recruiter is always the final decision-maker.
                            </p>

                            <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                <MiniStat label="Goal" value="Reduce application friction + speed up hiring decisions" />
                                <MiniStat label="Core UX" value="One profile • Swipe review • Explainable AI signals" />
                            </div>
                        </div>

                        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-6">
                            <div className="text-sm font-semibold">Built by</div>
                            <div className="mt-2 text-sm text-zinc-400">Ryanrixx — Full-Stack + AI.</div>

                            <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
                                <div className="text-xs text-zinc-400">Positioning</div>
                                <div className="mt-1 text-sm font-semibold">Founder-grade, production-ready build</div>
                                <div className="mt-2 text-sm text-zinc-400">
                                    Modular backend + clean frontend, shipped feature-by-feature.
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <footer className="mt-16 border-t border-zinc-900 py-8">
                    <div className="text-sm text-zinc-400">© {new Date().getFullYear()} TalentGate • Built by Ryanrixx</div>
                </footer>
            </main>
        </div>
    );
}

function Navbar() {
    return (
        <header className="border-b border-zinc-900 bg-zinc-950/80 backdrop-blur">
            <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-xl bg-white text-zinc-950 font-bold">TG</div>
                    <div className="leading-tight">
                        <div className="font-semibold">TalentGate</div>
                        <div className="text-xs text-zinc-400">Hiring • Matching • Swipe</div>
                    </div>
                </div>

                <nav className="hidden items-center gap-6 text-sm text-zinc-300 sm:flex">
                    <a className="hover:text-white" href="#features">Features</a>
                    <a className="hover:text-white" href="#roadmap">Roadmap</a>
                    <a className="hover:text-white" href="#about">About</a>
                </nav>

                <div className="flex items-center gap-3">
                    <Link
                        to="/signin"
                        className="rounded-xl border border-zinc-800 bg-zinc-900/40 px-4 py-2 text-sm hover:bg-zinc-900"
                    >
                        Sign in
                    </Link>
                    <Link
                        to="/signup"
                        className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-zinc-950 hover:opacity-90"
                    >
                        Create account
                    </Link>

                </div>
            </div>
        </header>
    );
}

function TogglePill({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
    return (
        <button
            onClick={onClick}
            className={[
                "rounded-lg px-3 py-2 text-xs font-medium transition",
                active ? "bg-white text-zinc-950" : "text-zinc-300 hover:bg-zinc-900/60",
            ].join(" ")}
            type="button"
        >
            {label}
        </button>
    );
}

function FeatureCard({ title, desc }: { title: string; desc: string }) {
    return (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-5">
            <div className="text-sm font-semibold">{title}</div>
            <div className="mt-2 text-sm text-zinc-400">{desc}</div>
        </div>
    );
}

function PhaseCard({ phase, title, items }: { phase: string; title: string; items: string[] }) {
    return (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
            <div className="text-xs text-zinc-400">{phase}</div>
            <div className="mt-1 text-sm font-semibold">{title}</div>
            <ul className="mt-4 space-y-2 text-sm text-zinc-400">
                {items.map((it) => (
                    <li key={it} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-500" />
                        <span>{it}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function MiniStat({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-4">
            <div className="text-xs text-zinc-400">{label}</div>
            <div className="mt-1 text-sm font-semibold">{value}</div>
        </div>
    );
}

function ApiStatus({
                       apiStatus,
                       health,
                       error,
                   }: {
    apiStatus: "checking" | "up" | "down";
    health: HealthResponse | null;
    error: string;
}) {
    const badge =
        apiStatus === "checking"
            ? { text: "Checking API…", cls: "border-zinc-800 bg-zinc-900/40 text-zinc-300", dot: "bg-zinc-400" }
            : apiStatus === "up"
                ? { text: "API Connected ✅", cls: "border-emerald-900 bg-emerald-950/40 text-emerald-200", dot: "bg-emerald-400" }
                : { text: "API Down ❌", cls: "border-red-900 bg-red-950/40 text-red-200", dot: "bg-red-400" };

    return (
        <div className={`mt-6 rounded-2xl border px-4 py-3 text-sm ${badge.cls}`}>
            <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="inline-flex items-center gap-2 font-medium">
          <span className={`h-2 w-2 rounded-full ${badge.dot}`} />
            {badge.text}
        </span>
                {health?.status && <span className="text-xs opacity-80">status: {health.status}</span>}
            </div>
            {apiStatus === "down" && error ? <div className="mt-2 text-xs text-red-200/90">{error}</div> : null}
        </div>
    );
}
