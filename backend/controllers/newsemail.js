const express = require('express');
const NewsEmail = require('../models/newsemail');

const router = express.Router();


router.post('/newsemail', async (req, res) => {
  const { Email } = req.body;

  if (!Email) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const newNewsEmail = new NewsEmail({ Email });
    await newNewsEmail.save();
    res.status(200).json({ message: '✅ Email send successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: '❌ Server error.' });
  }
});


module.exports = router;
