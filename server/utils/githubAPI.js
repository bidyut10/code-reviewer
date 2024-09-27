const axios = require('axios');

// Fetch GitHub repos
exports.fetchGitHubRepos = async (accessToken) => {
    const response = await axios.get(`${process.env.GITHUB_URL}/user/repos`, {
        headers: { Authorization: `token ${accessToken}` }
    });
    return response.data;
};

// Fetch GitHub user repo and events
exports.fetchGitHubUserProfile = async (accessToken, username) => {
    const response = await axios.get(`${process.env.GITHUB_URL}/users/${username}/events`, {
        headers: { Authorization: `token ${accessToken}` }
    });
    return response.data;
};
// Fetch GitHub user profile 
exports.fetchGitHubUser = async (accessToken) => {
    const response = await axios.get(`${process.env.GITHUB_URL}/user`, {
        headers: {
            Authorization: `token ${accessToken}`
        }
    });
    return response.data;
};

// Fetch commits for a repository
exports.fetchGitHubCommits = async (accessToken, username, repo) => {
    const response = await axios.get(`${process.env.GITHUB_URL}/repos/${username}/${repo}/commits`, {
        headers: { Authorization: `token ${accessToken}` }
    });
    return response.data;
};

// Fetch changed files for a commit
exports.fetchCommitFiles = async (accessToken, username, repo, sha) => {
    const response = await axios.get(`${process.env.GITHUB_URL}/repos/${username}/${repo}/commits/${sha}`, {
        headers: { Authorization: `token ${accessToken}` }
    });

    // Filter files according to patterns
    let changedFiles = response.data.files;
    const ignoredPatterns = [
        'node_modules/', '.gitignore', 'package-lock.json', 'yarn.lock', '.env',
        '__tests__/', '__mocks__/', 'coverage/', 'dist/', 'build/', '.DS_Store',
        '.vscode/', '*.log', '*.lock', '*.tmp', '*.md'
    ];

    changedFiles = changedFiles.filter(file => {
        return !ignoredPatterns.some(pattern => {
            const regex = new RegExp(pattern.replace('*', '.*'));
            return regex.test(file.filename);
        });
    });

    return changedFiles;
};
