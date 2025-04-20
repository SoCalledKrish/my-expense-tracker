const express = require('express');
const cors = require('cors');
const session = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport');
const expenseRoutes = require('./routes/expenseRoutes');
const authRoutes = require('./routes/authRoutes');
require('./config/passport');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: "https://my-expense-tracker-w1e0.onrender.com",
  credentials: true,
}));
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || "secret_key",
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api", expenseRoutes);
app.use("/auth", authRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("🚀 Expense Tracker API is running");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});

module.exports = app;