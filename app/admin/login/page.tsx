"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (res.ok) {
                router.push("/admin");
            } else {
                const data = await res.json();
                setError(data.message || "Login failed");
            }
        } catch (err) {
            setError("An error occurred");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#faf8f5] px-4">
            <div className="w-full max-w-md rounded-3xl border border-gray-100 bg-white p-8 shadow-xl shadow-black/5 text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-orange-50 text-[#c44522]">
                    <Lock className="h-7 w-7" strokeWidth={2.5} />
                </div>
                <h1 className="mb-6 text-2xl font-bold text-gray-900">Admin Login</h1>

                {error && (
                    <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-500">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 font-medium outline-none transition-all focus:border-[#c44522] text-black"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 font-medium outline-none transition-all focus:border-[#c44522] text-black"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full rounded-xl bg-[#c44522] py-3.5 text-sm font-bold text-white transition-all hover:bg-[#a33a1c]"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
