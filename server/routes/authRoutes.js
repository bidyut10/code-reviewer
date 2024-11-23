const express = require('express');
const passport = require('passport');
const {  logout } = require('../controllers/authController');
const router = express.Router();

// GitHub login route
router.get('/github', passport.authenticate('github', { scope: ['user', 'repo'] }));

// GitHub OAuth Callback
router.get(
    '/github/callback',
    passport.authenticate('github'), 
    (req, res) => {
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'Authentication failed' });
        }
        const user = req.user;
        res.redirect(`${process.env.FRONTEND_URL}/home?id=${user._id}`);
    }
);


// Logout route
router.get('/logout', logout);

module.exports = router;
