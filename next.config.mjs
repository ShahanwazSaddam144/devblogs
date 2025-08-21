/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "avatars.githubusercontent.com", // GitHub avatars
      "lh3.googleusercontent.com",    // Google avatars
      "localhost",                    // Local dev
      "img.freepik.com",              // Freepik images
    ],
  },
};

export default nextConfig;
