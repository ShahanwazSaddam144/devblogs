const express = require("express");
const YourBlogs = require("../models/your_blogs");
const jwt = require("jsonwebtoken");
const { jwtDecrypt } = require("jose"); // npm install jose
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const router = express.Router();

// Middleware to support both JWT and NextAuth OAuth cookies
async function authenticate(req, res, next) {
  try {
    let token = req?.cookies?.auth_token;
    let email = null;

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      email = decoded.email;
    } else if (req?.cookies?.["__Secure-next-auth.session-token"]) {
      token = req.cookies["__Secure-next-auth.session-token"];
      const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);
      const { payload } = await jwtDecrypt(token, secret);

      email = payload?.user?.email || payload?.email;
    }

    if (!email) {
      return res.status(401).json({ message: "Unauthorized. No valid token." });
    }

    req.userEmail = email;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Invalid or expired token." });
  }
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "blogs",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});
const upload = multer({ storage });

// Routes remain the same, just make sure to use `authenticate` middleware
router.post("/yourblogs", authenticate, upload.single("image"), async (req, res) => {
  const { Name, Heading, Title, Details, Description } = req.body;
  if (!Name || !Heading || !Title || !Details || !Description) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const imageUrl = req.file?.path || null;
    const newBlog = new YourBlogs({
      Name,
      Image_URL: imageUrl,
      Heading,
      Title,
      Details,
      Description,
      email: req.userEmail,
    });

    await newBlog.save();
    res.status(201).json({ message: "Blog created successfully!", blog: newBlog });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
});


router.get("/yourblogs", async (req, res) => {
  try {
    const yourblogs = await YourBlogs.find().sort({ createdAt: -1 });
    res.status(200).json(yourblogs);
  } catch (err) {
    console.error("Error fetching blogs:", err.message);
    res.status(500).json({ message: "❌ Failed to fetch blogs." });
  }
});

router.get("/userBlog", authenticate, async (req, res) => {
  try {
    const yourblogs = await YourBlogs.find({ email: req.userEmail }).sort({ createdAt: -1 });
    res.status(200).json(yourblogs);
  } catch (err) {
    console.error("Error fetching user blogs:", err.message);
    res.status(500).json({ message: "❌ Failed to fetch blogs." });
  }
});


router.get("/yourblogs/:id", async (req, res) => {
  try {
    const blog = await YourBlogs.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "❌ Blog not found." });
    }
    res.status(200).json(blog);
  } catch (err) {
    console.error("Error fetching blog:", err.message);
    res.status(500).json({ message: "❌ Failed to fetch blog." });
  }
});


router.delete("/yourblogs/:id", authenticate, async (req, res) => {
  try {
    const blog = await YourBlogs.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "❌ Blog not found." });
    }
    if (blog.email !== req.userEmail) {
      return res.status(403).json({ message: "❌ You can only delete your own blogs." });
    }
    await YourBlogs.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "✅ Blog deleted successfully!" });
  } catch (err) {
    console.error("Error deleting blog:", err.message);
    res.status(500).json({ message: "❌ Failed to delete blog." });
  }
});


module.exports = router;
