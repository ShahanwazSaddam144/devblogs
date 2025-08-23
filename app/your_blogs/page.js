"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

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
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/userBlog`, {
        credentials: "include",
      });
      if (!res.ok) {
        console.error("Fetch blogs failed:", res.status);
        setUserBlogs([]);
        return;
      }
      const data = await res.json();
      const blogs = Array.isArray(data) ? data : data.blogs || [];
      setUserBlogs(blogs);
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "Image" && e.target.files && e.target.files[0]) {
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
    if (submitting) return;
    setSubmitting(true);

    try {
      const data = new FormData();
      data.append("Name", formData.Name);
      data.append("Heading", formData.Heading);
      data.append("Title", formData.Title);
      data.append("Details", formData.Details);
      data.append("Description", formData.Description);
      if (formData.Image) data.append("image", formData.Image); // `image` matches `upload.single("image")` on backend

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/yourblogs`, {
        method: "POST",
        body: data,
        credentials: "include",
      });

      const body = await res.json();
      console.log("POST response body:", body);

      if (res.ok) {
        toast.success("✅ Blog Created Successfully!");
        const createdBlog = body.blog || null;

        if (createdBlog && createdBlog._id) {
          setUserBlogs((prev) => [createdBlog, ...prev]);
        } else {
          await fetchBlogs();
        }
      } else {
        toast.error(body?.message || "⚠️ Server error. Try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("⚠️ Server unreachable.");
    } finally {
      setSubmitting(false);
      setFormData({
        Name: "",
        Image: null,
        Heading: "",
        Title: "",
        Details: "",
        Description: "",
      });
    }
  };

  const handleDelete = (id, e) => {
    e.preventDefault();

    toast(
      (t) => (
        <div className="flex flex-col gap-3 p-2">
          <p className="text-sm">⚠️ Are you sure you want to delete this blog?</p>
          <div className="flex justify-center gap-2">
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  const res = await fetch(`http://localhost:5000/yourblogs/${id}`, {
                    method: "DELETE",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                  });
                  const data = await res.json();
                  if (res.ok) {
                    // update local state
                    setUserBlogs((prev) => prev.filter((blog) => blog._id !== id));
                    toast.success(data.message || "✅ Blog deleted successfully!");
                  } else {
                    toast.error(data.message || "❌ Failed to delete blog.");
                  }
                } catch (err) {
                  console.error("Delete error:", err);
                  toast.error("❌ Something went wrong while deleting the blog.");
                }
              }}
              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
            >
              Yes
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="bg-gray-300 px-4 py-1 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );
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
                disabled={submitting}
                className={`w-full ${submitting ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"} text-white py-3 rounded-xl font-semibold transition duration-200`}
              >
                {submitting ? "Publishing..." : "🚀 Publish Blog"}
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

            {loading && <p className="text-center text-gray-500">Loading blogs…</p>}
            {!loading && userBlogs.length === 0 && (
              <p className="text-center text-gray-500 dark:text-gray-400">No blogs yet.</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {userBlogs.map((blog, index) => (
                <div
                  key={blog._id ?? blog._tempId ?? index}
                  className="border border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  {blog.Image_URL && (
                    <img src={blog.Image_URL} alt={blog.Title} className="w-full h-48 object-cover" />
                  )}
                  <div className="p-6 text-center">
                    <h3 className="font-bold text-xl text-gray-900 dark:text-indigo-700">{blog.Heading || "Untitled"}</h3>
                    <p className="text-gray-800 text-sm mt-1">{blog.Title || ""}</p>
                    <p className="text-gray-900 mt-3">{blog.Description || ""}</p>

                    <button onClick={(e) => handleDelete(blog._id, e)} className="mt-4 bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition-colors duration-200">Delete</button>
                  </div>
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
