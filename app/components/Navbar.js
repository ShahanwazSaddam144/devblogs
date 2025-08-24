"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, BookImage, Phone, LogOut } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    try {

      await signOut({ redirect: false });


      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/logout`,
        {},
        { withCredentials: true }
      );
      router.push('/login');
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="text-black p-4">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <Link href="/">
          <h1 className="text-2xl md:text-3xl font-extrabold text-indigo-600">
            DevBlogs
          </h1>
        </Link>


        <ul className="hidden md:flex space-x-6 items-center font-medium">
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

          {(session?.user || true) && (
            <>
              {session?.user && (
                <li>
                  {session.user.name || session.user.email}
                </li>
              )}
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 bg-red-500 px-3 py-2 rounded text-sm text-white hover:bg-red-600 transition-colors shadow-md"
                >
                  <LogOut size={16} /> Logout
                </button>
              </li>
            </>
          )}
        </ul>


        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <ul className="md:hidden mt-4 space-y-4 w-[180px] mx-auto text-center rounded-lg py-4">
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
          <li className="flex flex-col items-center gap-2">
            {session?.user && (
              <Image
                src={session.user.image || "/default-avatar.png"}
                alt="avatar"
                width={40}
                height={40}
                className="rounded-full border border-gray-300 dark:border-gray-700"
              />
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded text-sm shadow-md hover:bg-red-600 transition-colors"
            >
              <LogOut size={16} /> Logout
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
