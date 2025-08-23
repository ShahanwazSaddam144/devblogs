const express = require("express")
const jwt = require("jsonwebtoken")

const router = express.Router()

router.get('/valid', async (req, res) => {
    try {
        const token = req?.cookies?.auth_token
        const isValid = token ? !!jwt.verify(token, process.env.JWT_SECRET) : false
        const name = isValid ? jwt.decode(token).name : null
        return res.status(200).json({ isValid, name })
    } catch (err) {
        console.error('❌ Error:', err.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
})

module.exports = router;
