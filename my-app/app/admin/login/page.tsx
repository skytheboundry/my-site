"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            // 🔐 Role-based check
            if (userCredential.user.email !== "admin@vanexa.com") {
                setError("You are not authorized as admin.");
                await auth.signOut();
                setLoading(false);
                return;
            }

            router.push("/admin");
        } catch (err: any) {
            setError("Invalid email or password.");
        }

        setLoading(false);
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 px-4">

            {/* Floating circles */}
            <div className="absolute w-72 h-72 bg-white/10 rounded-full top-10 left-10 animate-pulse"></div>
            <div className="absolute w-96 h-96 bg-white/10 rounded-full bottom-10 right-10 animate-pulse"></div>

            <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-10">

                <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
                    Admin Login
                </h2>

                <form onSubmit={handleLogin} className="space-y-5">

                    <input
                        type="email"
                        placeholder="Email address"
                        className="w-full p-3 border rounded-lg 
             text-black placeholder-gray-500
             focus:ring-2 focus:ring-blue-500 focus:outline-none
             dark:bg-gray-800 dark:text-white"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-3 border rounded-lg 
             text-black placeholder-gray-500
             focus:ring-2 focus:ring-blue-500 focus:outline-none
             dark:bg-gray-800 dark:text-white"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {/* Error UI */}
                    {error && (
                        <div className="bg-red-100 text-red-600 p-3 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            "Login"
                        )}
                    </button>

                </form>
            </div>
        </div>
    );
}