"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [dark, setDark] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/admin/login");
      } else if (currentUser.email !== "admin@vanexa.com") {
        signOut(auth);
        router.push("/");
      } else {
        setUser(currentUser);
      }
    });

    return () => unsubscribe();
  }, []);

  if (!user) return null;

  return (
    <div className={`${dark ? "dark" : ""}`}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white p-10">

        <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">

          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>

            <div className="flex gap-4">
              <button
                onClick={() => setDark(!dark)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg"
              >
                Toggle Dark
              </button>

              <button
                onClick={() => {
                  signOut(auth);
                  router.push("/");
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Logout
              </button>
            </div>
          </div>

          <p className="mb-4">
            Logged in as: {user.email}
          </p>

          <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
            🚀 Welcome to Vanexa Admin Panel
          </div>

        </div>
      </div>
    </div>
  );
}