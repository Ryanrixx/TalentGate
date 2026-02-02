import React, { useMemo, useState } from "react";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { Divider } from "../../components/ui/Divider";
import { Avatar } from "../../components/ui/Avatar";

type Thread = {
    id: string;
    name: string;
    last: string;
    time: string;
    avatarUrl?: string;
};

type Msg = { id: string; fromMe: boolean; text: string; time: string };

export function Messages(): React.ReactElement {
    const threads: Thread[] = useMemo(
        () => [
            { id: "t1", name: "TalentGate Official", last: "Launching soon 🔥", time: "now" },
            { id: "t2", name: "Nova Labs", last: "Can you share your resume?", time: "2h" },
            { id: "t3", name: "Aarav", last: "Nice UI — how did you do the glow?", time: "1d" },
        ],
        []
    );

    const [activeId, setActiveId] = useState<string>(threads[0]?.id ?? "t1");
    const [draft, setDraft] = useState("");

    const active = threads.find((t) => t.id === activeId) ?? threads[0];

    const [messages, setMessages] = useState<Msg[]>([
        { id: "m1", fromMe: false, text: "Hey! Welcome to TalentGate messages.", time: "10:10" },
        { id: "m2", fromMe: true, text: "This will become real-time later.", time: "10:11" },
    ]);

    return (
        <div className="mx-auto w-full max-w-6xl px-4 py-6">
            <div className="mb-4">
                <h1 className="text-2xl font-semibold text-zinc-100">Messages</h1>
                <p className="text-sm text-zinc-400">DMs between users (UI now, realtime later).</p>
            </div>

            <div className="grid grid-cols-12 gap-4">
                <Card className="col-span-12 md:col-span-4 p-3">
                    <Input label="Search" placeholder="Search conversations..." value="" onChange={() => {}} />
                    <Divider className="my-3" />
                    <div className="space-y-2">
                        {threads.map((t) => (
                            <button
                                key={t.id}
                                onClick={() => setActiveId(t.id)}
                                className={
                                    "w-full rounded-xl border px-3 py-2 text-left transition " +
                                    (t.id === activeId
                                        ? "border-zinc-700 bg-zinc-900/70"
                                        : "border-zinc-800 bg-zinc-950 hover:bg-zinc-900/40")
                                }
                            >
                                <div className="flex items-center gap-3">
                                    <Avatar name={t.name} size={34} />
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="truncate text-sm font-medium text-zinc-100">{t.name}</span>
                                            <span className="text-xs text-zinc-500">{t.time}</span>
                                        </div>
                                        <div className="truncate text-xs text-zinc-400">{t.last}</div>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </Card>

                <Card className="col-span-12 md:col-span-8 p-0">
                    <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
                        <div className="flex items-center gap-3">
                            <Avatar name={active?.name ?? "User"} size={34} />
                            <div>
                                <div className="text-sm font-semibold text-zinc-100">{active?.name}</div>
                                <div className="text-xs text-zinc-500">online (demo)</div>
                            </div>
                        </div>
                        <Button variant="ghost">View profile</Button>
                    </div>

                    <div className="h-[52vh] overflow-auto px-4 py-4">
                        <div className="space-y-2">
                            {messages.map((m) => (
                                <div key={m.id} className={"flex " + (m.fromMe ? "justify-end" : "justify-start")}>
                                    <div
                                        className={
                                            "max-w-[80%] rounded-2xl px-3 py-2 text-sm " +
                                            (m.fromMe
                                                ? "bg-zinc-100 text-zinc-950"
                                                : "bg-zinc-900 text-zinc-100 border border-zinc-800")
                                        }
                                    >
                                        <div>{m.text}</div>
                                        <div className={"mt-1 text-[11px] " + (m.fromMe ? "text-zinc-700" : "text-zinc-500")}>
                                            {m.time}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="border-t border-zinc-800 p-3">
                        <div className="flex gap-2">
                            <input
                                value={draft}
                                onChange={(e) => setDraft(e.target.value)}
                                placeholder="Write a message..."
                                className="h-11 flex-1 rounded-xl border border-zinc-800 bg-zinc-950 px-3 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-zinc-700"
                            />
                            <Button
                                onClick={() => {
                                    if (!draft.trim()) return;
                                    setMessages((prev) => [
                                        ...prev,
                                        { id: crypto.randomUUID(), fromMe: true, text: draft.trim(), time: "now" },
                                    ]);
                                    setDraft("");
                                }}
                            >
                                Send
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
