"use client";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Dashboard() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      const snapshot = await getDocs(collection(db, "news"));
      setCount(snapshot.size);
    };
    fetchCount();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md w-64">
        <h2 className="text-lg font-semibold">Total News</h2>
        <p className="text-3xl font-bold text-blue-600">{count}</p>
      </div>
    </div>
  );
}