const {GoogleGenerativeAI} = require('@google/generative-ai')
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

const generateResponse = async (msg) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.REACT_API_KEY);
    const model = genAI.getGenerativeModel({ model: process.env.REACT_API_MODEL });
    const result = await model.generateContent(msg);

    return result.response.text();
  } catch (error) {
    console.error("Error generating response:", error);
    return "Sorry, I couldn't process that request.";
  }
};

// Utility function to sanitize review JSON
const sanitizeReviews = (reviews) => {
  return reviews.map(review => ({
    fileName: review.fileName,
    review: review.review,
  }));
};

exports.getCommitFiles = async (req, res) => {

  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { repo, sha } = req.params;
  try {
    const changedFiles = await fetchCommitFiles(req.user.accessToken, req.user.username, repo, sha);

    // Prepare a code review for each changed file
    const reviews = await Promise.all(changedFiles.map(async (file) => {
      const fileContent = file.patch || file.raw_url; // Get file content or URL
      const review = await generateResponse(`Code review for file: ${file.filename}\nContent:\n${fileContent}`);

      return {
        fileName: file.filename,
        review: review,
      };
    }));

    
    // Sanitize reviews before sending them back
    const sanitizedReviews = sanitizeReviews(reviews);
    
    // Send sanitized reviews back in response
    res.json({ reviews: sanitizedReviews });
  } catch (error) {
    console.error(`Error fetching commit files or generating reviews:`, error);
    res.status(500).json({ error: `Failed to fetch commit details or generate code review for commit ${sha} in repository ${repo}` });
  }
};

