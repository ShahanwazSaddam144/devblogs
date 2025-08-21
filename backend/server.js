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

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// === Middleware ===
app.use(cors());
app.use(express.json());
app.use(botProtection);

// Request Logging
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`, req.body);
  next();
});

// Rate Limiting (15 min window, 100 max requests)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests. Please try again later.',
});
app.use(limiter);

// Routes
app.use("/api/user", userRoutes);
app.use('/',review);
app.use('/', YourBlogs);
app.use('/', newsemail);
app.use('/', contact);

// === MongoDB Connection ===
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () =>
      console.log(`🚀 Server running at http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });
