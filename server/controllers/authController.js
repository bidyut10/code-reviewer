exports.githubCallback = (req, res) => {
    // Ensure Passport handled authentication successfully
    if (!req.user) {
        return res.status(401).json({ success: false, message: 'Authentication failed' });
    }
    const user = req.user;
    res.redirect(`${process.env.FRONTEND_URL}/home?id=${user._id}`);
};

exports.logout = (req, res) => {
    req.logout(() => {
        res.redirect(`${process.env.FRONTEND_URL}`);
    });
};
