import { Inter } from "next/font/google";
import "./globals.css";
import SessionWrapper from "../app/components/SessionWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DevBlogs | Share & Discover Developer Insights",
  description:
    "DevBlogs is your go-to platform for sharing coding knowledge, exploring tutorials, tech news, and developer stories. Join the community and level up your skills.",
  keywords: [
    "DevBlogs",
    "developer blogs",
    "coding tutorials",
    "tech news",
    "JavaScript blogs",
    "web development",
    "programming tips",
    "React blogs",
    "Next.js tutorials",
    "developer community"
  ],
  authors: [{ name: "DevBlogs Team" }],
  openGraph: {
    title: "DevBlogs | Share & Discover Developer Insights",
    description:
      "Explore articles, coding tutorials, and developer tips on DevBlogs. A hub for programmers to learn, share, and grow together.",
    url: "https://yourdomain.com",
    siteName: "DevBlogs",
    images: [
      {
        url: "/butt.png",
        width: 1200,
        height: 630,
        alt: "DevBlogs Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevBlogs | Share & Discover Developer Insights",
    description:
      "Discover coding tutorials, developer stories, and the latest in tech on DevBlogs.",
    images: ["/butt.png"],
    creator: "@yourTwitterHandle",
  },
  icons: {
    icon: "/butt.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionWrapper>{children}</SessionWrapper>
      </body>
    </html>
  );
}
