import React from "react";
import Link from "next/link";
import {
  Instagram,
  Github,
  Facebook,
  Youtube,
} from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        {/* Logo / Brand */}
        <div>
          <h1 className="text-3xl font-bold text-indigo-600">DevBlogs</h1>
          <p className="mt-3 text-gray-400">
            Share your thoughts, explore blogs, and grow with the community.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <Link
                href="/"
                className="hover:text-indigo-500 transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/your_blogs"
                className="hover:text-indigo-500 transition-colors"
              >
                Your Blogs
              </Link>
            </li>
            <li>
              <Link
                href="#blogs"
                className="hover:text-indigo-500 transition-colors"
              >
                All Blogs
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-indigo-500 transition-colors"
              >
               Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Social / Extra */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Stay Connected</h2>
          <p className="text-gray-400 mb-4">Follow us on social platforms:</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-indigo-500">
              <Instagram size={25} />
            </a>
            <a href="#" className="hover:text-indigo-500">
              <Github size={25} />
            </a>
            <a href="#" className="hover:text-indigo-500">
              <Facebook size={25} />
            </a>
            <a href="#" className="hover:text-indigo-500">
              <Youtube size={25} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-5 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} DevBlogs. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
