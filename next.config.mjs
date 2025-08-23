/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "avatars.githubusercontent.com", // GitHub avatars
      "lh3.googleusercontent.com",    // Google avatars
      "localhost",                    // Local dev
      "img.freepik.com",              // Freepik images
      "images.unsplash.com",          // Unsplash images
      "res.cloudinary.com"
    ],
  },
};

export default nextConfig;
