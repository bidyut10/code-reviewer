const express = require('express');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const session = require('express-session');
const axios = require('axios');
require('dotenv').config();

const cors = require('cors');

const app = express();

// Enable CORS for all routes or specific origins
app.use(cors({
  origin: 'http://localhost:5174',  // Allow requests from your React frontend
  credentials: true,                // Allow cookies and headers for authentication
}));

// Session middleware
app.use(session({
  secret: 'secretKey', // Change to a secure secret key
  resave: false,
  saveUninitialized: true
}));

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Passport config
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/github/callback"
}, (accessToken, refreshToken, profile, done) => {
  // Store GitHub profile and access token
  profile.accessToken = accessToken;
  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// GitHub login route
app.get('/auth/github', passport.authenticate('github', { scope: ['user', 'repo'] }));

// GitHub callback route
app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful login, redirect to frontend
    res.redirect('http://localhost:5174/home');
  }
);

// Logout route
app.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('http://localhost:5174');
  });
});

// API to fetch repos and events
app.get('/api/github/repos', async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const reposResponse = await axios.get('https://api.github.com/user/repos', {
      headers: {
        Authorization: `token ${req.user.accessToken}`
      }
    });

    const eventsResponse = await axios.get(`https://api.github.com/users/${req.user.username}/events`, {
      headers: {
        Authorization: `token ${req.user.accessToken}`
      }
    });

    res.json({ repos: reposResponse.data, events: eventsResponse.data });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch GitHub data' });
  }
});

// API to fetch user profile
app.get('/api/github/user', async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const userProfileResponse = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `token ${req.user.accessToken}`
      }
    });

    res.json(userProfileResponse.data);  // Return the user profile data
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch GitHub user profile' });
  }
});

// New API to fetch commits for a specific repository
app.get('/api/github/repos/:repo/commits', async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { repo } = req.params;

  try {
    const commitsResponse = await axios.get(`https://api.github.com/repos/${req.user.username}/${repo}/commits`, {
      headers: {
        Authorization: `token ${req.user.accessToken}`
      }
    });

    res.json(commitsResponse.data);  // Return the commit data
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch commits for repository: ${repo}` });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
