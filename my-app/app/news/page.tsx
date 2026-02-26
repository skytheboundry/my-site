"use client";

import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import Image from "next/image";

interface NewsItem {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  author: string;
  cat: string;
  createdAt?: any;
  views?: number;
  likes?: number;
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [filtered, setFiltered] = useState<NewsItem[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      const q = query(collection(db, "news"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as NewsItem[];

      setNews(data);
      setFiltered(data);
      setLoading(false);
    };

    fetchNews();
  }, []);

  useEffect(() => {
    let temp = news;

    if (category !== "All") {
      temp = temp.filter(
        (item) => item.cat?.trim() === category
      );
    }

    if (search) {
      const searchLower = search.toLowerCase();
      temp = temp.filter(
        (item) =>
          item.title.toLowerCase().includes(searchLower) ||
          item.description.toLowerCase().includes(searchLower)
      );
    }

    setFiltered(temp);
  }, [search, category, news]);

  const categories = [
    "All",
    ...Array.from(
      new Set(
        news
          .map((n) => n.cat?.trim())
          .filter(Boolean)
      )
    ),
  ];

  const formatDate = (timestamp: any) => {
    if (!timestamp || !timestamp.toDate) return "";
    return timestamp.toDate().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-16 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-4 gap-10">

        {/* LEFT CONTENT */}
        <div className="lg:col-span-3">

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search news..."
            className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white mb-6 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* CATEGORY TAGS */}
          <div className="flex gap-3 flex-wrap mb-8">
            {categories.map((cat, index) => (
              <button
                key={`cat-btn-${index}-${cat}`}
                onClick={() => setCategory(cat)}
                className={`px-4 py-1 rounded-full text-sm transition ${
                  category === cat
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* NEWS LIST */}
          {loading ? (
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="animate-pulse h-40 bg-gray-300 dark:bg-gray-800 rounded-2xl"
                />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">
              No news found.
            </p>
          ) : (
            <div className="space-y-10">
              {filtered.map((item) => (
                <Link key={item.id} href={`/news/${item.id}`}>
                  <div className="group bg-white dark:bg-gray-900 rounded-2xl m-5 shadow-md overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col md:flex-row cursor-pointer">

                    {item.imageUrl && (
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        width={400}
                        height={250}
                        className="w-full md:w-72 h-56 object-cover"
                      />
                    )}

                    <div className="p-6 flex flex-col justify-between">
                      <div>
                        <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition">
                          {item.title}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                          {item.description}
                        </p>
                      </div>

                      <div className="text-xs text-gray-500 dark:text-gray-400 flex gap-4 flex-wrap">
                        <span>By {item.author}</span>
                        <span>{formatDate(item.createdAt)}</span>
                        <span>👁 {item.views ?? 0}</span>
                        <span>❤️ {item.likes ?? 0}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="hidden lg:block space-y-8">

          {/* Categories */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md">
            <h3 className="font-bold mb-4 dark:text-white">
              Categories
            </h3>
            <ul className="space-y-2 text-sm">
              {categories.map((cat, index) => (
                <li
                  key={`cat-side-${index}-${cat}`}
                  className="cursor-pointer hover:text-blue-600 dark:text-gray-300"
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </li>
              ))}
            </ul>
          </div>

          {/* Latest News */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md">
            <h3 className="font-bold mb-4 dark:text-white">
              Latest News
            </h3>
            <ul className="space-y-3 text-sm">
              {news.slice(0, 5).map((item) => (
                <li key={`latest-${item.id}`}>
                  <Link
                    href={`/news/${item.id}`}
                    className="hover:text-blue-600 dark:text-gray-300"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}