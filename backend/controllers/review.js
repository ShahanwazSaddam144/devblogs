const express = require('express');
const Review = require('../models/review');

const router = express.Router();

// ✅ POST review (Submit)
router.post('/review', async (req, res) => {
  const { Name, Review: reviewText } = req.body;

  if (!Name || !reviewText) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const newReview = new Review({ Name, Review: reviewText });
    await newReview.save();
    res.status(200).json({ message: '✅ Review submitted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: '❌ Server error.' });
  }
});


router.get('/review', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json(reviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: '❌ Failed to fetch reviews.' });
  }
});

module.exports = router;
