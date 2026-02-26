"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
    const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
 

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.success) {
      setSuccess("Message sent successfully!");
      setForm({ name: "", email: "", subject: "", message: "" });
    } else {
      setSuccess("Something went wrong.");
    }

    const response = await fetch("/api/sms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, message: `New contact form submission from ${form.name} (${form.email}): ${form.subject} - ${form.message}` }),
    });

    const smsdata = await response.json();
    console.log(smsdata);
    if (smsdata.success) {
      console.log("SMS sent successfully!");
    } else {
      alert("Failed to send SMS");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-6">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-xl">

        <h1 className="text-4xl font-bold mb-8 text-gray-800 dark:text-white">
          Contact Us
        </h1>

        {success && (
          <div className="mb-6 text-green-600 font-medium">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg text-black"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg text-black"
          />
            <input
        type="text"
        placeholder="+91XXXXXXXXXX"
        className="w-full p-3 border rounded mb-3"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={form.subject}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg text-black"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full p-3 border rounded-lg text-black"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

        </form>
      </div>
    </div>
  );
}