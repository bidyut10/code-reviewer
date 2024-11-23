const express = require('express');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const githubRoutes = require('./routes/githubRoutes');
const connectDB = require('./db/dbConfig');
const path =require('path')
// Passport config
require('./middleware/authMiddleware');

const app = express();

connectDB();
// CORS setup
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'secretKey',
  resave: false,
  saveUninitialized: true
}));


// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes);
app.use('/api/github', githubRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, "../client/dist")));

// Fallback for SPA
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
