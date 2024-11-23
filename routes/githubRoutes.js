const express = require('express');
const { getRepos, getUserProfile, getCommits, getCommitFiles } = require('../controllers/githubController');

const router = express.Router();

// API to fetch repos and events
router.get('/repos', getRepos);

// API to fetch user profile
router.get('/user', getUserProfile);

// API to fetch commits for a specific repository
router.get('/repos/:repo/commits', getCommits);

// API to fetch changed files for a specific commit
router.get('/repos/:repo/commits/:sha', getCommitFiles);

module.exports = router;
