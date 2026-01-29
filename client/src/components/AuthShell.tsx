import type { ReactNode } from "react";
import { Link } from "react-router-dom";

export default function AuthShell({
                                      title,
                                      subtitle,
                                      children,
                                  }: {
    title: string;
    subtitle: string;
    children: ReactNode;
}) {
    return (
        <div className="page">
            <div className="bg-decor">
                <div className="bg-decor-1" />
                <div className="bg-decor-2" />
            </div>

            <header className="border-b border-zinc-900 bg-zinc-950/80 backdrop-blur">
                <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-6 py-4">
                    <Link to="/" className="flex items-center gap-3">
                        <div className="grid h-9 w-9 place-items-center rounded-xl bg-white text-zinc-950 font-bold">
                            TG
                        </div>
                        <div className="leading-tight">
                            <div className="font-semibold">TalentGate</div>
                            <div className="text-xs text-zinc-400">Hiring • Matching • Swipe</div>
                        </div>
                    </Link>

                    <div className="text-sm text-zinc-400">Secure access</div>
                </div>
            </header>

            <main className="container-x section-y">
                <div className="grid place-items-center">
                    <div className="w-full max-w-lg">
                        <div className="card card-inner">
                            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
                            <p className="mt-2 muted">{subtitle}</p>
                            <div className="mt-6">{children}</div>
                        </div>

                        <footer className="mt-8 text-center text-xs text-zinc-500">
                            © {new Date().getFullYear()} TalentGate
                        </footer>
                    </div>
                </div>
            </main>
        </div>
    );
}
