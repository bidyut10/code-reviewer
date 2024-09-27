exports.githubCallback = (req, res) => {
    // Successful login, redirect to frontend
    res.redirect(`${process.env.FRONTEND_URL}/home`);
};

exports.logout = (req, res) => {
    req.logout(() => {
        res.redirect(`${process.env.FRONTEND_URL}`);
    });
};
