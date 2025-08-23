const mongoose = require("mongoose");

const yourBlogsSchema = new mongoose.Schema(
  {
    Name: { type: String, required: true },
    // Image_URL: { type: String, required: true },
    Heading: { type: String, required: true },
    Title: { type: String, required: true },
    Details: { type: String, required: true },
    Description: { type: String, required: true },
    id: { type: String, required: true },
    email: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("YourBlogs", yourBlogsSchema);
