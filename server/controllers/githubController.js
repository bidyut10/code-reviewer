const { fetchGitHubRepos, fetchGitHubUserProfile, fetchGitHubCommits, fetchCommitFiles, fetchGitHubUser } = require('../utils/githubAPI');

exports.getRepos = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const repos = await fetchGitHubRepos(req.user.accessToken);
    const events = await fetchGitHubUserProfile(req.user.accessToken, req.user.username);
    res.json({ repos, events });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch GitHub data' });
  }
};

exports.getUserProfile = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const userProfile = await fetchGitHubUser(req.user.accessToken);
    res.json(userProfile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch GitHub user profile' });
  }
};

exports.getCommits = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { repo } = req.params;
  try {
    const commits = await fetchGitHubCommits(req.user.accessToken, req.user.username, repo);
    res.json(commits);
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch commits for repository: ${repo}` });
  }
};

exports.getCommitFiles = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { repo, sha } = req.params;
  try {
    const changedFiles = await fetchCommitFiles(req.user.accessToken, req.user.username, repo, sha);
    res.json({ files: changedFiles });
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch commit details for commit ${sha} in repository ${repo}` });
  }
};
