"use client";

import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  updateDoc,
  increment,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface NewsItem {
  id: string;
  title: string;
  description: string;
  content:string;
  imageUrl?: string;
  author?: string;
  category?: string;
  createdAt?: any;
  views?: number;
  likes?: number;
}

export default function NewsDetail() {
  const params = useParams();
  const id = params?.id as string;

  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchNews = async () => {
      try {
        const docRef = doc(db, "news", id);
        const snap = await getDoc(docRef);

        if (snap.exists()) {
          // increment views safely
          await updateDoc(docRef, {
            views: increment(1),
          });

          setNews({
            id: snap.id,
            ...snap.data(),
          } as NewsItem);
        } else {
          setNews(null);
        }
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    };

    fetchNews();
  }, [id]);

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "";
    return timestamp.toDate().toLocaleDateString();
  };

  const handleLike = async () => {
  if (!news?.id) return;

  try {
    const docRef = doc(db, "news", news.id);
    console.log("DB:", db);
    console.log("News:", news);
    await updateDoc(docRef, {
      likes: increment(1),
    });

    setNews((prev: any) =>
      prev
        ? { ...prev, likes: (prev.likes || 0) + 1 }
        : prev
    );
  } catch (error) {
    console.error("Like error:", error);
  }
};

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading article...
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        News not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-16 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-4 gap-10">

        {/* LEFT CONTENT */}
        <div className="lg:col-span-3">
          <article className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg">

            {/* Category */}
            {news.category && (
              <span className="inline-block bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full mb-4">
                {news.category}
              </span>
            )}

            {/* Title */}
            <h1 className="text-4xl font-bold mb-6 text-gray-800 dark:text-white">
              {news.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
              <span>By {news.author || "Admin"}</span>
              <span>{formatDate(news.createdAt)}</span>
              <span>👁 {news.views || 0}</span>
              <span>❤️ {news.likes || 0}</span>
            </div>

            {/* Image */}
            {news.imageUrl && (
              <div className="mb-8">
                <Image
                  src={news.imageUrl}
                  alt={news.title}
                  width={900}
                  height={500}
                  className="rounded-xl object-cover w-full"
                />
              </div>
            )}

            {/* Content */}
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {news.description}
            </p>

            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {news.content}
            </p>

            {/* Like Button */}
            <div className="mt-8">
              <button
                onClick={handleLike}
                className="hover:bg-red-500 text-white px-6 py-2 rounded-lg transition"
              >
                ❤️ Like Article
              </button>
            </div>

          </article>
        </div>

        {/* RIGHT SIDEBAR */}
        <aside className="hidden lg:block space-y-8">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md">
            <h3 className="font-bold mb-4">More Articles</h3>
            <p className="text-sm text-gray-500">
              Browse our latest company updates and insights.
            </p>
            <Link
              href="/news"
              className="inline-block mt-4 text-blue-600 hover:underline"
            >
              View All News →
            </Link>
          </div>
        </aside>

      </div>
    </div>
  );
}