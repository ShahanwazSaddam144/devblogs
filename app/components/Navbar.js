'use client';

import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { data: session } = useSession();

  const handleDarkMode = () => {
    const darkModeOn = !isDarkMode;
    setIsDarkMode(darkModeOn);
    document.body.classList.toggle('dark-mode', darkModeOn);
    localStorage.setItem('theme', darkModeOn ? 'dark' : 'light');
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme === 'dark';
    setIsDarkMode(isDark);
    if (isDark) {
      document.body.classList.add('dark-mode');
    }
  }, []);

  return (
    <nav className="Navbar bg-blue-800 text-white p-4 h-auto relative z-10">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <h1 className="text-[30px] font-bold">Shahnawaz</h1>

        {/* Desktop links */}
        <ul className="hidden md:flex space-x-10 items-center">
          <li><Link href="/" className="hover:text-yellow-300">Home</Link></li>
          <li><Link href="/about" className="hover:text-yellow-300">About</Link></li>
          <li><Link href="/contact" className="hover:text-yellow-300">Contact</Link></li>
          <li>
            <button onClick={handleDarkMode} className="text-2xl">
              {isDarkMode ? '🌙' : '☀️'}
            </button>
          </li>
          {session?.user && (
            <li className="relative group">
              <Image
                src={session.user.image}
                alt="avatar"
                width={36}
                height={36}
                className="rounded-full cursor-pointer"
              />
              <button
                onClick={() => signOut()}
                className="absolute top-10 right-0 bg-red-500 px-3 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                Logout
              </button>
            </li>
          )}
        </ul>

        {/* Hamburger */}
        <button className="md:hidden text-2xl" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? '✖️' : '☰'}
        </button>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <ul className="md:hidden mt-4 space-y-4 w-[130px] mx-auto text-center">
          <li className="border p-2 active:text-yellow-300"><Link href="/">Home</Link></li>
          <li className="border p-2 active:text-yellow-300"><Link href="/about">About</Link></li>
          <li className="border p-2 active:text-yellow-300"><Link href="/contact">Contact</Link></li>
          <li>
            <button onClick={handleDarkMode} className="text-2xl mt-2">
              {isDarkMode ? '🌙' : '☀️'}
            </button>
          </li>
          {session?.user && (
            <li className="flex flex-col items-center">
              <Image
                src={session.user.image}
                alt="avatar"
                width={36}
                height={36}
                className="rounded-full"
              />
              <button
                onClick={() => signOut()}
                className="mt-2 px-3 py-1 bg-red-500 text-white rounded text-sm"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
