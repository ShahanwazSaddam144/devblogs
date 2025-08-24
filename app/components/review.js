"use client";

import React, { useState, useEffect } from "react";


const Review = () => {
  const [formData, setFormData] = useState({
    Name: "",
    Review: "",
  });

  const [reviews, setReviews] = useState([]);
  const [responseMsg, setResponseMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setResponseMsg(data.message || "✅ Sent!");
      fetchReviews(); // ✅ reload reviews after new one is added
    } catch (err) {
      setResponseMsg("❌ Error sending message.");
    }

    setTimeout(() => setResponseMsg(""), 3000);
  };

  const fetchReviews = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/review`);
      const data = await res.json();
      setReviews(data); // ✅ save reviews in state
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);


  return (
    <>
      <section id="contact" className="py-16 px-4 cursor-pointer">
        {/* ✅ Show fetched reviews */}
        <div className="mt-10 mb-5">
          <h1 className="text-[30px] mb-3 font-bold text-center text-indigo-700">User Reviews</h1>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r) => (
              <div
                key={r._id}
                className="border border-gray-200 p-5 rounded-xl shadow-md bg-white hover:shadow-lg transition"
              >
                <h3 className="font-semibold text-lg text-purple-700">
                  {r.Name}
                </h3>
                <p className="text-gray-600 mt-2">{r.Review}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="max-w-2xl mx-auto mt-15">
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-indigo-800 mb-8">
            Give your Review
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              name="Name"
              placeholder="Your Name"
              onChange={handleChange}
              value={formData.Name}
              required
              className="w-full border-2 border-gray-300 focus:border-indigo-500 px-2 py-2 outline-none transition duration-200"
            />

            <textarea
              name="Review"
              placeholder="Your Review"
              onChange={handleChange}
              value={formData.Review}
              required
              rows="4"
              className="w-full border-2 border-gray-300 focus:border-indigo-500 px-2 py-2 outline-none transition duration-200 resize-none"
            />

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-200"
            >
              Give Review
            </button>
          </form>

          {responseMsg && (
            <p className="mt-6 text-center text-sm text-green-600 font-medium">
              {responseMsg}
            </p>
          )}
        </div>
      </section>
    </>
  );
};

export default Review;
