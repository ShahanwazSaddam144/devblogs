const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const botProtection = require('./middleware/bot');
const userRoutes = require('./routes/userRoutes');
const review = require('./controllers/review');
const YourBlogs = require('./controllers/your_blogs');
const newsemail = require('./controllers/newsemail');
const contact = require('./controllers/contact');
const verify = require('./controllers/verify');
const valid = require('./controllers/valid');
const cookieParser = require('cookie-parser');
const email = require('./controllers/email');
const helmet = require('helmet');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// === Middleware ===
app.set("trust proxy", 1); // important for Nginx / proxies

app.use(express.json());
app.use(helmet());

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://devblogs.buttnetworks.com"
  ],
  credentials: true,
}));

app.use(cookieParser());
app.use(botProtection);

// Request Logging
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`, req.body);
  next();
});

// === Rate Limiting ===
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests. Please try again later.',
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: 'Too many login/signup requests. Please try again later.',
});

app.use(limiter);

// === Cloudinary Config ===
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// === Multer Setup ===
const upload = multer({ dest: 'uploads/' });

// === Upload Route ===
app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    res.json({ url: result.secure_url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// === Routes ===
app.use("/api/user", authLimiter, userRoutes);
app.use('/', review);
app.use('/', YourBlogs);
app.use('/', newsemail);
app.use('/', contact);
app.use('/email', email);
app.use('/verify', verify);
app.use('/', valid);

app.post("/logout", (req, res) => {
  res.clearCookie("auth_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  return res.status(200).json({ message: "Logged out successfully" });
});

// === MongoDB Connection ===
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
      console.log(`🌐 Accessible via https://devblogs.buttnetworks.com`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });

