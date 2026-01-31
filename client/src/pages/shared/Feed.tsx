import React from "react";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { useAuth } from "../../store/auth.store";

export function Feed() {
    const { user } = useAuth();

    return (
        <div className="space-y-4">
            <div>
                <h1 className="text-2xl font-semibold">Feed</h1>
                <p className="text-sm text-zinc-500">Shared social surface (both roles).</p>
            </div>

            <Card className="space-y-3">
                <div className="flex items-center gap-2">
                    <Badge>Shared</Badge>
                    {user ? <Badge>{user.role}</Badge> : <Badge>guest</Badge>}
                    {user ? <Badge>{user.verified ? "verified" : "read-only"}</Badge> : null}
                </div>

                <p className="text-sm text-zinc-300">
                    This is where LinkedIn-style posts will live later.
                </p>

                {!user?.verified && user && (
                    <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-300">
                        You’re currently <span className="text-zinc-100 font-medium">read-only</span>. Verify to interact.
                    </div>
                )}
            </Card>
        </div>
    );
}
