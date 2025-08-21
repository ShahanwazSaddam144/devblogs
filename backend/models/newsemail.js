const mongoose = require('mongoose');

const newsemailSchema = new mongoose.Schema({
  Email:    { type: String, required: true },
});

module.exports = mongoose.model("NewsEmail", newsemailSchema);
