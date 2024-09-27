const express = require('express');
const passport = require('passport');
const { githubCallback, logout } = require('../controllers/authController');

const router = express.Router();

// GitHub login route
router.get('/github', passport.authenticate('github', { scope: ['user', 'repo'] }));

// GitHub callback route
router.get('/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    githubCallback
);

// Logout route
router.get('/logout', logout);

module.exports = router;
