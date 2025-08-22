"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Welcome from "./components/Welcome";
import Blogs from "./components/Blogs";
import NewsEmail from "./components/NewsEmail";
import Footer from "./components/Footer";
import { useRouter } from "next/navigation";

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
    }
  }, []);

  useEffect(() => {
    if (session?.user?.email) {
      const sendUserToBackend = async () => {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/oauth`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              name: session.user.name,
              email: session.user.email,
              image: session.user.image,
            }),
          });

          const data = await res.json();
          console.log("✅ User sent to backend:", data);
        } catch (error) {
          console.error("❌ Failed to send user to backend:", error);
        }
      };

      sendUserToBackend();
    }
  }, [session]);


  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") return null;
  if (status === "unauthenticated") return null;

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
