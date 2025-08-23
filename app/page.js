"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import Navbar from "./components/Navbar";
import Welcome from "./components/Welcome";
import Blogs from "./components/Blogs";
import NewsEmail from "./components/NewsEmail";
import Footer from "./components/Footer";

export default function Page() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const isDark = savedTheme === "dark";
    setIsDarkMode(isDark);

    if (isDark) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, []);

  // Send authenticated user info to backend
  useEffect(() => {
    if (session?.user?.email) {
      const sendUserToBackend = async () => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/oauth`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify({
                name: session.user.name,
                email: session.user.email,
                image: session.user.image,
              }),
            }
          );

          const data = await res.json();
          console.log("✅ User sent to backend:", data);
        } catch (error) {
          console.error("❌ Failed to send user to backend:", error);
        }
      };

      sendUserToBackend();
    }
  }, [session]);

  // Check authentication on page load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/valid`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        if (!data.isValid) {
          router.push("/login");
        }
      } catch (err) {
        console.error("❌ Auth check failed:", err);
      }
    };

    // Only run if unauthenticated
    if (status === "unauthenticated") {
      checkAuth();
    }
  }, [status, router]);

  if (status === "loading") return null;

  return (
    <>
      <Navbar />
      <Welcome />
      <Blogs />
      <NewsEmail />
      <Footer />
    </>
  );
}
