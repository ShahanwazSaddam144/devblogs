const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  Name:    { type: String, required: true },
  Review:   { type: String, required: true },
  date:    { type: Date, default: Date.now }
});

module.exports = mongoose.model("Review", reviewSchema);
