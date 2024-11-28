exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Logout failed', error: err });
        }
        req.session.destroy(() => {
            res.clearCookie('connect.sid'); 
            return res.status(200).json({ success: true, message: 'Logout successful' });
        });
    });
};