const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

userSchema.index(
  { createdAt: 1 },
  {
    expireAfterSeconds: 86400 * 3,
    partialFilterExpression: { verified: false },
  }
);

module.exports = mongoose.model("authUser", userSchema);
