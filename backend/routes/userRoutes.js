const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  oauthRegister,
} = require("../controllers/userController");

router.post("/register", signup);
router.post("/login", login);
router.post("/oauth", oauthRegister);

module.exports = router;
