import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Select } from "../../components/ui/Select";

import logo from "../../assets/talentgate-logo.png";

export default function CreateAccount() {
    const nav = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
            <Card className="w-full max-w-md space-y-6">
                {/* Logo */}
                <div className="flex flex-col items-center gap-3">
                    <div className="h-14 w-14 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
                        <img
                            src={logo}
                            alt="TalentGate"
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="text-center">
                        <h1 className="text-xl font-semibold">Create your account</h1>
                        <p className="text-sm text-zinc-500">
                            One living profile. Verified hiring.
                        </p>
                    </div>
                </div>

                {/* Form */}
                <div className="space-y-4">
                    <Input label="Full name" placeholder="Your name" />
                    <Input label="Email" placeholder="you@example.com" />
                    <Input label="Password" type="password" placeholder="••••••••" />

                    <Select
                        label="Account type"
                        options={[
                            { label: "Job Seeker", value: "jobseeker" },
                            { label: "Employer / Company", value: "employer" },
                        ]}
                    />
                </div>

                <Button className="w-full" onClick={() => nav("/auth/verify")}>
                    Create Account
                </Button>

                {/* Footer */}
                <div className="text-center text-sm text-zinc-500">
                    Already have an account?{" "}
                    <Link
                        to="/auth/sign-in"
                        className="text-zinc-200 hover:underline"
                    >
                        Sign in
                    </Link>
                </div>
            </Card>
        </div>
    );
}
