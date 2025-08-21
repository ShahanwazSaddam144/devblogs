const express = require("express");
const YourBlogs = require("../models/your_blogs");

const router = express.Router();

// Create a new blog
router.post("/yourblogs", async (req, res) => {
  const { Name, Image_URL, Heading, Title, Details, Description } = req.body;

  if (!Name || !Image_URL || !Heading || !Title || !Details || !Description) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const newYourBlogs = new YourBlogs({
      Name,
      Image_URL,
      Heading,
      Title,
      Details,
      Description,
    });

    await newYourBlogs.save();
    res.status(200).json({ message: "✅ Blog created successfully!" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "❌ Server error." });
  }
});

// Get all blogs (latest first)
router.get("/yourblogs", async (req, res) => {
  try {
    const yourblogs = await YourBlogs.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json(yourblogs);
  } catch (err) {
    console.error(err.message);
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
    console.error(err.message);
    res.status(500).json({ message: "❌ Failed to fetch blog." });
  }
});

module.exports = router; 