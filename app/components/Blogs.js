"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowBigRight } from "lucide-react";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  // Fetch blogs from backend
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/yourblogs`);
        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <>
      {/* Section Heading */}
      <section className="mt-20 px-4 sm:px-6 lg:px-8" id="blogs">
        <h1 className="text-center font-extrabold text-3xl sm:text-4xl md:text-5xl text-indigo-700">
          Blogs
        </h1>

        {/* Categories */}
        <div className="flex flex-wrap justify-center items-center mt-6 gap-3 sm:gap-4">
          {["All", "Coding", "Information", "Entertainment"].map((category) => (
            <button
              key={category}
              className="px-5 py-2 sm:px-6 sm:py-2.5 rounded-full font-semibold text-gray-700 dark:text-gray-300 
              bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 
              hover:bg-indigo-600 hover:text-white hover:border-indigo-600 
              transition-all duration-200 shadow-sm cursor-pointer"
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section id="All" className="mt-12 px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 cursor-pointer">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-gray-200 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative w-full h-48">
                {blog.Image_URL ? (
                  <Image
                    src={blog.Image_URL}
                    alt={blog.Heading}
                    fill
                    className="object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
              </div>


              {/* Blog Content */}
              <div className="p-5">
                <h2 className="text-xl font-bold text-gray-900 mb-1">
                  {blog.Heading}
                </h2>
                <p className="text-[18px] font-bold text-gray-800  mb-3">
                  {blog.Title}
                </p>
                <p className="text-gray-700  mb-4 line-clamp-2">
                  {blog.Description}
                </p>

                {/* Read More Button */}
                <Link href={`/blog/${blog._id}`}>
                  <button className="px-4 py-2 flex items-center gap-2 
                  bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                    Read More <ArrowBigRight size={18} />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Blogs;
