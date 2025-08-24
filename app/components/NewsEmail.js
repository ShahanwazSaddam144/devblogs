import React, { useState } from 'react';

const NewsEmail = () => {
  const [formData, setFormData] = useState({
    Email: "",
  });
  const [responseMsg, setResponseMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/newsemail`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setResponseMsg("Email send successfully ✅");
        setFormData({ Email: "" }); 
      } else {
        setResponseMsg("Failed to submit review ❌");
      }
    } catch (err) {
      setResponseMsg("Error submitting review ⚠️");
    }

    setTimeout(() => setResponseMsg(""), 3000);
  };

  return (
    <section className='mt-10 max-w-2xl mx-auto py-16 px-4'>
        <h1 className='text-center font-bold text-indigo-700 text-[30px] mb-1'>Never miss a blog</h1>
        <p className='text-center font-semibold text-[18px] text-gray-700 mb-3'>Get latest updates for coding, information, entertainment</p>
      <form onSubmit={handleSubmit} className="flex gap-3 justify-center items-center">
        <input
          name="Email"
          type='email'
          placeholder="Your Email"
          onChange={handleChange}
          value={formData.Email}
          required
          className="w-full sm:w-[400px] border-2 border-gray-300 focus:border-indigo-500 px-2 py-2 outline-none transition duration-200"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md  hover:bg-indigo-700 transition"
        >
          Submit
        </button>
      </form>

          {responseMsg && (
            <p className="mt-6 text-center text-sm text-green-600 font-medium">
              {responseMsg}
            </p>
          )}
    </section>
  );
};

export default NewsEmail;
