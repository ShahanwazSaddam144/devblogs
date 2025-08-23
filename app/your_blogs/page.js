"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import React, { useState, useEffect } from "react";

const Your_Blog = () => {
  const [formData, setFormData] = useState({
    Name: "",
    Image: null, 
    Heading: "",
    Title: "",
    Details: "",
    Description: "",
  });

  const [responseMsg, setResponseMsg] = useState("");
  const [userBlogs, setUserBlogs] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  // Fetch user blogs on mount
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("http://localhost:5000/yourblogs", {
          credentials: "include", 
        });
        const data = await res.json();
        setUserBlogs(data.blogs || []);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      }
    };
    fetchBlogs();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "Image" && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, Image: e.target.files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (["dragenter", "dragover"].includes(e.type)) setDragActive(true);
    else if (["dragleave", "drop"].includes(e.type)) setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFormData((prev) => ({ ...prev, Image: e.dataTransfer.files[0] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/yourblogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          Name: formData.Name,
          Heading: formData.Heading,
          Title: formData.Title,
          Details: formData.Details,
          Description: formData.Description,
        }),
      });

      if (res.ok) {
        setResponseMsg("✅ Blog Created Successfully!");
        const newBlogs = await res.json();
        setUserBlogs(newBlogs.blogs || []);
      } else {
        setResponseMsg("⚠️ Server error. Try again.");
      }
    } catch (err) {
      console.error(err);
      setResponseMsg("⚠️ Server unreachable.");
    }

    setFormData({
      Name: "",
      Heading: "",
      Title: "",
      Details: "",
      Description: "",
    });
  };

const handleDelete = async (id, e) => {
  e.preventDefault();

  try {
    const response = await fetch(`http://localhost:5000/yourblogs/${id}`, {
      method: "DELETE",
      credentials: "include", 
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message); 
      setBlogs((prev) => prev.filter((blog) => blog._id !== id));
    } else {
      alert(data.message || "❌ Failed to delete blog.");
    }
  } catch (err) {
    console.error("Error deleting blog:", err);
    alert("❌ Something went wrong.");
  }
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

                <div
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  className={`w-full border border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer ${dragActive ? "border-indigo-500 bg-indigo-50" : "border-gray-300 bg-gray-50"
                    }`}
                >
                  <label className="font-medium text-black dark:text-black mb-2">
                    Upload Blog Image
                  </label>
                  <input
                    type="file"
                    name="Image"
                    accept="image/*"
                    onChange={handleChange}
                    className="hidden"
                    id="fileInput"
                  />
                  <button
                    type="button"
                    onClick={() => document.getElementById("fileInput").click()}
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                  >
                    Select Image
                  </button>
                  {formData.Image && (
                    <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                      Selected: {formData.Image.name}
                    </p>
                  )}
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

          {/* Render user's blogs */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
              Your Published Blogs
            </h2>
            {userBlogs.length === 0 && (
              <p className="text-center text-gray-500 dark:text-gray-400">No blogs yet.</p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {userBlogs.map((blog) => (
                <div key={blog._id} className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden shadow-md">
                  {blog.Image && (
                    <img src={`http://localhost:5000/uploads/${blog.Image}`} alt={blog.Title} className="w-full h-48 object-cover" />
                  )}
                  <div className="p-4">
                    <h3 className="font-bold text-lg">{blog.Heading}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">{blog.Title}</p>
                    <p className="text-gray-700 dark:text-gray-200 mt-2">{blog.Description}</p>
                  </div>
                  <button onClick={handleDelete}>Delete</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Your_Blog;
