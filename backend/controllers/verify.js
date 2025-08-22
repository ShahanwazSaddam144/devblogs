const jwt = require("jsonwebtoken");
const User = require("../models/User");
const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
    const token = req.query.token;
    if (!token) return res.status(400).json({ message: "Invalid token" });

    try {
        const decoded = jwt.verify(token, process.env.VERIFICATION_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.verified = true;
        await user.save();

        res.status(200).json({ message: "Account verified successfully" });
    } catch (err) {
        console.error("Verification error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
