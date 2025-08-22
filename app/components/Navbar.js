'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import {

  Menu,
  X,
  Home,
  BookImage,
  Phone,
  LogOut,
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  console.log(session.user)

  return (
    <nav className=" text-white bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-4 sticky top-0 z-50 shadow-sm">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        {/* Logo */}
        <h1 className="text-2xl md:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
          DevBlogs
        </h1>

        {/* Desktop links */}
        <ul className="hidden md:flex space-x-6 items-center font-medium">
          <li>
            <Link
              href="/"
              className="flex items-center gap-2 px-3 py-2 rounded hover:text-gray-100 hover:bg-indigo-100 dark:hover:bg-indigo-800 transition"
            >
              <Home size={18} /> Home
            </Link>
          </li>
          <li>
            <Link
              href="/your_blogs"
              className="flex items-center gap-2 px-3 py-2 rounded hover:text-gray-100 hover:bg-indigo-100 dark:hover:bg-indigo-800 transition"
            >
              <BookImage size={18} /> Your Blogs
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="flex items-center gap-2 px-3 py-2 rounded hover:text-gray-100 hover:bg-indigo-100 dark:hover:bg-indigo-800 transition"
            >
              <Phone size={18} /> Contact
            </Link>
          </li>
          {session?.user && (
            <li className="relative group">
              <Image
                src={
                  session.user.image || "/default-avatar.png"
                }
                alt={session.user.name || session.user.email || "avatar"}
                width={36}
                height={36}
                className="rounded-full cursor-pointer border border-gray-300 dark:border-gray-700"
              />
              <button
                onClick={() => signOut()}
                className="absolute top-11 right-0 flex items-center gap-1 bg-red-500 px-3 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-white shadow-md"
              >
                <LogOut size={16} /> Logout
              </button>
            </li>
          )}

        </ul>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <ul className="md:hidden mt-4 space-y-4 w-[180px] mx-auto text-center bg-white dark:bg-gray-900 rounded-lg py-4 shadow-lg border border-gray-200 dark:border-gray-700">
          <li>
            <Link
              href="/"
              className="flex items-center justify-center gap-2 px-3 py-2 rounded hover:bg-indigo-100 dark:hover:bg-indigo-800 transition"
            >
              <Home size={18} /> Home
            </Link>
          </li>
          <li>
            <Link
              href="/your_blogs"
              className="flex items-center justify-center gap-2 px-3 py-2 rounded hover:bg-indigo-100 dark:hover:bg-indigo-800 transition"
            >
              <BookImage size={18} /> Your Blogs
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 px-3 py-2 rounded hover:bg-indigo-100 dark:hover:bg-indigo-800 transition"
            >
              <Phone size={18} /> Contact
            </Link>
          </li>
          {session?.user && (
            <li className="flex flex-col items-center gap-2">
              <Image
                src={session?.user?.image}
                alt="avatar"
                width={40}
                height={40}
                className="rounded-full border border-gray-300 dark:border-gray-700"
              />
              <button
                onClick={() => signOut()}
                className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded text-sm shadow-md"
              >
                <LogOut size={16} /> Logout
              </button>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
