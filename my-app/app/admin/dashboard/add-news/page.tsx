"use client";
import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function AddNews() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "news"), {
        title,
        description,
        createdAt: serverTimestamp(),
      });

      alert("News Added Successfully");
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md max-w-lg">
      <h2 className="text-xl font-bold mb-4">Add News</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="News Title"
          className="p-3 border rounded-lg text-black"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          className="p-3 border rounded-lg text-black"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white p-3 rounded-lg"
        >
          {loading ? "Adding..." : "Add News"}
        </button>
      </form>
    </div>
  );
}