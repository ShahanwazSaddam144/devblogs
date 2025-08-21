"use client";

import Navbar from "../components/Navbar";
import React, { useState } from "react";
import Footer from '../components/Footer';

const Your_Blog = () => {
  const [formData, setFormData] = useState({
    Name: "",
    Image_URL: "",
    Heading: "",
    Title: "",
    Details: "",
    Description: "",
  });

  const [responseMsg, setResponseMsg] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/yourblogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setResponseMsg("✅ Blog Created Successfully!");
      } else {
        setResponseMsg("⚠️ Server error. Try again.");
      }
    } catch {
      setResponseMsg("⚠️ Server unreachable.");
    }

    // Reset form
    setFormData({
      Name: "",
      Image_URL: "",
      Heading: "",
      Title: "",
      Details: "",
      Description: "",
    });
  };

  return (
    <>
    <section className="cursor-pointer">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-center text-indigo-700 mb-10">
          ✍️ Create Your Blog
        </h1>

        {/* Blog Form */}
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-medium text-gray-700 dark:text-gray-200">
                  Author Name
                </label>
                <input
                  name="Name"
                  placeholder="Enter your name"
                  onChange={handleChange}
                  value={formData.Name}
                  required
                  className="w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 dark:text-gray-200">
                  Blog Image URL
                </label>
                <input
                  name="Image_URL"
                  placeholder="Paste image URL"
                  onChange={handleChange}
                  value={formData.Image_URL}
                  className="w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-medium text-gray-700 dark:text-gray-200">
                  Blog Heading
                </label>
                <input
                  name="Heading"
                  placeholder="Main heading of your blog"
                  onChange={handleChange}
                  value={formData.Heading}
                  required
                  className="w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 dark:text-gray-200">
                  Blog Title
                </label>
                <input
                  name="Title"
                  placeholder="Short title"
                  onChange={handleChange}
                  value={formData.Title}
                  required
                  className="w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-200">
                Blog Details
              </label>
              <input
                name="Details"
                placeholder="Extra details (e.g., category, tags)"
                onChange={handleChange}
                value={formData.Details}
                required
                className="w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-200">
                Blog Content
              </label>
              <textarea
                name="Description"
                placeholder="Write your full blog here..."
                onChange={handleChange}
                value={formData.Description}
                required
                rows={6}
                className="w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition duration-200"
            >
              🚀 Publish Blog
            </button>
          </form>

          {responseMsg && (
            <p className="mt-6 text-center text-sm font-medium text-green-600 dark:text-green-400">
              {responseMsg}
            </p>
          )}
        </div>
      </div>
    </section>
    <Footer />
    </>
  );
};

export default Your_Blog;
