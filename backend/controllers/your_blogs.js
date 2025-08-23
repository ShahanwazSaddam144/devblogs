const express = require("express");
const YourBlogs = require("../models/your_blogs");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Create a new blog
router.post("/yourblogs", async (req, res) => {
  const { Name, Heading, Title, Details, Description } = req.body;
  if (!Name || !Heading || !Title || !Details || !Description) {
    return res.status(400).json({ message: "All fields are required." });
  }
  const email = req?.cookies?.auth_token
  const decoded = jwt.verify(email, process.env.JWT_SECRET);
  const userEmail = decoded.email;

  try {
    const newYourBlogs = new YourBlogs({
      id:1,
      Name,
      Image_URL: 'a',
      Heading,
      Title,
      Details,
      Description,
      email: userEmail
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

router.get("/userBlog", async (req, res) => {
  try {
    const email = req?.cookies?.auth_token
    const decoded = jwt.verify(email, process.env.JWT_SECRET);
    const userEmail = decoded.email;
    const yourblogs = await YourBlogs.find({ email: userEmail }).sort({ createdAt: -1 });
    // Return blogs belonging to the authenticated user only.
    // Each blog includes its unique id; access is protected via JWT.
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