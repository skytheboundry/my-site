"use client";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

export default function ManageNews() {
  const [news, setNews] = useState<any[]>([]);

  const fetchNews = async () => {
    const snapshot = await getDocs(collection(db, "news"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setNews(data);
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "news", id));
    fetchNews();
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage News</h2>

      <div className="space-y-4">
        {news.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
          >
            <h3 className="font-bold">{item.title}</h3>
            <p>{item.description}</p>

            <button
              onClick={() => handleDelete(item.id)}
              className="mt-2 bg-red-600 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}