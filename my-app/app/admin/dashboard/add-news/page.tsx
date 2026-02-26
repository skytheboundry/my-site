"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

export default function AddNews() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("General");
  const [imageUrl, setImageUrl] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!title || !description || !author || !content) {
      setError("Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "news"), {
        title,
        description,
        content,
        author,
        category,
        imageUrl: imageUrl || "",
        views: 0,
        likes: 0,
        createdAt: serverTimestamp(),
      });

      setSuccess("News added successfully 🎉");

      setTitle("");
      setDescription("");
      setContent("");
      setAuthor("");
      setCategory("General");
      setImageUrl("");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl max-w-xl">
      <h2 className="text-2xl font-bold mb-6">Add News</h2>

      {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 text-green-600 p-3 rounded-lg mb-4 text-sm">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Title */}
        <input
          type="text"
          placeholder="News Title"
          className="p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Description */}
        <textarea
          placeholder="Description"
          rows={4}
          className="p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

           {/* Content */}
        <textarea
          placeholder="Content"
          rows={10}
          className="p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={description}
          onChange={(e) => setContent(e.target.value)}
        />

        {/* Author */}
        <input
          type="text"
          placeholder="Author Name"
          className="p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        {/* Category */}
        <select
          className="p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>General</option>
          <option>Technology</option>
          <option>Business</option>
          <option>Sports</option>
          <option>Entertainment</option>
        </select>

        {/* Image URL */}
        <input
          type="text"
          placeholder="Image URL (optional)"
          className="p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-medium transition disabled:opacity-60"
        >
          {loading ? "Adding..." : "Add News"}
        </button>
      </form>
    </div>
  );
}