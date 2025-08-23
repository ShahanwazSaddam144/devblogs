const express = require("express");
const YourBlogs = require("../models/your_blogs");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Middleware to extract user email from JWT
function authenticate(req, res, next) {
  try {
    const token = req?.cookies?.auth_token;
    if (!token) return res.status(401).json({ message: "Unauthorized. No token." });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userEmail = decoded.email;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
}

// ✅ Create a new blog
router.post("/yourblogs", authenticate, async (req, res) => {
  try {
    const { Name, Image_URL, Heading, Title, Details, Description } = req.body;

    if (!Name || !Image_URL || !Heading || !Title || !Details || !Description) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newYourBlogs = new YourBlogs({
      Name,
      Image_URL,
      Heading,
      Title,
      Details,
      Description,
      email: req.userEmail,
    });

    await newYourBlogs.save();
    res.status(201).json({ message: "✅ Blog created successfully!" });
  } catch (err) {
    console.error("Error creating blog:", err.message);
    res.status(500).json({ message: "❌ Server error." });
  }
});

// ✅ Get all blogs (latest first)
router.get("/yourblogs", async (req, res) => {
  try {
    const yourblogs = await YourBlogs.find().sort({ createdAt: -1 });
    res.status(200).json(yourblogs);
  } catch (err) {
    console.error("Error fetching blogs:", err.message);
    res.status(500).json({ message: "❌ Failed to fetch blogs." });
  }
});

// ✅ Get blogs of logged-in user
router.get("/userBlog", authenticate, async (req, res) => {
  try {
    const yourblogs = await YourBlogs.find({ email: req.userEmail }).sort({ createdAt: -1 });
    res.status(200).json(yourblogs);
  } catch (err) {
    console.error("Error fetching user blogs:", err.message);
    res.status(500).json({ message: "❌ Failed to fetch blogs." });
  }
});

// ✅ Get single blog by id
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

// ✅ Delete blog by id (only if owner)
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
