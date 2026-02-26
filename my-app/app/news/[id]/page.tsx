"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useParams } from "next/navigation";
import Image from "next/image";
import { updateDoc, increment } from "firebase/firestore";

export default function NewsDetail() {
  const params = useParams();
  const id = params?.id as string;

  const [news, setNews] = useState<any>(null);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    if (!id) return;

    const fetchNews = async () => {
      try {
        const docRef = doc(db, "news", id);
        const snap = await getDoc(docRef);
        await updateDoc(docRef, {
            views: increment(1),
            });
        if (snap.exists()) {
          setNews(snap.data());
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        News not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">

        <h1 className="text-4xl font-bold mb-6 text-gray-800 dark:text-white">
          {news.title}
        </h1>

        {news.imageUrl && (
          <div className="mb-6">
            <Image
              src={news.imageUrl}
              alt={news.title}
              width={800}
              height={500}
              className="rounded-xl object-cover w-full"
            />
          </div>
        )}

        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          {news.description}
        </p>
        

      </div>
    </div>
  );
}