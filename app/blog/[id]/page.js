"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Navbar from '../../components/Navbar';
import Review from '../../components/review';
import Footer from '../../components/Footer';

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`http://localhost:5000/yourblogs/${id}`);
        const data = await res.json();
        setBlog(data);
      } catch (err) {
        console.error("Error fetching blog:", err);
      }
    };
    fetchBlog();
  }, [id]);

  if (!blog)
    return (
      <p className="text-center mt-20 text-lg font-semibold text-gray-600">
        Loading blog details...
      </p>
    );

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto mt-10 px-4 sm:px-6 lg:px-8 cursor-pointer">
        {/* Author */}
        <h1 className="text-center font-bold mb-2 text-[20px]">Author Name:</h1>
        <h1
          className="text-center text-[22px] sm:text-[25px] font-semibold mb-6 
        px-6 py-3
        text-white rounded-xl shadow-md border border-gray-200 
        hover:bg-indigo-600 transition-all duration-300 bg-indigo-500"
        >
          ✍️ {blog.Name}
        </h1>

        {/* Blog Image */}
        <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg mb-6">
          <Image
            src={blog.Image_URL}
            alt={blog.Heading}
            fill
            className="object-cover"
            priority />
        </div>


        <h1 className="text-3xl font-bold mb-4">{blog.Heading}</h1>


        <p className="text-gray-600 font-bold mb-2">{blog.Title}</p>

        <p className="text-lg text-gray-700 mb-6">{blog.Description}</p>

        <div className="text-gray-800 prose prose-lg dark:prose-invert max-w-none">
          {typeof blog.Details === "string" ? (
            <div dangerouslySetInnerHTML={{ __html: blog.Details }} />
          ) : (
            blog.Details
          )}
        </div>
      </div>
      <Review />
      <Footer />
    </>
  );
};

export default BlogDetails;
