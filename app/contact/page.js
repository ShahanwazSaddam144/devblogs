"use client";

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    Phone: '',
    Message: ''
  });

  const [responseMsg, setResponseMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      setResponseMsg(data.message || '✅ Sent!');
    } catch (err) {
      setResponseMsg('❌ Error sending message.');
    }

    setTimeout(() => setResponseMsg(''), 3000);
  };

  return (
    <>
    <Navbar />
    <section id='contact' className="py-10 px-4 cursor-pointer">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-indigo-700">
          Contact Our Team
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            name="Name"
            placeholder="Your Name"
            onChange={handleChange}
            value={formData.Name}
            required
            className="w-full border-b-2 border-gray-300 focus:border-indigo-500 px-2 py-2 outline-none transition duration-200"
          />

          <input
            name="Email"
            type="email"
            placeholder="Your Email"
            onChange={handleChange}
            value={formData.Email}
            required
            className="w-full border-b-2 border-gray-300 focus:border-indigo-500 px-2 py-2 outline-none transition duration-200"
          />

          <input
            name="Phone"
            placeholder="Your Phone"
            onChange={handleChange}
            value={formData.Phone}
            required
            className="w-full border-b-2 border-gray-300 focus:border-indigo-500 px-2 py-2 outline-none transition duration-200"
          />

          <textarea
            name="Message"
            placeholder="Your Message"
            onChange={handleChange}
            value={formData.Message}
            required
            rows="4"
            className="w-full border-b-2 border-gray-300 focus:border-indigo-500 px-2 py-2 outline-none transition duration-200 resize-none"
          />

          <button
            type="submit"
            className="w-full cursor-pointer bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-200"
          >
            Send Message
          </button>
        </form>

        {responseMsg && (
          <p className="mt-6 text-center text-sm text-green-600 font-medium">
            {responseMsg}
          </p>
        )}
      </div>
    </section>\
    <Footer />
    </>
  );
};

export default Contact;
