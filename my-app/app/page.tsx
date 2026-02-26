"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import Banner from "@/components/Banner";
type NewsItem = {
  id: string;
  title: string;
  description: string;
  date: string;
  author: string;
};
export default function Home() {

  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    async function fetchNews() {
      const querySnapshot = await getDocs(collection(db, "news"));

      const newsData: NewsItem[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();

        return {
          id: doc.id,
          title: data.title ?? "",
          description: data.description ?? "",
          date: data.date
            ? new Date(data.date.seconds * 1000).toLocaleDateString()
            : "",
          author: data.author ?? "",
        };
      });

      setNews(newsData);
    }

    fetchNews();
  }, []);

  return (
    <>
    <Banner
  title="Empowering Businesses with Innovation"
  subtitle="Latest updates, insights, and technology innovations from Vanexa."
  buttonText="GET-STARTED"
  buttonLink="/"
  backgroundImage="/banner-bg.png" // optional
/>
      {/* HERO SECTION */}
      {/* <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-28 text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Empowering Businesses with Innovation
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl mb-8">
          Vanexa delivers cutting-edge technology solutions that drive
          growth, efficiency, and success.
        </p>
        <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-gray-100 transition">
          Get Started
        </button>
      </section> */}

      {/* ABOUT SECTION */}
      <section className="py-24 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          About Vanexa
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          We are committed to delivering high-quality services and
          cutting-edge technology solutions tailored to modern businesses.
        </p>
      </section>

      {/* SERVICES */}
      <section className="py-28 px-6 bg-gray-50">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
          Our Services
        </h2>

        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-blue-600">
              Consulting
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Strategic business and technology consulting tailored to your goals.
            </p>
          </div>

          <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-blue-600">
              Development
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Custom web and software development solutions built for growth.
            </p>
          </div>

          <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-blue-600">
              Support
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Reliable 24/7 support and maintenance services.
            </p>
          </div>
        </div>
      </section>


      {/* NEWS PREVIEW */}
      <section className="py-24 px-6 bg-gray-100">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
          Latest News
        </h2>

        {news.length === 0 ? (
          <p className="text-center text-gray-500">
            No news available.
          </p>
        ) : (
          <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
            {news.map((item) => (
              <Link href={`/news/${item.id}`} key={item.id}>
              <div
                
                className="bg-white p-6 rounded-xl shadow-md w-full md:w-[350px] hover:shadow-xl transition"
              >
                <h3 className="text-xl font-semibold mb-2 text-blue-600">
                  {item.title}
                </h3>

                <p className="text-gray-600 mb-4">
                  {item.description}
                </p>

                <p className="text-sm text-gray-400">
                  {item.date} | {item.author}
                </p>
              </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}